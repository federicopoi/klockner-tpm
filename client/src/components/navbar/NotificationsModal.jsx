import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Container,
} from "reactstrap";

const NotificationsModal = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const [name, setName] = useState("");

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="link" onClick={toggle}>
        Notifications
      </Button>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Notificaciones</ModalHeader>
        <Container>
          <Input type="text" onChange={(e) => setName(e.target.value)} />
        </Container>
      </Modal>
    </div>
  );
};

export default NotificationsModal;
