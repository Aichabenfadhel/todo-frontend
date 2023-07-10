import React from "react";

import axios from "axios";

import { Button } from "reactstrap";

import "./input-todo.css";

export default function InputTodo() {
  const [description, setDescription] = React.useState("");

  const handleOnClickButton = async (event: any) => {
    event.preventDefault();
    addTodo();
  };

  async function addTodo() {
    try {
      axios
        .post(`${process.env.REACT_APP_API_URL}/addtodo`, {
          description,
        })
        .then((): void => {})
        .catch((error) => {
          console.error(error.message);
        });

      setDescription("");
    } catch (error: any) {
      console.error(error.message);
    }
  }
  

  return (
    <React.Fragment>
      <h1 className="text-center mt-5">
        You can organize your day by adding your Todos !
      </h1>
      <div className="d-flex mt-5">
        <input
          type="text"
          placeholder="Add Todo"
          className="input form-control"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(event.target.value)
          }
        />

        <Button className="button-add" onClick={handleOnClickButton}>
          Add Task
        </Button>
      </div>
    </React.Fragment>
  );
}
