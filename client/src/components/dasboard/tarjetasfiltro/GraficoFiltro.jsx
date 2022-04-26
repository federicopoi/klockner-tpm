import React, { Component } from "react";
import { Input, Label, CardBody, Card } from "reactstrap";
import CanvasJSReact from "../canvasjs.react";
import moment from "moment";
import TableModal from "../tablemodal/TableModal";
import { Row, Col } from "reactstrap";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

export class GraficoFiltro extends Component {
  constructor() {
    super();
    this.state = {
      color: "",
      equipo: "",
      prioridad: "",
      maquina: "",
      numberMonths: "12",
      colorHex: "#EAA842",
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
    if (e.target.name === "color" && e.target.value === "Azul") {
      this.setState({
        [e.target.name]: e.target.value,
        colorHex: "#007bff",
      });
    } else if (e.target.name === "color" && e.target.value === "Roja") {
      this.setState({
        [e.target.name]: e.target.value,
        colorHex: "#dc3545",
      });
    } else if (e.target.name === "color" && e.target.value === "Verde") {
      this.setState({
        [e.target.name]: e.target.value,
        colorHex: "#28a745",
      });
    } else if (e.target.name === "color" && e.target.value === "Amarilla") {
      this.setState({
        [e.target.name]: e.target.value,
        colorHex: "#F7E91B",
      });
    } else if (e.target.name !== "color") {
      this.setState({
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === "color" && e.target.value === "") {
      this.setState({
        [e.target.name]: e.target.value,
        colorHex: "#EAA842",
      });
    }
  };

  handleChange = (e) => {
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
      color: this.state.color && this.state.color,
      equipo: this.state.equipo && this.state.equipo,
      prioridad: this.state.prioridad && this.state.prioridad,
      maquina: this.state.maquina && this.state.maquina,
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

    const arrEquipos = tarjetas.map(({ equipo }) => equipo);
    const unicosEquipos = Array.from(new Set(arrEquipos));

    const arrMaquina = tarjetas.map(({ maquina }) => maquina);
    const unicosMaquina = Array.from(new Set(arrMaquina));

    // Formulas para "Filtro acumuladas abiertas"

    // Filtro todos los meses en el que hay tarjetas abiertas Filtro
    const fechasTarjetasFiltro = tarjetas.map(({ fecha }) =>
      fecha.substr(0, 7)
    );

    // Filtro todos los meses en el que hay tarjetas cerradas Filtro
    const fechasTarjetasFiltroCerradas = tarjetas
      .filter(({ estado, color, equipo }) => estado === "Cerrada")
      .map(({ finReparacion, color, numero }) => finReparacion.substr(0, 7));

    // Borro todos los meses repetidos
    let fechasTarjetasFiltro1 = new Set(fechasTarjetasFiltro);
    const fechasTarjetasFiltroUnicas = [...fechasTarjetasFiltro1];

    // Borro todos los meses repetidos
    let fechasTarjetasFiltro1Cerradas = new Set(fechasTarjetasFiltroCerradas);
    const fechasTarjetasFiltroUnicasCerradas = [
      ...fechasTarjetasFiltro1Cerradas,
    ];

    var c = fechasTarjetasFiltroUnicas.concat(
      fechasTarjetasFiltroUnicasCerradas
    );
    var fechastarjetasUnicas = c.filter((item, pos) => c.indexOf(item) === pos);

    console.log("Aqui");
    console.log(fechastarjetasUnicas);

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

    const fechastarjetasUnicasRangoCut = fechastarjetasUnicasRango.slice(
      Math.max(fechastarjetasUnicasRango.length - this.state.numberMonths, 0)
    );

    // Numero total de tarjetas de cada mes (no acumulado)
    let array = fechastarjetasUnicasRangoCut.sort().map((item, index) => {
      return newFilter.filter(
        ({ estado, fecha, color, equipo }) =>
          fecha.slice(0, 7) === item.slice(0, 7)
      ).length;
    });

    const arrTarjetasFiltroAcumuladas = array.map((elem, index) =>
      array.slice(0, index + 1).reduce((a, b) => a + b)
    );

    // Datos para el grafico
    const FiltroAcumuladasAbiertasData = [
      fechastarjetasUnicasRangoCut.sort().map((item, index) => {
        return {
          x: new Date(
            parseInt(item.slice(0, 4)),
            parseInt(item.slice(5, 7) - 1)
          ),
          y: arrTarjetasFiltroAcumuladas[index],
        };
      }),
    ];

    // Formulas para "Filtro acumuladas cerradas"

    // Numero total de tarjetas de cada mes (no acumulado)
    let arrayCerradas = fechastarjetasUnicasRangoCut
      .sort()
      .map((item, index) => {
        return newFilter.filter(
          ({ estado, finReparacion, color, equipo }) =>
            estado === "Cerrada" &&
            finReparacion.slice(0, 7) === item.slice(0, 7)
        ).length;
      });

    // Acumulado de tarjetas por mes
    const arrTarjetasFiltroAcumuladasCerradas = arrayCerradas.map(
      (elem, index) =>
        arrayCerradas.slice(0, index + 1).reduce((aa, bb) => aa + bb)
    );

    // Datos para el grafico
    const FiltroAcumuladasAbiertasDataCerradas = [
      fechastarjetasUnicasRangoCut.sort().map((item, index) => {
        return {
          x: new Date(
            parseInt(item.slice(0, 4)),
            parseInt(item.slice(5, 7) - 1)
          ),
          y: arrTarjetasFiltroAcumuladasCerradas[index],
        };
      }),
    ];

    // Formulas para "Porcentaje acumuladas cerradas porcentaje"

    // Numero total de tarjetas de cada mes (no acumulado)
    let arrayCerradasPorcentaje = fechastarjetasUnicasRangoCut
      .sort()
      .map((item, index) => {
        return newFilter.filter(
          ({ estado, finReparacion, color, equipo }) =>
            estado === "Cerrada" &&
            finReparacion.slice(0, 7) === item.slice(0, 7)
        ).length;
      });

    // Acumulado de tarjetas por mes
    const arrTarjetasFiltroAcumuladasCerradasPorcentaje =
      arrayCerradasPorcentaje.map((elem, index) =>
        arrayCerradasPorcentaje.slice(0, index + 1).reduce((aa, bb) => aa + bb)
      );
    // Datos para el grafico de cerradas porcentaje

    const FiltroAcumuladasAbiertasDataCerradasPorcentaje = [
      fechastarjetasUnicasRangoCut.map((item, index) => {
        return {
          x: new Date(
            parseInt(item.slice(0, 4)),
            parseInt(item.slice(5, 7) - 1)
          ),
          y:
            (arrTarjetasFiltroAcumuladasCerradasPorcentaje[index] /
              arrTarjetasFiltroAcumuladas[index]) *
            100,
        };
      }),
    ];

    const arrayMonths = [];

    console.log(arrayMonths);

    for (let i = 1; i < fechastarjetasUnicasRango.length + 1; i++) {
      arrayMonths.push(i);
    }

    console.log(fechastarjetasUnicasRango);

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
          color: this.state.colorHex,
          type: "column",
          name: "Tarjetas acumuladas (abiertas)",
          showInLegend: true,
          xValueFormatString: "MMMM YYYY",
          dataPoints: FiltroAcumuladasAbiertasData[0],
        },
        {
          type: "line",
          name: "Tarjetas acumuladas (cerradas)",
          showInLegend: true,
          dataPoints: FiltroAcumuladasAbiertasDataCerradas[0],
        },
        {
          type: "line",
          color: "#121212",
          name: "Porcentaje Tarjetas Cerradas",
          showInLegend: true,
          axisYType: "secondary",
          yValueFormatString: "#,##0",
          dataPoints: FiltroAcumuladasAbiertasDataCerradasPorcentaje[0],
        },
      ],
    };

    return (
      <div>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Card>
              <CardBody>
                <div className="d-sm-flex align-items-center">
                  <div className="">
                    <div>
                      <h3 className="mb-3">Grafico personalizado</h3>
                    </div>
                  </div>
                  <div className="ml-auto d-sm-flex no-block align-items-center mb-3">
                    <Col>
                      <Label for="color">Color</Label>
                      <Input
                        type="select"
                        name="color"
                        id="color"
                        onChange={this.onChange}
                      >
                        <option></option>
                        <option>Azul</option>
                        <option>Roja</option>
                        <option>Amarilla</option>
                        <option>Verde</option>
                      </Input>
                    </Col>
                    <Col>
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
                    </Col>
                    <Col>
                      <Label for="prioridad">Prioridad</Label>
                      <Input
                        type="select"
                        name="prioridad"
                        id="prioridad"
                        onChange={this.onChange}
                      >
                        <option></option>
                        <option>Alta</option>
                        <option>Media</option>
                        <option>Baja</option>
                      </Input>
                    </Col>
                    <Col>
                      <Label for="maquina">Máquina/Instalación</Label>
                      <Input
                        type="select"
                        name="maquina"
                        id="maquina"
                        onChange={this.onChange}
                      >
                        <option></option>
                        {unicosMaquina.map((item, index) => {
                          return <option key={index}>{item}</option>;
                        })}
                      </Input>
                    </Col>
                  </div>
                </div>
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
          <Col lg={12} md={12} sm={12}>
            <TableModal
              tarjetasFiltro1={arrTarjetasFiltroAcumuladas}
              tarjetasFiltro2={arrTarjetasFiltroAcumuladasCerradas}
              tarjetasFiltro3={arrTarjetasFiltroAcumuladasCerradasPorcentaje}
              tarjetasmesabiertas={array}
              tarjetasmescerradas={arrayCerradas}
              color={this.state.color}
              fechas={fechastarjetasUnicasRangoCut}
            ></TableModal>

            {/* <Card>
              <CardBody>
                <h3>Filtros</h3>
                <Label for="color">Color</Label>
                <Input
                  type="select"
                  name="color"
                  id="color"
                  onChange={this.onChange}
                >
                  <option></option>
                  <option>Azul</option>
                  <option>Roja</option>
                  <option>Amarilla</option>
                  <option>Verde</option>
                </Input>
                <Label for="equipo" className="mt-2">
                  Equipo
                </Label>
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
                <Label for="prioridad" className="mt-2">
                  Prioridad
                </Label>
                <Input
                  type="select"
                  name="prioridad"
                  id="prioridad"
                  onChange={this.onChange}
                >
                  <option></option>
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </Input>
              </CardBody>
            </Card> */}
          </Col>
        </Row>
      </div>
    );
  }
}

export default GraficoFiltro;
