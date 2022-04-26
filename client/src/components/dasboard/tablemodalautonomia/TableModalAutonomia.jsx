import React, { useState } from "react";
import { Card, CardBody, Table } from "reactstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
const TableModalAutonomia = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div className="">
              <h3 className="mb-3">Tabla</h3>
            </div>
            <div className="ml-auto d-flex no-block align-items-center">
              <div className="dl">
                <ReactHTMLTableToExcel
                  className="btn btn-info"
                  table="emp"
                  filename="ReporteTarjetas"
                  sheet="Tarjetas"
                  buttonText="Exportar excel"
                />
              </div>
            </div>
          </div>
          <Table className="no-wrap v-middle" responsive id="emp">
            <thead>
              <tr className="border-0">
                <th className="border-0">Mes</th>
                {props.fechas.map((item) => {
                  return <th className="border-0">{item}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Indice de autonomia</td>
                {props.fechas.map((item, index) => {
                  return (
                    <td>
                      {props.tarjetasFiltro1[index].toString().slice(0, 4)} %
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default TableModalAutonomia;
