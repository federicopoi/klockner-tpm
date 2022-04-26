import React, { Component } from "react";
import { Card } from "reactstrap";
import { connect } from "react-redux";
import { login } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/errorActions";
import { Label, Input, Alert } from "reactstrap";
import { withRouter, Redirect } from "react-router-dom";

export class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //Check for login error
      if (error.id === "LOGIN_FAIL") {
        this.setState({
          msg: error.msg.msg,
        });
      } else {
        this.setState({
          msg: null,
        });
      }
    }
    if (isAuthenticated) {
      this.props.history.push("/");
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password,
    };
    // Attempt to login
    this.props.login(user);
  };

  render() {
    return (
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <div className=" mx-auto">
            <Card className="px-5 py-5">
              <form onSubmit={this.onSubmit}>
                <h3 className="mb-3 text-center">Iniciar Sesión</h3>
                <div className="form-group">
                  <Label for="legajo">N° Legajo</Label>
                  <Input
                    type="number"
                    name="email"
                    id="email"
                    placeholder="N° Legajo"
                    className="mb-3"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <Label for="pin">Pin</Label>
                  <Input
                    type="number"
                    secureTextEntry={true}
                    class="pin"
                    pattern="[0-9]*"
                    inputmode="numeric"
                    name="password"
                    id="password"
                    placeholder="Pin"
                    className="mb-3"
                    onChange={this.onChange}
                  />
                </div>
                {this.state.msg ? (
                  <Alert color="danger" className="mt-3">
                    {this.state.msg}
                  </Alert>
                ) : null}
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                >
                  Login
                </button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  user: state.auth.user,
  users: state.users,
});
export default withRouter(
  connect(mapStateToProps, { login, clearErrors })(LoginPage)
);
