import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import QRCode from "qrcode.react";
import PrintComponents from "react-print-components";
const QRModal = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const link = props.completePath + props.path;

  return (
    <div>
      <p onClick={toggle} style={{ cursor: "pointer" }} className="my-3">
        Mostrar QR
      </p>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Código QR</ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <QRCode value={link} />

              <h4 className="mt-3">
                Tarjeta {props.color} N°{props.numero}
              </h4>
              <PrintComponents
                trigger={<Button>Imprimir</Button>}
                className="mt-3"
              >
                <QRCode value={link} />

                <h4 className="mt-3">
                  Tarjeta {props.color} N°{props.numero}
                </h4>
              </PrintComponents>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default QRModal;
