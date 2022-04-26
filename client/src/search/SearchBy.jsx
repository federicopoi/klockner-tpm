import React, { Component } from "react";
import {
  Container,
  Input,
  Label,
  Button,
  Row,
  Col,
  Table,
  Card,
  CardBody,
} from "reactstrap";
import { getTarjetas } from "../store/actions/tarjetaActions";
import { connect } from "react-redux";
import moment from "moment";
import { Link, Redirect } from "react-router-dom";
class SearchBy extends Component {
  componentDidMount() {
    this.props.getTarjetas();
  }
  state = {
    color: "",
    numero: "",
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    if (!localStorage.token) return <Redirect to="/login" />;

    const { tarjetas } = this.props.tarjetas;

    const tarjetaFinal = tarjetas
      .filter(({ color, numero }) => {
        return color === this.state.color && numero === this.state.numero;
      })
      .map((item) => {
        return item;
      });

    const test = tarjetas
      .filter(({ color, numero }) => {
        return numero === "1" && color === "Roja";
      })
      .map((item) => {
        return item._id;
      });

    return (
      <div>
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <Container>
              <Row>
                <Col>
                  <div className="d-sm-flex align-items-center">
                    <div className="">
                      <div>
                        <h2 className="mb-3">Buscar por color y numero</h2>
                      </div>
                    </div>

                    <div className="ml-auto d-sm-flex no-block align-items-center mb-3">
                      <Col>
                        <Link to="/tarjetasfiltro">
                          <Button color="secondary" className="btn">
                            Exportar Tarjetas
                          </Button>
                        </Link>
                      </Col>
                    </div>
                  </div>
                </Col>
              </Row>

              <Label for="color">Color *</Label>
              <Input
                type="select"
                name="color"
                id="color"
                className="mb-3"
                onChange={this.onChange}
              >
                <option>Seleccionar</option>
                <option>Roja</option>
                <option>Azul</option>
                <option>Verde</option>
                <option>Amarilla</option>
              </Input>
              <Label for="color">Numero *</Label>
              <Input
                type="number"
                name="numero"
                id="numero"
                onChange={this.onChange}
              ></Input>
              {/* <Link to={{ pathname: `/tarjeta/${tarjetaFinal[0]}` }}>
                <Button color="secondary" className="btn mt-3">
                  Buscar
                </Button>
              </Link> */}
              {this.state.color && this.state.numero && (
                <Card className="mt-3">
                  <CardBody>
                    <Table className="no-wrap v-middle" responsive>
                      <div>
                        <thead>
                          <tr className="border-0">
                            <th className="border-0">N°</th>
                            <th className="border-0">Color</th>
                            <th className="border-0">Equipo autonomo</th>
                            <th className="border-0">Prioridad</th>

                            <th className="border-0">Fecha apertura</th>
                            <th className="border-0">Descripcion anomalia</th>
                            <th className="border-0">Estado actual</th>
                          </tr>
                        </thead>
                        {tarjetaFinal &&
                          tarjetaFinal.map(
                            ({
                              numero,
                              color,
                              prioridad,
                              equipo,
                              fecha,
                              descripcion,
                              estado,
                              _id,
                            }) => {
                              const timeDiferrence = moment().diff(
                                fecha,
                                "days"
                              );
                              return (
                                <tbody key={_id}>
                                  <tr>
                                    <td>
                                      <div className="d-flex no-block align-items-center">
                                        <div className="">
                                          <Link
                                            to={{ pathname: `/tarjeta/${_id}` }}
                                          >
                                            <h5 className="mb-0 font-16 font-medium">
                                              {numero}
                                            </h5>
                                          </Link>
                                        </div>
                                      </div>
                                    </td>
                                    {color === "Azul" ? (
                                      <td>
                                        <li className="border-0 p-0 text-info list-inline-item">
                                          <i className="fa fa-circle"></i>{" "}
                                          {color}
                                        </li>
                                      </td>
                                    ) : null}
                                    {color === "Roja" ? (
                                      <td>
                                        <li className="border-0 p-0 text-danger list-inline-item">
                                          <i className="fa fa-circle"></i>{" "}
                                          {color}
                                        </li>
                                      </td>
                                    ) : null}
                                    {color === "Verde" ? (
                                      <td>
                                        <li className="border-0 p-0 text-success list-inline-item">
                                          <i className="fa fa-circle"></i>{" "}
                                          {color}
                                        </li>
                                      </td>
                                    ) : null}
                                    {color === "Amarilla" ? (
                                      <td>
                                        <li className="border-0 p-0 text-warning list-inline-item">
                                          <i className="fa fa-circle"></i>{" "}
                                          {color}
                                        </li>
                                      </td>
                                    ) : null}
                                    <td>{equipo}</td>
                                    <td>
                                      {prioridad}

                                      {prioridad === "Alta" &&
                                        estado === "Abierta" &&
                                        timeDiferrence >= 15 && (
                                          <li className="border-0 p-0 text-danger list-inline-item">
                                            ⚠️
                                          </li>
                                        )}
                                      {prioridad === "Media" &&
                                        estado === "Abierta" &&
                                        timeDiferrence >= 30 && (
                                          <li className="border-0 p-0 text-danger list-inline-item">
                                            ⚠️
                                          </li>
                                        )}
                                      {prioridad === "Baja" &&
                                        estado === "Abierta" &&
                                        timeDiferrence >= 60 && (
                                          <li className="border-0 p-0 text-danger list-inline-item">
                                            ⚠️
                                          </li>
                                        )}
                                    </td>

                                    <td>
                                      {moment(fecha).format("DD/MM/YYYY LTS")}
                                    </td>
                                    <td>{descripcion}</td>

                                    <td>{estado}</td>
                                    <td>
                                      <Link
                                        to={{ pathname: `/tarjeta/${_id}` }}
                                      >
                                        <Button
                                          color="success"
                                          className="btn bg-secondary border border-secondary"
                                        >
                                          Ver detalle
                                        </Button>
                                      </Link>
                                    </td>
                                  </tr>
                                </tbody>
                              );
                            }
                          )}
                      </div>
                    </Table>
                  </CardBody>
                </Card>
              )}
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tarjetas: state.tarjetas,
    user: state.auth.user,
    isLoading: state.auth.isLoading,
  };
};
export default connect(mapStateToProps, { getTarjetas })(SearchBy);
