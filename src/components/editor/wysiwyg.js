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
  const [Title , setTitle] = useState("");
  const [collaborators , setCollaborators] = useState([])
  const title = location.state.title
  const contentPage = location && location.state.contentPage ? location.state.contentPage.content :''

  useEffect(() => {
    setTitle(title)
    setContent(contentPage)
  },[])
  console.log(title , contentPage)


  const handleChange = (data) => {
  	setContent(data);
    console.log(content , data)
    submitSlide()
  }

  const submitSlide = () => {
    Database.createSlide(title, content , collaborators).then((res) => {
      console.log(res)
    })
  }



  return (
    <div className="container text-center p-5 d-flex flex-column justify-content-center w-100 ">  
        
      {Title.length > 0 ? ( <input type="text" value={Title} onChange={(e) => setTitle(e.target.value)} className=""/> ) : ''}
      
      <div style={{ display: Title.length > 0 ? 'block' : 'none' }}>
        <ReactQuill theme="snow"  onChange={(e) => handleChange(e)} />
      </div>
    </div>
  )
}
