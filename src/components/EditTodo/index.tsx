import React from "react";

import axios from "axios";

import { Button, Modal, ModalFooter, ModalHeader } from "reactstrap";
import { BiEdit } from "react-icons/bi";

import "../ListTodo/Style.css";

type EditTodoPropsType = {
  todo_id: string;
  description: string;
  updateTodo: (todo_id: string, description: string) => Promise<void>;
};

export default function EditTodo({
  todo_id,
  description,
  updateTodo,
}: EditTodoPropsType) {
  const [updatedData, setUpdatedData] = React.useState(description);
  const [isEditingModalOpen, setIsEditingModalOpen] = React.useState(false);

  const toggleOpen = () => setIsEditingModalOpen(!isEditingModalOpen);

  const handleUpdateTodo = async (event: any) => {
    event.preventDefault();
    updateTodo(todo_id, updatedData);
    toggleOpen();
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
            onClick={(e) => handleUpdateTodo(e)}
          >
            Edit
          </Button>{" "}
          <Button color="secondary" onClick={() => toggleOpen()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
