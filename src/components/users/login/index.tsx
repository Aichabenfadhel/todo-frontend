import React from "react";

import axios from "axios";

import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

import "../signUp/style.css";
import SignUpForm from "../signUp";

export default function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isEmaillExist, setIsEmailExist] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [modal, setModal] = React.useState(false);

  const toggle = () => setModal(!modal);

  async function getUser() {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}/getUser/${email}/${password}`)
        .then((response: any): void => {
          if (response.data.message === "Error User's email doesn't exist") {
            setIsEmailExist(false);
          } else if (response.data.message === "Verify your password") {
            setIsPasswordValid(false);
          }
        })
        .catch((error: any) => {
          console.error(error.message);
        });
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <div className="formdivContainer">
    <div className="sContainer">
      <h1>Login Form</h1>
      <div className="signupContainer">
        <div className="formContainer">
          <h1>Welcome !</h1>
          <h5>Login Now And Find Your Todos</h5>
          <Form className="signUpForm">
            <Row>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  required
                  id="exampleEmail"
                  placeholder="Type your E-mail adress"
                  type="email"
                  name="email"
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                  }}
                />

                {!isEmaillExist ? (
                  <span className="errorMessage">
                    Email doesn't exist
                    <span>
                      <Button
                        className="registerButton"
                        color="danger"
                        onClick={toggle}
                      >
                        Register Now
                      </Button>
                      <Modal
                        size="xl"
                        className="modalContainer"
                        isOpen={modal}
                        toggle={toggle}
                      >
                        <ModalHeader toggle={toggle}>Registration</ModalHeader>
                        <ModalBody>
                          <SignUpForm />
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={toggle}>
                            Done
                          </Button>{" "}
                          <Button color="secondary" onClick={toggle}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </span>
                  </span>
                ) : null}
              </FormGroup>

              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  id="examplePassword"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  onChange={(e: any) => {
                    setPassword(e.target.value);
                  }}
                />
                {!isPasswordValid ? (
                  <span className="errorMessage">Verify your password</span>
                ) : null}
              </FormGroup>
            </Row>
            <Button className="signupButton" onClick={getUser}>
              Login
            </Button>
          </Form>
        </div>
        <div className="imagelogContainer"></div>
      </div>
    </div>
    </div>
  );
}
