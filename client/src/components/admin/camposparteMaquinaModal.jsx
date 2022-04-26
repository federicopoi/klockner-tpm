import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  FormGroup,
} from "reactstrap";
import { connect } from "react-redux";
import { parteMaquina } from "../../store/actions/camposActions";
import { getCampos } from "../../store/actions/camposActions";

class CamposParteMaquinaModal extends Component {
  state = {
    modal: false,
    maquina: "",
    name: "",
  };

  componentDidMount() {
    this.props.getCampos();
  }

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
    const { _id, name } = this.state;

    const nuevoCampos = {
      _id,
      name,
    };
    e.preventDefault();
    this.props.parteMaquina(nuevoCampos);

    if (this.state.value === "") {
      return null;
    } else {
      return this.toggle();
    }
  };

  render() {
    const { campos } = this.props.campos;
    return (
      <div>
        <Button className="ml-3" onClick={this.toggle} href="#">
          Agregar
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Seleccionar maquina</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="maquina">Maquina / Instalación</Label>
              <Input
                type="select"
                name="maquina"
                id="maquina"
                onChange={(e) => {
                  this.setState({
                    _id: e.target.value,
                  });
                }}
              >
                <option>Seleccionar</option>
                {campos &&
                  campos
                    .filter(({ name }) => {
                      return name === "maquina";
                    })
                    .map(({ name, value, _id }) => {
                      return <option value={_id}>{value}</option>;
                    })}
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalHeader toggle={this.toggle}>
            Agregar campo parte de maquina
          </ModalHeader>

          <ModalBody>
            <Label for="name">Parte de maquina</Label>
            <Input
              type="text"
              name="name"
              id="name"
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
export default connect(mapStateToProps, { parteMaquina, getCampos })(
  CamposParteMaquinaModal
);
