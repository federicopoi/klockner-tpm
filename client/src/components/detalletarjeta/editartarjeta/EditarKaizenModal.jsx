import React, { Component } from "react";
import { connect } from "react-redux";
import { editarKaizen } from "../../../store/actions/kaizenActions";
import { getCampos } from "../../../store/actions/camposActions";
import { clearErrors } from "../../../store/actions/errorActions";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  FormGroup,
  NavLink,
  Alert,
  Row,
  Col,
} from "reactstrap";

class EditarKaizenModal extends Component {
  state = {
    modal: false,
    numero: "",
    _id: this.props.tarjeta._id,
    linea: this.props.tarjeta.linea,
    maquina: this.props.tarjeta.maquina,
    codigo: this.props.tarjeta.codigo,
    tema: this.props.tarjeta.tema,
    perdidaAtacada: this.props.tarjeta.perdidaAtacada,
    pilar: this.props.tarjeta.pilar,
    lider: this.props.tarjeta.lider,
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
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for login error
      console.log(error.msg.msg);
      if (error.id === "EDITAR_TARJETA_ERROR") {
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
  onChange = (e) => {
    e.target.value !== "Seleccionar" &&
      this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const {
      _id,
      linea,
      maquina,
      codigo,
      tema,
      perdidaAtacada,
      pilar,
      lider,
      descripcionProblema,
      objetivo,
      causas,
      acciones,
      objetivoCompletado,
      documentos,
      otraMaquina,
      responsableSeguimiento,
      fechaFinalizacionMejora,
      costo,
      beneficio,
      verificacion,
    } = this.state;

    const kaizenEditada = {
      _id,
      linea,
      maquina,
      codigo,
      tema,
      perdidaAtacada,
      pilar,
      lider,
      descripcionProblema,
      objetivo,
      causas,
      acciones,
      objetivoCompletado,
      documentos,
      otraMaquina,
      responsableSeguimiento,
      fechaFinalizacionMejora,
      costo,
      beneficio,
      verificacion,
    };
    this.props.editarKaizen(kaizenEditada);
    this.toggle();
  };

  componentDidMount() {
    this.props.getCampos();
  }

  render() {
    const { campos } = this.props.campos;
    console.log(this.state);
    return (
      <div>
        <p onClick={this.toggle} style={{ cursor: "pointer" }} className="my-3">
          Editar Quick Kaizen
        </p>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Editar Quick Kaizen</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <h4 className="text-center">Kaizen Frente</h4>
            <Form className="mt-3" onSubmit={this.onSubmit} id="agregartarjeta">
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="codigo">Código de Kaizen</Label>
                    <Input
                      type="text"
                      name="codigo"
                      defaultValue={this.state.codigo}
                      id="codigo"
                      onChange={this.onChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="maquina">Maquina</Label>
                    <Input
                      type="text"
                      name="maquina"
                      defaultValue={this.state.maquina}
                      id="maquina"
                      onChange={this.onChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="linea">Linea</Label>
                    <Input
                      type="text"
                      name="linea"
                      defaultValue={this.state.linea}
                      id="linea"
                      onChange={this.onChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="lider">Líder del equipo de mejora</Label>
                    <Input
                      type="text"
                      name="lider"
                      defaultValue={this.state.lider}
                      id="lider"
                      onChange={this.onChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="perdidaAtacada">Pérdida atacada</Label>
                    <Input
                      type="perdidaAtacada"
                      name="perdidaAtacada"
                      defaultValue={this.state.perdidaAtacada}
                      id="perdidaAtacada"
                      onChange={this.onChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="pilar">Pilar</Label>
                    <Input
                      type="pilar"
                      name="pilar"
                      defaultValue={this.state.pilar}
                      id="pilar"
                      onChange={this.onChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="tema">Tema</Label>
                    <Input
                      type="tema"
                      name="tema"
                      defaultValue={this.state.tema}
                      id="tema"
                      onChange={this.onChange}
                    />
                  </FormGroup>
                </Col>
              </Row>

              {this.props.tarjeta.estado === "Cerrada" && (
                <div>
                  <h4 className="text-center">Kaizen Dorso</h4>{" "}
                  <FormGroup>
                    <Label for="descripcionProblema">
                      Descripción del problema
                    </Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="descripcionProblema"
                      id="descripcionProblema"
                      className="mb-2"
                      defaultValue={this.state.descripcionProblema}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="objetivo">Objetivo</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="objetivo"
                      id="objetivo"
                      className="mb-2"
                      defaultValue={this.state.objetivo}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="causas">Causas</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="causas"
                      id="causas"
                      className="mb-2"
                      defaultValue={this.state.causas}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="acciones">Acciones a tomar</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="acciones"
                      id="acciones"
                      className="mb-2"
                      defaultValue={this.state.acciones}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="acciones">Acciones a tomar</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="acciones"
                      id="acciones"
                      className="mb-2"
                      defaultValue={this.state.acciones}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="documentos">
                      Documentos que debemos cambiar para consolidar la mejora
                    </Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="documentos"
                      id="documentos"
                      className="mb-2"
                      defaultValue={this.state.documentos}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="otraMaquina">
                      En qué otra parte/máquina podemos aplicar la mejora
                    </Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="otraMaquina"
                      id="otraMaquina"
                      className="mb-2"
                      defaultValue={this.state.otraMaquina}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="objectivoCompletado">
                      ¿Se logró el objetivo?
                    </Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="objectivoCompletado"
                      id="objectivoCompletado"
                      className="mb-2"
                      defaultValue={this.state.objectivoCompletado}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="responsableSeguimiento">
                      Responsable del seguimiento de la mejora
                    </Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="responsableSeguimiento"
                      id="responsableSeguimiento"
                      className="mb-2"
                      defaultValue={this.state.responsableSeguimiento}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="costo">Costo</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="costo"
                      id="costo"
                      className="mb-2"
                      defaultValue={this.state.costo}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="beneficio">Beneficio</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="beneficio"
                      id="beneficio"
                      className="mb-2"
                      defaultValue={this.state.beneficio}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="resultado">Resultado</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="resultado"
                      id="resultado"
                      className="mb-2"
                      defaultValue={this.state.resultado}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="verificacion">Verificacion</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="verificacion"
                      id="verificacion"
                      className="mb-2"
                      defaultValue={this.state.verificacion}
                    ></Input>
                  </FormGroup>
                </div>
              )}

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
  editarKaizen,
  getCampos,
})(EditarKaizenModal);
