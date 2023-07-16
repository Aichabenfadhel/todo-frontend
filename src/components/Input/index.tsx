import React from "react";

import { Button } from "reactstrap";

import "./input-todo.css";

type listTodoPropsType = {
  addTodo: (description: string) => void;
  getTodos: () => Promise<void>;
};

export default function InputTodo({ addTodo, getTodos }: listTodoPropsType) {
  const [description, setDescription] = React.useState("");

  const handleAddTodo = async (event: any) => {
    event.preventDefault();
    addTodo(description);
    getTodos();
    setDescription("");
  };

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

        <Button className="button-add" onClick={handleAddTodo}>
          Add Task
        </Button>
      </div>
    </React.Fragment>
  );
}
