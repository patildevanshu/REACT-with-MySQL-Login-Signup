import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import validation from "./SignupValidation";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues((prev) => ({
      ...values,
      [event.target.name]: [event.target.value],
    }));
  };
  const handleSelect = (event) => {
    setValues((prev) => ({
     ...values,
      roles: event.target.value ,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    console.log(values);
    if (errors.name === "" && errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  const options = [
    { label: "Select", value: "" },
    { label: "Admin", value: "admin" },
    { label: "Organizer", value: "organizer" },
    { label: "Co-ordinator", value: "co-ordinator" },
    { label: "Teacher", value: "teacher" },
    { label: "Student", value: "student" },
  ];

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary-subtle vh-100">
      <div className="d-flex align-items-center">
      <h1>Mind Prabha Techonologies Private Limited</h1>
      <div className="bg-white p-3 rounded w-75">
        <h2 className="text-center">Sign Up</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name:</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              required
              className="form-control"
              name="name"
              onChange={handleInput}
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              required
              className="form-control"
              name="email"
              onChange={handleInput}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="roles">
              <strong>Role:</strong>
            </label>
            <select className="form-select" onChange={handleSelect}>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              required
              className="form-control"
              name="password"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button className="btn btn-success w-100 " type="submit">
            <strong>Sign up</strong>
          </button>
          <p>Terms and conditions applied</p>
          <Link to="/" className="btn btn-default border w-100" type="submit">
            <strong>Login</strong>
          </Link>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Signup;
