import React from "react";

import axios from "axios";

import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import NavbarComponent from "../../Navbar-cont";

import "react-toastify/dist/ReactToastify.css";
import "./style.css";

export default function SignUpForm() {
  const [firstname, setFirstName] = React.useState("");
  const [lastname, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pwd, setPassword] = React.useState("");

  const showToastMessage = () => {
    toast.success("Registred Successfully ! Go and login Now", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const handleSubmitButton = async () => {
    showToastMessage();

    addUser();
  };

  async function addUser() {
    try {
      axios
        .post(`${process.env.REACT_APP_API_URL}/adduser`, {
          firstname,
          lastname,
          email,
          pwd,
        })
        .then((): void => {})
        .catch((error) => {
          console.error(error.message);
        });
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <>
      <NavbarComponent />
      <div className="formdivContainer">
        <div>
          <ToastContainer />
        </div>
        <div className="sContainer">
          <h1>Sign up Form</h1>
          <div className="signupContainer">
            <div className="formContainer">
              <h1>Welcome !</h1>
              <h5>Fill The Form Bellow To complete Your Registration</h5>
              <form
                className="signUpForm"
                onSubmit={handleSubmit(() => handleSubmitButton())}
              >
                <div className="form-group">
                  <label htmlFor="firstname">Firstname </label>
                  <input
                    type="text"
                    className="formInput form-control"
                    id="firstname"
                    placeholder="Enter your firstname"
                    {...register("firstname", {
                      required: "firstname is required",
                      validate: {
                        minLength: (v) =>
                          v.length >= 5 ||
                          "The firstname should have at least 5 characters",
                        matchPattern: (v) =>
                          /^[a-zA-Z0-9_]+$/.test(v) ||
                          "firstname must contain only letters, numbers and _",
                      },
                    })}
                    onChange={(e: any) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  {errors.firstname?.message && (
                    <span className="errorMessage">
                      {errors.firstname.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Lastname</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    placeholder="Enter your lastname"
                    {...register("lastname", {
                      required: "lastname is required",
                      validate: {
                        minLength: (v) =>
                          v.length >= 5 ||
                          "The lastname should have at least 5 characters",
                        matchPattern: (v) =>
                          /^[a-zA-Z0-9_]+$/.test(v) ||
                          "lastname must contain only letters, numbers and _",
                      },
                    })}
                    onChange={(e: any) => {
                      setLastName(e.target.value);
                    }}
                  />
                  {errors.lastname?.message && (
                    <span className="errorMessage">
                      {errors.lastname.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      validate: {
                        maxLength: (v) =>
                          v.length <= 50 ||
                          "The email should have at most 50 characters",
                        matchPattern: (v) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            v
                          ) || "Email address must be a valid address",
                      },
                    })}
                    onChange={(e: any) => {
                      setEmail(e.target.value);
                    }}
                  />
                  {errors.email?.message && (
                    <span className="errorMessage">{errors.email.message}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your Password"
                    {...register("password", {
                      required: "password is required",
                      validate: {
                        minLength: (v) =>
                          v.length >= 5 ||
                          "The password should have at least 5 characters",
                      },
                    })}
                    onChange={(e: any) => {
                      setPassword(e.target.value);
                    }}
                  />
                  {errors.password?.message && (
                    <span className="errorMessage">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="imageContainer"></div>
          </div>
        </div>
      </div>
    </>
  );
}
