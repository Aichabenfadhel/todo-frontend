import React from "react";
import { Link } from "react-router-dom";

import NavbarComponent from "../Navbar-cont";
import "./style.css"

export default function Home() {
  
  return (
    <>
    <NavbarComponent />
    <div className="homeContainer">
      <div className="welcomeContainer">
      <div className="titleContainer">
        <h1> Welcome to Todo List</h1>
        <h2>You can Organize your day and manage all your necessary tasks</h2>
        <Link to="/Login">
          <button type="button" className="btn btn-primary">
            Get Started
          </button>
        </Link>
      </div>
      <div className="HomeimageContainer"></div>
    </div>
    </div>
    </>
  );
}
