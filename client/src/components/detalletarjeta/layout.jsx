import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import { connect } from "react-redux";
import { getTarjetas } from "../../store/actions/tarjetaActions";
import { getKaizen } from "../../store/actions/kaizenActions";
import {
  CerradaDetalle,
  TextDetail,
  AbiertaDetalle,
  ImagenDetalle,
  PlanificacionDetalle,
} from ".";
import ImagenDetalleFront from "./imagendetallekaizen/ImagenDetalleFront";
import ImagenDetalleBack from "./imagendetallekaizen/ImagenDetalleBack";

class LayoutDetalle extends Component {
  componentDidMount() {
    this.props.getTarjetas();
    this.props.getKaizen();
    window.scrollTo(0, 0);
  }
  render() {
    console.log(this.props);
    const { tarjetas } = this.props.tarjetas;
    const { tarjetaskaizen } = this.props.tarjetaskaizen;
    const link_id = this.props.location.pathname.substr(9);
    const estadoTarjeta = tarjetas
      .filter(({ _id }) => _id === link_id)
      .map(({ estado }) => estado);

    const estadoTarjetaKaizen = tarjetaskaizen
      .filter(({ _id }) => _id === link_id)
      .map(({ estado }) => estado);

    const implementacionTarjetaKaizen = tarjetaskaizen
      .filter(({ _id }) => _id === link_id)
      .map(({ implementacion }) => implementacion);

    const plan =
      tarjetas &&
      tarjetas
        .filter(({ _id }) => _id === link_id)
        .map(({ planificacion }) => planificacion);

    const imagen =
      tarjetas &&
      tarjetas
        .filter(({ _id }) => _id === link_id)
        .map(({ imagenUrl }) => imagenUrl);

    const imagenFront =
      tarjetaskaizen &&
      tarjetaskaizen
        .filter(({ _id }) => _id === link_id)
        .map(({ imagenFrontUrl }) => imagenFrontUrl);

    const imagenBack =
      tarjetaskaizen &&
      tarjetaskaizen
        .filter(({ _id }) => _id === link_id)
        .map(({ imagenBackUrl }) => imagenBackUrl);

    const tarjetasCheck =
      tarjetas &&
      tarjetas.filter(({ _id }) => _id === link_id).map(({ codigo }) => codigo);
    const kaizenCheck =
      tarjetaskaizen &&
      tarjetaskaizen
        .filter(({ _id }) => _id === link_id)
        .map(({ codigo }) => codigo);

    console.log(
      implementacionTarjetaKaizen[0] && implementacionTarjetaKaizen.toString()
    );

    return (
      <div>
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <Container className="container-fluid">
              {estadoTarjeta[0] !== null &&
                estadoTarjeta.toString() === "Cerrada" && (
                  <div>
                    <Row>
                      <Col>
                        <TextDetail
                          tarjetas={tarjetas}
                          link_id={link_id}
                          tarjetaskaizen={tarjetaskaizen}
                        ></TextDetail>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={6} lg={6}>
                        <AbiertaDetalle
                          tarjetas={tarjetas}
                          tarjetaskaizen={tarjetaskaizen}
                          link_id={link_id}
                        ></AbiertaDetalle>
                      </Col>

                      <Col sm={6} lg={6}>
                        <CerradaDetalle
                          tarjetas={tarjetas}
                          link_id={link_id}
                          tarjetaskaizen={tarjetaskaizen}
                        ></CerradaDetalle>
                      </Col>
                    </Row>
                    {plan[0] && (
                      <Row>
                        <Col>
                          <PlanificacionDetalle
                            tarjetas={tarjetas}
                            link_id={link_id}
                          ></PlanificacionDetalle>
                        </Col>
                      </Row>
                    )}
                    {imagen[0] && (
                      <Row>
                        <Col>
                          <ImagenDetalle
                            tarjetas={tarjetas}
                            link_id={link_id}
                          ></ImagenDetalle>
                        </Col>
                      </Row>
                    )}
                  </div>
                )}
              {estadoTarjeta[0] !== null &&
                estadoTarjeta.toString() === "Abierta" && (
                  <div>
                    <Row>
                      <Col>
                        <TextDetail
                          tarjetas={tarjetas}
                          link_id={link_id}
                          tarjetaskaizen={tarjetaskaizen}
                        ></TextDetail>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6} lg={6}>
                        <AbiertaDetalle
                          className="text-center"
                          tarjetas={tarjetas}
                          tarjetaskaizen={tarjetaskaizen}
                          link_id={link_id}
                        ></AbiertaDetalle>
                      </Col>
                    </Row>

                    {plan[0] && (
                      <Row>
                        <Col>
                          <PlanificacionDetalle
                            tarjetas={tarjetas}
                            link_id={link_id}
                          ></PlanificacionDetalle>
                        </Col>
                      </Row>
                    )}
                    {imagen[0] && (
                      <Row>
                        <Col>
                          <ImagenDetalle
                            tarjetas={tarjetas}
                            link_id={link_id}
                          ></ImagenDetalle>
                        </Col>
                      </Row>
                    )}
                  </div>
                )}
              {estadoTarjetaKaizen[0] &&
                estadoTarjetaKaizen.toString() === "Abierta" && (
                  <div>
                    <Row>
                      <Col>
                        <TextDetail
                          tarjetas={tarjetas}
                          link_id={link_id}
                          tarjetaskaizen={tarjetaskaizen}
                          implementacion={implementacionTarjetaKaizen.toString()}
                        ></TextDetail>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <AbiertaDetalle
                          tarjetas={tarjetas}
                          tarjetaskaizen={tarjetaskaizen}
                          link_id={link_id}
                        ></AbiertaDetalle>
                      </Col>
                    </Row>

                    {plan[0] && (
                      <Row>
                        <Col>
                          <PlanificacionDetalle
                            tarjetas={tarjetas}
                            link_id={link_id}
                          ></PlanificacionDetalle>
                        </Col>
                      </Row>
                    )}
                    {imagenFront[0] && (
                      <Row>
                        <Col>
                          <ImagenDetalleFront
                            tarjetaskaizen={tarjetaskaizen}
                            link_id={link_id}
                          ></ImagenDetalleFront>
                        </Col>
                      </Row>
                    )}
                    {imagenBack[0] && (
                      <Row>
                        <Col>
                          <ImagenDetalleBack
                            tarjetaskaizen={tarjetaskaizen}
                            link_id={link_id}
                          ></ImagenDetalleBack>
                        </Col>
                      </Row>
                    )}
                  </div>
                )}
              {estadoTarjetaKaizen[0] &&
                estadoTarjetaKaizen.toString() === "Abierta" &&
                implementacionTarjetaKaizen[0] &&
                implementacionTarjetaKaizen.toString() && (
                  <div>
                    <Row>
                      <Col>
                        <CerradaDetalle
                          tarjetas={tarjetas}
                          link_id={link_id}
                          tarjetaskaizen={tarjetaskaizen}
                        ></CerradaDetalle>
                      </Col>
                    </Row>
                    {plan[0] && (
                      <Row>
                        <Col>
                          <PlanificacionDetalle
                            tarjetas={tarjetas}
                            link_id={link_id}
                          ></PlanificacionDetalle>
                        </Col>
                      </Row>
                    )}
                    {imagenFront[0] && (
                      <Row>
                        <Col>
                          <ImagenDetalleFront
                            tarjetaskaizen={tarjetaskaizen}
                            link_id={link_id}
                          ></ImagenDetalleFront>
                        </Col>
                      </Row>
                    )}
                    {imagenBack[0] && (
                      <Row>
                        <Col>
                          <ImagenDetalleBack
                            tarjetaskaizen={tarjetaskaizen}
                            link_id={link_id}
                          ></ImagenDetalleBack>
                        </Col>
                      </Row>
                    )}
                  </div>
                )}
              {estadoTarjetaKaizen[0] &&
                estadoTarjetaKaizen.toString() === "Cerrada" && (
                  <div>
                    <Row>
                      <Col>
                        <TextDetail
                          tarjetas={tarjetas}
                          link_id={link_id}
                          tarjetaskaizen={tarjetaskaizen}
                        ></TextDetail>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <AbiertaDetalle
                          tarjetas={tarjetas}
                          tarjetaskaizen={tarjetaskaizen}
                          link_id={link_id}
                        ></AbiertaDetalle>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <CerradaDetalle
                          tarjetas={tarjetas}
                          link_id={link_id}
                          tarjetaskaizen={tarjetaskaizen}
                        ></CerradaDetalle>
                      </Col>
                    </Row>
                    {plan[0] && (
                      <Row>
                        <Col>
                          <PlanificacionDetalle
                            tarjetas={tarjetas}
                            link_id={link_id}
                          ></PlanificacionDetalle>
                        </Col>
                      </Row>
                    )}
                    {imagenFront[0] && (
                      <Row>
                        <Col>
                          <ImagenDetalleFront
                            tarjetaskaizen={tarjetaskaizen}
                            link_id={link_id}
                          ></ImagenDetalleFront>
                        </Col>
                      </Row>
                    )}
                    {imagenBack[0] && (
                      <Row>
                        <Col>
                          <ImagenDetalleBack
                            tarjetaskaizen={tarjetaskaizen}
                            link_id={link_id}
                          ></ImagenDetalleBack>
                        </Col>
                      </Row>
                    )}
                  </div>
                )}
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tarjetas: state.tarjetas,
    tarjetaskaizen: state.tarjetaskaizen,
  };
};
export default connect(mapStateToProps, { getTarjetas, getKaizen })(
  LayoutDetalle
);
