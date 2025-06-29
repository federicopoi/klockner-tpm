import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
import { Label, Input } from "reactstrap";
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import moment from "moment";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
export class GraficoRiesgo extends Component {
  constructor() {
    super();
    this.state = {
      equipo: "",
      familia: "",
      dateFrom: "0",
      dateTo: "100",
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
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeMulti = (event) => {
    if (event.target.value == "") {
      this.setState({
        [event.target.id]: {},
      });
    } else {
      let opts = [],
        opt;
      for (let i = 0, len = event.target.options.length; i < len; i++) {
        opt = event.target.options[i];
        if (opt.selected) {
          opts.push(opt.value);
        }
      }
      this.setState({
        [event.target.id]: opts,
      });
    }
  };

  render() {
    const { tarjetas } = this.props;

    var filter = {
      equipo: this.state.equipo && this.state.equipo,
      familia: this.state.familia && this.state.familia,
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

    const arrFamilias = tarjetas.map(({ familia }) => familia);
    const unicosFamilias = Array.from(new Set(arrFamilias)).sort();

    // Seleccionar fecha desde y hasta

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
        [event.target.name]: fechastarjetasUnicasRango.indexOf(
          event.target.value
        ),
      });
    };
    const onChangeDatesTo = (event) => {
      const indexDate =
        fechastarjetasUnicasRango.indexOf(event.target.value) + 1;
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
      return newFilter
        .filter(
          ({ estado, fecha, color, equipo }) =>
            fecha.slice(0, 7) === item.slice(0, 7)
        )
        .map((item) => item);
    });

    let arr = [];
    for (const item of array) {
      for (const subitem of item) {
        arr.push(subitem);
      }
    }

    // Formulas para "Mapas de Riesgo"

    // Cantidad de tarjetas abiertas de newFilter

    const arrAbiertas = arr.filter(({ estado }) => {
      return estado === "Abierta";
    });

    const arrCerradas = arr.filter(({ estado }) => {
      return estado === "Cerrada";
    });

    // Porcentaje de puntos tratados

    const arrPorcentajePuntos = (arrCerradas.length * 100) / arr.length;

    // Nivel Riesgo Inicial

    // No significativo
    const RI1 = arr.filter(({ riesgoInicial }) =>
      riesgoInicial.toLowerCase().includes("NS: NO SIGNIFICATIVO".toLowerCase())
    ).length;

    // Poco significativo
    const RI2 =
      arr.filter(({ riesgoInicial }) =>
        riesgoInicial
          .toLowerCase()
          .includes("PS: POCO SIGNIFICATIVO".toLowerCase())
      ).length * 2;

    // Moderado
    const RI3 =
      arr.filter(({ riesgoInicial }) =>
        riesgoInicial.toLowerCase().includes("MO: MODERADO".toLowerCase())
      ).length * 3;

    // Sigfificativo
    const RI4 =
      arr.filter(({ riesgoInicial }) =>
        riesgoInicial.toLowerCase().includes("SI: SIGNIFICATIVO".toLowerCase())
      ).length * 4;

    // Intolerable
    const RI5 =
      arr.filter(({ riesgoInicial }) =>
        riesgoInicial.toLowerCase().includes("IN: INTOLERABLE".toLowerCase())
      ).length * 5;

    const nivelRiesgoInicial = RI1 + RI2 + RI3 + RI4 + RI5;

    // Nivel Riesgo Final

    // No significativo
    const RI1A = arrCerradas.filter(
      ({ riesgoFinal }) =>
        riesgoFinal.toLowerCase() === "NS: NO SIGNIFICATIVO".toLowerCase()
    ).length;

    // Poco significativo
    const RI2A =
      arrCerradas.filter(
        ({ riesgoFinal }) =>
          riesgoFinal.toLowerCase() === "PS: POCO SIGNIFICATIVO".toLowerCase()
      ).length * 2;

    // Moderado
    const RI3A =
      arrCerradas.filter(
        ({ riesgoFinal }) =>
          riesgoFinal.toLowerCase() === "MO: MODERADO".toLowerCase()
      ).length * 3;

    // Sigfificativo
    const RI4A =
      arrCerradas.filter(
        ({ riesgoFinal }) =>
          riesgoFinal.toLowerCase() === "SI: SIGNIFICATIVO".toLowerCase()
      ).length * 4;

    // Intolerable
    const RI5A =
      arrCerradas.filter(
        ({ riesgoFinal }) =>
          riesgoFinal.toLowerCase() === "IN: INTOLERABLE".toLowerCase()
      ).length * 5;

    // No significativo
    const RI1B = arrAbiertas.filter(({ riesgoInicial }) =>
      riesgoInicial.toLowerCase().includes("NS: NO SIGNIFICATIVO".toLowerCase())
    ).length;

    // Poco significativo
    const RI2B =
      arrAbiertas.filter(({ riesgoInicial }) =>
        riesgoInicial
          .toLowerCase()
          .includes("PS: POCO SIGNIFICATIVO".toLowerCase())
      ).length * 2;

    // Moderado
    const RI3B =
      arrAbiertas.filter(({ riesgoInicial }) =>
        riesgoInicial.toLowerCase().includes("MO: MODERADO".toLowerCase())
      ).length * 3;

    // Sigfificativo
    const RI4B =
      arrAbiertas.filter(({ riesgoInicial }) =>
        riesgoInicial.toLowerCase().includes("SI: SIGNIFICATIVO".toLowerCase())
      ).length * 4;

    // Intolerable
    const RI5B =
      arrAbiertas.filter(({ riesgoInicial }) =>
        riesgoInicial.toLowerCase().includes("IN: INTOLERABLE".toLowerCase())
      ).length * 5;

    const nivelRiesgoFinal =
      RI1A + RI2A + RI3A + RI4A + RI5A + RI1B + RI2B + RI3B + RI4B + RI5B;

    const reduccionRiesgo =
      ((nivelRiesgoInicial - nivelRiesgoFinal) / nivelRiesgoInicial) * 100;

    return (
      <div>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Card>
              <CardBody>
                <h3>Tabla Mapas de riesgo</h3>
                <Table className="no-wrap v-middle" responsive>
                  <thead>
                    <tr className="border-0">
                      <th className="border-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tarjetas abiertas | | Tarjetas cerradas</td>
                      <td>
                        {arr.length} | | {arrCerradas.length}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Porcentaje de puntos tratados (% de tarjetas cerradas)
                      </td>
                      <td>{arrPorcentajePuntos.toFixed(2)} %</td>
                    </tr>
                    <tr>
                      <td>Nivel Riesgo Inicial</td>
                      <td>{nivelRiesgoInicial}</td>
                    </tr>
                    <tr>
                      <td>Nivel Riesgo Final</td>
                      <td>{nivelRiesgoFinal}</td>
                    </tr>
                    <tr>
                      <td>% de Reducción de Riesgo </td>
                      <td>{reduccionRiesgo.toFixed(2)} %</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col lg={7} md={12} sm={12}>
            <Card>
              <CardBody>
                <h3>Filtros</h3>
                <Row>
                  <Col>
                    <Input
                      type="select"
                      name="dateFrom"
                      id="dateFrom"
                      className="mt-2"
                      onChange={onChangeDatesFrom}
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
                      name="dateTo"
                      id="dateTo"
                      className="mt-2"
                      onChange={onChangeDatesTo}
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
                <Label for="equipo" className="mt-3">
                  Equipo - {this.state.equipo.length} seleccionados
                </Label>
                <Input
                  type="select"
                  name="selectMulti"
                  id="equipo"
                  onChange={(event) => {
                    this.onChangeMulti(event);
                  }}
                  value={this.state.equipo}
                  multiple
                >
                  <option></option>
                  {unicosEquipos.map((item, index) => {
                    return <option key={index}>{item}</option>;
                  })}
                </Input>
                <Label for="equipo" className="mt-3">
                  Familia - {this.state.familia.length} seleccionados
                </Label>
                <Input
                  type="select"
                  name="selectMulti"
                  id="familia"
                  onChange={(event) => {
                    this.onChangeMulti(event);
                  }}
                  value={this.state.familia}
                  multiple
                >
                  <option></option>
                  {unicosFamilias.map((item, index) => {
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

export default GraficoRiesgo;
