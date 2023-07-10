import React from "react";

import axios from "axios";

import { Button, List } from "reactstrap";
import { BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
import { BsListTask } from "react-icons/bs";

import EditTodo from "../EditTodo";

import "./Style.css";

export type ListTodoType = {
  todo_id: number;
  description: string;
  completed: boolean;
};

export default function ListTodos() {
  const updatedTodos: any = [];
  const [todos, setTodos] = React.useState<ListTodoType[]>([]);

  //completed tasks

  const markDone = (todo_id: number, completed: boolean) => {
    try {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/updateTodoCompleted/${todo_id}`,
          {
            completed: !completed,
          }
        )
        .then((): void => {
          let newTasks = todos.map((todo: any) => {
            if (todo.todo_id === todo_id) {
              return { ...todo, completed: !todo.completed };
            }
            return todo;
          });
          setTodos(newTasks);
        })

        .catch((error: any) => {
          console.error(error.message);
        });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  //delete todo function

  const deleteTodo = async (todo_id: number) => {
    try {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/deleteTodo/${todo_id}`)
        .then((): void => {
          setTodos(todos.filter((todo: any) => todo.todo_id !== todo_id));
        })
        .catch((error) => {
          console.error(error.message);
        });
    } catch (err: any) {
      console.error(err.message);
    }
  };
  //get todos
  const getTodos = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}/allTodos`)
        .then((response: any): void => {
          setTodos(response.data.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  React.useEffect(() => {
    getTodos();
  }, [updatedTodos]);

  return (
    <div className="list-container">
      <h1 className="mt-5">
        <BsListTask className="icon-list" /> Tasks{" "}
      </h1>
      <div className="box">
        <List className="list-todos">
          {updatedTodos.length > 0
            ? updatedTodos.map((todo: any, index: number) => (
                <li key={todo.todo_id}>
                  <div className="todo-container">
                    <div className={todo.completed ? "done" : ""}>
                      <span className="id-container"> {index + 1} </span>
                      <span> {todo.description} </span>
                    </div>
                  </div>

                  <div className="editors">
                    <span title="Task Completed / Not Completed">
                      <Button
                        className="button"
                        onClick={(e) => markDone(todo.todo_id, todo.completed)}
                      >
                        <BsFillCheckCircleFill className="icon-editors" />
                      </Button>
                    </span>
                    {todo.completed ? null : (
                      <span title="Edit">
                        <EditTodo
                          todos={todos}
                          todo_id={todo.todo_id}
                          description={todo.description}
                          updatedTodos={updatedTodos}
                        />
                      </span>
                    )}

                    <span title="Delete">
                      <Button
                        className="button"
                        onClick={() => deleteTodo(todo.todo_id)}
                      >
                        <BsFillTrashFill className="icon-editors" />
                      </Button>
                    </span>
                  </div>
                </li>
              ))
            : todos.map((todo: any, index: number) => (
                <li key={todo.todo_id}>
                  <div className="todo-container">
                    <div className={todo.completed ? "done" : ""}>
                      <span className="id-container"> {index + 1} </span>
                      <span> {todo.description} </span>
                    </div>
                  </div>

                  <div className="editors">
                    <span title="Task Completed / Not Completed">
                      <Button
                        className="button"
                        onClick={(e) => markDone(todo.todo_id, todo.completed)}
                      >
                        <BsFillCheckCircleFill className="icon-editors" />
                      </Button>
                    </span>
                    {todo.completed ? null : (
                      <span title="Edit">
                        <EditTodo
                          todos={todos}
                          todo_id={todo.todo_id}
                          description={todo.description}
                          updatedTodos={updatedTodos}
                        />
                      </span>
                    )}
                    <span title="Delete">
                      <Button
                        className="button"
                        onClick={() => deleteTodo(todo.todo_id)}
                      >
                        <BsFillTrashFill className="icon-editors" />
                      </Button>
                    </span>
                  </div>
                </li>
              ))}
        </List>
      </div>
    </div>
  );
}
