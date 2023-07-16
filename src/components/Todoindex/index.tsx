import React, { useState } from "react";

import axios from "axios";
import { useEffect } from "react";
import InputTodo from "../Input";
import ListTodos from "../ListTodo";
import UserNavbarComponent from "../Navbar-cont/userNavbar";
import { ListTodoType, TodoType, todoIndexTypeProps } from "../types";

export default function TodoIndex({ email, password }: todoIndexTypeProps) {
  const [todos, setTodos] = useState<Record<string, TodoType>>();
  const [todosArray, setTodosArray] = useState<ListTodoType[]>([]);

  async function addTodo(description: string) {
    try {
      axios
        .post(`${process.env.REACT_APP_API_URL}/addtodo/${email}/${password}`, {
          description,
        })
        .then((): void => {})
        .catch((error) => {
          console.error(error.message);
        });
    } catch (error: any) {
      console.error(error.message);
    }
  }

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

  const updateTodo = async (todo_id: string, description: string) => {
    try {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/updateTodo/${email}/${password}/${todo_id}`,
          {
            description,
          }
        )
        .then(() => {
          const newTasks = todosArray.map((todo) => {
            if (todo.todo_id === todo_id) {
              return { ...todo, description };
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
    <React.Fragment>
      <UserNavbarComponent />
      <InputTodo
        getTodos={getTodos}
        addTodo={addTodo}
        email={email}
        password={password}
      />
      <ListTodos
        email={email}
        password={password}
        todos={todos!}
        todosArray={todosArray}
        markDone={markDone}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </React.Fragment>
  );
}
