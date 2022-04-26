import React, { Component } from "react";
import { Card, CardBody, Media, Row, Col } from "reactstrap";

export class ImagenDetalleBack extends Component {
  render() {
    const { tarjetaskaizen, link_id } = this.props;

    var imgStyle = {
      minWidth: "128px",
      maxWidth: window.innerWidth,
    };

    return (
      <div>
        {tarjetaskaizen &&
          tarjetaskaizen
            .filter(({ _id }) => _id === link_id)
            .map(({ color, numero, imagenBackUrl }) => {
              return (
                <div>
                  <Card>
                    <CardBody>
                      <Row className="mb-3">
                        <Col>
                          <div className="d-flex align-items-center">
                            <div>
                              <h3>Imagen del despues</h3>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Media>
                        <Media style={imgStyle} object src={imagenBackUrl} />
                      </Media>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
      </div>
    );
  }
}

export default ImagenDetalleBack;
