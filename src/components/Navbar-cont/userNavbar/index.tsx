import React from "react";
import { Navbar, NavbarToggler, NavbarBrand } from "reactstrap";

import { Outlet, Link } from "react-router-dom";

import { SiTodoist } from "react-icons/si";

import "../nav.css";

export default function UserNavbarComponent(args: any) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="Nav-cont">
      <Navbar {...args}>
        <Link to="/" className="nav-title">
          <NavbarBrand className="nav-title">
            {" "}
            <SiTodoist className="nav-icon" />
            Todo List
          </NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <div>
          <Link to="/Login" className="signupButton">
            <button type="button" className="btn btn-light">
              Logout
            </button>
          </Link>
        </div>
      </Navbar>
      <Outlet />
    </div>
  );
}
