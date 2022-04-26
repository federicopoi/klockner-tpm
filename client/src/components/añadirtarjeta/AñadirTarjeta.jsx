import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { getTarjetas } from "../../store/actions/tarjetaActions";
import { getCampos } from "../../store/actions/camposActions";
import { loadUser } from "../../store/actions/authActions";
import { connect } from "react-redux";
import RIModal from "./RIModal";
import { Redirect } from "react-router-dom";
import {
  agregarTarjeta,
  agregarTarjetaAmarilla,
} from "../../store/actions/tarjetaActions";

class AñadirTarjeta extends Component {
  componentDidMount() {
    this.props.getTarjetas();
    this.props.getCampos();
    this.props.loadUser();
  }
  state = {
    numero: "",
    descripcion: "",
    sugerencia: "",
    reparacion: "",
    color: "",
    detecto: "",
    prioridad: "",
    familia: "",
    maquina: "",
    parteMaquina: "",
    idMaquina: "",
    equipo: "",
    riesgoInicial: "",
    tipodeRiesgo: "",
    sustoExperimentado: false,
    sustoObservado: false,
    impactoAmbiente: false,
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check login error
      console.log(error.msg.msg);
      if (error.id === "AGREGAR_TARJETA_ERROR") {
        this.setState({
          msg: error.msg.msg,
        });
      } else {
        this.setState({
          msg: null,
        });
      }
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeColor = (e) => {
    const numeroTarjeta = this.props.tarjetas.tarjetas.filter(
      ({ color }) => color === e.target.value
    );
    const numbersArr = numeroTarjeta.map(({ numero }) => numero);
    const highestNumber = Math.max(...numbersArr);

    this.setState({
      [e.target.name]: e.target.value,
      numero: parseInt(highestNumber) + 1,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const {
      numero,
      descripcion,
      color,
      detecto,
      prioridad,
      maquina,
      parteMaquina,
      familia,
      equipo,
      sustoExperimentado,
      sustoObservado,
      impactoAmbiente,
      sugerencia,
      reparacion,
      tipodeRiesgo,
      riesgoInicial,
    } = this.state;

    // Crear Tarjeta
    const nuevaTarjeta = {
      numero,
      descripcion,
      sugerencia,
      reparacion,
      color,
      detecto,
      prioridad,
      familia,
      maquina,
      parteMaquina,
      equipo,
      riesgoInicial,
      tipodeRiesgo,
    };

    // Crear Tarjeta Amarilla
    const nuevaTarjetaAmarilla = {
      numero,
      descripcion,
      color,
      detecto,
      prioridad,
      maquina,
      parteMaquina,
      equipo,
      sustoExperimentado,
      sustoObservado,
      impactoAmbiente,
      familia,
      sugerencia,
      reparacion,
      tipodeRiesgo,
      riesgoInicial,
    };
    if (this.state.color !== "Amarilla") {
      if (this.state.detecto !== "Seleccionar") {
        this.props.agregarTarjeta(nuevaTarjeta);
      }
    } else {
      if (this.state.detecto !== "Seleccionar") {
        this.props.agregarTarjetaAmarilla(nuevaTarjetaAmarilla);
      }
    }
  };
  render() {
    if (this.props.tarjetas.agregarsuccess) {
      return <Redirect to={`/tarjetas/`} />;
    }

    const { campos } = this.props.campos;
    const userName = this.props.user && this.props.user.name;
    const names = userName && userName.split(" ");
    const firstName = names && names[0];
    const lastName = names && names[1];
    const fullName = firstName && firstName.charAt(0) + ". " + lastName;

    return (
      <div>
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <Container>
              <h2 className="my-2">Añadir nueva tarjeta</h2>

              <Form
                className="mt-4"
                onSubmit={this.onSubmit}
                id="agregartarjeta"
              >
                <FormGroup>
                  {this.state.numero !== "" ? (
                    <div>
                      <Row>
                        <Col lg={10}>
                          <Label for="color">Color *</Label>
                          <Input
                            type="select"
                            name="color"
                            id="color"
                            onChange={this.onChangeColor}
                          >
                            <option>Seleccionar</option>
                            <option>Roja</option>
                            <option>Azul</option>
                            <option>Verde</option>
                            <option>Amarilla</option>
                          </Input>
                        </Col>
                        <Col lg={2}>
                          <Label for="color">Numero</Label>
                          <p>{this.state.numero}</p>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    <div>
                      <Label for="color">Color *</Label>
                      <Input
                        type="select"
                        name="color"
                        id="color"
                        onChange={this.onChangeColor}
                      >
                        <option>Seleccionar</option>
                        <option>Roja</option>
                        <option>Azul</option>
                        <option>Verde</option>
                        <option>Amarilla</option>
                      </Input>
                    </div>
                  )}
                </FormGroup>

                {this.state.color === "Amarilla" && (
                  <Row className="my-4">
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            id="sustoExperimentado"
                            name="sustoExperimentado"
                            onChange={(e) => {
                              this.onChange({
                                target: {
                                  name: e.target.name,
                                  value: e.target.checked,
                                },
                              });
                            }}
                          />
                          Reporte de Incidente "Susto" experimentado
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            id="sustoObservado"
                            name="sustoObservado"
                            onChange={(e) => {
                              this.onChange({
                                target: {
                                  name: e.target.name,
                                  value: e.target.checked,
                                },
                              });
                            }}
                          />
                          Reporte de Incidente "Susto" observado
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            id="impactoAmbiente"
                            name="impactoAmbiente"
                            onChange={(e) => {
                              this.onChange({
                                target: {
                                  name: e.target.name,
                                  value: e.target.checked,
                                },
                              });
                            }}
                          />
                          El incidente puede afectar al Medio Ambiente
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                )}

                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="maquina">Maquina / Instalación *</Label>
                      <Input
                        type="select"
                        name="maquina"
                        id="maquina"
                        onChange={(e) => {
                          const index = e.target.selectedIndex;
                          const el = e.target.childNodes[index];
                          const option = el.getAttribute("_id");
                          this.setState({
                            idMaquina: option,
                            maquina: e.target.value,
                          });
                        }}
                      >
                        <option>Seleccionar</option>
                        {campos &&
                          campos
                            .filter(({ name, value }) => {
                              return name === "maquina";
                            })
                            .map(({ name, value, _id }, index) => {
                              return (
                                <option key={index} _id={_id}>
                                  {value}
                                </option>
                              );
                            })}
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Row>
                        <Col>
                          <Label for="detecto">Riesgo Inicial *</Label>
                        </Col>
                        <RIModal></RIModal>
                      </Row>

                      <Input
                        type="select"
                        name="riesgoInicial"
                        id="riesgoInicial"
                        onChange={this.onChange}
                      >
                        <option>Seleccionar</option>
                        {campos &&
                          campos
                            .filter(({ name, value }) => {
                              return name === "riesgoInicial";
                            })
                            .map(({ name, value, _id }, index) => {
                              return (
                                <option key={index} _id={_id}>
                                  {value}
                                </option>
                              );
                            })}
                      </Input>
                    </FormGroup>
                    {this.props.user && (
                      <FormGroup>
                        <Label for="detecto">Detectó *</Label>
                        <Input
                          type="select"
                          name="detecto"
                          id="detecto"
                          onChange={this.onChange}
                        >
                          <option>Seleccionar</option>
                          <option>{fullName}</option>
                        </Input>
                      </FormGroup>
                    )}

                    <FormGroup>
                      {this.state.color !== "Amarilla" ? (
                        <Label for="descripcion">Descripción *</Label>
                      ) : (
                        <Label for="descripcion">
                          Descripcion del incidente "SUSTO" experimentado u
                          observado *
                        </Label>
                      )}
                      <Input
                        type="textarea"
                        name="descripcion"
                        id="descripcion"
                        onChange={this.onChange}
                      />
                    </FormGroup>

                    {this.state.color === "Roja" && (
                      <div>
                        <Label for="sugerencia">
                          Sugerencia para eliminar la anomalía *
                        </Label>
                        <Input
                          type="text"
                          name="sugerencia"
                          id="sugerencia"
                          onChange={this.onChange}
                        />
                      </div>
                    )}
                    {this.state.color === "Azul" && (
                      <div>
                        <Label for="sugerencia">
                          Sugerencia para eliminar la anomalía *
                        </Label>
                        <Input
                          type="text"
                          name="sugerencia"
                          id="sugerencia"
                          onChange={this.onChange}
                        />
                      </div>
                    )}
                    {this.state.color === "Verde" && (
                      <div>
                        <Label for="sugerencia">Sugerencia de mejora *</Label>
                        <Input
                          type="text"
                          name="sugerencia"
                          id="sugerencia"
                          onChange={this.onChange}
                        />
                      </div>
                    )}
                    <Label className="mt-1">Reparación *</Label>
                    <Input
                      type="select"
                      name="reparacion"
                      id="reparacion"
                      onChange={this.onChange}
                    >
                      <option>Seleccionar</option>
                      <option>Con maquina parada</option>
                      <option>Con maquina en marcha</option>
                    </Input>
                  </Col>

                  <Col>
                    <FormGroup>
                      <Label for="maquina">Parte de maquina *</Label>
                      <Input
                        type="select"
                        name="parteMaquina"
                        id="parteMaquina"
                        onChange={this.onChange}
                      >
                        <option>Seleccionar</option>
                        {campos &&
                          campos
                            .filter(({ name, value, _id }) => {
                              return _id === this.state.idMaquina;
                            })
                            .map(({ parteMaquina }) => {
                              return parteMaquina.map((item) => {
                                return <option>{item}</option>;
                              });
                            })}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="equipo">Equipo Autonomo*</Label>
                      <Input
                        type="select"
                        name="equipo"
                        id="equipo"
                        onChange={this.onChange}
                      >
                        <option>Seleccionar</option>
                        {campos &&
                          campos
                            .filter(({ name, value }) => {
                              return name === "equipo";
                            })
                            .map(({ name, value }, index) => {
                              return <option key={index}>{value}</option>;
                            })}
                      </Input>
                    </FormGroup>

                    {this.state.color !== "Amarilla" && (
                      <FormGroup>
                        <Label for="familia">Familia de anomalias *</Label>
                        <Input
                          type="select"
                          name="familia"
                          id="familia"
                          onChange={this.onChange}
                        >
                          <option>Seleccionar</option>
                          <option>1 - Pequeñas Deficiencia</option>
                          <option>2 - Condiciones basicas</option>
                          <option>3 - Puntos inaccesibles</option>
                          <option>4 - Focos de contaminacion</option>
                          <option>5 - Defecto de Calidad</option>
                          <option>6 - Elementos Innecesarios</option>
                          <option>7 - Lugares Inseguros</option>
                        </Input>
                      </FormGroup>
                    )}
                    {this.state.color === "Amarilla" && (
                      <FormGroup>
                        <Label for="familia">Familia de anomalias *</Label>
                        <Input
                          type="select"
                          name="familia"
                          id="familia"
                          onChange={this.onChange}
                        >
                          <option>Seleccionar</option>
                          <option>8 - Actos Inseguros</option>
                        </Input>
                      </FormGroup>
                    )}
                    {this.state.color === "Amarilla" && (
                      <FormGroup>
                        <Label for="detecto">
                          ¿Que sugiere para que no se repita?*
                        </Label>
                        <Input
                          type="text"
                          name="sugerencia"
                          id="sugerencia"
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    )}

                    {this.state.color !== "Amarilla" ? (
                      <FormGroup>
                        <Label for="detecto">Tipo de R / FC / LDA*</Label>
                        <Input
                          type="select"
                          name="tipodeRiesgo"
                          id="tipodeRiesgo"
                          onChange={this.onChange}
                        >
                          <option>Seleccionar</option>
                          {campos &&
                            campos
                              .filter(({ name, value }) => {
                                return name === "tipo";
                              })
                              .map(({ name, value }, index) => {
                                return <option key={index}>{value}</option>;
                              })}
                        </Input>
                      </FormGroup>
                    ) : (
                      <FormGroup>
                        <Label for="detecto">Tipo de R / FC / LDA *</Label>
                        <Input
                          type="select"
                          name="tipodeRiesgo"
                          id="tipodeRiesgo"
                          onChange={this.onChange}
                        >
                          <option>Seleccionar</option>
                          {campos &&
                            campos
                              .filter(({ name, value }) => {
                                return name === "tipo";
                              })
                              .map(({ name, value }, index) => {
                                return <option key={index}>{value}</option>;
                              })}
                        </Input>
                      </FormGroup>
                    )}
                    <FormGroup>
                      <Label for="prioridad">Prioridad *</Label>
                      <Input
                        type="select"
                        name="prioridad"
                        id="prioridad"
                        onChange={this.onChange}
                      >
                        <option>Seleccionar</option>
                        <option>Alta</option>
                        <option>Media</option>
                        <option>Baja</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                {this.state.msg ? (
                  <Alert color="danger" className="mt-3">
                    {this.state.msg}
                  </Alert>
                ) : null}

                <Row className="mt-3">
                  <Col>
                    <Button>Subir</Button>
                  </Col>
                </Row>
              </Form>
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
    campos: state.campos,
    error: state.error,
    users: state.users,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, {
  agregarTarjeta,
  agregarTarjetaAmarilla,
  getTarjetas,
  getCampos,
  loadUser,
})(AñadirTarjeta);
