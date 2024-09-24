
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./index.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/", { email, password })
      .then((result) => {
        console.log(result.data);

        // Store token and userId in localStorage
        if (result.data.token) {
          localStorage.setItem("userToken", result.data.token);
          localStorage.setItem("userId", result.data.userId); 
        }

        // Handle based on user status
        switch (result.data.status) {
          case "pending":
            setMessage("Your account is under observation.");
            setMessageType("pending");
            break;
          case "rejected":
            setMessage("Your account has been rejected.");
            setMessageType("error");
            break;
          case "active":
            localStorage.setItem("name", result.data.name); // Store name
            navigate("/dashboard"); // Redirect to dashboard
            return;
          case "inactive":
            setMessage("Your account is inactive.");
            setMessageType("error");
            break;
          default:
            setMessage("An error occurred. Please try again.");
            setMessageType("error");
            break;
        }

        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        setMessage("An error occurred. Please try again.");
        setMessageType("error");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {showMessage ? (
        <div className={`full-screen-message ${messageType}`}>
          <h2>{message}</h2>
        </div>
      ) : (
        <div className="bg-secondary p-3 rounded w-25">
          <h2>
            <center>Login</center>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Login
            </button>
          </form>
          <p>Don't have an account?</p>
          <Link
            to="/signup"
            className="btn btn-default w-100 bg-warning rounded-0 text-decoration-none"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}

export default Login;
