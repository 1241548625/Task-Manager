import React, { useState } from "react";
import { auth } from "../../firebase.js";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "@firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "../Auth/SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState(false);

  const reset = (e) => {
    e.preventDefault();
    console.log(auth.currentUser);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please Check Your Email");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="signIn">
      <div className="signIn-container">
        <h1 className="signIn-container-title">Task Manager</h1>
      </div>
      <form onSubmit={reset} className="signIn-form">
        <h1 className="signIn-form__title">Reset Password</h1>
        <div className="signIn-form__log">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signIn-form__input"
          ></input>
        </div>
        <button type="submit" className="signIn-btn">
          Reset
        </button>
        <p>
          Don't have an account? <Link to="/signUp">Create an Account</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
