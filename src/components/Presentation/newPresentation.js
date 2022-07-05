import React , {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import TextField from '@mui/material/TextField';
import Firebase from '../../database/firebase';

import './newPresentation.css'
const auth = getAuth();
const Database = new Firebase();



const NewPresentation = () => {
  const random = Math.floor(Math.random() * 100) + 1;
  let navigate = useNavigate();

  const [title , setTitle] = useState("");

  const handleChangeTitle = (event) => {
    event.preventDefault();
  	setTitle(event.target.title.value);
    // console.log(event.target.title.value)

    Database.createPresentation(event.target.title.value, auth.currentUser.uid + "/" + random ).then(() => {
      navigate("/slide/" + auth.currentUser.uid + "/" + random, { state: { title: event.target.title.value}})
    })
    
  }

  return (
    <>
    <div className="container centered">
      <form onSubmit={handleChangeTitle} style={{ display: title.length > 0 ? 'none' : 'block' , padding: '8px'}}>
        <div className="d-flex flex-column justify-content-center p-5">
          <h1>Comment voulez vous nommer votre presentation ?</h1>
          <TextField
            required
            id="title"
            name="title"
            className="title text-center"
            placeholder="Hello World"
          />

          <input type="submit" />
        </div>
      </form>
    </div>
    </>
  )
}

export default NewPresentation