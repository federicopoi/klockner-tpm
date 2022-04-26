import React, { useState } from "react";
import { Card, CardBody, Col, Row, Table, Button, Input } from "reactstrap";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { tarjetasHacer } from "../../../store/actions/kaizenActions";

const CerradaDetalle = (props) => {
  const { tarjetas, link_id, tarjetaskaizen } = props;

  const history = useHistory();
  const handleRowClick = (link) => {
    history.push(`${link}`);
  };

  const [numero, setNumero] = useState("");
  const [color, setColor] = useState("");

  const handleNumero = (e) => {
    setNumero(e.target.value);
  };

  const handleColor = (e) => {
    setColor(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();

    const tarjetasHacer = {
      _id: props.link_id,
      numero,
      color,
    };
    props.tarjetasHacer(tarjetasHacer);
    setNumero("");
    setColor("");
  };

  return (
    <div>
      {tarjetas &&
        tarjetas
          .filter(({ _id }) => _id === link_id)
          .map(
            ({
              _id,
              inicioReparacion,
              finReparacion,
              responsable,
              tiempoEmpleado,
              causa,
              tareaRealizada,
              materialUtilizado,
              convertida,
              riesgoFinal,
              verificacion,
              accionesComplementarias,
              color,
              tipoAccion,
            }) => {
              return (
                <div>
                  {color === "Azul" && <div class="trapezoidAzul"></div>}
                  {color === "Verde" && <div class="trapezoidVerde"></div>}
                  {color === "Roja" && <div class="trapezoidRojo"></div>}
                  {color === "Amarilla" && (
                    <div class="trapezoidAmarilla"></div>
                  )}
                  <Card>
                    <CardBody key={_id}>
                      {color !== "Amarilla" ? (
                        <div>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Inicio de la reparacion:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {inicioReparacion}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Fin de la reparacion:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {finReparacion}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Responsable:{" "}
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {responsable}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Tiemplo empleado:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {tiempoEmpleado} horas
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Tipo de Acción realizada:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {tipoAccion}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Riesgo Final:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {riesgoFinal}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Tarjeta convertida
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {convertida ? (
                                <h5 className="font-14 font-weight-normal">
                                  Si
                                </h5>
                              ) : (
                                <h5 className="font-14 font-weight-normal">
                                  No
                                </h5>
                              )}
                            </h5>
                          </Row>
                          {color !== "Verde" && (
                            <div>
                              <Row className="my-3 text-center">
                                <Col>
                                  <h5 className="font-16 font-medium text-center">
                                    Causa de la anomalia:
                                  </h5>
                                </Col>
                              </Row>
                              <Row className="text-center">
                                <Col>
                                  <h5 className="font-14 font-weight-normal">
                                    {causa}
                                  </h5>
                                </Col>
                              </Row>
                            </div>
                          )}
                          <Row className="my-3 text-center">
                            <Col>
                              <h5 className="font-16 font-medium text-center">
                                Tarea realizada:
                              </h5>
                            </Col>
                          </Row>
                          <Row className="text-center">
                            <Col>
                              <h5 className="font-14 font-weight-normal">
                                {tareaRealizada}
                              </h5>
                            </Col>
                          </Row>
                          <Row className="my-3 text-center">
                            <Col>
                              <h5 className="font-16 font-medium text-center">
                                Material utilizado
                              </h5>
                            </Col>
                          </Row>
                          <Row className="text-center">
                            <Col>
                              <h5 className="font-14 font-weight-normal">
                                {materialUtilizado}
                              </h5>
                            </Col>
                          </Row>
                        </div>
                      ) : (
                        <div>
                          <Row className="my-3 text-center">
                            <Col>
                              <h5 className="font-16 font-medium text-center">
                                Acción realizada
                              </h5>
                            </Col>
                          </Row>
                          <Row className="text-center">
                            <Col>
                              <h5 className="font-14 font-weight-normal">
                                {tareaRealizada}
                              </h5>
                            </Col>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Responsable:{" "}
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {responsable}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">Causa:</h5>
                            <h5 className="font-14 font-weight-normal">
                              {causa}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Fin de terminación:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {finReparacion}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Verificacion (Resp. Pilar de seguridad)
                            </h5>
                            {verificacion ? (
                              <h5 className="font-14 font-weight-normal">Si</h5>
                            ) : (
                              <h5 className="font-14 font-weight-normal">No</h5>
                            )}
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Riesgo Final:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {riesgoFinal}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Acciones complementarias:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {accionesComplementarias}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Tipo de Acción realizada:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {tipoAccion}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Tarjeta convertida
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {convertida ? (
                                <h5 className="font-14 font-weight-normal">
                                  Si
                                </h5>
                              ) : (
                                <h5 className="font-14 font-weight-normal">
                                  No
                                </h5>
                              )}
                            </h5>
                          </Row>
                        </div>
                      )}
                    </CardBody>
                    {color === "Azul" && <div class="rectangleAzul"></div>}
                    {color === "Verde" && <div class="rectangleVerde"></div>}
                    {color === "Roja" && <div class="rectangleRojo"></div>}
                    {color === "Amarilla" && (
                      <div class="rectangleAmarilla"></div>
                    )}
                  </Card>
                </div>
              );
            }
          )}
      {tarjetaskaizen &&
        tarjetaskaizen
          .filter(({ _id }) => _id === link_id)
          .map(
            ({
              _id,
              descripcionProblema,
              objetivo,
              causas,
              acciones,
              tarjetasHacer,
              objectivoCompletado,
              documentos,
              otraMaquina,
              responsableSeguimiento,
              fechaFinalizacionMejora,
              costo,
              beneficio,

              verificacion,
            }) => {
              return (
                <div>
                  {/* <div class="trapezoidKaizen"></div> */}
                  <Row>
                    <Col>
                      <Card>
                        <CardBody key={_id}>
                          <div>
                            <h5 className="mb-3 text-center">Planificar</h5>
                            <Row className="my-1 ml-2">
                              <h5 className="font-16 font-medium mr-2">
                                Descripción del problema:
                              </h5>
                              <h5 className="font-14 font-weight-normal">
                                {descripcionProblema}
                              </h5>
                            </Row>
                            <Row className="my-1 ml-2">
                              <h5 className="font-16 font-medium mr-2">
                                Objectivo:
                              </h5>
                              <h5 className="font-14 font-weight-normal">
                                {objetivo}
                              </h5>
                            </Row>
                            <Row className="my-1 ml-2">
                              <h5 className="font-16 font-medium mr-2">
                                Causas:
                              </h5>
                              <h5 className="font-14 font-weight-normal">
                                {causas}
                              </h5>
                            </Row>
                            <Row className="my-1 ml-2">
                              <h5 className="font-16 font-medium mr-2">
                                Acciones a tomar
                              </h5>
                              <h5 className="font-14 font-weight-normal">
                                {acciones}
                              </h5>
                            </Row>
                          </div>
                        </CardBody>
                        {/* <div class="rectangleKaizen"></div> */}
                      </Card>
                    </Col>

                    <Col>
                      <Card>
                        <CardBody key={_id}>
                          <div>
                            <h5 className="mt-3 mb-3 text-center">Hacer</h5>
                            <Row className="my-1 ml-2">
                              <Table>
                                <thead>
                                  <tr>
                                    <th>Numero</th>
                                    <th>Color</th>
                                    <th>Estado</th>
                                    <th>Descripcion</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                {tarjetasHacer &&
                                  tarjetasHacer.map((item) => {
                                    const idTarjeta =
                                      tarjetas &&
                                      tarjetas
                                        .filter(
                                          ({ numero, color }) =>
                                            color === item.color &&
                                            numero === item.numero
                                        )
                                        .map(({ _id }) => {
                                          return _id;
                                        });
                                    const link = `/tarjeta/${idTarjeta}`;
                                    return (
                                      <tr>
                                        <th
                                          scope="row"
                                          onClick={() => handleRowClick(link)}
                                          style={{
                                            cursor: "pointer",
                                            color: "blue",
                                          }}
                                        >
                                          {item.numero}
                                        </th>

                                        <td>{item.color}</td>

                                        <td>
                                          {tarjetas &&
                                            tarjetas
                                              .filter(
                                                ({ numero, color }) =>
                                                  color === item.color &&
                                                  numero === item.numero
                                              )
                                              .map(({ estado }) => {
                                                return estado;
                                              })}
                                        </td>
                                        <td>
                                          {" "}
                                          {tarjetas &&
                                            tarjetas
                                              .filter(
                                                ({ numero, color }) =>
                                                  color === item.color &&
                                                  numero === item.numero
                                              )
                                              .map(({ descripcion }) => {
                                                return descripcion;
                                              })}
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </Table>
                              <Row>
                                <Col>
                                  <Input
                                    className="mt-3"
                                    type="number"
                                    name="numero"
                                    id="numero"
                                    placeholder="Numero"
                                    value={numero}
                                    onChange={handleNumero}
                                  ></Input>
                                </Col>
                                <Col>
                                  <Input
                                    type="select"
                                    className="mt-3"
                                    name="color"
                                    id="color"
                                    placeholder="Color"
                                    value={color}
                                    onChange={handleColor}
                                  >
                                    <option>Seleccionar</option>
                                    <option>Roja</option>
                                    <option>Azul</option>
                                    <option>Verde</option>
                                    <option>Amarilla</option>
                                  </Input>
                                </Col>
                                <Col>
                                  <form onSubmit={submitForm}>
                                    <Button className="mt-3">Agregar</Button>
                                  </form>
                                </Col>
                              </Row>
                            </Row>
                          </div>
                        </CardBody>
                        {/* <div class="rectangleKaizen"></div> */}
                      </Card>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Card>
                        <CardBody key={_id}>
                          <div>
                            <h5 className="mt-3 text-center">Estandarizar</h5>
                            <Row className="my-1 ml-2">
                              <h5 className="font-16 font-medium mr-2">
                                Documentos que debemos cambiar para consolidar
                                la mejora:
                              </h5>
                              <h5 className="font-14 font-weight-normal">
                                {documentos}
                              </h5>
                            </Row>
                            <Row className="my-1 ml-2">
                              <h5 className="font-16 font-medium mr-2">
                                En qué otra parte/máquina podemos aplicar la
                                mejora:
                              </h5>
                              <h5 className="font-14 font-weight-normal">
                                {otraMaquina}
                              </h5>
                            </Row>
                            {/* <hr className="solid mt-3"></hr> */}
                          </div>
                        </CardBody>
                        {/* <div class="rectangleKaizen"></div> */}
                      </Card>
                    </Col>
                    <Col>
                      <Card>
                        <CardBody key={_id}>
                          <div>
                            <h5 className="mt-3 text-center">Chequear</h5>
                            <Row className="my-1 ml-2">
                              <h5 className="font-16 font-medium mr-2">
                                ¿Se logró el objetivo?:
                              </h5>
                              <h5 className="font-14 font-weight-normal">
                                {objectivoCompletado}
                              </h5>
                            </Row>
                          </div>
                        </CardBody>
                        {/* <div class="rectangleKaizen"></div> */}
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Card>
                        <CardBody>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Responsable del seguimiento de la mejora:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {responsableSeguimiento}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Fecha de finalización de la mejora:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {moment(fechaFinalizacionMejora).format(
                                "DD/MM/YYYY"
                              )}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">Costo:</h5>
                            <h5 className="font-14 font-weight-normal">
                              {costo}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Beneficio:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {beneficio}
                            </h5>
                          </Row>

                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Verificación:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {verificacion}
                            </h5>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
              );
            }
          )}
    </div>
  );
};

export default connect(null, { tarjetasHacer })(CerradaDetalle);
