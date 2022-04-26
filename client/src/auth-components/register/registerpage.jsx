import React, { Component } from "react";
import { Card } from "reactstrap";
import { connect } from "react-redux";
import { register } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/errorActions";
import { Label, Input, Alert } from "reactstrap";
import { withRouter, Redirect } from "react-router-dom";

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

export class RegisterPage extends Component {
  state = {
    legajo: null,
    pin: null,
    name: "",
    role: "",
    msg: null,
    errors: {
      legajo: "",
      pin: "",
    },
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({
          msg: error.msg.msg,
        });
      } else {
        this.setState({
          msg: null,
        });
      }
    }
    if (this.props.success) {
      this.props.history.push("/admin");
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "legajo":
        errors.legajo =
          value.length > 6 ? "Se permite un maximo de 6 caracteres" : "";
        break;
      case "pin":
        errors.pin =
          value.length < 6 ? "Pin tiene que 6 caracteres minimo" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { legajo, pin, role, name } = this.state;

    const newUser = {
      email: legajo,
      name: name,
      password: pin,
      role,
    };

    if (validateForm(this.state.errors)) {
      console.info("Valid Form");
      if ((legajo !== null) & (pin !== null)) {
        // Atempt to register
        this.props.register(newUser);
        console.log(newUser);
      }
    } else {
      console.error("Invalid Form");
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <div className="col-6 mx-auto">
            {this.props.user && this.props.user.role === "Admin" && (
              <Card className="px-5 py-5">
                <form onSubmit={this.handleSubmit}>
                  <h3>Registrar Usuario</h3>
                  <div className="form-group">
                    <Label for="pin">N° Legajo</Label>
                    <Input
                      type="number"
                      name="legajo"
                      id="legajo"
                      placeholder="Legajo"
                      className="mb-3"
                      onChange={this.handleChange}
                    />
                    {errors.legajo.length > 0 && (
                      <span className="error text-danger">{errors.legajo}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <Label for="pin">Nombre</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Nombre"
                      className="mb-3"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <Label for="pin">Pin</Label>
                    <Input
                      type="number"
                      name="pin"
                      id="pin"
                      placeholder="Pin"
                      className="mb-3"
                      onChange={this.handleChange}
                    />
                    {errors.pin.length > 0 && (
                      <span className="error text-danger">{errors.pin}</span>
                    )}
                  </div>
                  <Label for="color">Role</Label>
                  <Input
                    type="select"
                    name="role"
                    id="role"
                    onChange={this.onChange}
                  >
                    <option>Seleccionar</option>
                    <option>Admin</option>
                    <option>Jefe de area</option>
                    <option>Operario</option>
                  </Input>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-3"
                  >
                    Subir
                  </button>
                </form>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  success: state.auth.success,
  error: state.error,
  user: state.auth.user,
  users: state.users,
});
export default withRouter(
  connect(mapStateToProps, { register, clearErrors })(RegisterPage)
);
