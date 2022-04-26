import { Description } from "@material-ui/icons";
import React, { Component } from "react";
import { Card, CardBody, Col, Row, Table, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
export class Notifications extends Component {
  render() {
    const user = this.props.user;
    const names = user && user.split(" ");
    const firstName = names && names[0];
    const lastName = names && names[1];
    const fullName = firstName && firstName.charAt(0) + ". " + lastName;

    const tarjetas = this.props.tarjetas
      .filter(
        ({ detecto, estado }) => detecto === fullName && estado === "Cerrada"
      )
      .sort(function (a, b) {
        var dateA = new Date(a.finReparacion),
          dateB = new Date(b.finReparacion);
        return dateB - dateA;
      })
      .slice(0, 5);
    return (
      <div>
        <h2 className="mb-3">Notificaciones</h2>
        <p>
          Este es el listado de las últimas 5 tarjetas cerradas que Ud
          confeccionó
        </p>

        {tarjetas &&
          tarjetas.map(
            ({
              numero,
              color,
              finReparacion,
              tareaRealizada,
              descripcion,
              _id,
            }) => {
              return (
                <div>
                  <Card>
                    <Link to={`/tarjeta/${_id}`}>
                      <CardHeader
                        className={`${color === "Verde" ? "bg-success" : ""} ${
                          color === "Roja" ? "bg-danger" : ""
                        } ${color === "Amarilla" ? "bg-warning" : ""} ${
                          color === "Azul" ? "bg-primary" : ""
                        }`}
                      >
                        <h5 className="text-center text-white">
                          Tarjeta {color} N° {numero}
                        </h5>
                      </CardHeader>
                    </Link>
                    <CardBody>
                      <Row>
                        <Col>
                          <h5 className="font-16 font-medium mr-2">
                            Tarea Realizada:
                          </h5>
                          <h5 className="font-14 font-weight-normal">
                            {tareaRealizada}
                          </h5>
                        </Col>
                        <Col>
                          <h5 className="font-16 font-medium mr-2">
                            Tarjeta Cierre:
                          </h5>
                          <h5 className="font-14 font-weight-normal">
                            {finReparacion}
                          </h5>
                        </Col>
                      </Row>

                      <h5 className="font-16 font-medium mr-2">Descripcion:</h5>
                      <h5 className="font-14 font-weight-normal">
                        {descripcion}
                      </h5>
                    </CardBody>
                  </Card>
                </div>
              );
            }
          )}
      </div>
    );
  }
}

export default Notifications;
