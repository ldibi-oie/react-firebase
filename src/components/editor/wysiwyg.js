import React , {useEffect, useState} from 'react'
import { useLocation } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Firebase from '../../database/firebase';

const Database = new Firebase();


export default function WysiwygEditor() {
  const location = useLocation();
  const [content , setContent] = useState("");
  const [collaborators , setCollaborators] = useState([])
  const title = location.state.title

  console.log(location)

  const handleChange = (data) => {
  	setContent(data);
    submitSlide()
  }

  const submitSlide = () => {
    Database.createSlide(title, content , collaborators).then((res) => {
      console.log(res)
    })
  }

  return (
    <div className="container text-center p-5 d-flex flex-column justify-content-center w-100 ">  
        
      {title.length > 0 ? ( <h1>{title}</h1>) : ''}
      
      <div style={{ display: title.length > 0 ? 'block' : 'none' }}>
        <ReactQuill onChange={(e) => handleChange(e)}/>
        {/* <Button variant="contained" onClick={submitSlide}>Soumettre le slide</Button> */}
        {/* {content} */}
      </div>
    </div>
  )
}
