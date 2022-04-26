import React, { Component } from "react";
import { connect } from "react-redux";
import { clearErrors } from "../../../store/actions/errorActions";
import { cerrarKaizen } from "../../../store/actions/kaizenActions";
import { getCampos } from "../../../store/actions/camposActions";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  FormGroup,
  Alert,
  Row,
  Col,
} from "reactstrap";
export class CerrarKaizenModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        _id: this.props._id,
        descripcionProblema: this.props.tarjeta.descripcionProblema,
        objetivo: this.props.tarjeta.objetivo,
        causas: this.props.tarjeta.causas,
        acciones: this.props.tarjeta.acciones,
        objectivoCompletado: this.props.tarjeta.objectivoCompletado,
        documentos: this.props.tarjeta.documentos,
        otraMaquina: this.props.tarjeta.otraMaquina,
        responsableSeguimiento: this.props.tarjeta.responsableSeguimiento,
        fechaFinalizacionMejora: this.props.tarjeta.fechaFinalizacionMejora,
        costo: this.props.tarjeta.costo,
        beneficio: this.props.tarjeta.beneficio,
        verificacion: this.props.tarjeta.verificacion,
      },
      formErrors: {
        _id: this.props._id,
        descripcionProblema: this.props.tarjeta.descripcionProblema,
        objetivo: this.props.tarjeta.objetivo,
        causas: this.props.tarjeta.causas,
        acciones: this.props.tarjeta.acciones,
        objectivoCompletado: this.props.tarjeta.objectivoCompletado,
        documentos: this.props.tarjeta.documentos,
        otraMaquina: this.props.tarjeta.otraMaquina,
        responsableSeguimiento: this.props.tarjeta.responsableSeguimiento,
        fechaFinalizacionMejora: this.props.tarjeta.fechaFinalizacionMejora,
        costo: this.props.tarjeta.costo,
        beneficio: this.props.tarjeta.beneficio,
        verificacion: this.props.tarjeta.verificacion,
      },
      formValidity: {
        _id: this.props._id,
        descripcionProblema: false,
        objetivo: false,
        causas: false,
        acciones: false,
        objectivoCompletado: false,
        documentos: false,
        otraMaquina: false,
        responsableSeguimiento: false,
        fechaFinalizacionMejora: false,
        costo: false,
        beneficio: false,
        verificacion: false,
      },
      isSubmitting: false,
      modal: false,
      tarjetasHacer: [],
      color: "",
      numero: "",
      implementacion: true,
    };
  }

  handleChange = ({ target }) => {
    const { formValues } = this.state;
    formValues[target.name] = target.value;
    this.setState({ formValues });
    this.handleValidation(target);
  };

  handleValidation = (target) => {
    const { name, value } = target;
    const fieldValidationErrors = this.state.formErrors;
    const validity = this.state.formValidity;
    const isEmail = name === "email";
    const isPassword = name === "password";
    const isInicioReparacion = name === "inicioReparacionDia";
    const isFinReparacion = name === "finReparacionDia";
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    validity[name] = value.length > 0;
    fieldValidationErrors[name] = validity[name]
      ? ""
      : "Este campo es requerido y no puede estar vacio";

    if (validity[name]) {
      if (isEmail) {
        validity[name] = emailTest.test(value);
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be a valid email address`;
      }
      if (isPassword) {
        validity[name] = value.length >= 3;
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be 3 characters minimum`;
      }
    }

    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    const { formValues, formValidity } = this.state;
    this.setState({ isSubmitting: false });

    const {
      _id,
      descripcionProblema,
      objetivo,
      causas,
      acciones,
      objectivoCompletado,
      documentos,
      otraMaquina,
      responsableSeguimiento,
      fechaFinalizacionMejora,
      costo,
      beneficio,
      verificacion,
    } = this.state.formValues;

    // Cerrar Tarjeta
    const tarjetaActualizada = {
      _id,
      descripcionProblema,
      objetivo,
      causas,
      acciones,
      tarjetasHacer: this.state.tarjetasHacer,
      implementacion: this.state.implementacion,
      objectivoCompletado,
      documentos,
      otraMaquina,
      responsableSeguimiento,
      fechaFinalizacionMejora,
      costo,
      beneficio,
      verificacion,
    };

    this.props.cerrarKaizen(tarjetaActualizada);
    this.toggle();
  };

  onChangeConvertida = (e) => {
    this.setState({ formValues: { convertida: e.target.value } });
  };

  onChangeImplementacion = (e) => {
    if (e.target.value === "En implementacion") {
      this.setState({ implementacion: true });
    } else {
      this.setState({ implementacion: false });
    }
  };

  onChangeRegular = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHacer = (color, numero) => {
    this.setState((prevState) => ({
      tarjetasHacer: [...prevState.tarjetasHacer, this.state.color],
    }));
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  componentDidMount() {
    this.props.getCampos();
  }

  render() {
    const { campos } = this.props.campos;
    const { formValues, formErrors, isSubmitting } = this.state;

    console.log(this.state);

    return (
      <div>
        <p onClick={this.toggle} style={{ cursor: "pointer" }} className="my-3">
          Implementar / Cerrar Kaizen
        </p>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Implementar / Cerrar Kaizen
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <h4 className="mt-2 text-center">Planificar</h4>

                <Label for="implementacion">Estado</Label>

                <Input
                  type="select"
                  className="mb-3"
                  name="implementacion"
                  id="implementacion"
                  onChange={this.onChangeImplementacion}
                >
                  <option>En implementacion</option>
                  <option>Cerrada</option>
                </Input>

                <Label for="descripcionProblema">
                  Descripción del Problema
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.descripcionProblema}
                  type="text"
                  name="descripcionProblema"
                  id="descripcionProblema"
                ></Input>

                <Label for="objetivo">Objetivo</Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.objetivo}
                  type="text"
                  name="objetivo"
                  id="objetivo"
                ></Input>

                <Label for="causas" className="mt-2">
                  Causas
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.causas}
                  type="text"
                  name="causas"
                  id="causas"
                ></Input>

                <Label for="acciones" className="mt-2">
                  Acciones a tomar
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.acciones}
                  type="text"
                  name="acciones"
                  id="acciones"
                ></Input>

                <h4 className="mt-2 mb-2 text-center">Hacer</h4>

                <Row>
                  <Col>
                    <Input
                      type="select"
                      name="color"
                      id="color"
                      value={this.state.color}
                      onChange={this.onChangeRegular}
                      placeholder="Color"
                    >
                      <option>Seleccionar</option>
                      <option>Roja</option>
                      <option>Azul</option>
                      <option>Verde</option>
                      <option>Amarilla</option>
                    </Input>
                  </Col>
                  <Col>
                    <Input
                      type="number"
                      name="numero"
                      id="numero"
                      onChange={this.onChangeRegular}
                      value={this.state.numero}
                      placeholder="Numero"
                    ></Input>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => {
                        this.setState({
                          tarjetasHacer: [
                            ...this.state.tarjetasHacer,
                            {
                              color: this.state.color,
                              numero: this.state.numero,
                            },
                          ],
                          color: "",
                          numero: "",
                        });
                      }}
                    >
                      Agregar
                    </Button>
                  </Col>
                </Row>

                <Row>
                  {this.state.tarjetasHacer &&
                    this.state.tarjetasHacer.map(({ color, numero }) => {
                      return (
                        <div className="mt-3">
                          <Col>
                            <p>{color}</p>
                            <p>{numero}</p>
                          </Col>
                        </div>
                      );
                    })}
                </Row>

                <h4 className="mt-3 text-center">Chequear</h4>

                <Label for="objectivoCompletado" className="mt-2">
                  ¿Se logró el objetivo? Explicar
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.objectivoCompletado}
                  type="text"
                  name="objectivoCompletado"
                  id="objectivoCompletado"
                ></Input>

                <h4 className="mt-3 text-center">Estandarizar</h4>

                <Label for="documentos" className="mt-2">
                  Documentos que debemos cambiar para consolidar la mejora
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.documentos}
                  type="text"
                  name="documentos"
                  id="documentos"
                ></Input>

                <Label for="otraMaquina" className="mt-2">
                  En qué otra parte/máquina podemos aplicar la mejora
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.otraMaquina}
                  type="text"
                  name="otraMaquina"
                  id="otraMaquina"
                ></Input>

                <hr class="solid mt-3"></hr>

                <Label for="responsableSeguimiento" className="mt-2">
                  Responsable del seguimiento de la mejora
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.responsableSeguimiento}
                  type="text"
                  name="responsableSeguimiento"
                  id="responsableSeguimiento"
                ></Input>

                <Label className="mt-3">
                  Fecha de finalización de la mejora
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.fechaFinalizacionMejora}
                  type="date"
                  name="fechaFinalizacionMejora"
                  id="fechaFinalizacionMejora"
                ></Input>

                <Label for="costo" className="mt-2">
                  Costo
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.costo}
                  type="text"
                  name="costo"
                  id="costo"
                ></Input>

                <Label for="beneficio" className="mt-2">
                  Beneficio
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.beneficio}
                  type="text"
                  name="beneficio"
                  id="beneficio"
                ></Input>

                <Label for="verificacion" className="mt-2">
                  Verificación
                </Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.implementacion}
                  type="text"
                  name="verificacion"
                  id="verificacion"
                  defaultChecked={true}
                ></Input>

                <Button
                  color="dark"
                  block
                  style={{ marginTop: "2rem" }}
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Por favor espere..." : "Subir"}
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.error,
  campos: state.campos,
});
export default connect(mapStateToProps, {
  clearErrors,
  cerrarKaizen,
  getCampos,
})(CerrarKaizenModal);
