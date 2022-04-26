import React, { Component } from "react";
import { connect } from "react-redux";
import { getTarjetas } from "../../store/actions/tarjetaActions";
import { getKaizen } from "../../store/actions/kaizenActions";
import { loadUser } from "../../store/actions/authActions";
import { Card, CardBody, Row, Col, Table, Button, Container } from "reactstrap";
import moment from "moment";
import { Link, Redirect } from "react-router-dom";
import MaterialTable from "material-table";

export class MisTarjetas extends Component {
  componentDidMount() {
    this.props.getTarjetas();
    this.props.getKaizen();
    this.props.loadUser();
    window.scrollTo(0, 0);
  }

  render() {
    if (this.props.isAuthenticated === false && this.props.isLoading === false)
      return <Redirect to="/login" />;

    const { tarjetas } = this.props.tarjetas;
    console.log(this.props.tarjetaskaizen);

    function customRender(
      value,
      renderType,
      renderFunc,
      field1,
      field2,
      ...args
    ) {
      if (renderType === "row") {
        return renderFunc(value[field1], value[field2], ...args);
      }
      if (renderType === "group") {
        return value;
      }
    }
    function renderCellData(numero, _id) {
      return (
        <Link to={{ pathname: `/tarjeta/${_id}` }}>
          <h5 className="mb-0 font-16 font-medium">{numero}</h5>
        </Link>
      );
    }
    function renderCellData2(color) {
      return (
        (color === "Verde" && (
          <li className="border-0 p-0 text-success list-inline-item">
            <i className="fa fa-circle"></i> {color}
          </li>
        )) ||
        (color === "Roja" && (
          <li className="border-0 p-0 text-danger list-inline-item">
            <i className="fa fa-circle"></i> {color}
          </li>
        )) ||
        (color === "Azul" && (
          <li className="border-0 p-0 text-info list-inline-item">
            <i className="fa fa-circle"></i> {color}
          </li>
        )) ||
        (color === "Amarilla" && (
          <li className="border-0 p-0 text-warning list-inline-item">
            <i className="fa fa-circle"></i> {color}
          </li>
        ))
      );
    }

    return (
      <div>
        <div>
          <div className="page-wrapper d-block">
            <div className="page-content container-fluid">
              <Container>
                <Row>
                  <Col>
                    <div className="d-sm-flex align-items-center">
                      <div className="">
                        <div>
                          <h2 className="mb-3">Tarjetas</h2>
                        </div>

                        <div className="ml-auto d-sm-flex no-block align-items-center mb-3 d-sm-flex">
                          <div className="dl">
                            <h5 className="font-weight-normal">
                              Todas las tarjetas en la base de datos
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="ml-auto d-sm-flex no-block align-items-center mb-3">
                        <Col>
                          <Link to="/agregartarjeta">
                            <Button color="success" className="btn">
                              Agregar Tarjeta
                            </Button>
                          </Link>
                        </Col>
                      </div>
                    </div>
                  </Col>
                </Row>

                <MaterialTable
                  title=""
                  data={tarjetas}
                  options={{
                    filtering: true,
                    sorting: true,
                    exportButton: true,
                    search: true,
                    pageSize: 10,
                    emptyRowsWhenPaging: true,
                    pageSizeOptions: [10, 20, 100, tarjetas.length],
                    grouping: true,
                  }}
                  localization={{
                    pagination: {
                      labelDisplayedRows: "{from}-{to} of {count}",
                      labelRowsSelect: "filas",
                    },
                    toolbar: {
                      nRowsSelected: "{0} row(s) selected",
                      searchPlaceholder: "Buscar",
                      searchTooltip: "Buscar",
                      exportTitle: "Exportar",
                      exportAriaLabel: "Exportar",
                    },
                    grouping: {
                      placeholder:
                        "Arrastra los encabezados aquí para agruparlos por",
                    },
                    header: {
                      actions: "Acciones",
                    },

                    body: {
                      emptyDataSourceMessage: "Sin datos para mostrar",
                      filterRow: {
                        filterTooltip: "Filtrar",
                      },
                    },
                  }}
                  columns={[
                    {
                      title: "N°",
                      field: "numero",
                      render: (value, renderType) =>
                        customRender(
                          value,
                          renderType,
                          renderCellData,
                          "numero",
                          "_id"
                        ),
                    },
                    {
                      title: "Color",
                      field: "color",
                      render: (value, renderType) =>
                        customRender(
                          value,
                          renderType,
                          renderCellData2,
                          "color"
                        ),
                    },
                    { title: "Equipo Autonomo", field: "equipo" },
                    { title: "Prioridad", field: "prioridad" },
                    {
                      title: "Fecha apertura",
                      field: "fecha",
                      render: (rowData) =>
                        moment(rowData.fecha).format("DD/MM/YYYY LTS"),
                    },
                    { title: "Descripción anomalia", field: "descripcion" },
                    {
                      title: "Estado actual",
                      field: "estado",
                    },
                    {
                      title: "",
                      render: (rowData) => (
                        <Link to={{ pathname: `/tarjeta/${rowData._id}` }}>
                          <Button
                            color="success"
                            className="btn bg-secondary border border-secondary"
                          >
                            Ver detalle
                          </Button>
                        </Link>
                      ),
                    },
                  ]}
                />
              </Container>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tarjetas: state.tarjetas,
    tarjetaskaizen: state.tarjetaskaizen,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, { getTarjetas, getKaizen, loadUser })(
  MisTarjetas
);
