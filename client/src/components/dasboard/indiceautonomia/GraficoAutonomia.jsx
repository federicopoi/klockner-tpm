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
      equipo: [],
      numberMonths: "12",
      dateFrom: "0",
      dateTo: "12",
    };
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }

  componentDidMount() {
    this.updateAvailableDates();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tarjetas !== this.props.tarjetas) {
      this.updateAvailableDates();
    }
  }

  updateAvailableDates = () => {
    const { tarjetas } = this.props;

    // Get all dates from tarjetas
    const fechasTarjetasConvertidas = tarjetas
      .map(({ fecha }) => fecha.substr(0, 7));

    const fechasTarjetasFiltroCerradas = tarjetas
      .filter(({ estado }) => estado === "Cerrada")
      .map(({ finReparacion }) => finReparacion.substr(0, 7));

    // Remove duplicates
    let fechasTarjetasConvertidas1 = new Set(fechasTarjetasConvertidas);
    const fechasTarjetasFiltroUnicas = [...fechasTarjetasConvertidas1];

    let fechasTarjetasFiltro1Cerradas = new Set(fechasTarjetasFiltroCerradas);
    const fechasTarjetasFiltroUnicasCerradas = [
      ...fechasTarjetasFiltro1Cerradas,
    ];

    var c = fechasTarjetasFiltroUnicas.concat(
      fechasTarjetasFiltroUnicasCerradas
    );
    var fechastarjetasUnicas = c.filter((item, pos) => c.indexOf(item) === pos);


    const startDate = moment(fechastarjetasUnicas.sort()[0]);
    const endDate = moment(fechastarjetasUnicas.sort().slice(-1)[1]);

    const fechastarjetasUnicasRango = [];

    if (!endDate.isBefore(startDate)) {
      let currentDate = startDate.clone();
      while (currentDate.isSameOrBefore(endDate)) {
        fechastarjetasUnicasRango.push(currentDate.format("YYYY-MM"));
        currentDate.add(1, "month");
      }
    }

    fechastarjetasUnicasRango.reverse();

    // Set initial state to show last 12 months
    const totalMonths = fechastarjetasUnicasRango.length;
    const initialFromIndex = Math.min(12, totalMonths);

    this.setState({
      dateFrom: 0,
      dateTo: initialFromIndex,
    });
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
    if (e.target.name === "equipo") {
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      if (selectedOptions.includes("")) {
        this.setState({
          [e.target.name]: []
        });
      } else {
        this.setState({
          [e.target.name]: selectedOptions
        });
      }
    }
  };

  render() {
    const { tarjetas } = this.props;

    var filter = {
      equipo: this.state.equipo,
    };

    const multiFilter = (arr, filters) => {
      const filterKeys = Object.keys(filters);
      return arr.filter((eachObj) => {
        return filterKeys.every((eachKey) => {
          if (!filters[eachKey].length) {
            return true;
          }
          return filters[eachKey].includes(eachObj[eachKey]);
        });
      });
    };
    const newFilter = multiFilter(tarjetas, filter);

    const arrEquipos = tarjetas.map(({ equipo }) => equipo);
    const unicosEquipos = Array.from(new Set(arrEquipos));

    // Get all dates from tarjetas
    const fechasTarjetasConvertidas = tarjetas
      .map(({ fecha }) => fecha.substr(0, 7));

    const fechasTarjetasFiltroCerradas = tarjetas
      .filter(({ estado }) => estado === "Cerrada")
      .map(({ finReparacion }) => finReparacion.substr(0, 7));

    // Remove duplicates
    let fechasTarjetasConvertidas1 = new Set(fechasTarjetasConvertidas);
    const fechasTarjetasFiltroUnicas = [...fechasTarjetasConvertidas1];

    let fechasTarjetasFiltro1Cerradas = new Set(fechasTarjetasFiltroCerradas);
    const fechasTarjetasFiltroUnicasCerradas = [
      ...fechasTarjetasFiltro1Cerradas,
    ];

    var c = fechasTarjetasFiltroUnicas.concat(
      fechasTarjetasFiltroUnicasCerradas
    );
    var fechastarjetasUnicas = c.filter((item, pos) => c.indexOf(item) === pos);


    const startDate = moment(fechastarjetasUnicas.sort()[0]);
    const endDate = moment(fechastarjetasUnicas.sort().slice(-1)[1]);

    const fechastarjetasUnicasRango = [];

    if (!endDate.isBefore(startDate)) {
      let currentDate = startDate.clone();
      while (currentDate.isSameOrBefore(endDate)) {
        fechastarjetasUnicasRango.push(currentDate.format("YYYY-MM"));
        currentDate.add(1, "month");
      }
    }

    fechastarjetasUnicasRango.reverse();

    let fechastarjetasUnicasRangoCut = fechastarjetasUnicasRango.slice(
      this.state.dateFrom,
      this.state.dateTo
    );

    // Numero total de tarjetas de cada mes (no acumulado)
    let array1 = fechastarjetasUnicasRangoCut.sort().map((item, index) => {
      return newFilter.filter(
        ({ estado, finReparacion, color }) =>
          color === "Azul" &&
          estado === "Cerrada" &&
          finReparacion.slice(0, 7) === item.slice(0, 7)
      ).length;
    });

    // Acumulado de tarjetas por mes
    const array1Acum = array1.map((elem, index) =>
      array1.slice(0, index + 1).reduce((a, b) => a + b)
    );

    // Numero total de tarjetas de cada mes (no acumulado)
    let array2 = fechastarjetasUnicasRangoCut.sort().map((item, index) => {
      return newFilter.filter(
        ({ estado, finReparacion, convertida }) =>
          convertida === true &&
          estado === "Cerrada" &&
          finReparacion.slice(0, 7) === item.slice(0, 7)
      ).length;
    });

    // Acumulado de tarjetas por mes
    const array2Acum = array2.map((elem, index) =>
      array2.slice(0, index + 1).reduce((a, b) => a + b)
    );

    // Numero total de tarjetas de cada mes (no acumulado)
    let array3 = fechastarjetasUnicasRangoCut.sort().map((item, index) => {
      return newFilter.filter(
        ({ estado, finReparacion, color }) =>
          estado === "Cerrada" && finReparacion.slice(0, 7) === item.slice(0, 7) &&
          ["Azul", "Roja", "Verde", "Amarilla"].includes(color)
      ).length;
    });

    // Acumulado de tarjetas por mes
    const array3Acum = array3.map((elem, index) =>
      array3.slice(0, index + 1).reduce((a, b) => a + b)
    );

    // --- DEBUGGING LOGS ---
    fechastarjetasUnicasRangoCut.forEach((month, index) => {
      const monthStr = month.slice(5, 7);
      if (monthStr === "09" || monthStr === "10") {
        console.log(`--- DEBUG ${month} ---`);
        console.log("Azules Cerradas Acumuladas:", array1Acum[index]);
        console.log("Convertidas Cerradas Acumuladas:", array2Acum[index]);
        console.log("Total Cerradas (4 colores):", array3Acum[index]);
        const totalNumerator = array1Acum[index] + array2Acum[index];
        const percentage = array3Acum[index] > 0 ? (totalNumerator / array3Acum[index]) * 100 : 0;
        console.log("Numerador Total (Azules + Convertidas):", totalNumerator);
        console.log("Indice de Autonomia Calculado:", percentage);
        console.log("--- END DEBUG ---");
      }
    });
    // --- END DEBUGGING LOGS ---

    // Numero total de tarjetas de cada mes (no acumulado)
    let arrayAcumFinal = fechastarjetasUnicasRangoCut
      .sort()
      .map((item, index) => {
        return (
          ((array1Acum[index] + array2Acum[index]) / array3Acum[index]) * 100
        );
      });

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

    const onChangeDatesFrom = (event) => {
      this.setState({
        [event.target.name]: fechastarjetasUnicasRango.indexOf(event.target.value),
      });
    };

    const onChangeDatesTo = (event) => {
      const indexDate = fechastarjetasUnicasRango.indexOf(event.target.value) + 1;
      this.setState({
        [event.target.name]: indexDate,
      });
    };

    return (
      <div>
        <Row>
          <Col lg={12} md={12} sm={12} className="mb-4">
            <Card>
              <CardBody>
                <h3 className="mb-3">Indice de autonomia</h3>
                <CanvasJSChart
                  culture="en"
                  options={options}
                  onRef={(ref) => (this.chart = ref)}
                />
                <Row className="mt-3">
                  <Col md={6}>
                    <Input
                      type="select"
                      name="dateTo"
                      id="dateTo"
                      className="mt-2"
                      onChange={onChangeDatesTo}
                    >
                      <option>Seleccionar desde</option>
                      {fechastarjetasUnicasRango &&
                        fechastarjetasUnicasRango.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                    </Input>
                  </Col>
                  <Col md={6}>
                    <Input
                      type="select"
                      name="dateFrom"
                      id="dateFrom"
                      className="mt-2"
                      onChange={onChangeDatesFrom}
                    >
                      <option>Seleccionar hasta</option>
                      {fechastarjetasUnicasRango &&
                        fechastarjetasUnicasRango.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                    </Input>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={12} sm={12}>
            <TableModalAutonomia
              tarjetasFiltro1={arrayAcumFinal}
              fechas={fechastarjetasUnicasRangoCut}
            ></TableModalAutonomia>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <Card>
              <CardBody>
                <h3>Filtros</h3>
                <Label for="equipo">Equipo</Label>
                <Input
                  type="select"
                  name="equipo"
                  id="equipo"
                  onChange={this.onChange}
                  multiple
                >
                  <option value=""></option>
                  {unicosEquipos.map((item, index) => {
                    return <option key={index} value={item}>{item}</option>;
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
