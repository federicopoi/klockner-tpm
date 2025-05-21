import React from "react";
import { Card, CardBody, Table } from "reactstrap";
import { utils, writeFile } from "xlsx";

const TableModal = (props) => {
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
          <div className="d-flex align-items-center">
            <div className="">
              <h3 className="mb-3">Tabla</h3>
            </div>
            <div className="ml-auto d-flex no-block align-items-center">
              <div className="dl">
                <button className="btn btn-info" onClick={exportToExcel}>
                  Exportar excel
                </button>
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
                <td>Acumuladas (abiertas)</td>
                {props.fechas.map((item, index) => {
                  return <td>{props.tarjetasFiltro1[index]}</td>;
                })}
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Acumuladas (cerradas)</td>
                {props.fechas.map((item, index) => {
                  return <td>{props.tarjetasFiltro2[index]}</td>;
                })}
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Porcentaje (cerradas)</td>
                {props.fechas.map((item, index) => {
                  const porcentaje =
                    (props.tarjetasFiltro3[index] /
                      props.tarjetasFiltro1[index]) *
                    100;
                  return <td>{porcentaje.toString().slice(0, 4)}%</td>;
                })}
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Por mes abiertas</td>
                {props.fechas.map((item, index) => {
                  return <td>{props.tarjetasmesabiertas[index]}</td>;
                })}
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Por mes cerradas</td>
                {props.fechas.map((item, index) => {
                  return <td>{props.tarjetasmescerradas[index]}</td>;
                })}
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default TableModal;
