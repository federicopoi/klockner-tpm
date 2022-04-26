import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../store/actions/usersActions";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  CardBody,
  Card,
  Table,
} from "reactstrap";
export class HorasModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    function propComparator(prop) {
      return function (a, b) {
        return a[prop] - b[prop];
      };
    }

    let user =
      this.props.users.users &&
      this.props.users.users.filter((a) => {
        if (a._id == this.props._id) {
          return a;
        }
      });

    const hours = user[0].hours.sort(propComparator("date"));
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

    return (
      <div>
        <Button
          className="bg-secondary border-secondary ml-3"
          onClick={this.toggle}
        >
          Ver Horas
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Ver horas</ModalHeader>
          <ModalBody>
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
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  users: state.users,
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  getUsers,
})(HorasModal);
