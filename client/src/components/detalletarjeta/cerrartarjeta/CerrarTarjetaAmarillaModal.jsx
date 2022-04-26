import React, { Component } from "react";
import { connect } from "react-redux";
import { clearErrors } from "../../../store/actions/errorActions";
import { cerrarTarjetaAmarilla } from "../../../store/actions/tarjetaActions";
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
} from "reactstrap";
export class CerrarTarjetaAmarillaModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        _id: this.props._id,
        finReparacionDia: "",
        finReparacionHora: "",
        responsable: "",
        tareaRealizada: "",
        riesgoFinal: "",
        accionesComplementarias: "",
        tipoAccion: "",
        causa: "",
      },
      formErrors: {
        _id: this.props._id,
        finReparacionDia: "",
        finReparacionHora: "",
        responsable: "",
        tareaRealizada: "",
        riesgoFinal: "",
        accionesComplementarias: "",
        tipoAccion: "",
        causa: "",
      },
      formValidity: {
        _id: this.props._id,
        finReparacionDia: false,
        finReparacionHora: false,
        responsable: false,
        tareaRealizada: false,
        riesgoFinal: false,
        accionesComplementarias: false,
        tipoAccion: false,
        causa: false,
      },
      isSubmitting: false,
      modal: false,
      convertida: false,
      verificacion: false,
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
        validity[name] = value > this.props.fecha;
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
        finReparacionDia,
        finReparacionHora,
        responsable,
        tareaRealizada,
        riesgoFinal,
        accionesComplementarias,
        tipoAccion,
        causa,
      } = this.state.formValues;

      // Cerrar Tarjeta
      const tarjetaActualizada = {
        _id,
        finReparacion: finReparacionDia + " " + finReparacionHora,
        responsable,
        tareaRealizada,
        tipoAccion,
        riesgoFinal,
        accionesComplementarias,
        tipoAccion,
        causa,
        convertida: this.state.convertida,
        verificacion: this.state.verificacion,
      };

      this.props.cerrarTarjetaAmarilla(tarjetaActualizada);
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
                <Label for="accionRealizada">Acción Realizada</Label>
                <Input
                  onChange={this.handleChange}
                  type="text"
                  value={formValues.tareaRealizada}
                  name="tareaRealizada"
                  id="tareaRealizada"
                  className="mb-2"
                  className={`form-control ${
                    formErrors.tareaRealizada ? "is-invalid" : "mb-2"
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.tareaRealizada}
                </div>
                <Label for="tipoAccion">Tipo de acción a realizar *</Label>
                <Input
                  type="select"
                  name="tipoAccion"
                  id="tipoAccion"
                  className="mb-2"
                  value={formValues.tipoAccion}
                  onChange={this.handleChange}
                  className={`form-control ${
                    formErrors.tipoAccion ? "is-invalid" : "mb-2"
                  }`}
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
                <Label for="responsable">Responsable</Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.responsable}
                  type="text"
                  name="responsable"
                  id="responsable"
                  className="mb-2"
                  className={`form-control ${
                    formErrors.responsable ? "is-invalid" : "mb-2"
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.responsable}
                </div>
                <Label for="responsable">Causa</Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.causa}
                  type="text"
                  name="causa"
                  id="causa"
                  className="mb-2"
                  className={`form-control ${
                    formErrors.causa ? "is-invalid" : "mb-2"
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">{formErrors.causa}</div>
                <Label for="updaters">Fecha de terminacion</Label>
                <Input
                  onChange={this.handleChange}
                  value={formValues.finReparacionDia}
                  type="date"
                  name="finReparacionDia"
                  id="finReparacionDia"
                  className="mb-2"
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
                  className="mb-2"
                  className={`form-control ${
                    formErrors.finReparacionHora ? "is-invalid" : "mb-2"
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.finReparacionHora}
                </div>

                <Label for="detecto">Riesgo Final</Label>
                <Input
                  type="select"
                  name="riesgoFinal"
                  id="riesgoFinal"
                  onChange={this.handleChange}
                  value={formValues.riesgoFinal}
                  className={`form-control ${
                    formErrors.riesgoFinal ? "is-invalid" : "mb-2"
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

                <Label for="updaters" className="mt-3">
                  Acciones Complementarias
                </Label>
                <Input
                  onChange={this.handleChange}
                  type="text"
                  name="accionesComplementarias"
                  id="accionesComplementarias"
                  className="mb-2"
                  value={formValues.accionesComplementarias}
                  className={`form-control ${
                    formErrors.accionesComplementarias ? "is-invalid" : "mb-2"
                  }`}
                ></Input>
                <div className="invalid-feedback mb-2">
                  {formErrors.accionesComplementarias}
                </div>

                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      id="verificacion"
                      name="verificacion"
                      onChange={() => {
                        this.setState({
                          verificacion: !this.state.verificacion,
                        });
                      }}
                    />
                    Verificación: (Resp. Pilar de seguridad)
                  </Label>
                </FormGroup>

                <FormGroup check>
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
  cerrarTarjetaAmarilla,
  getCampos,
})(CerrarTarjetaAmarillaModal);
