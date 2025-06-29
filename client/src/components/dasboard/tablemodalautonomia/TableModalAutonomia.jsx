import React, { useState } from "react";
import { Card, CardBody, Table } from "reactstrap";
import { utils, writeFile } from "xlsx";

const TableModalAutonomia = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const exportToExcel = () => {
    // Get the table element
    const table = document.getElementById("emp");
    // Convert table to worksheet
    const wb = utils.table_to_book(table);
    // Write the file
    writeFile(wb, "ReporteTarjetas.xlsx");
  };

  return (
    <div>
      <Card>
        <CardBody>
          <div className="d-flex align-items-center mb-3">
            <h3 className="mb-0">Tabla</h3>
            <div className="ml-auto">
              <button className="btn btn-info" onClick={exportToExcel}>
                Exportar excel
              </button>
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
