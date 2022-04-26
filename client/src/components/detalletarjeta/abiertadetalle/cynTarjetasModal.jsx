import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Table,
  FormGroup,
  Col,
  Row,
  Form,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getTarjetas } from "../../../store/actions/tarjetaActions";

const CynTarjetasModal = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const { tarjetas } = props.tarjetas;

  const history = useHistory();

  const handleRowClick = (link) => {
    history.push(`${link}`);
  };

  return (
    <div>
      <p onClick={toggle}>Ver</p>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Color y Numero Tarjetas</ModalHeader>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th>Numero</th>
                <th>Color</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>

            {props.preTarjeta &&
              props.preTarjeta.map((item, index) => {
                const idTarjeta =
                  tarjetas &&
                  tarjetas
                    .filter(
                      ({ numero, color }) =>
                        color === item.color && numero === item.numero
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
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      {item.numero}
                    </th>

                    <td>{item.color}</td>

                    <td>
                      {tarjetas &&
                        tarjetas
                          .filter(
                            ({ numero, color }) =>
                              color === item.color && numero === item.numero
                          )
                          .map(({ estado }) => {
                            return estado;
                          })}
                    </td>
                  </tr>
                );
              })}
          </Table>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tarjetas: state.tarjetas,
  };
};
export default connect(mapStateToProps, { getTarjetas })(CynTarjetasModal);
