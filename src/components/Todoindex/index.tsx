import React from "react";
import InputTodo from "../Input";
import ListTodos from "../ListTodo";

export default function TodoIndex(){
    return(
        <React.Fragment>
            <InputTodo />
            <ListTodos />
        </React.Fragment>
    )
}