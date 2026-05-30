import React, { Component } from "react";
import { Card, CardBody, Media, Row, Col } from "reactstrap";
import UploadImageDespuesModal from "./UploadImageDespuesModal";

export class ImagenDetalleDespues extends Component {
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
            .map(({ color, numero, imagenDespuesUrl }) => {
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

                            <div className="ml-auto d-flex no-block align-items-center">
                              <div className="dl">
                                <UploadImageDespuesModal
                                  p={true}
                                  button={false}
                                  replace={true}
                                  _id={link_id}
                                ></UploadImageDespuesModal>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Media>
                        <Media style={imgStyle} object src={imagenDespuesUrl} />
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

export default ImagenDetalleDespues;
