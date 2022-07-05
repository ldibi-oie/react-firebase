import React from 'react'
import {Button } from '@mui/material'
import { FcGoogle } from 'react-icons/fc';
import Typography from "@mui/material/Typography";

import { GoogleAuthProvider ,getAuth , signInWithRedirect , getRedirectResult} from "firebase/auth";
import {auth , provider } from '../firebase.config'


export default function RegisterGoogle() {
  const GoogleAuth = () => {
    console.log("connexion via google en cours ...")
    signInWithRedirect(auth, provider);

    getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;

      localStorage.setItem("token" , token)
      localStorage.setItem("user" , JSON.stringify(user))
      
      console.log(user)
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }
  return (
    <>
        
      <Button variant="outlined" onClick={GoogleAuth}>
        <div style={{ padding: '8px' }} >
          <FcGoogle />
        </div>
        

        <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
          Connexion via Google
        </Typography>
      </Button>
      
    </>
  )
}
