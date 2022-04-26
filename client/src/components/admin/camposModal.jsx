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
import { agregarCampos } from "../../store/actions/camposActions";

class CampoModal extends Component {
  state = {
    modal: false,
    name: this.props.campo,
    value: "",
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
    const { name, value } = this.state;

    const nuevoCampos = {
      name,
      value,
    };
    e.preventDefault();
    this.props.agregarCampos(nuevoCampos);
    if (this.state.value === "") {
      return null;
    } else {
      return this.toggle();
    }
  };

  render() {
    return (
      <div>
        <Button className="ml-3" onClick={this.toggle} href="#">
          Agregar
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Agregar campo {this.props.campo}
          </ModalHeader>
          <ModalBody>
            <Label for="value">Nombre del campo</Label>
            <Input
              type="text"
              name="value"
              id="value"
              placeholder="Nombre del campo"
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
  campos: state.campos,
});
export default connect(mapStateToProps, { agregarCampos })(CampoModal);
