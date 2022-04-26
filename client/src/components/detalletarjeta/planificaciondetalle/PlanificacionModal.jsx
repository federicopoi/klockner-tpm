import React, { Component } from "react";
import { connect } from "react-redux";
import { clearErrors } from "../../../store/actions/errorActions";
import { agregarPlanificacion } from "../../../store/actions/tarjetaActions";
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
import { withRouter } from "react-router-dom";
import moment from "moment";
export class PlanificacionModal extends Component {
  state = {
    modal: false,
    _id: this.props._id,
    previstaCierre: this.props.tarjeta.previstaCierre,
    responsableSeguimiento: this.props.tarjeta.responsableSeguimiento,
    recursos: this.props.tarjeta.recursos,
    materiales: this.props.tarjeta.materiales,
    solicitudCompras: this.props.tarjeta.solicitudCompras,
    comprometidaCompras: this.props.tarjeta.comprometidaCompras,
    tareaRealizar: this.props.tarjeta.tareaRealizar,
    responsableTarea: this.props.tarjeta.responsableSeguimiento,
    comentario1: this.props.tarjeta.comentario1,
    comentario2: this.props.tarjeta.comentario2,
    comentario3: this.props.tarjeta.comentario3,
    planificacion: this.props.tarjeta.planificacion,
    msg: null,
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for login error
      console.log(error.msg.msg);
      if (error.id === "PLANIFICACION_TARJETA_ERROR") {
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
  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const {
      _id,
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
    } = this.state;

    // Planificar Tarjeta
    const tarjetaActualizada = {
      _id,
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
    };

    this.props.agregarPlanificacion(tarjetaActualizada);

    if (!_id) {
      return null;
    } else {
      return this.toggle();
    }
  };
  componentDidMount() {
    this.props.getCampos();
  }
  render() {
    return (
      <div>
        {this.props.button && (
          <Button onClick={this.toggle} color="secondary" className="my-3">
            Planificar Tarjeta
          </Button>
        )}
        {this.props.p && (
          <p
            onClick={this.toggle}
            color="success"
            style={{ cursor: "pointer" }}
            className="my-3 mx-3"
          >
            Planificar Tarjeta
          </p>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Planificación del Tratamiento de Tarjetas
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="updaters">Fecha prevista de cierre</Label>
                <Input
                  onChange={this.onChange}
                  type="date"
                  name="previstaCierre"
                  defaultValue={moment(this.state.previstaCierre).format(
                    "DD/MM/YYYY"
                  )}
                  id="previstaCierre"
                  className="mb-2"
                ></Input>

                <Label for="responsable">Responsable del seguimiento</Label>
                <Input
                  onChange={this.onChange}
                  type="text"
                  name="responsableSeguimiento"
                  defaultValue={this.state.responsableSeguimiento}
                  id="responsableSeguimiento"
                  className="mb-2"
                ></Input>
                <Label for="responsable">Recursos a utilizar</Label>
                <Input
                  onChange={this.onChange}
                  type="text"
                  name="recursos"
                  defaultValue={this.state.recursos}
                  id="recursos"
                  className="mb-2"
                ></Input>

                <Label for="responsable">Materiales/Repuestos necesarios</Label>
                <Input
                  onChange={this.onChange}
                  type="text"
                  name="materiales"
                  defaultValue={this.state.materiales}
                  id="materiales"
                  className="mb-2"
                ></Input>

                <Label for="updaters">Fecha solicitud a Compras</Label>
                <Input
                  onChange={this.onChange}
                  type="date"
                  name="solicitudCompras"
                  id="solicitudCompras"
                  className="mb-2"
                ></Input>

                <Label for="updaters">Fecha comprometida por Compras</Label>
                <Input
                  onChange={this.onChange}
                  type="date"
                  name="comprometidaCompras"
                  id="comprometidaCompras"
                  className="mb-2"
                ></Input>

                <Label for="responsable">Tarea a realizar</Label>
                <Input
                  onChange={this.onChange}
                  type="text"
                  name="tareaRealizar"
                  id="tareaRealizar"
                  defaultValue={this.state.tareaRealizar}
                  className="mb-2"
                ></Input>

                <Label for="responsable">
                  Responsible de la tarea a realizar
                </Label>
                <Input
                  onChange={this.onChange}
                  type="text"
                  name="responsableTarea"
                  id="responsableTarea"
                  defaultValue={this.state.responsableTarea}
                  className="mb-2"
                ></Input>

                <Label for="responsable">
                  Comentario 1/Fecha del comentario
                </Label>
                <Input
                  onChange={this.onChange}
                  type="text"
                  name="comentario1"
                  id="comentario1"
                  defaultValue={this.state.comentario1}
                  className="mb-2"
                ></Input>

                <Label for="responsable">
                  Comentario 2/Fecha del comentario
                </Label>
                <Input
                  onChange={this.onChange}
                  type="text"
                  name="comentario2"
                  id="comentario2"
                  defaultValue={this.state.comentario2}
                  className="mb-2"
                ></Input>

                <Label for="responsable">
                  Comentario 3/Fecha del comentario
                </Label>
                <Input
                  onChange={this.onChange}
                  type="text"
                  name="comentario3"
                  id="comentario3"
                  defaultValue={this.state.comentario3}
                  className="mb-2"
                ></Input>

                {this.state.msg ? (
                  <Alert color="danger" className="mt-3">
                    {this.state.msg}
                  </Alert>
                ) : null}
                <Button color="dark" block style={{ marginTop: "2rem" }}>
                  Subir
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
  agregarPlanificacion,
  getCampos,
})(withRouter(PlanificacionModal));
