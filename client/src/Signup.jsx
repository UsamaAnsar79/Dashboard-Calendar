import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.post("http://localhost:5173/signup", {
        email,
      });
      return response.status === 200;
    } catch (error) {
      if (error.response.status === 400) {
        return false;
      }
      console.log("Error Checking email", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the email already exists
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        setError("Email already exists!");
        setTimeout(() => setError(""), 3000);
        return;
      }

      // Register the new user
      await axios.post("http://localhost:3001/signup", {
        name,
        email,
        password,
      });
      navigate("/");
    } catch (err) {
      console.log("Signup Error", err);
      setError("Already taken!");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-secondary p-3 rounded w-25">
        <h2>
          <center>Sign Up</center>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
              required
              pattern="^\S+$"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && (
              <div className="alert alert-danger error-div">{error}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
              required
              pattern="^\S+$"
              title='"Password cannot contain spaces"'
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Sign Up
          </button>
        </form>
        <p>Already have an account?</p>
        <Link
          to="/"
          className="btn btn-default border-none w-100 bg-warning rounded-0 "
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
