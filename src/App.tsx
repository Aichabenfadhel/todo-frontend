import React from "react";

import InputTodo from "./components/Input";
import ListTodos from "./components/ListTodo";
import NavbarComponent from "./components/Navbar-cont";
import SignUpForm from "./components/users/signUp";
import LoginForm from "./components/users/login";

import "./App.css";

//components

function App() {
  return (
    <React.Fragment>
      <NavbarComponent />
      <div className="container">
        {/* <SignUpForm /> */}
        <LoginForm/>
        {/* <InputTodo />
        <ListTodos /> */}
      </div>
    </React.Fragment>
  );
}

export default App;
