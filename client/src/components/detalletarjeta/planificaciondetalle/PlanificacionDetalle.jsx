import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import {
  agregarPlanificacion,
  getTarjetas,
} from "../../../store/actions/tarjetaActions";
import PlanificacionModal from "./PlanificacionModal";
import moment from "moment";

export class PlanificacionDetalle extends Component {
  componentDidMount() {
    this.props.getTarjetas();
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { descripcion, autor } = this.state;
    const link = this.props.location.pathname;
    const completeLink = link.replace("/tarjeta/", "");

    const nuevoComentario = {
      _id: completeLink,
      comentario: {
        autor,
        descripcion,
        fecha: Date.now(),
      },
    };

    if (descripcion === "" || autor === "") {
      console.log("Error");
    } else {
      this.props.agregarComentario(nuevoComentario);
      document.getElementById("form").reset();
    }
  };
  render() {
    const { tarjetas } = this.props.tarjetas;
    const { link_id } = this.props;
    const link = this.props.location.pathname;
    const completeLink = link.replace("/tarjeta/", "");

    const plan =
      tarjetas &&
      tarjetas
        .filter(({ _id }) => _id === link_id)
        .map(({ planificacion }) => planificacion);

    return (
      <div>
        <Card>
          <CardBody>
            <Row className="mb-3">
              <Col>
                <div className="d-flex align-items-center">
                  <div>
                    <h3>Planificación del Tratamiento de Tarjetas</h3>
                  </div>

                  <div className="ml-auto d-flex no-block align-items-center">
                    <div className="dl">
                      {tarjetas &&
                        tarjetas

                          .filter(({ _id }) => _id === completeLink)
                          .map(
                            ({
                              previstaCierre,
                              responsableSeguimiento,
                              recursos,
                              materiales,
                              solicitudCompras,
                              comprometidaCompras,
                              tareaRealizar,
                              responsableTarea,
                              comentario1,
                              comentario2,
                              comentario3,
                            }) => {
                              return (
                                <PlanificacionModal
                                  _id={link_id}
                                  p={false}
                                  button={true}
                                  tarjeta={{
                                    previstaCierre,
                                    responsableSeguimiento,
                                    recursos,
                                    materiales,
                                    solicitudCompras,
                                    comprometidaCompras,
                                    tareaRealizar,
                                    responsableTarea,
                                    comentario1,
                                    comentario2,
                                    comentario3,
                                  }}
                                ></PlanificacionModal>
                              );
                            }
                          )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            {tarjetas &&
              tarjetas
                .filter(({ _id }) => _id === completeLink)
                .map(
                  ({
                    previstaCierre,
                    responsableSeguimiento,
                    recursos,
                    materiales,
                    solicitudCompras,
                    comprometidaCompras,
                    tareaRealizar,
                    responsableTarea,
                    comentario1,
                    comentario2,
                    comentario3,
                  }) => {
                    return (
                      <div>
                        <Row className="my-2">
                          <Col sm={3}>
                            <h5 className="font-16 font-medium">
                              Fecha prevista de cierre
                            </h5>
                            {previstaCierre !== undefined && (
                              <p>
                                {moment(previstaCierre).format("DD/MM/YYYY")}
                              </p>
                            )}
                          </Col>
                          <Col sm={3}>
                            <h5 className="font-16 font-medium">
                              Responsable del seguimiento
                            </h5>
                            <p>{responsableSeguimiento}</p>
                          </Col>
                          <Col sm={3}>
                            <h5 className="font-16 font-medium">
                              Recursos a utilizar
                            </h5>
                            <p>{recursos}</p>
                          </Col>
                          <Col sm={3}>
                            <h5 className="font-16 font-medium">
                              Materiales/Repuestos necesarios
                            </h5>
                            <p>{materiales}</p>
                          </Col>
                        </Row>
                        <Row className="my-2">
                          <Col sm={3}>
                            <h5 className="font-16 font-medium">
                              Fecha solicitud a Compras
                            </h5>
                            <p>
                              {solicitudCompras !== undefined && (
                                <p>
                                  {moment(solicitudCompras).format(
                                    "DD/MM/YYYY"
                                  )}
                                </p>
                              )}
                            </p>
                          </Col>
                          <Col sm={3}>
                            <h5 className="font-16 font-medium">
                              Fecha compromotida por Compras
                            </h5>
                            <p>
                              {comprometidaCompras !== undefined && (
                                <p>
                                  {moment(comprometidaCompras).format(
                                    "DD/MM/YYYY"
                                  )}
                                </p>
                              )}
                            </p>
                          </Col>
                          <Col sm={3}>
                            <h5 className="font-16 font-medium">
                              Tarea a realizar
                            </h5>
                            <p>{tareaRealizar}</p>
                          </Col>
                          <Col sm={3}>
                            <h5 className="font-16 font-medium">
                              Responsable de la tarea a realizar
                            </h5>
                            <p>{responsableTarea}</p>
                          </Col>
                        </Row>
                        <hr className="mt-3"></hr>
                        <Row className="my-2">
                          <Col>
                            <h5 className="font-16 font-medium">
                              Comentario 1
                            </h5>
                            <p>{comentario1}</p>
                          </Col>
                          <Col>
                            <h5 className="font-16 font-medium">
                              Comentario 2
                            </h5>
                            <p>{comentario2}</p>
                          </Col>
                          <Col>
                            <h5 className="font-16 font-medium">
                              Comentario 3
                            </h5>
                            <p>{comentario3}</p>
                          </Col>
                        </Row>
                      </div>
                    );
                  }
                )}

            {/* <hr className="mt-3"></hr>
            <Form onSubmit={this.onSubmit} id="form">
              <Row className="mb-1">
                <Col lg={8}>
                  <FormGroup>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="descripcion"
                      id="descripcion"
                      placeholder="Añadir nuevo comentario"
                    />
                  </FormGroup>
                </Col>
                <Col lg={2}>
                  <FormGroup>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="autor"
                      id="autor"
                      placeholder="Autor"
                    />
                  </FormGroup>
                </Col>
                <Col lg={2}>
                  <Button className="bg-success border-success">Subir</Button>
                </Col>
              </Row>
            </Form> */}
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tarjetas: state.tarjetas,
  };
};
export default connect(mapStateToProps, { agregarPlanificacion, getTarjetas })(
  withRouter(PlanificacionDetalle)
);
