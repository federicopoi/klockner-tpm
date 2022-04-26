import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";
import Logo from "./logo.png";
import NotificationsModal from "./NotificationsModal";
import { withRouter, NavLink as RRNavLink } from "react-router-dom";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand>
          <img
            src={Logo}
            width="150"
            height="43"
            className="d-inline-block align-top"
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {localStorage.token && (
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink to="/" activeClassName="active" tag={RRNavLink}>
                  Dashboard
                </NavLink>
              </NavItem>

              {props.user && props.user.role !== "Operario" && (
                <NavItem>
                  <NavLink
                    to="/tarjetas"
                    activeClassName="active"
                    tag={RRNavLink}
                  >
                    Mis Tarjetas
                  </NavLink>
                </NavItem>
              )}
              {props.user && props.user.role === "Operario" && (
                <NavItem>
                  <NavLink
                    to="/agregartarjeta"
                    activeClassName="active"
                    tag={RRNavLink}
                  >
                    Agregar Tarjeta
                  </NavLink>
                </NavItem>
              )}

              <NavItem>
                <NavLink
                  to="/mishoras"
                  activeClassName="active"
                  tag={RRNavLink}
                >
                  Mis horas
                </NavLink>
              </NavItem>

              {props.user && props.user.role === "Admin" && (
                <NavItem>
                  <NavLink
                    to="/kaizen"
                    activeClassName="active"
                    tag={RRNavLink}
                  >
                    Mis Quick Kaizen
                  </NavLink>
                </NavItem>
              )}
              <NavItem>
                <NavLink to="/buscar" activeClassName="active" tag={RRNavLink}>
                  Buscar tarjeta
                </NavLink>
              </NavItem>
              {props.user && props.user.role === "Admin" && (
                <NavItem>
                  <NavLink to="/admin" activeClassName="active" tag={RRNavLink}>
                    Administrar usuarios
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          )}

          {localStorage.token ? (
            <Nav className="ml-auto" navbar>
              <NavItem onClick={props.logout}>
                <NavLink
                  to="/login"
                  onClick={props.logout && refreshPage}
                  activeClassName="active"
                  tag={RRNavLink}
                >
                  Salir
                </NavLink>
              </NavItem>
            </Nav>
          ) : null}
        </Collapse>
      </Navbar>
    </div>
  );
};
function refreshPage() {
  window.location.reload(false);
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  tarjetas: state.tarjetas,
});
export default connect(mapStateToProps, { logout })(withRouter(NavBar));
