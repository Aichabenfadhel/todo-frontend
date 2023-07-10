import React from "react";

import { Route, Routes } from "react-router-dom";

import TodoIndex from "./components/Todoindex";
import NavbarComponent from "./components/Navbar-cont";
import SignUpForm from "./components/users/signUp";
import LoginForm from "./components/users/login";
import Home from "./components/home";

import "./App.css";

export default function App() {
  return (
    <React.Fragment>
      <NavbarComponent />

      <Routes>
        <Route index path="home" element={<Home />} />
        <Route path="Sign-up" element={<SignUpForm />} />
        <Route path="Login" element={<LoginForm />} />
        <Route path="todo" element={<TodoIndex />} />
      </Routes>
    </React.Fragment>
  );
}
