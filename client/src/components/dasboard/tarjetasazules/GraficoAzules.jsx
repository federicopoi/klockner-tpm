import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
import moment from "moment";
import TableModal from "../tablemodal/TableModal";
import { Row, Col, Card, CardBody, Input } from "reactstrap";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

export class GraficoAzules extends Component {
  constructor() {
    super();
    this.state = {
      numberMonths: "12",
      dateFrom: "0",
      dateTo: "12",
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

    // Formulas para "Azules acumuladas abiertas"

    // Filtro todos los meses en el que hay tarjetas abiertas Azules
    const fechasTarjetasAzules = tarjetas
      .filter(({ estado, color }) => color === "Azul")
      .map(({ fecha }) => fecha.substr(0, 7));

    // Filtro todos los meses en el que hay tarjetas cerradas Azules
    const fechasTarjetasAzulesCerradas = tarjetas
      .filter(({ estado, color }) => estado === "Cerrada" && color === "Azul")
      .map(({ finReparacion }) => finReparacion.substr(0, 7));

    // Borro todos los meses repetidos
    let fechasTarjetasAzules1 = new Set(fechasTarjetasAzules);
    const fechasTarjetasAzulesUnicas = [...fechasTarjetasAzules1];

    // Borro todos los meses repetidos
    let fechasTarjetasAzules1Cerradas = new Set(fechasTarjetasAzulesCerradas);
    const fechasTarjetasAzulesUnicasCerradas = [
      ...fechasTarjetasAzules1Cerradas,
    ];

    var c = fechasTarjetasAzulesUnicas.concat(
      fechasTarjetasAzulesUnicasCerradas
    );
    var fechastarjetasUnicas = c.filter((item, pos) => c.indexOf(item) === pos);

    const startDate = moment(fechastarjetasUnicas.sort()[0]);
    const endDate = moment(fechastarjetasUnicas.sort().slice(-1)[1]);

    const fechastarjetasUnicasRango = [];

    if (endDate.isBefore(startDate)) {
      throw "End date must be greated than start date.";
    }

    while (startDate.isBefore(endDate)) {
      fechastarjetasUnicasRango.push(startDate.format("YYYY-MM"));
      startDate.add(1, "month");
    }

    fechastarjetasUnicasRango.reverse();

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

    let fechastarjetasUnicasRangoCut = fechastarjetasUnicasRango.slice(
      this.state.dateFrom,
      this.state.dateTo
    );

    // Numero total de tarjetas de cada mes (no acumulado)
    let array = fechastarjetasUnicasRangoCut.sort().map((item, index) => {
      return tarjetas.filter(
        ({ estado, fecha, color }) =>
          color === "Azul" && fecha.slice(0, 7) === item.slice(0, 7)
      ).length;
    });

    const arrTarjetasAzulesAcumuladas = array.map((elem, index) =>
      array.slice(0, index + 1).reduce((a, b) => a + b)
    );

    // Datos para el grafico
    const AzulesAcumuladasAbiertasData = [
      fechastarjetasUnicasRangoCut.sort().map((item, index) => {
        return {
          x: new Date(
            parseInt(item.slice(0, 4)),
            parseInt(item.slice(5, 7) - 1)
          ),
          y: arrTarjetasAzulesAcumuladas[index],
        };
      }),
    ];

    // Formulas para "Azules acumuladas cerradas"

    // Numero total de tarjetas de cada mes (no acumulado)
    let arrayCerradas = fechastarjetasUnicasRangoCut
      .sort()
      .map((item, index) => {
        return tarjetas.filter(
          ({ estado, finReparacion, color }) =>
            color === "Azul" &&
            estado === "Cerrada" &&
            finReparacion.slice(0, 7) === item.slice(0, 7)
        ).length;
      });

    // Acumulado de tarjetas por mes
    const arrTarjetasAzulesAcumuladasCerradas = arrayCerradas.map(
      (elem, index) =>
        arrayCerradas.slice(0, index + 1).reduce((aa, bb) => aa + bb)
    );

    // Datos para el grafico
    const AzulesAcumuladasAbiertasDataCerradas = [
      fechastarjetasUnicasRangoCut.sort().map((item, index) => {
        return {
          x: new Date(
            parseInt(item.slice(0, 4)),
            parseInt(item.slice(5, 7) - 1)
          ),
          y: arrTarjetasAzulesAcumuladasCerradas[index],
        };
      }),
    ];

    // Formulas para "Porcentaje acumuladas cerradas porcentaje"

    // Numero total de tarjetas de cada mes (no acumulado)
    let arrayCerradasPorcentaje = fechastarjetasUnicasRangoCut
      .sort()
      .map((item, index) => {
        return tarjetas.filter(
          ({ estado, finReparacion, color }) =>
            color === "Azul" &&
            estado === "Cerrada" &&
            finReparacion.slice(0, 7) === item.slice(0, 7)
        ).length;
      });

    // Acumulado de tarjetas por mes
    const arrTarjetasAzulesAcumuladasCerradasPorcentaje = arrayCerradasPorcentaje.map(
      (elem, index) =>
        arrayCerradasPorcentaje.slice(0, index + 1).reduce((aa, bb) => aa + bb)
    );
    // Datos para el grafico de cerradas porcentaje

    const AzulesAcumuladasAbiertasDataCerradasPorcentaje = [
      fechastarjetasUnicasRangoCut.map((item, index) => {
        return {
          x: new Date(
            parseInt(item.slice(0, 4)),
            parseInt(item.slice(5, 7) - 1)
          ),
          y:
            (arrTarjetasAzulesAcumuladasCerradasPorcentaje[index] /
              arrTarjetasAzulesAcumuladas[index]) *
            100,
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
        title: "Cantidad de tarjetas",
        lineColor: "#000000",
        tickColor: "#000000",
        labelFontColor: "#000000",
      },
      axisY2: {
        title: "% de Cierre",
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
          color: "#007bff",
          type: "column",
          name: "Azules acumuladas (abiertas)",
          showInLegend: true,
          xValueFormatString: "MMMM YYYY",
          dataPoints: AzulesAcumuladasAbiertasData[0],
        },
        {
          type: "line",
          name: "Azules acumuladas (cerradas)",
          showInLegend: true,
          dataPoints: AzulesAcumuladasAbiertasDataCerradas[0],
        },
        {
          type: "line",
          color: "#121212",
          name: "Porcentaje Azules Cerradas",
          showInLegend: true,
          axisYType: "secondary",
          yValueFormatString: "#,##0",
          dataPoints: AzulesAcumuladasAbiertasDataCerradasPorcentaje[0],
        },
      ],
    };

    return (
      <div>
        <Row>
          <Col lg={12} md={12} sm={12}>

            <Card>
              <CardBody>
                <h3 className="mb-3">Evolucion de Tarjetas Azules</h3>
                <CanvasJSChart
                  culture="en"
                  options={options}
                  onRef={(ref) => (this.chart = ref)}
                />
                <Row>
                  <Col>
                    <Input
                      type="select"
                      name="dateTo"
                      id="dateTo"
                      className="mt-2"
                      onChange={onChangeDatesTo}
                    >
                      <option>Seleccionar desde</option>
                      {fechastarjetasUnicasRango &&
                        fechastarjetasUnicasRango.map((item, index) => {
                          return (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          );
                        })}
                    </Input>
                  </Col>
                  <Col>
                    <Input
                      type="select"
                      name="dateFrom"
                      id="dateFrom"
                      className="mt-2"
                      onChange={onChangeDatesFrom}
                    >
                      <option>Seleccionar hasta</option>
                      {fechastarjetasUnicasRango &&
                        fechastarjetasUnicasRango.map((item, index) => {
                          return (
                            <option key={index} index={index} value={item}>
                              {item}
                            </option>
                          );
                        })}
                    </Input>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg={12} md={12} sm={12}>
            <TableModal
              tarjetasFiltro1={arrTarjetasAzulesAcumuladas}
              tarjetasFiltro2={arrTarjetasAzulesAcumuladasCerradas}
              tarjetasFiltro3={arrTarjetasAzulesAcumuladasCerradasPorcentaje}
              tarjetasmesabiertas={array}
              tarjetasmescerradas={arrayCerradas}
              color="Azules"
              fechas={fechastarjetasUnicasRangoCut}
            ></TableModal>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GraficoAzules;
