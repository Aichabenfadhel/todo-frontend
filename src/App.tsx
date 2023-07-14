import React from "react";

import { Route, Routes } from "react-router-dom";

import TodoIndex from "./components/Todoindex";
import SignUpForm from "./components/users/signUp";
import LoginForm from "./components/users/login";
import Home from "./components/home";

import "./App.css";

export default function App() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <React.Fragment>
      <Routes>
        <Route path="" index element={<Home />} />
        <Route path="Sign-up" element={<SignUpForm />} />
        <Route
          path="Login"
          element={
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="todo"
          element={<TodoIndex email={email} password={password} />}
        />
      </Routes>
    </React.Fragment>
  );
}
