import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ListGroup,
  Container,
} from "reactstrap";

const VersionControlModal = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <p
        className="text-primary"
        onClick={toggle}
        style={{ cursor: "pointer" }}
      >
        v. 1.4.0
      </p>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Control de Versión</ModalHeader>
        <ModalBody>
          <ListGroup>
            <h6 style={{ fontWeight: "bold" }} className="mb-3">
              Versión 1.4 | 10/01/21
            </h6>
            <div class="row">
              <div class="span12">
                <div class="inside">
                  <Container>
                    <div class="entry-content">
                      <p>
                        &#9642; Se agrego estado "En implementacion" en quick
                        kaizen.
                      </p>
                      <p>&#9642; Se agrego campo Reparacion.</p>
                      <p>
                        &#9642; Nuevo apartado "Notificaciones" donde se pueden
                        mostrar las ultimas 5 tarjetas cerradas del usuario
                      </p>
                    </div>
                  </Container>
                </div>
              </div>
            </div>
            <h6 style={{ fontWeight: "bold" }} className="mb-3">
              Versión 1.3.2 | 08/08/21
            </h6>
            <div class="row">
              <div class="span12">
                <div class="inside">
                  <Container>
                    <div class="entry-content">
                      <p>&#9642; Cambios en campos de tarjetas:</p>
                      <p>
                        &#9642; Campo Causa de Anomalia eliminada de las
                        tarjetas verdes
                      </p>
                      <p>
                        &#9642; Nuevo campo en rojas y azules: Sugerencia para
                        eliminar la anomalía
                      </p>
                      <p>&#9642; Nuevo campo en verdes: Sugerencia de Mejora</p>
                    </div>
                  </Container>
                </div>
              </div>
            </div>
            <h6 style={{ fontWeight: "bold" }} className="mb-3">
              Versión 1.3.1 | 24/05/21
            </h6>
            <div class="row">
              <div class="span12">
                <div class="inside">
                  <Container>
                    <div class="entry-content">
                      <p>
                        &#9642; Verificacion para que la fecha de fin de
                        reparacion sea posterior a la fecha de creacion.
                      </p>

                      <p>&#9642; Tablas mapas de riesgo cambiada.</p>
                      <p>&#9642; Se agrego verificacion al cerrar tarjeta.</p>
                    </div>
                  </Container>
                </div>
              </div>
            </div>
            <h6 style={{ fontWeight: "bold" }} className="mb-3">
              Versión 1.3.0 | 15/04/21
            </h6>
            <div class="row">
              <div class="span12">
                <div class="inside">
                  <Container>
                    <div class="entry-content">
                      <p>&#9642; Tablas mis tarjetas mejorada.</p>
                      <p>
                        &#9642; Graficos muestran ultimos 12 meses para mejor
                        visualización.
                      </p>
                    </div>
                  </Container>
                </div>
              </div>
            </div>
            <h6 style={{ fontWeight: "bold" }} className="mb-3">
              Versión 1.2.3 | 28/02/21
            </h6>
            <div class="row">
              <div class="span12">
                <div class="inside">
                  <Container>
                    <div class="entry-content">
                      <p>
                        &#9642; Función para cambiar rol de usuario agregada.
                      </p>
                      <p>&#9642; Planificacion de tarjeta agregada.</p>
                      <p>
                        &#9642; Tipo de riesgo cambiado a Tipo de R / FC / LDA.
                      </p>
                      <p>
                        &#9642; Tipo de acción cambiado a Tipo de acción a
                        realizar.
                      </p>
                    </div>
                  </Container>
                </div>
              </div>
            </div>
            <h6 style={{ fontWeight: "bold" }} className="mb-3">
              Versión 1.2.2 | 22/01/21
            </h6>
            <div class="row">
              <div class="span12">
                <div class="inside">
                  <Container>
                    <div class="entry-content">
                      <p>
                        &#9642; Login ahora requerido cuando se accede a una
                        tarjeta por qr.
                      </p>
                      <p>
                        &#9642; Cambio de ubicacion de Exportar tarjetas para
                        permitir acceso de Jefe de area.
                      </p>
                      <p>
                        &#9642; Filtrar tarjetas cambiado a Exportar tarjetas
                      </p>
                    </div>
                  </Container>
                </div>
              </div>
            </div>
            <h6 style={{ fontWeight: "bold" }} className="mb-3">
              Versión 1.2.0 | 20/12/20
            </h6>
            <div class="row">
              <div class="span12">
                <div class="inside">
                  <Container>
                    <div class="entry-content">
                      <p>
                        &#9642; Posibilidad de adjuntar imagen a cada tarjeta.
                      </p>
                      <p>&#9642; Tabla de mapas de riesgo agregada.</p>
                      <p>
                        &#9642; Campos dinamicos agregado, los admin pueden
                        elegir que opciones poner en los siguientes campos:
                        Maquina, Parte de maquina, Tipo, Equipo, Riesgo inicial,
                        Riesgo final.
                      </p>
                      <p>
                        &#9642; Redireccionamiento al agregar usuario corregido.
                      </p>
                      <p>&#9642; Error en graficos corregido.</p>
                      <p>
                        &#9642; Redireccionamiento al agregar usuario corregido
                      </p>
                    </div>
                  </Container>
                </div>
              </div>
            </div>
          </ListGroup>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default VersionControlModal;
