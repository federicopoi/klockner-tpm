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
import { connect } from "react-redux";
import RIModal from "./RIModal";
import { Redirect } from "react-router-dom";
import { agregarKaizen } from "../../store/actions/kaizenActions";

class AñadirKaizen extends Component {
  componentDidMount() {
    this.props.getTarjetas();
    this.props.getCampos();
  }
  state = {
    numero: "1",
    linea: "",
    maquina: "",
    codigo: "",
    tema: "",
    perdidaAtacada: "",
    pilar: "",
    lider: "",
    preTarjeta: [],
    preNumero: "",
    preColor: "",
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
  // onChangeColor = (e) => {
  //   const numeroTarjeta = this.props.tarjetas.tarjetas.filter(
  //     ({ color }) => color === e.target.value
  //   );
  //   const numbersArr = numeroTarjeta.map(({ numero }) => numero);
  //   const highestNumber = Math.max(...numbersArr);

  //   this.setState({
  //     [e.target.name]: e.target.value,
  //     numero: parseInt(highestNumber) + 1,
  //   });
  // };
  onSubmit = (e) => {
    e.preventDefault();
    const {
      numero,
      linea,
      maquina,
      codigo,
      color,
      preNumero,
      tema,
      perdidaAtacada,
      pilar,
      lider,
    } = this.state;

    // Crear Tarjeta Kaizen
    const nuevoKaizen = {
      numero: this.props.tarjetaskaizen.tarjetaskaizen.length + 1,
      linea,
      maquina,
      codigo,
      preTarjeta: this.state.preTarjeta,
      tema,
      perdidaAtacada,
      pilar,
      lider,
    };

    if (this.state.preTarjeta && this.state.preTarjeta.length) {
      this.props.agregarKaizen(nuevoKaizen);
    } else {
      console.log(null);
    }
  };
  render() {
    if (this.props.tarjetaskaizen.agregarsuccess) {
      return <Redirect to={`/kaizen/`} />;
    }

    const { campos } = this.props.campos;
    return (
      <div>
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <Container>
              <h2 className="my-2">Añadir nuevo Quick Kaizen</h2>

              <Form
                className="mt-4"
                onSubmit={this.onSubmit}
                id="agregartarjeta"
              >
                <FormGroup>
                  <div>
                    <Row>
                      <Col>
                        {" "}
                        <FormGroup>
                          <Label for="codigo">Código del Kaizen *</Label>
                          <Input
                            name="codigo"
                            id="codigo"
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={8}>
                        <Label for="color">
                          {" "}
                          Si el QK proviene de una tarjeta roja, azul, amarilla
                          o verde, colocar aquí el color y el número de tarjeta
                          *
                        </Label>

                        <Input
                          type="select"
                          name="preColor"
                          id="preColor"
                          value={this.state.preColor}
                          onChange={this.onChange}
                        >
                          <option>Seleccionar</option>
                          <option>Roja</option>
                          <option>Azul</option>
                          <option>Verde</option>
                          <option>Amarilla</option>
                        </Input>
                      </Col>

                      <Col>
                        <Label for="color">Tarjeta Numero *</Label>
                        <Input
                          type="number"
                          id="preNumero"
                          placeHolder="Numero"
                          name="preNumero"
                          value={this.state.preNumero}
                          onChange={this.onChange}
                        />
                      </Col>

                      <Button
                        onClick={() => {
                          this.setState({
                            preTarjeta: [
                              ...this.state.preTarjeta,
                              {
                                color: this.state.preColor,
                                numero: this.state.preNumero,
                              },
                            ],
                            preColor: "",
                            preNumero: "",
                          });
                        }}
                      >
                        Agregar
                      </Button>
                    </Row>
                  </div>
                  <Row>
                    {this.state.preTarjeta &&
                      this.state.preTarjeta.map(({ color, numero }) => {
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
                </FormGroup>

                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="maquina">Máquina *</Label>
                      <Input
                        name="maquina"
                        id="maquina"
                        onChange={this.onChange}
                      ></Input>
                    </FormGroup>

                    <FormGroup>
                      <Label for="lider">Líder del equipo de mejora*</Label>
                      <Input
                        name="lider"
                        id="lider"
                        onChange={this.onChange}
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="tema">Tema *</Label>
                      <Input
                        type="textarea"
                        name="tema"
                        id="tema"
                        onChange={this.onChange}
                      />
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup>
                      <Label for="linea">Linea *</Label>

                      <Input name="linea" id="linea" onChange={this.onChange} />
                    </FormGroup>

                    <FormGroup>
                      <Label for="perdidaAtacada">Pérdida atacada *</Label>
                      <Input
                        name="perdidaAtacada"
                        id="perdidaAtacada"
                        onChange={this.onChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="pilar">Pilar *</Label>
                      <Input
                        type="select"
                        name="pilar"
                        id="pilar"
                        onChange={this.onChange}
                      >
                        <option>Seleccionar</option>
                        <option>Seguridad</option>
                        <option>Calidad</option>
                        <option>Mantenimiento autónomo</option>
                        <option>Mantenimiento planificado</option>
                        <option>Mejoras enfocadas</option>
                        <option>Capacitación y Entrenamiento</option>
                        <option>Ambiente</option>
                        <option>Logística</option>
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
    tarjetaskaizen: state.tarjetaskaizen,
    campos: state.campos,
    error: state.error,
  };
};
export default connect(mapStateToProps, {
  agregarKaizen,
  getTarjetas,
  getCampos,
})(AñadirKaizen);
