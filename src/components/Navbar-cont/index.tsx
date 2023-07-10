import React from "react";
import { Navbar, NavbarToggler, NavbarBrand } from "reactstrap";

import { Outlet, Link } from "react-router-dom";

import { SiTodoist } from "react-icons/si";

import "./nav.css";

export default function NavbarComponent(args: any) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="Nav-cont">
      <Navbar {...args}>
        <Link to="/home" className="nav-title">
          <NavbarBrand className="nav-title">
            {" "}
            <SiTodoist className="nav-icon" />
            Todo List
          </NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <div>
          <Link to="/Login" className="loginButton">
            Login
          </Link>
          <Link to="/Sign-up" className="signupButton">
            <button type="button" className="btn btn-light">
              Sign up
            </button>
          </Link>
        </div>
      </Navbar>
      <Outlet />
    </div>
  );
}
