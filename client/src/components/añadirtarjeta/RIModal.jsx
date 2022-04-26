import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Media } from "reactstrap";
import Image from "./RIImage.png";
const RIModal = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  var imgStyle = {
    minWidth: "128px",
    maxWidth: window.innerWidth,
  };
  return (
    <div>
      <Button color="danger" onClick={toggle} color="link">
        <span role="img">ℹ️</span>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Riesgo Inicial</ModalHeader>
        <ModalBody>
          <Media>
            <Media style={imgStyle} object src={Image} />
          </Media>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default RIModal;
