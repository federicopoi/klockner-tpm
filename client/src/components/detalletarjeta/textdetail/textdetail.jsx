import React, { Component } from "react";
import CerrarTarjetaModal from "../cerrartarjeta/CerrarTarjetaModal";
import CerrarKaizenModal from "../cerrartarjeta/CerrarKaizenModal";
import CerrarTarjetaAmarillaModal from "../cerrartarjeta/CerrarTarjetaAmarillaModal";
import QRModal from "./QRModal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { borrarTarjeta } from "../../../store/actions/tarjetaActions";
import { borrarKaizen } from "../../../store/actions/kaizenActions";
import PlanificacionModal from "../planificaciondetalle/PlanificacionModal";
import UploadImageModal from "../imagendetalle/UploadImageModal";
import UploadImageFrontModal from "../imagendetallekaizen/UploadImageFrontModal";
import UploadImageBackModal from "../imagendetallekaizen/UploadImageBackModal";
import { Button, Row, Col } from "reactstrap";
import EditarTarjetaModal from "../editartarjeta/EditarTarjetaModal";
import EditarTarjetaModalAmarilla from "../editartarjeta/EditarTarjetaModalAmarilla";
import EditarKaizenModal from "../editartarjeta/EditarKaizenModal";
export class TextDetail extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }
  onDeleteClick = (id) => {
    this.props.borrarTarjeta(id);
    this.props.history.push("/tarjetas");
  };

  onDeleteClickKaizen = (id) => {
    this.props.borrarKaizen(id);
    this.props.history.push("/kaizen");
  };

  state = {
    collapse: false,
    qrmodal: false,
  };
  toogle = () => {
    this.setState({ collapse: !this.state.collapse });
  };
  setqrmodal = () => {
    this.setState({ qrmodal: !this.state.qrmodal });
  };

  render() {
    const { tarjetas, link_id, tarjetaskaizen } = this.props;
    const completeLink = window.location.href.replace(
      `/tarjeta/${link_id}`,
      ""
    );

    const plan =
      tarjetas &&
      tarjetas
        .filter(({ _id }) => _id === link_id)
        .map(({ planificacion }) => planificacion);

    const imagen =
      tarjetas &&
      tarjetas
        .filter(({ _id }) => _id === link_id)
        .map(({ imagenUrl }) => imagenUrl);

    const imagenkaizenfront =
      tarjetaskaizen &&
      tarjetaskaizen
        .filter(({ _id }) => _id === link_id)
        .map(({ imagenFrontUrl }) => imagenFrontUrl);

    const imagenkaizenback =
      tarjetaskaizen &&
      tarjetaskaizen
        .filter(({ _id }) => _id === link_id)
        .map(({ imagenBackUrl }) => imagenBackUrl);

    return (
      <div>
        {tarjetas &&
          tarjetas
            .filter(({ _id }) => _id === link_id)
            .map(
              ({
                detecto,
                numero,
                descripcion,
                prioridad,
                familia,
                parteMaquina,
                fecha,
                maquina,
                equipo,
                sugerencia,
                tipodeRiesgo,
                riesgoInicial,
                sustoExperimentado,
                sustoObservado,
                impactoAmbiente,
                color,
                estado,
                _id,
                inicioReparacion,
                finReparacion,
                responsable,
                tiempoEmpleado,
                causa,
                tareaRealizada,
                accionesComplementarias,
                riesgoFinal,
                tipoAccion,
                materialUtilizado,
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
                planificacion,
                reparacion,
              }) => {
                return (
                  <div className="mb-3 break-text">
                    <Row>
                      <Col>
                        <div className="d-flex align-items-center">
                          <div>
                            <h2 className="mb-3">
                              Tarjeta {color} N° {numero}
                            </h2>
                          </div>

                          <div className="ml-auto d-flex no-block align-items-center">
                            <div className="dl">
                              <Row>
                                <div class="dropdown">
                                  <Button>Opciones</Button>
                                  <div class="dropdown-content">
                                    {estado === "Abierta" &&
                                      color !== "Amarilla" && (
                                        <Col>
                                          <CerrarTarjetaModal
                                            _id={link_id}
                                            color={color}
                                            fecha={fecha}
                                          ></CerrarTarjetaModal>
                                        </Col>
                                      )}
                                    {estado === "Abierta" &&
                                      color === "Amarilla" && (
                                        <Col>
                                          <CerrarTarjetaAmarillaModal
                                            _id={link_id}
                                            color={color}
                                            fecha={fecha}
                                          ></CerrarTarjetaAmarillaModal>
                                        </Col>
                                      )}
                                    <Col>
                                      <QRModal
                                        path={this.props.location.pathname}
                                        color={color}
                                        numero={numero}
                                        completePath={completeLink}
                                      >
                                        Mostrar QR
                                      </QRModal>
                                    </Col>
                                    {imagen[0] === undefined && (
                                      <Col>
                                        <UploadImageModal
                                          p={true}
                                          button={false}
                                          _id={link_id}
                                        ></UploadImageModal>
                                      </Col>
                                    )}

                                    {localStorage.token &&
                                      this.props.user &&
                                      this.props.user.role === "Jefe de area" &&
                                      color !== "Amarilla" && (
                                        <Col>
                                          <EditarTarjetaModal
                                            tarjeta={{
                                              numero,
                                              descripcion,
                                              prioridad,
                                              familia,
                                              fecha,
                                              maquina,
                                              estado,
                                              equipo,
                                              sugerencia,
                                              detecto,
                                              tipodeRiesgo,
                                              riesgoInicial,
                                              color,
                                              inicioReparacion,
                                              finReparacion,
                                              responsable,
                                              parteMaquina,
                                              riesgoFinal,
                                              tiempoEmpleado,
                                              causa,
                                              tareaRealizada,
                                              tipoAccion,
                                              materialUtilizado,
                                              reparacion,
                                              _id,
                                            }}
                                          ></EditarTarjetaModal>
                                        </Col>
                                      )}
                                    {localStorage.token &&
                                      this.props.user &&
                                      this.props.user.role === "Jefe de area" &&
                                      color === "Amarilla" && (
                                        <Col>
                                          <EditarTarjetaModalAmarilla
                                            tarjeta={{
                                              _id,
                                              descripcion,
                                              detecto,
                                              prioridad,
                                              maquina,
                                              familia,
                                              equipo,
                                              sustoExperimentado,
                                              sustoObservado,
                                              impactoAmbiente,
                                              sugerencia,
                                              tipodeRiesgo,
                                              riesgoInicial,
                                              responsable,
                                              estado,
                                              parteMaquina,
                                              tareaRealizada,
                                              riesgoFinal,
                                              tipoAccion,
                                              accionesComplementarias,
                                              reparacion,
                                            }}
                                          ></EditarTarjetaModalAmarilla>
                                        </Col>
                                      )}
                                    {localStorage.token &&
                                      this.props.user &&
                                      this.props.user.role === "Admin" &&
                                      color !== "Amarilla" && (
                                        <Col>
                                          <EditarTarjetaModal
                                            tarjeta={{
                                              numero,
                                              descripcion,
                                              prioridad,
                                              familia,
                                              fecha,
                                              maquina,
                                              estado,
                                              equipo,
                                              sugerencia,
                                              detecto,
                                              tipodeRiesgo,
                                              riesgoInicial,
                                              color,
                                              parteMaquina,
                                              inicioReparacion,
                                              finReparacion,
                                              responsable,
                                              riesgoFinal,
                                              tiempoEmpleado,
                                              causa,
                                              tareaRealizada,
                                              tipoAccion,
                                              materialUtilizado,
                                              reparacion,
                                              _id,
                                            }}
                                          ></EditarTarjetaModal>
                                        </Col>
                                      )}
                                    {localStorage.token &&
                                      this.props.user &&
                                      this.props.user.role === "Admin" &&
                                      color === "Amarilla" && (
                                        <Col>
                                          <EditarTarjetaModalAmarilla
                                            tarjeta={{
                                              _id,
                                              descripcion,
                                              detecto,
                                              prioridad,
                                              maquina,
                                              familia,
                                              equipo,
                                              sustoExperimentado,
                                              sustoObservado,
                                              impactoAmbiente,
                                              sugerencia,
                                              tipodeRiesgo,
                                              parteMaquina,
                                              riesgoInicial,
                                              responsable,
                                              estado,
                                              tareaRealizada,
                                              riesgoFinal,
                                              tipoAccion,
                                              accionesComplementarias,
                                              reparacion,
                                            }}
                                          ></EditarTarjetaModalAmarilla>
                                        </Col>
                                      )}
                                    {plan[0] === false && (
                                      <PlanificacionModal
                                        _id={link_id}
                                        p={true}
                                        button={false}
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
                                    )}

                                    {localStorage.token &&
                                      this.props.user &&
                                      this.props.user.role === "Admin" && (
                                        <Col>
                                          <p
                                            text-color="danger"
                                            onClick={this.onDeleteClick.bind(
                                              this,
                                              _id
                                            )}
                                            style={{ cursor: "pointer" }}
                                            className="my-3"
                                          >
                                            Borrar Tarjeta
                                          </p>
                                        </Col>
                                      )}
                                  </div>
                                </div>
                              </Row>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                );
              }
            )}
        {tarjetaskaizen &&
          tarjetaskaizen
            .filter(({ _id }) => _id === link_id)
            .map(
              ({
                detecto,
                numero,
                descripcion,
                prioridad,
                familia,
                parteMaquina,
                fecha,
                maquina,
                equipo,
                sugerencia,
                tipodeRiesgo,
                riesgoInicial,
                sustoExperimentado,
                sustoObservado,
                impactoAmbiente,
                color,
                estado,
                _id,
                inicioReparacion,
                finReparacion,
                responsable,
                tiempoEmpleado,
                causa,
                tareaRealizada,
                accionesComplementarias,
                riesgoFinal,
                tipoAccion,
                materialUtilizado,
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
                planificacion,
                linea,
                codigo,
                tema,
                perdidaAtacada,
                pilar,
                lider,
                descripcionProblema,
                objetivo,
                causas,
                acciones,
                tarjetasHacer,
                objectivoCompletado,
                documentos,
                otraMaquina,
                implementacion,
                fechaFinalizacionMejora,
                costo,
                beneficio,
                verificacion,
              }) => {
                return (
                  <div className="mb-3 break-text">
                    <Row>
                      <Col>
                        <div className="d-flex align-items-center">
                          <div>
                            {this.props.implementacion ? (
                              <h2 className="mb-3">
                                Quick Kaizen N° {numero} - En implementacion
                              </h2>
                            ) : (
                              <h2 className="mb-3">Quick Kaizen N° {numero}</h2>
                            )}
                          </div>

                          <div className="ml-auto d-flex no-block align-items-center">
                            <div className="dl">
                              <Row>
                                <div class="dropdown">
                                  <Button>Opciones</Button>
                                  <div class="dropdown-content">
                                    {estado === "Abierta" &&
                                      implementacion === undefined && (
                                        <Col>
                                          <CerrarKaizenModal
                                            _id={link_id}
                                            color={color}
                                            fecha={fecha}
                                            tarjeta={{
                                              descripcionProblema,
                                              objetivo,
                                              causas,
                                              acciones,
                                              tarjetasHacer,
                                              implementacion,
                                              objectivoCompletado,
                                              documentos,
                                              otraMaquina,
                                              responsableSeguimiento,
                                              fechaFinalizacionMejora,
                                              costo,
                                              beneficio,
                                              verificacion,
                                            }}
                                          ></CerrarKaizenModal>
                                        </Col>
                                      )}
                                    {estado === "Abierta" &&
                                      implementacion === true && (
                                        <Col>
                                          <CerrarKaizenModal
                                            _id={link_id}
                                            color={color}
                                            fecha={fecha}
                                            tarjeta={{
                                              descripcionProblema,
                                              objetivo,
                                              causas,
                                              acciones,
                                              tarjetasHacer,
                                              implementacion,
                                              objectivoCompletado,
                                              documentos,
                                              otraMaquina,
                                              responsableSeguimiento,
                                              fechaFinalizacionMejora,
                                              costo,
                                              beneficio,
                                              verificacion,
                                            }}
                                          ></CerrarKaizenModal>
                                        </Col>
                                      )}

                                    {localStorage.token &&
                                      this.props.user &&
                                      this.props.user.role ===
                                        "Jefe de area" && (
                                        <Col>
                                          <EditarKaizenModal
                                            tarjeta={{
                                              numero,
                                              estado,
                                              linea,
                                              maquina,
                                              codigo,
                                              tema,
                                              perdidaAtacada,
                                              pilar,
                                              lider,
                                              _id,
                                              descripcionProblema,
                                              objetivo,
                                              causas,
                                              acciones,
                                              tarjetasHacer,
                                              objectivoCompletado,
                                              documentos,
                                              otraMaquina,
                                              responsableSeguimiento,
                                              fechaFinalizacionMejora,
                                              costo,
                                              beneficio,
                                              verificacion,
                                            }}
                                          ></EditarKaizenModal>
                                        </Col>
                                      )}
                                    {localStorage.token &&
                                      this.props.user &&
                                      this.props.user.role === "Admin" && (
                                        <Col>
                                          <EditarKaizenModal
                                            tarjeta={{
                                              numero,
                                              estado,
                                              linea,
                                              maquina,
                                              codigo,
                                              tema,
                                              perdidaAtacada,
                                              pilar,
                                              lider,
                                              _id,
                                              descripcionProblema,
                                              objetivo,
                                              causas,
                                              acciones,
                                              tarjetasHacer,
                                              objectivoCompletado,
                                              documentos,
                                              otraMaquina,
                                              responsableSeguimiento,
                                              fechaFinalizacionMejora,
                                              costo,
                                              beneficio,
                                              verificacion,
                                            }}
                                          ></EditarKaizenModal>
                                        </Col>
                                      )}

                                    <Col>
                                      <QRModal
                                        path={this.props.location.pathname}
                                        color={color}
                                        numero={numero}
                                        completePath={completeLink}
                                      >
                                        Mostrar QR
                                      </QRModal>
                                    </Col>

                                    {imagenkaizenfront[0] === undefined && (
                                      <Col>
                                        <UploadImageFrontModal
                                          p={true}
                                          button={false}
                                          _id={link_id}
                                        ></UploadImageFrontModal>
                                      </Col>
                                    )}

                                    {imagenkaizenback[0] === undefined && (
                                      <Col>
                                        <UploadImageBackModal
                                          p={true}
                                          button={false}
                                          _id={link_id}
                                        ></UploadImageBackModal>
                                      </Col>
                                    )}

                                    {localStorage.token &&
                                      this.props.user &&
                                      this.props.user.role === "Admin" && (
                                        <Col>
                                          <p
                                            text-color="danger"
                                            onClick={this.onDeleteClickKaizen.bind(
                                              this,
                                              _id
                                            )}
                                            style={{ cursor: "pointer" }}
                                            className="my-3"
                                          >
                                            Borrar Tarjeta
                                          </p>
                                        </Col>
                                      )}
                                  </div>
                                </div>
                              </Row>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                );
              }
            )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps, { borrarKaizen, borrarTarjeta })(
  withRouter(TextDetail)
);
