import React from "react";

import InputTodo from "../Input";
import ListTodos from "../ListTodo";
import UserNavbarComponent from "../Navbar-cont/userNavbar";
import { todoIndexTypeProps } from "../types";



export default function TodoIndex(
   {email,password}:todoIndexTypeProps
) {
  return (
    <React.Fragment>
      <UserNavbarComponent />
      <InputTodo  email={email} password={password} />
      <ListTodos email={email} password={password} />
    </React.Fragment>
  );
}
