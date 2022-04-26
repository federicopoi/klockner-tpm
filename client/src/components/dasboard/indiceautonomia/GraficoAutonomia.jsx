import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
import TableModalAutonomia from "../tablemodalautonomia/TableModalAutonomia";
import { Row, Col, Card, CardBody, Label, Input } from "reactstrap";
import moment from "moment";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
export class GraficoAutonomia extends Component {
  constructor() {
    super();
    this.state = {
      equipo: "",
      numberMonths: "12",
    };
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }
  toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }

    this.chart.render();
  }
  onChange = (e) => {
    e.target.value === "Seleccionar meses"
      ? this.setState({
          [e.target.name]: 12,
        })
      : this.setState({
          [e.target.name]: e.target.value,
        });
  };

  render() {
    const { tarjetas } = this.props;

    var filter = {
      equipo: this.state.equipo && this.state.equipo,
    };

    const multiFilter = (arr, filters) => {
      const filterKeys = Object.keys(filters);
      return arr.filter((eachObj) => {
        return filterKeys.every((eachKey) => {
          if (!filters[eachKey].length) {
            return true; // passing an empty filter means that filter is ignored.
          }
          return filters[eachKey].includes(eachObj[eachKey]);
        });
      });
    };
    const newFilter = multiFilter(tarjetas, filter);

    console.log(newFilter);

    const arrEquipos = tarjetas.map(({ equipo }) => equipo);
    const unicosEquipos = Array.from(new Set(arrEquipos));

    // Formulas para "Indice de autonomia"

    // Filtro todos los meses en el que hay tarjetas convertidas
    const fechasTarjetasConvertidas = newFilter
      // .filter(({ estado, convertida }) => convertida === true)
      .map(({ fecha }) => fecha.substr(0, 7));

    // Borro todos los meses repetidos
    let fechasTarjetasConvertidas1 = new Set(fechasTarjetasConvertidas);
    const fechasTarjetasConvertidasUnicas = [...fechasTarjetasConvertidas1];

    const startDate = moment(fechasTarjetasConvertidasUnicas.sort()[0]);
    const endDate = moment(fechasTarjetasConvertidasUnicas.sort().slice(-1)[1]);

    const fechastarjetasUnicasRango = [];

    if (endDate.isBefore(startDate)) {
      throw "End date must be greated than start date.";
    }

    while (startDate.isBefore(endDate)) {
      fechastarjetasUnicasRango.push(startDate.format("YYYY-MM"));
      startDate.add(1, "month");
    }

    const fechastarjetasUnicasRangoCut = fechastarjetasUnicasRango.slice(
      Math.max(fechastarjetasUnicasRango.length - this.state.numberMonths, 0)
    );

    // Numero total de tarjetas de cada mes (no acumulado)
    let array1 = fechastarjetasUnicasRangoCut.sort().map((item, index) => {
      return newFilter.filter(
        ({ estado, fecha, color }) =>
          color === "Azul" &&
          estado === "Cerrada" &&
          fecha.slice(0, 7) === item.slice(0, 7)
      ).length;
    });

    // Acumulado de tarjetas por mes
    const array1Acum = array1.map((elem, index) =>
      array1.slice(0, index + 1).reduce((a, b) => a + b)
    );

    // Numero total de tarjetas de cada mes (no acumulado)
    let array2 = fechastarjetasUnicasRangoCut.sort().map((item, index) => {
      return newFilter.filter(
        ({ estado, fecha, convertida }) =>
          convertida === true &&
          estado === "Cerrada" &&
          fecha.slice(0, 7) === item.slice(0, 7)
      ).length;
    });

    // Acumulado de tarjetas por mes
    const array2Acum = array2.map((elem, index) =>
      array2.slice(0, index + 1).reduce((a, b) => a + b)
    );

    console.log(array2Acum);
    // Numero total de tarjetas de cada mes (no acumulado)
    let array3 = fechastarjetasUnicasRangoCut.sort().map((item, index) => {
      return newFilter.filter(
        ({ estado, fecha }) =>
          estado === "Cerrada" && fecha.slice(0, 7) === item.slice(0, 7)
      ).length;
    });

    // Acumulado de tarjetas por mes
    const array3Acum = array3.map((elem, index) =>
      array3.slice(0, index + 1).reduce((a, b) => a + b)
    );

    // Numero total de tarjetas de cada mes (no acumulado)
    let arrayAcumFinal = fechastarjetasUnicasRangoCut
      .sort()
      .map((item, index) => {
        return (
          ((array1Acum[index] + array2Acum[index]) / array3Acum[index]) * 100
        );
      });

    console.log(arrayAcumFinal);

    // Datos para el grafico
    const ConvertidasData = [
      fechastarjetasUnicasRangoCut.sort().map((item, index) => {
        return {
          x: new Date(
            parseInt(item.slice(0, 4)),
            parseInt(item.slice(5, 7) - 1)
          ),
          y: arrayAcumFinal[index],
        };
      }),
    ];

    const arrayMonths = [];

    for (let i = 1; i < fechastarjetasUnicasRango.length + 1; i++) {
      arrayMonths.push(i);
    }

    arrayMonths.reverse();

    CanvasJS.addCultureInfo("es", {
      decimalSeparator: ",", // Observe ToolTip Number Format
      digitGroupSeparator: ".", // Observe axisY labels

      months: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
    });
    const options = {
      animationEnabled: true,
      culture: "es",
      axisX: {
        valueFormatString: "MMMM",

        interval: 1,
        intervalType: "month",
      },
      axisY: {
        suffix: "%",
        lineColor: "#000000",
        tickColor: "#000000",
        labelFontColor: "#000000",
      },

      toolTip: {
        shared: true,
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleDataSeries,
        verticalAlign: "top",
      },
      data: [
        {
          color: "#1BA7F7",
          type: "column",
          name: "Indice de autonomia",
          showInLegend: true,
          xValueFormatString: "MMMM YYYY",
          dataPoints: ConvertidasData[0],
        },
      ],
    };

    return (
      <div>
        <Row>
          <Col lg={5} md={12} sm={12}>
            <Card>
              <CardBody>
                <h3 className="mb-3">Indice de autonomia</h3>

                <CanvasJSChart
                  culture="en"
                  options={options}
                  onRef={(ref) => (this.chart = ref)}
                />
                <Input
                  type="select"
                  name="numberMonths"
                  id="numberMonths"
                  className="mt-2"
                  onChange={this.onChange}
                >
                  <option>Seleccionar meses</option>
                  {arrayMonths &&
                    arrayMonths.map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {`Últimos ${item} meses`}
                        </option>
                      );
                    })}
                </Input>
              </CardBody>
            </Card>
          </Col>
          <Col lg={7} md={12} sm={12}>
            <TableModalAutonomia
              tarjetasFiltro1={arrayAcumFinal}
              fechas={fechastarjetasUnicasRangoCut}
            ></TableModalAutonomia>

            <Card>
              <CardBody>
                <h3>Filtros</h3>
                <Label for="equipo">Equipo</Label>
                <Input
                  type="select"
                  name="equipo"
                  id="equipo"
                  onChange={this.onChange}
                >
                  <option></option>
                  {unicosEquipos.map((item, index) => {
                    return <option key={index}>{item}</option>;
                  })}
                </Input>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GraficoAutonomia;
