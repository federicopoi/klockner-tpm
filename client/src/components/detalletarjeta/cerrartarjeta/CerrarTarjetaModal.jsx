import React, { Component } from "react";
import { connect } from "react-redux";
import { clearErrors } from "../../../store/actions/errorActions";
import { cerrarTarjeta } from "../../../store/actions/tarjetaActions";
import { getCampos } from "../../../store/actions/camposActions";
import emailjs from "emailjs-com";
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
} from "reactstrap";
export class CerrarTarjetaModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        _id: this.props._id,
        inicioReparacionDia: "",
        inicioReparacionHora: "",
        finReparacionDia: "",
        finReparacionHora: "",
        responsable: "",
        // tiempoEmpleado: "",
        causa: ".",
        riesgoFinal: "",
        tareaRealizada: "",
        tipoAccion: "",
        materialUtilizado: "",
      },
      formErrors: {
        _id: this.props._id,
        inicioReparacionDia: "",
        inicioReparacionHora: "",
        finReparacionDia: "",
        finReparacionHora: "",
        responsable: "",
        causa: "",
        riesgoFinal: "",
        tareaRealizada: "",
        tipoAccion: "",
        materialUtilizado: "",
      },
      formValidity: {
        _id: this.props._id,
        inicioReparacionDia: false,
        inicioReparacionHora: false,
        finReparacionDia: false,
        finReparacionHora: false,
        responsable: false,
        causa: true,
        riesgoFinal: false,
        tareaRealizada: false,
        tipoAccion: false,
        materialUtilizado: false,
      },
      isSubmitting: false,
      modal: false,
      convertida: false,
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
      if (isInicioReparacion) {
        validity[name] = value > this.props.fecha;

        fieldValidationErrors[name] = validity[name]
          ? ""
          : "Inicio de reparacion tiene que ser posterior a fecha creada.";
      }
      if (isFinReparacion) {
        validity[name] = value >= this.props.fecha;
        fieldValidationErrors[name] = validity[name]
          ? ""
          : "Fin de reparacion tiene que ser posterior a fecha creada.";
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
    if (Object.values(formValidity).every(Boolean)) {
      // Here is when the validate comes
      this.setState({ isSubmitting: false });

      const {
        _id,
        inicioReparacionDia,
        inicioReparacionHora,
        finReparacionDia,
        finReparacionHora,
        responsable,
        causa,
        riesgoFinal,
        tareaRealizada,
        tipoAccion,
        materialUtilizado,
        convertida,
      } = this.state.formValues;

      const horaInicio = inicioReparacionHora.split(":");
      const horaFinal = finReparacionHora.split(":");

      const InicioReparacionHoraFloat = parseFloat(horaInicio[0]);
      const FinReparacionHoraFloat = parseFloat(horaFinal[0]);

      const horaFinal1 = FinReparacionHoraFloat - InicioReparacionHoraFloat;

      const tiemploEmpleadoString = `${horaFinal1}`;

      // Cerrar Tarjeta
      const tarjetaActualizada = {
        _id,
        inicioReparacion: inicioReparacionDia + " " + inicioReparacionHora,
        finReparacion: finReparacionDia + " " + finReparacionHora,
        responsable,
        tiempoEmpleado: tiemploEmpleadoString,
        causa,
        tareaRealizada,
        tipoAccion,
        riesgoFinal,
        materialUtilizado,
        convertida: this.state.convertida,
      };

      this.props.cerrarTarjeta(tarjetaActualizada);
    } else {
      for (let key in formValues) {
        let target = {
          name: key,
          value: formValues[key],
        };
        this.handleValidation(target);
      }
      this.setState({ isSubmitting: false });
    }
  };

  sendEmail = () => {
    const templateParams = {
      card_color: "Roja",
      card_number: "10",
      email: "fedepoi159@gmail.com",
    };

    emailjs
      .send(
        "service_aif023j",
        "template_igt30ty",
        templateParams,
        "user_mDlgqNQTGQlS9Xo5Y9nHE"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  };

  onChangeConvertida = (e) => {
    this.setState({ formValues: { convertida: e.tarjet.value } });
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

    return (
      <div>
        <p onClick={this.toggle} style={{ cursor: "pointer" }} className="my-3">
          Cerrar Tarjeta
        </p>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Cerrar Tarjeta</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label>Inicio de la Tarea</Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.inicioReparacionDia}
                  type="date"
                  name="inicioReparacionDia"
                  id="inicioReparacionDia"
                  className={`form-control ${
                    formErrors.inicioReparacionDia ? "is-invalid" : "mb-2"
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.inicioReparacionDia}
                </div>
                <Input
                  onChange={this.handleChange}
                  value={formValues.inicioReparacionHora}
                  type="time"
                  name="inicioReparacionHora"
                  id="inicioReparacionHora"
                  className={`form-control ${
                    formErrors.inicioReparacionHora ? "is-invalid" : "mb-2"
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.inicioReparacionHora}
                </div>

                <Label>Fin de la Tarea</Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.finReparacionDia}
                  type="date"
                  name="finReparacionDia"
                  id="finReparacionDia"
                  className={`form-control ${
                    formErrors.finReparacionDia ? "is-invalid" : "mb-2"
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.finReparacionDia}
                </div>
                <Input
                  onChange={this.handleChange}
                  value={formValues.finReparacionHora}
                  type="time"
                  name="finReparacionHora"
                  id="finReparacionHora"
                  className={`form-control ${
                    formErrors.finReparacionHora ? "is-invalid" : "mb-2"
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.finReparacionHora}
                </div>

                <Label for="responsable">Responsable</Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.responsable}
                  type="text"
                  name="responsable"
                  id="responsable"
                  className={`form-control ${
                    formErrors.responsable ? "is-invalid" : ""
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.responsable}
                </div>

                <Label className="mt-2">Riesgo Final</Label>
                <Input
                  type="select"
                  name="riesgoFinal"
                  id="riesgoFinal"
                  onChange={this.handleChange}
                  value={formValues.riesgoFinal}
                  className={`form-control ${
                    formErrors.riesgoFinal ? "is-invalid" : ""
                  }`}
                >
                  <option>Seleccionar</option>
                  {campos &&
                    campos
                      .filter(({ name, value }) => {
                        return name === "riesgoFinal";
                      })
                      .map(({ name, value, _id }, index) => {
                        return (
                          <option key={index} _id={_id}>
                            {value}
                          </option>
                        );
                      })}
                </Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.riesgoFinal}
                </div>

                {this.props.color !== "Verde" && (
                  <div>
                    <Label className="mt-2">Causa de la Anomalia</Label>
                    <Input
                      onChange={this.handleChange}
                      value={formValues.causa}
                      type="text"
                      name="causa"
                      id="causa"
                      className={`form-control ${
                        formErrors.causa ? "is-invalid" : ""
                      }`}
                    ></Input>
                    <div className="invalid-feedback mb-2">
                      {formErrors.causa}
                    </div>
                  </div>
                )}

                <Label className="mt-2">Tarea Realizada</Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.tareaRealizada}
                  type="text"
                  name="tareaRealizada"
                  id="tareaRealizada"
                  className={`form-control ${
                    formErrors.tareaRealizada ? "is-invalid" : ""
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.tareaRealizada}
                </div>

                <Label className="mt-2">Tipo de acción a realizar *</Label>
                <Input
                  type="select"
                  name="tipoAccion"
                  id="tipoAccion"
                  className={`form-control ${
                    formErrors.tipoAccion ? "is-invalid" : ""
                  }`}
                  onChange={this.handleChange}
                  value={formValues.tipoAccion}
                >
                  <option>Seleccionar</option>
                  <option>Eliminar</option>
                  <option>Contener</option>
                  <option>Reemplazar</option>
                  <option>Simplificar</option>
                </Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.tipoAccion}
                </div>

                <Label className="mt-2">Material Utilizado</Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.materialUtilizado}
                  type="text"
                  name="materialUtilizado"
                  id="materialUtilizado"
                  className={`form-control ${
                    formErrors.materialUtilizado ? "is-invalid" : ""
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.materialUtilizado}
                </div>

                {this.props.color !== "Azul" && (
                  <FormGroup check className="mt-2">
                    <Label check>
                      <Input
                        type="checkbox"
                        id="convertida"
                        name="convertida"
                        onChange={() => {
                          this.setState({
                            convertida: !this.state.convertida,
                          });
                        }}
                      />
                      Tarjeta Convertida
                    </Label>
                  </FormGroup>
                )}

                {/* {this.state.msg ? (
                  <Alert color="danger" className="mt-3">
                    {this.state.msg}
                  </Alert>
                ) : null} */}
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
  cerrarTarjeta,
  getCampos,
})(CerrarTarjetaModal);
