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
    const unicosFamilias = Array.from(new Set(arrFamilias));

    // Formulas para "Mapas de Riesgo"

    // Cantidad de tarjetas abiertas de newFilter

    const arrAbiertas = newFilter.filter(({ estado }) => {
      return estado === "Abierta";
    });

    const arrCerradas = newFilter.filter(({ estado }) => {
      return estado === "Cerrada";
    });

    // Porcentaje de puntos tratados

    const arrPorcentajePuntos = (arrCerradas.length * 100) / newFilter.length;

    // Nivel Riesgo Inicial

    // No significativo
    const RI1 = newFilter.filter(({ riesgoInicial }) =>
      riesgoInicial.toLowerCase().includes("NS: NO SIGNIFICATIVO".toLowerCase())
    ).length;

    // Poco significativo
    const RI2 =
      newFilter.filter(({ riesgoInicial }) =>
        riesgoInicial
          .toLowerCase()
          .includes("PS: POCO SIGNIFICATIVO".toLowerCase())
      ).length * 2;

    // Moderado
    const RI3 =
      newFilter.filter(({ riesgoInicial }) =>
        riesgoInicial.toLowerCase().includes("MO: MODERADO".toLowerCase())
      ).length * 3;

    // Sigfificativo
    const RI4 =
      newFilter.filter(({ riesgoInicial }) =>
        riesgoInicial.toLowerCase().includes("SI: SIGNIFICATIVO".toLowerCase())
      ).length * 4;

    // Intolerable
    const RI5 =
      newFilter.filter(({ riesgoInicial }) =>
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

    console.log("+");
    console.log(RI1B);
    console.log(RI2B);
    console.log(RI3B);
    console.log(RI4B);
    console.log(RI5B);

    const reduccionRiesgo =
      ((nivelRiesgoInicial - nivelRiesgoFinal) / nivelRiesgoInicial) * 100;

    return (
      <div>
        <Row>
          <Col lg={8} md={12} sm={12}>
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
                        {newFilter.length} | | {arrCerradas.length}
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
          <Col lg={4} md={12} sm={12}>
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
                <Label for="equipo" className="mt-3">
                  Familia
                </Label>
                <Input
                  type="select"
                  name="familia"
                  id="familia"
                  onChange={this.onChange}
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
