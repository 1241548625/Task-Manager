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
    const [WrongPassword, setWrongPassword] = useState(false);
    const [resetRequire, setResetRequire] = useState(false);

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
          console.log(errorCode);
          console.log(errorMessage);
          if(errorCode === 'auth/invalid-login-credentials'){
            setWrongPassword(true);
          }else if(errorCode === 'auth/too-many-requests'){
            setResetRequire(true);
          }
          
        });
      };


    return (
        <div className='signIn'>
          <div className='signIn-container'>
          <h1 className='signIn-container-title'>Task Manager</h1>
          </div>
            <form onSubmit={signIn} className='signIn-form'>
                <h1 className='signIn-form__title'>Log In</h1>
                {resetRequire ? <p style={{color:"red"}}>Access to this account has been temporarily disabled due to many failed login attempts. Resetting your password or try again later.</p>: <></>}
                {WrongPassword ? <p style={{color:"red"}}>Email or Password is invalid, Please try again</p>: <></>}
                <div className='signIn-form__log'>
                <input type='email' placeholder='Enter your email' value={email} 
                onChange={(e)=> {setEmail(e.target.value); setWrongPassword(false);setResetRequire(false)}}
                className='signIn-form__input'
                ></input>
                </div>
                <div className='signIn-form__log'>
                <input type='password' 
                placeholder='Enter your password' 
                value={password}
                onChange={(e)=> {setPassword(e.target.value); setWrongPassword(false);setResetRequire(false)}}
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

