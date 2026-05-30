import React, { Component } from "react";
import { Card, CardBody, Media, Row, Col } from "reactstrap";
import UploadImageAntesModal from "./UploadImageAntesModal";

export class ImagenDetalleAntes extends Component {
  render() {
    const { tarjetas, link_id } = this.props;

    var imgStyle = {
      minWidth: "128px",
      maxWidth: window.innerWidth,
    };

    return (
      <div>
        {tarjetas &&
          tarjetas
            .filter(({ _id }) => _id === link_id)
            .map(({ color, numero, imagenAntesUrl }) => {
              return (
                <div>
                  <Card>
                    <CardBody>
                      <Row className="mb-3">
                        <Col>
                          <div className="d-flex align-items-center">
                            <div>
                              <h3>Imagen del antes</h3>
                            </div>

                            <div className="ml-auto d-flex no-block align-items-center">
                              <div className="dl">
                                <UploadImageAntesModal
                                  p={true}
                                  button={false}
                                  _id={link_id}
                                ></UploadImageAntesModal>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Media>
                        <Media style={imgStyle} object src={imagenAntesUrl} />
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

export default ImagenDetalleAntes;
