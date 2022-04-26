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
import { cambiarRol } from "../../store/actions/usersActions";

class CambiarRolModal extends Component {
  state = {
    modal: false,
    _id: this.props._id,
    rol: "",
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
    const { _id, rol } = this.state;

    // Cambiar Rol
    const nuevoUsuario = {
      _id,
      rol,
    };
    e.preventDefault();

    this.props.cambiarRol(nuevoUsuario);
    if (this.state.value === "") {
      return null;
    } else {
      return this.toggle();
    }
  };

  render() {
    return (
      <div>
        <Button
          className="bg-secondary border-secondary ml-3"
          onClick={this.toggle}
        >
          Cambiar Rol
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Cambiar Rol</ModalHeader>
          <ModalBody>
            <Label for="value">Nuevo rol</Label>
            <Input type="select" name="rol" id="rol" onChange={this.onChange}>
              <option>Seleccionar</option>
              <option>Admin</option>
              <option>Jefe de area</option>
              <option>Operario</option>
            </Input>
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

export default connect(null, { cambiarRol })(CambiarRolModal);
