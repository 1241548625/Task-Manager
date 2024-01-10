import React, { useState} from 'react';
import {auth} from "../../firebase.js";
import { createUserWithEmailAndPassword,updateProfile } from '@firebase/auth';
import { Link, useNavigate } from "react-router-dom";

const SignUp = () =>{
    const navigate = useNavigate;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const signUp = (e) => {
       e.preventDefault();
       createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed up 
        const user = userCredential.user;
        // ...
        console.log(user);
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(()=>{
            navigate("/");
        }).catch((error)=>{
            console.log(error)
        })

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
      };

    return (
        <div>
            <form onSubmit={signUp}>
                <h1>Create Account</h1>
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
                <button type='submit'>Sign Up</button>
            </form>

            <p>Already have an account? <Link to="/">Sign In</Link></p>
        </div>
    )
}

export default SignUp;