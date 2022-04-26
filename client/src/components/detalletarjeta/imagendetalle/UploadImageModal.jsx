import React, { useState } from "react";
import { Button, Modal, ModalHeader } from "reactstrap";
import { connect } from "react-redux";
import { agregarImagen } from "../../../store/actions/tarjetaActions";
import Axios from "axios";

const UploadImageModal = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [imageSelected, setImageSelected] = useState("");
  const [status, setStatus] = useState("");

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "fdvuocsc");

    Axios.post(
      "https://api.cloudinary.com/v1_1/deqvjdo2m/image/upload",
      formData
    ).then((response) => {
      setStatus(response.status);

      const imagen = {
        _id: props._id,
        imagenUrl: response.data.secure_url,
      };
      console.log(imagen);
      props.agregarImagen(imagen);
    });
  };
  if (status === 200) {
    return toggle;
  }
  return (
    <div>
      {props.button && (
        <Button onClick={toggle} color="secondary" className="my-3">
          Adjuntar Imagen
        </Button>
      )}
      {props.p && (
        <p
          onClick={toggle}
          color="success"
          style={{ cursor: "pointer" }}
          className="my-3"
        >
          Adjuntar Imagen
        </p>
      )}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Adjuntar Imagen</ModalHeader>

        <div className="mt-3 mb-3 ml-3 mr-3">
          <input
            type="file"
            onChange={(event) => {
              setImageSelected(event.target.files[0]);
            }}
          />
        </div>

        <Button color="secondary" onClick={uploadImage}>
          Subir
        </Button>
      </Modal>
    </div>
  );
};

export default connect(null, { agregarImagen })(UploadImageModal);
