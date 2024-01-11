import React, { useEffect, useState} from 'react';
import {auth} from "../../firebase.js";
import { createUserWithEmailAndPassword,updateProfile,sendEmailVerification,getActionCodeFromURL,onAuthStateChanged} from '@firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";

const SignUp = () =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const [isEmailAvailable, setIsEmailAvailable] = useState(true);
    const [isEmailVerify, setIsEmailVerify] =useState(false);
    const [isEmailSent, setIsEmailSend] = useState(false);
    const [checkInterval, setCheckInterval] = useState(false);

    useEffect(()=>{
        const user = auth.currentUser;
        if(user == null || user.emailVerified == null){
            return;
        }
        else if(user.emailVerified == true && isEmailVerify == true){
            clearInterval(checkInterval);
            setCheckInterval(null);
            setIsEmailVerify(false);
            navigate("/");
        }
      },[isEmailVerify])

    const signUp = async (e) => {
       e.preventDefault();

       //create email,
       createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            // send verification
            sendEmailVerification(auth.currentUser)
            setCheckInterval(setInterval(() => {
                auth.currentUser.reload();
                if (auth.currentUser.emailVerified){
                    setIsEmailVerify(true);
                    console.log("verified");
                }
                console.log(auth.currentUser);
            }, 3000));
            setIsEmailSend(true);
            

            const user = userCredential.user;
            console.log(user);

            updateProfile(auth.currentUser, {
                displayName: name
            }).catch((error)=>{
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

            if(error.code === 'auth/email-already-in-use'){
                setIsEmailAvailable(false);
            }
        });
      };

  
    return (
        <div className='signIn'>
            <div className='signIn-container'>
          <h1 className='signIn-container-title'>Task Manager</h1>
          </div>
            <form onSubmit={signUp} className='signIn-form'>
                <h1 className='signIn-form__title'>Create Account</h1>
                {isEmailAvailable ? <></> : <p style={{color:"red"}}>This email address is in use or invalid, please try again!</p>
                }
                <div className='signIn-form__log'>
                <input type='email' placeholder='Enter your email' value={email} 
                onChange={(e)=> {setEmail(e.target.value); setIsEmailAvailable(true)}}
                className='signIn-form__input'
                required
                
                ></input>
        
                </div>
                <div className='signIn-form__log'>
                <input type='text' placeholder='Enter your name' value={name} 
                onChange={(e)=> setName(e.target.value)}
                className='signIn-form__input'
                required
                ></input>
                </div>
                <div className='signIn-form__log'>
                <input type='password' 
                placeholder='Enter your password' 
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                className='signIn-form__input signIn-form__inputPassword'
                required
                ></input>
                <p className='signIn-form__password'>*Minimum password length (ranges from 6 to 30 characters)</p>
                </div>
                <button type='submit' className='signIn-btn'>Sign Up</button>
                <p>Already have an account? <Link to="/">Sign In</Link></p>
            </form>

            { isEmailSent ? ()=>{alert("verify your eamil"); setIsEmailSend(false) }: <></>}

        </div>
    )
}

export default SignUp;