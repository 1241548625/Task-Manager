import React, {useEffect, useState} from 'react';
import { auth } from "../../firebase";
import { onAuthStateChanged } from '@firebase/auth';

const AuthDetails = () => {
const [authUser, setAuthUser] = useState(null);

useEffect(()=>{
    const listen = onAuthStateChanged(auth, (user)=>{
        if (user){
            setAuthUser(user);
        }
        else{
            setAuthUser(null);
        }
    })
},[])

  return (
    <div>
        {authUser ? <><p>{`Sign In as ${authUser.email}`}</p><button>Sign Out</button></> :<p>Signed Out</p>}
    </div>
  )
}

export default AuthDetails