import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { agregarFilter } from "../../store/actions/filterActions";

class PresetModal extends Component {
  state = {
    modal: false,
    nombre: "",
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const {
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
    } = this.props.state;

    // Crear Filter
    const nuevoFilter = {
      nombre: this.state.nombre,
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
    };
    e.preventDefault();
    this.props.agregarFilter(nuevoFilter);
    if (this.state.nombre === "") {
      return null;
    } else {
      return this.toggle();
    }
  };
  render() {
    return (
      <div>
        <Button className="ml-3" onClick={this.toggle} href="#">
          Guardar
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Guardar como preestablecido
          </ModalHeader>
          <ModalBody>
            <Label for="nombre">Nombre</Label>
            <Input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre"
              className="mb-3"
              onChange={this.onChange}
            />
            <Form onSubmit={this.onSubmit}>
              <Button color="dark" block style={{ marginTop: "2rem" }}>
                Subir
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  filters: state.filters,
});
export default connect(mapStateToProps, { agregarFilter })(PresetModal);
