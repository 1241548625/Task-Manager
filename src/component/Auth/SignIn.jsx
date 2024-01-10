import React, { useState} from 'react';
import {auth} from "../../firebase.js";
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Link, useNavigate } from "react-router-dom"; 

const SignIn = () =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

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
        <div>
            <form onSubmit={signIn}>
                <h1>Log In</h1>
                <input type='email' placeholder='enter your email' value={email} 
                onChange={(e)=> setEmail(e.target.value)}
                ></input>
                <input type='text' placeholder='enter your name' value={name} 
                onChange={(e)=> setName(e.target.value)}
                ></input>
                <input type='password' 
                placeholder='enter your password' 
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                ></input>
                <button type='submit'>Log In</button>
            </form>
            <p>Don't have an account? <Link to="/signUp">Create an Account</Link></p>
        </div>
    )
}

export default SignIn;

