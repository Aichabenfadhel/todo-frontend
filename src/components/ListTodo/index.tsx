import {
  BsFillCheckCircleFill,
  BsFillTrashFill,
  BsListTask,
} from "react-icons/bs";
import { Button, List } from "reactstrap";
import EditTodo from "../EditTodo";
import "./Style.css";
import { ListTodoType, TodoType } from "../types";

type listTodoPropsType = {
  email: string;
  password: string;
  todos: Record<string, TodoType>;
  todosArray: ListTodoType[];
  markDone: (todo_id: string, completed: boolean) => void;
  deleteTodo: (todo_id: string) => void;
  updateTodo: (todo_id: string, description: string) => Promise<void>;
};

export default function ListTodos({
  email,
  password,
  todosArray,
  markDone,
  deleteTodo,
  updateTodo,
}: listTodoPropsType) {
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
                        todo_id={todo.todo_id}
                        description={todo.description}
                        updateTodo={updateTodo}
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
