import React, { Component } from "react";
import {
  Card,
  CardBody,
  Table,
  Label,
  Input,
  Row,
  Col,
  Form,
  Alert,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  CardTitle,
  CardText,
} from "reactstrap";
import { connect } from "react-redux";
import classnames from "classnames";
import { agregarHoras, getUsers } from "../../store/actions/usersActions";
export class MisHoras extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  state = {
    _id: this.props.user && this.props.user._id,
    quantity: "",
    typeOf: "",
    date: "",
    alert: false,
    message: "",
    activeTab: "1",
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { quantity, typeOf, date } = this.state;

    // Agregar Hora
    const nuevaHora = {
      _id: this.state._id,
      quantity,
      typeOf,
      date,
    };

    this.props.agregarHoras(nuevaHora);

    e.target.reset();

    this.setState({
      message: `Se ha agregado ${quantity} horas a ${typeOf}`,
      alert: true,
    });
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  render() {
    function propComparator(prop) {
      return function (a, b) {
        return a[prop] - b[prop];
      };
    }
    function getHours(userName, props) {
      const user = props.filter(({ name }) => name === "Federico Poi");
      const hours = user[0] && user[0].hours.sort(propComparator("date"));
      const allDates = hours && hours.map(({ date }) => date.substring(0, 7));
      let uniqueDates = [...new Set(allDates)];

      // Para primero
      const dic = [];
      hours &&
        hours.forEach((obj) => {
          uniqueDates.forEach((item) => {
            if (obj["typeOf"] === "Horas de actividades autonomas") {
              if (obj["date"].substring(0, 7) === item) {
                dic.push({
                  key: obj["date"].substring(0, 7),
                  value: obj["quantity"],
                });
                // console.log(`push${obj["date"]}`);
              }
            } else {
              dic.push({ key: obj["date"].substring(0, 7), value: "0" });
            }
          });
        });
      var holder = {};

      dic &&
        dic.forEach(function (d) {
          if (holder.hasOwnProperty(d.key)) {
            holder[d.key] = holder[d.key] + parseInt(d.value);
          } else {
            holder[d.key] = parseInt(d.value);
          }
        });

      var obj2 = [];

      for (var prop in holder) {
        obj2.push({ key: prop, value: holder[prop] });
      }
      return obj2;
    }
    const hours =
      this.props.user && this.props.user.hours.sort(propComparator("date"));
    const allDates = hours && hours.map(({ date }) => date.substring(0, 7));
    let uniqueDates = [...new Set(allDates)];

    // Para primero
    const dic = [];
    hours &&
      hours.forEach((obj) => {
        uniqueDates.forEach((item) => {
          if (obj["typeOf"] === "Horas de actividades autonomas") {
            if (obj["date"].substring(0, 7) === item) {
              dic.push({
                key: obj["date"].substring(0, 7),
                value: obj["quantity"],
              });
              // console.log(`push${obj["date"]}`);
            }
          } else {
            dic.push({ key: obj["date"].substring(0, 7), value: "0" });
          }
        });
      });
    var holder = {};

    dic &&
      dic.forEach(function (d) {
        if (holder.hasOwnProperty(d.key)) {
          holder[d.key] = holder[d.key] + parseInt(d.value);
        } else {
          holder[d.key] = parseInt(d.value);
        }
      });

    var obj2 = [];

    for (var prop in holder) {
      obj2.push({ key: prop, value: holder[prop] });
    }

    // Para segundo
    const dic1 = [];
    hours &&
      hours.forEach((obj) => {
        uniqueDates.forEach((item) => {
          if (obj["typeOf"] === "Horas recibidas de capacitacion") {
            if (obj["date"].substring(0, 7) === item) {
              dic1.push({
                key: obj["date"].substring(0, 7),
                value: obj["quantity"],
              });
              // console.log(`push${obj["date"]}`);
            }
          } else {
            dic1.push({ key: obj["date"].substring(0, 7), value: "0" });
          }
        });
      });

    var holder1 = {};

    dic1 &&
      dic1.forEach(function (d) {
        if (holder1.hasOwnProperty(d.key)) {
          holder1[d.key] = holder1[d.key] + parseInt(d.value);
        } else {
          holder1[d.key] = parseInt(d.value);
        }
      });

    var obj3 = [];

    for (var prop in holder1) {
      obj3.push({ key: prop, value: holder1[prop] });
    }

    // Para tercera
    const dic2 = [];
    hours &&
      hours.forEach((obj) => {
        uniqueDates.forEach((item) => {
          if (obj["typeOf"] === "Horas dadas de capacitacion") {
            if (obj["date"].substring(0, 7) === item) {
              dic2.push({
                key: obj["date"].substring(0, 7),
                value: obj["quantity"],
              });
              // console.log(`push${obj["date"]}`);
            }
          } else {
            dic2.push({ key: obj["date"].substring(0, 7), value: "0" });
          }
        });
      });

    var holder2 = {};

    dic2 &&
      dic2.forEach(function (d) {
        if (holder2.hasOwnProperty(d.key)) {
          holder2[d.key] = holder2[d.key] + parseInt(d.value);
        } else {
          holder2[d.key] = parseInt(d.value);
        }
      });

    var obj4 = [];

    for (var prop in holder2) {
      obj4.push({ key: prop, value: holder2[prop] });
    }

    const alimentacion = [
      "Juan Marquez",
      "Marcos Sepulveda",
      "Diego Moya",
      "Jorge Camaño",
      "Andres Netter",
      "Romina Bauducco",
      "Juan Marquez",
    ];

    console.log(getHours("Federico Poi", this.props.users.users));

    return (
      <div>
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1",
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    Mis horas
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2",
                    })}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    Horas de todos
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "3",
                    })}
                    onClick={() => {
                      this.toggle("3");
                    }}
                  >
                    Horas por equipo autonomo
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <h2 className="mb-3 mt-3">Mis horas de Autónomo</h2>
                  <Form onSubmit={this.onSubmit}>
                    <Row className="mb-3">
                      <Col>
                        <Label for="quantity">Numero de horas *</Label>
                        <Input
                          type="text"
                          name="quantity"
                          id="quantity"
                          onChange={this.onChange}
                        />
                      </Col>
                      <Col>
                        <Label for="typeOf">Tipo</Label>
                        <Input
                          type="select"
                          name="typeOf"
                          id="typeOf"
                          onChange={this.onChange}
                        >
                          <option>Seleccionar</option>
                          <option>Horas de actividades autonomas</option>
                          <option>Horas recibidas de capacitacion</option>
                          <option>Horas dadas de capacitacion</option>
                        </Input>
                      </Col>
                      <Col>
                        <Label for="date">Fecha</Label>
                        <Input
                          type="date"
                          name="date"
                          id="date"
                          onChange={this.onChange}
                        />
                      </Col>

                      <Col className="align-items-center">
                        <Button style={{ position: "absolute", bottom: "0" }}>
                          Subir
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  {this.state.alert && (
                    <Alert color="success">{this.state.message}</Alert>
                  )}
                  <Card>
                    <CardBody>
                      <Table className="no-wrap v-middle" responsive id="emp">
                        <thead>
                          <tr>
                            <th>Mes</th>
                            {uniqueDates.map((item) => {
                              return <th>{item}</th>;
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Horas de actividades autonomas</td>
                            {uniqueDates.map((item) => {
                              return (
                                obj2 &&
                                obj2
                                  .filter((it) => it.key.includes(item))
                                  .map((item) => {
                                    return <td>{item.value}</td>;
                                  })
                              );
                            })}
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td>Horas recibidas de capacitacion</td>
                            {uniqueDates.map((item) => {
                              return (
                                obj3 &&
                                obj3
                                  .filter((it) => it.key.includes(item))
                                  .map((item) => {
                                    return <td>{item.value}</td>;
                                  })
                              );
                            })}
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td>Horas dadas de capacitacion</td>
                            {uniqueDates.map((item) => {
                              return (
                                obj4 &&
                                obj4
                                  .filter((it) => it.key.includes(item))
                                  .map((item) => {
                                    return <td>{item.value}</td>;
                                  })
                              );
                            })}
                          </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </TabPane>
                <TabPane tabId="2">
                  <div>
                    <h2 className="mb-3 mt-3">Horas de todos</h2>
                    {this.props.users.users &&
                      this.props.users.users
                        .filter(
                          ({ name, role }) =>
                            name !== undefined && role !== "Admin"
                        )
                        .map(({ name }) => <p>{name}</p>)}
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <div>
                    <h2 className="mb-3 mt-3">Horas por equipo autonomo</h2>
                    {this.props.users.users &&
                      this.props.users.users
                        .filter(
                          ({ name, role }) =>
                            name !== undefined && role !== "Admin"
                        )
                        .map(({ name }) => <p>{name}</p>)}
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, {
  getUsers,
  agregarHoras,
})(MisHoras);
