import React, { Component } from "react";
import { connect } from "react-redux";
import { getTarjetas } from "../../store/actions/tarjetaActions";
import { agregarFilter, getFilters } from "../../store/actions/filterActions";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import QRCode from "qrcode.react";
import moment from "moment";
import {
  Card,
  CardBody,
  Row,
  Col,
  Table,
  Container,
  Input,
  Label,
  Button,
  Form,
} from "reactstrap";
import Select from "react-select";
import PresetModal from "./PresetModal";

const options = [
  { value: "numero", label: "N°" },
  { value: "color", label: "Color" },
  { value: "prioridad", label: "Prioridad" },
  { value: "equipo", label: "Equipo Autonomo" },
  { value: "fecha", label: "Fecha apertura" },
  { value: "descripcion", label: "Descripcion anomalia" },
  { value: "estado", label: "Estado actual" },
  { value: "maquina", label: "Maquina / Instalacion" },
  { value: "detecto", label: "Detecto" },
  { value: "familia", label: "Familia de anomalia" },
  { value: "tipodeRiesgo", label: "Tipo de Riesgo" },
  { value: "riesgoInicial", label: "Riesgo Inicial" },
  { value: "riesgoFinal", label: "Riesgo Final" },
  { value: "tipoAccion", label: "Tipo de Accion" },
  { value: "responsable", label: "Responsable" },
  { value: "tiempoEmpleado", label: "Tiempo Empleado" },
  { value: "causa", label: "Causa de anomalia" },
  { value: "tareaRealizada", label: "Tarea Realizada" },
  { value: "materialUtilizado", label: "Material Utilizado" },
  { value: "finReparacion", label: "Fin de Reparación" },
];
class MisTarjetasFiltro extends Component {
  componentDidMount() {
    this.props.getTarjetas();
    this.props.getFilters();
  }
  state = {
    selectedOption: null,
    tareaRealizada: "",
    materialUtilizado: "",
    causa: "",
    tiempoEmpleado: "",
    responsable: "",
    numero: "",
    color: "",
    equipo: "",
    prioridad: "",
    fecha: "",
    descripcion: "",
    estado: "",
    maquina: "",
    detecto: "",
    familia: "",
    tipodeRiesgo: "",
    riesgoInicial: "",
    riesgoFinal: "",
    tipoAccion: "",
    finReparacion: "",
    qrcode: false,
    alerta: false,
    planificacion: false,
    convertida: false,
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { tarjetas } = this.props.tarjetas;
    const { filters } = this.props.filters;
    const { selectedOption } = this.state;
    var filter = {
      numero: this.state.numero && this.state.numero,
      color: this.state.color && this.state.color,
      equipo: this.state.equipo && this.state.equipo,
      prioridad: this.state.prioridad && this.state.prioridad,
      fecha: this.state.fecha && this.state.fecha,
      descripcion: this.state.descripcion && this.state.descripcion,
      estado: this.state.estado && this.state.estado,
      maquina: this.state.maquina && this.state.maquina,
      detecto: this.state.detecto && this.state.detecto,
      familia: this.state.familia && this.state.familia,
      tipodeRiesgo: this.state.tipodeRiesgo && this.state.tipodeRiesgo,
      riesgoInicial: this.state.riesgoInicial && this.state.riesgoInicial,
      riesgoFinal: this.state.riesgoFinal && this.state.riesgoFinal,
      tipoAccion: this.state.tipoAccion && this.state.tipoAccion,
      responsable: this.state.responsable && this.state.responsable,
      tiempoEmpleado: this.state.tiempoEmpleado && this.state.tiempoEmpleado,
      causa: this.state.causa && this.state.causa,
      tareaRealizada: this.state.tareaRealizada && this.state.tareaRealizada,
      finReparacion: this.state.finReparacion && this.state.finReparacion,
      materialUtilizado:
        this.state.materialUtilizado && this.state.materialUtilizado,
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

    const arrNumero = tarjetas.map(({ numero }) => numero);
    const unicosNumero = Array.from(new Set(arrNumero));

    const arrColores = tarjetas.map(({ color }) => color);
    const unicosColores = Array.from(new Set(arrColores));

    const arrEquipos = tarjetas.map(({ equipo }) => equipo);
    const unicosEquipos = Array.from(new Set(arrEquipos));

    const arrPrioridad = tarjetas.map(({ prioridad }) => prioridad);
    const unicosPrioridad = Array.from(new Set(arrPrioridad));

    const arrFecha = tarjetas.map(({ fecha }) => fecha);
    const unicosFecha = Array.from(new Set(arrFecha));

    const arrDescripcion = tarjetas.map(({ descripcion }) => descripcion);
    const unicosDescripcion = Array.from(new Set(arrDescripcion));

    const arrEstado = tarjetas.map(({ estado }) => estado);
    const unicosEstado = Array.from(new Set(arrEstado));

    const arrMaquina = tarjetas.map(({ maquina }) => maquina);
    const unicosMaquina = Array.from(new Set(arrMaquina));

    const arrDetecto = tarjetas.map(({ detecto }) => detecto);
    const unicosDetecto = Array.from(new Set(arrDetecto));

    const arrFamilia = tarjetas.map(({ familia }) => familia);
    const unicosFamilia = Array.from(new Set(arrFamilia));

    const arrTipo = tarjetas.map(({ tipodeRiesgo }) => tipodeRiesgo);
    const unicosTipo = Array.from(new Set(arrTipo));

    const arrRiesgoInicial = tarjetas.map(({ riesgoInicial }) => riesgoInicial);
    const unicosRiesgoInicial = Array.from(new Set(arrRiesgoInicial));

    const arrRiesgoFinal = tarjetas.map(({ riesgoFinal }) => riesgoFinal);
    const unicosRiesgoFinal = Array.from(new Set(arrRiesgoFinal));

    const arrTipoAccion = tarjetas.map(({ tipoAccion }) => tipoAccion);
    const unicosTipoAccion = Array.from(new Set(arrTipoAccion));

    const arrResponsable = tarjetas.map(({ responsable }) => responsable);
    const unicosResponsable = Array.from(new Set(arrResponsable));

    const arrFinReparacion = tarjetas.map(({ finReparacion }) => finReparacion);
    const unicosFinReparacion = Array.from(new Set(arrFinReparacion));

    const arrTiempoEmpleado = tarjetas.map(
      ({ tiempoEmpleado }) => tiempoEmpleado
    );
    const unicosTiempoEmpleado = Array.from(new Set(arrTiempoEmpleado));

    const unicosConvertida = [true, false];

    const arrCausa = tarjetas.map(({ causa }) => causa);
    const unicosCausa = Array.from(new Set(arrCausa));

    const arrTareaRealizada = tarjetas.map(
      ({ tareaRealizada }) => tareaRealizada
    );
    const unicosTareaRealizada = Array.from(new Set(arrTareaRealizada));

    const arrMaterialUtilizado = tarjetas.map(
      ({ materialUtilizado }) => materialUtilizado
    );
    const unicosMaterialUtilizado = Array.from(new Set(arrMaterialUtilizado));

    const globalArray = {
      numero: unicosNumero,
      color: unicosColores,
      prioridad: unicosPrioridad,
      equipo: unicosEquipos,
      fecha: unicosFecha,
      estado: unicosEstado,
      descripcion: unicosDescripcion,
      maquina: unicosMaquina,
      detecto: unicosDetecto,
      familia: unicosFamilia,
      tipodeRiesgo: unicosTipo,
      riesgoInicial: unicosRiesgoInicial,
      riesgoFinal: unicosRiesgoFinal,
      tipoAccion: unicosTipoAccion,
      responsable: unicosResponsable,
      tiempoEmpleado: unicosTiempoEmpleado,
      causa: unicosCausa,
      tareaRealizada: unicosTareaRealizada,
      finReparacion: unicosFinReparacion,
      materialUtilizado: unicosMaterialUtilizado,
    };
    // if (!localStorage.token) return <Redirect to="/login" />;
    // if (this.props.user && this.props.user.role === "Operario") {
    //   return <Redirect to="/login" />;
    // }
    return (
      <div>
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <Container>
              <Row>
                <Col>
                  <div className="d-flex align-items-center">
                    <div className="">
                      <h2 className="mb-3">Tabla dinamica de tarjetas</h2>
                    </div>
                    <div className="ml-auto d-flex no-block align-items-center">
                      <div className="dl">
                        <ReactHTMLTableToExcel
                          className="btn btn-info"
                          table="emp"
                          filename="ReporteTarjetas"
                          sheet="Tarjetas"
                          buttonText="Exportar excel"
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="mb-3">
                <h5>Seleccionar elementos para la tabla</h5>
                <Select
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={options}
                  isMulti
                  placeholder="Seleccionar"
                />
              </div>

              <Row>
                <Col>
                  {filters &&
                    filters.map(
                      ({
                        nombre,
                        selectedOption,
                        numero,
                        color,
                        equipo,
                        prioridad,
                        fecha,
                        descripcion,
                        estado,
                        maquina,
                        detecto,
                        familia,
                        qrcode,
                        alerta,
                        convertida,
                      }) => {
                        return (
                          <Button
                            className="my-2 mx-2"
                            onClick={() => {
                              this.setState({
                                selectedOption,
                                numero,
                                color,
                                equipo,
                                prioridad,
                                fecha,
                                descripcion,
                                estado,
                                maquina,
                                detecto,
                                familia,
                                qrcode,
                                alerta,
                                convertida,
                              });
                            }}
                          >
                            {nombre}
                          </Button>
                        );
                      }
                    )}
                </Col>
              </Row>

              <div className="d-flex align-items-center">
                <div className="">
                  <div>
                    <h5>Filtrar elementos</h5>
                  </div>
                </div>
                <div className="ml-auto d-flex no-block align-items-center">
                  <Col>
                    <Label check>
                      <Input
                        type="checkbox"
                        id="alerta"
                        className="mr-4"
                        name="alerta"
                        onChange={(e) => {
                          this.onChange({
                            target: {
                              name: e.target.name,
                              value: e.target.checked,
                            },
                          });
                        }}
                      />
                      Alerta
                    </Label>

                    <Col>
                      <Row>
                        <Label check>
                          <Input
                            type="checkbox"
                            id="qrcode"
                            name="qrcode"
                            onChange={(e) => {
                              this.onChange({
                                target: {
                                  name: e.target.name,
                                  value: e.target.checked,
                                },
                              });
                            }}
                          />
                          Qr Code
                        </Label>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <Label check>
                          <Input
                            type="checkbox"
                            id="convertida"
                            className="mr-4"
                            name="convertida"
                            onChange={(e) => {
                              this.onChange({
                                target: {
                                  name: e.target.name,
                                  value: e.target.checked,
                                },
                              });
                            }}
                          />
                          Convertida
                        </Label>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <Label check>
                          <Input
                            type="checkbox"
                            id="planificacion"
                            name="planificacion"
                            onChange={(e) => {
                              this.onChange({
                                target: {
                                  name: e.target.name,
                                  value: e.target.checked,
                                },
                              });
                            }}
                          />
                          Planificación
                        </Label>
                      </Row>
                    </Col>
                  </Col>

                  <Button
                    className="ml-3"
                    onClick={() => {
                      this.setState({
                        numero: "",
                        color: "",
                        prioridad: "",
                        equipo: "",
                        fecha: "",
                        estado: "",
                        descripcion: "",
                        maquina: "",
                        detecto: "",
                        familia: "",
                        qrcode: false,
                        alerta: false,
                        conertida: false,
                        planificacion: false,
                        selectedOption: null,
                      });
                    }}
                  >
                    Reset
                  </Button>
                  <Form onSubmit={this.onSubmit}>
                    <PresetModal state={this.state}></PresetModal>
                  </Form>
                </div>
              </div>
              <Row className="mb-3">
                {selectedOption &&
                  selectedOption.map(({ label, value }) => {
                    return (
                      <div>
                        <Col>
                          <div>
                            <Label for="color">{label}</Label>
                            <Input
                              type="select"
                              name={value}
                              id={value}
                              onChange={this.onChange}
                            >
                              <option></option>
                              {globalArray[value].map((item) => (
                                <option>{item}</option>
                              ))}
                            </Input>
                          </div>
                        </Col>
                      </div>
                    );
                  })}
              </Row>

              <Card>
                <CardBody>
                  <Table className="no-wrap v-middle" responsive id="emp">
                    <thead>
                      <tr className="border-0">
                        {selectedOption &&
                          selectedOption.map(({ value, label }) => {
                            return <th className="border-0">{label}</th>;
                          })}
                        {this.state.qrcode && (
                          <th className="border-0">QR Code</th>
                        )}
                        {this.state.alerta && (
                          <th className="border-0">Alerta</th>
                        )}

                        {this.state.planificacion && (
                          <th className="border-0">Fecha prevista de cierre</th>
                        )}
                        {this.state.planificacion && (
                          <th className="border-0">
                            Responsable del seguimiento
                          </th>
                        )}
                        {this.state.planificacion && (
                          <th className="border-0">Recursos a utilizar</th>
                        )}
                        {this.state.planificacion && (
                          <th className="border-0">
                            Materiales/Repuestos necesarios
                          </th>
                        )}
                        {this.state.planificacion && (
                          <th className="border-0">
                            Fecha solicitud a Compras
                          </th>
                        )}
                        {this.state.planificacion && (
                          <th className="border-0">
                            Fecha compromotida por Compras
                          </th>
                        )}
                        {this.state.planificacion && (
                          <th className="border-0">Tarea a realizar</th>
                        )}
                        {this.state.planificacion && (
                          <th className="border-0">
                            Responsable de la tarea a realizar
                          </th>
                        )}
                        {this.state.planificacion && (
                          <th className="border-0">Comentario 1</th>
                        )}
                        {this.state.planificacion && (
                          <th className="border-0">Comentario 2</th>
                        )}
                        {this.state.planificacion && (
                          <th className="border-0">Comentario 3</th>
                        )}
                        {this.state.convertida && (
                          <th className="border-0">Convertida</th>
                        )}
                      </tr>
                    </thead>

                    {newFilter &&
                      newFilter.map((item, index) => {
                        const link = window.location.href.replace(
                          "/tarjetasfiltro",
                          "/tarjeta/"
                        );

                        const timeDiferrence = moment().diff(
                          item.fecha,
                          "days"
                        );

                        return (
                          <tbody key={index}>
                            <tr>
                              {this.state.alerta &&
                                item.prioridad === "Alta" &&
                                timeDiferrence <= 15 && (
                                  <td>Faltan {-timeDiferrence + 15} dias</td>
                                )}
                              {this.state.alerta &&
                                item.prioridad === "Alta" &&
                                timeDiferrence >= 15 && (
                                  <td>Excedido {timeDiferrence - 15} dias</td>
                                )}
                              {this.state.alerta &&
                                item.prioridad === "Media" &&
                                timeDiferrence <= 30 && (
                                  <td>Faltan {-timeDiferrence + 30} dias</td>
                                )}
                              {this.state.alerta &&
                                item.prioridad === "Media" &&
                                timeDiferrence >= 30 && (
                                  <td>Excedido {timeDiferrence - 30} dias</td>
                                )}
                              {this.state.alerta &&
                                item.prioridad === "Baja" &&
                                timeDiferrence <= 60 && (
                                  <td>Faltan {-timeDiferrence + 60} dias</td>
                                )}
                              {this.state.alerta &&
                                item.prioridad === "Baja" &&
                                timeDiferrence >= 60 && (
                                  <td>Excedido {-timeDiferrence - 60} dias</td>
                                )}

                              {selectedOption &&
                                selectedOption.map(
                                  ({ value, label }, index) => {
                                    return item[label] === "fecha" ? (
                                      <td key={index}>
                                        {moment(item[value]).fromNow()}
                                      </td>
                                    ) : (
                                      <td key={index}>{item[value]}</td>
                                    );
                                  }
                                )}
                              {this.state.qrcode && (
                                <td>
                                  <QRCode value={link + item._id} />
                                  <h4 className="mt-3">
                                    Tarjeta {item.color} N°{item.numero}
                                  </h4>
                                </td>
                              )}
                              {this.state.planificacion &&
                                item.previstaCierre !== undefined && (
                                  <td>
                                    {moment(item.previstaCierre).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </td>
                                )}
                              {this.state.planificacion && (
                                <td>{item.responsableSeguimiento}</td>
                              )}
                              {this.state.planificacion && (
                                <td>{item.recursos}</td>
                              )}
                              {this.state.planificacion && (
                                <td>{item.materiales}</td>
                              )}
                              {this.state.planificacion &&
                                item.solicitudCompras !== undefined && (
                                  <td>
                                    {moment(item.solicitudCompras).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </td>
                                )}
                              {this.state.planificacion &&
                                item.comprometidaCompras !== undefined && (
                                  <td>
                                    {moment(item.comprometidaCompras).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </td>
                                )}
                              {this.state.planificacion && (
                                <td>{item.tareaRealizar}</td>
                              )}
                              {this.state.planificacion && (
                                <td>{item.responsableTarea}</td>
                              )}
                              {this.state.planificacion && (
                                <td>{item.comentario1}</td>
                              )}
                              {this.state.planificacion && (
                                <td>{item.comentario2}</td>
                              )}
                              {this.state.planificacion && (
                                <td>{item.comentario3}</td>
                              )}

                              {this.state.convertida &&
                                item.convertida === true && <td>Si</td>}

                              {this.state.convertida &&
                                item.convertida === false && <td>No</td>}
                              {/* {this.state.comentarios && (
                                <td>
                                  {item.comentarios.map(
                                    ({ descripcion }, index) => {
                                      return (
                                        <div key={index}>{descripcion}</div>
                                      );
                                    }
                                  )}
                                </td>
                              )}
                              {this.state.comentarios && (
                                <td>
                                  {item.comentarios.map(({ fecha }, index) => {
                                    return (
                                      <div key={index}>
                                        {moment(fecha).format("DD/MM/YYYY LTS")}
                                      </div>
                                    );
                                  })}
                                </td>
                              )} */}
                            </tr>
                          </tbody>
                        );
                      })}
                  </Table>
                </CardBody>
              </Card>
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
    filters: state.filters,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, {
  getTarjetas,
  agregarFilter,
  getFilters,
})(MisTarjetasFiltro);
