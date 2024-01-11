import React, { useState} from 'react';
import {auth} from "../../firebase.js";
import { signInWithEmailAndPassword,sendPasswordResetEmail } from '@firebase/auth';
import { Link, useNavigate } from "react-router-dom"; 
import "./SignIn.css";
import Password_Modal from "../Modal/Password.js";

const SignIn = () =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [resetPassword, setResetPassword] = useState(false);

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
          navigate("/tasks");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      };


    return (
        <div className='signIn'>
          <div className='signIn-container'>
          <h1 className='signIn-container-title'>Task Manager</h1>
          </div>
            <form onSubmit={signIn} className='signIn-form'>
                <h1 className='signIn-form__title'>Log In</h1>
                <div className='signIn-form__log'>
                <input type='email' placeholder='Enter your email' value={email} 
                onChange={(e)=> setEmail(e.target.value)}
                className='signIn-form__input'
                ></input>
                </div>
                <div className='signIn-form__log'>
                <input type='password' 
                placeholder='Enter your password' 
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                className='signIn-form__input'
                ></input>
                </div>
                <button type='submit' className='signIn-btn'>Log In</button>
                <p>or <Link to="/resetPassword">Forgot Password</Link></p>
                <p>Don't have an account? <Link to="/signUp">Create an Account</Link></p>
            </form>
            
        </div>
    )
}

export default SignIn;

