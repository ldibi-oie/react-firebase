import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Firebase from "../../database/firebase";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const Database = new Firebase();
const notyf = new Notyf({
  duration: 1000,
  position: {
    x: "right",
    y: "top",
  },
});

export default function WysiwygEditor() {
  const location = useLocation();
  const [content, setContent] = useState("");
  const [index, setIndex] = useState(1);
  const [slides, setSlides] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const title = location.state.title;
  const contentPage = location.state.contentPage.content;
 
  const handleChange = (data) => {
    setContent(data);
    submitSlide();
  };

  const getPages = async () => {
    
    await Database.getPagesForOneSlide(title).then((pages) => {
      setSlides(pages)
      console.log(pages)
      console.log(slides)
    })
  } 

  const submitSlide = async () => {
    
    await Database.createSlide(title, content, collaborators , index)
      .then((res) => {
        // notyf.success("Your changes have been successfully saved!");
        return true
      })
      .catch((err) => {
        notyf.error('Réessayer plus tard !');
        return false

      });
  };

  const newPage = async () => {
    submitSlide().then((status) => {
      setContent('');
    })
  }

  const changePage = async (selected , content) => {
    setIndex(selected)
    setContent(content);
  }

  useEffect(() => {
    console.log(contentPage);
    setContent(contentPage);
    setTimeout(() => {
      getPages()
    }, 300);
  }, []);

  return (
    // <div className="text-center p-5 d-flex flex-column justify-content-center w-100 ">
    // ...
    <div className="bg-white">
      <div>
        

        <main className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            {title.length > 0 ? `${title}` : "" }
            </h1>

            <div className="flex items-center">
              <div className="relative inline-block text-left">
                <Button variant="outlined" onClick={() => newPage()} >
                  <Typography
                    variant="p"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    +
                  </Typography>
                </Button>                
              </div>

              <button
                type="button"
                className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View grid</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              <div className="hidden lg:block">
                {
                  slides.map((slide) => (
                    <div className="card card-side bg-base-100 shadow-xl flex flex-row justify-content-center p-5">
                      <button type="button" className="" onClick={() => changePage(slide.index , slide.data.content)}>
                          {slide.index}
                      </button>
                    </div>

                  ))
                }
              </div>

              <div className="lg:col-span-3">
                <div style={{ display: title.length > 0 ? "block" : "none" , height: '1000px' }}>
                  <ReactQuill
                    className="border-4 border-dashed border-gray-200 rounded-lg  lg:h-full"
                    value={content && content.length > 0 ? content : ""}
                    onChange={(e) => handleChange(e)}
                  />
                  {/* <Button variant="contained" onClick={submitSlide}>Soumettre le slide</Button> */}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>

    //

    // </div>
  );
}

// import React , {useEffect, useState} from 'react'
// import { useLocation } from "react-router-dom";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Firebase from '../../database/firebase';

// const Database = new Firebase();

// export default function WysiwygEditor() {
//   const location = useLocation();
//   const [content , setContent] = useState("");
//   const [Title , setTitle] = useState("");
//   const [collaborators , setCollaborators] = useState([])
//   const title = location.state.title
//   const contentPage = location && location.state.contentPage ? location.state.contentPage.content :''

//   useEffect(() => {
//     setTitle(title)
//     setContent(contentPage)
//   },[])
//   console.log(title , contentPage)

//   const handleChange = (data) => {
//   	setContent(data);
//     console.log(content , data)
//     submitSlide()
//   }

//   const submitSlide = () => {
//     Database.createSlide(title, content , collaborators).then((res) => {
//       console.log(res)
//     })
//   }

//   return (
//     <div className="container text-center p-5 d-flex flex-column justify-content-center w-100 ">

//       {Title.length > 0 ? ( <input type="text" value={Title} onChange={(e) => setTitle(e.target.value)} className=""/> ) : ''}

//       <div style={{ display: Title.length > 0 /? 'block' : 'none' }}>
//         <ReactQuill theme="snow"  onChange={(e) => handleChange(e)} />
//       </div>
//     </div>
//   )
// }
