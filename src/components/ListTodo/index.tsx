import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, List } from "reactstrap";
import { BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
import { BsListTask } from "react-icons/bs";
import EditTodo from "../EditTodo";
import { ListTodoType, TodoType, listTodoPropsType } from "../types";
import "./Style.css";

export default function ListTodos({ email, password }: listTodoPropsType) {
  
  const [todos, setTodos] = useState<Record<string, TodoType>>();
  const [todosArray, setTodosArray] = useState<ListTodoType[]>([]);

  useEffect(() => {
    getTodos();
  }, [todosArray]);

  const markDone = (todo_id: string, completed: boolean) => {
    try {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/updateTodocompleted/${email}/${password}/${todo_id}`,
          {
            completed: !completed,
          }
        )
        .then(() => {
          const newTasks = todosArray.map((todo) => {
            if (todo.todo_id === todo_id) {
              return { ...todo, completed: !todo.completed };
            }
            return todo;
          });
          setTodosArray(newTasks);
        })
        .catch((error: any) => {
          console.error(error.message);
        });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (todo_id: string) => {
    try {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/deleteTodo/${email}/${password}/${todo_id}`
        )
        .then(() => {
          setTodosArray(todosArray.filter((todo) => todo.todo_id !== todo_id));
        })
        .catch((error) => {
          console.error(error.message);
        });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}/allTodos/${email}/${password}`)
        .then((response: any) => {
          setTodos(response.data.data.todo);
        })
        .catch((error) => {
          console.error(error.message);
        });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (todos !== undefined) {
      const todosUserArray: ListTodoType[] = [];
      for (const [id, todo] of Object.entries(todos)) {
        const todoUser = {
          todo_id: id,
          description: todo!.description,
          completed: todo!.completed,
        };
        todosUserArray.push(todoUser);
      }
      setTodosArray(todosUserArray);
    }
  }, [todos]);

  return (
    <div className="list-container">
      <h1 className="mt-5">
        <BsListTask className="icon-list" /> Tasks{" "}
      </h1>
      <div className="box">
        <List className="list-todos">
          {todosArray.map((todo, index) => {
            return (
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
                      onClick={() => markDone(todo.todo_id, todo.completed)}
                    >
                      <BsFillCheckCircleFill className="icon-editors" />
                    </Button>
                  </span>
                  {!todo.completed && (
                    <span title="Edit">
                      <EditTodo
                        email={email}
                        password={password}
                        todos={todos}
                        todo_id={todo.todo_id}
                        description={todo.description}
                        updatedTodos={todosArray}
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
            );
          })}
        </List>
      </div>
    </div>
  );
}
