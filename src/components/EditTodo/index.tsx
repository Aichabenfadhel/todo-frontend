import React from "react";

import axios from "axios";

import { Button, Modal, ModalFooter, ModalHeader } from "reactstrap";
import { BiEdit } from "react-icons/bi";
import { EditTodoPropsType } from "../types";

import "../ListTodo/Style.css";

export default function EditTodo({
  email,
  password,
  todo_id,
  description,
  updatedTodos,
  todos,
}: EditTodoPropsType) {
  const [updatedData, setUpdatedData] = React.useState(description);
  const [isEditingModalOpen, setIsEditingModalOpen] = React.useState(false);

  const toggleOpen = () => setIsEditingModalOpen(!isEditingModalOpen);

  const updateDescription = async (description: string) => {
    try {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/updateTodo/${email}/${password}/${todo_id}`,
          {
            description,
          }
        )
        .then(() => {
          const filtredTodos = updatedTodos.filter((todo: any) => {
            if (todo.todo_id !== todo_id) {
              return todo;
            }
          });
          const newTodo = {
            todo_id: todo_id,
            description: updatedData,
            completed: false,
          };
          updatedTodos = [...filtredTodos, newTodo];
        })
        .catch((error: any) => {
          console.error(error.message);
        });

      toggleOpen();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <React.Fragment>
      <Button className="button" onClick={toggleOpen}>
        <BiEdit className="icon-editors" />
      </Button>

      <Modal isOpen={isEditingModalOpen} toggle={toggleOpen}>
        <ModalHeader toggle={toggleOpen}>Edit Todo</ModalHeader>
        <div className="modal-body">
          <input
            type="text"
            className="form-control"
            value={updatedData}
            onChange={(e: any) => setUpdatedData(e.target.value)}
          />
        </div>
        <ModalFooter>
          <Button
            color="info"
            data-dismiss="modal"
            onClick={() => updateDescription(updatedData)}
          >
            Edit
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              setUpdatedData(updatedData);
              toggleOpen();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
