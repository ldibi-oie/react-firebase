import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Firebase from "../../database/firebase";
import FirebaseAdmin from "../../database/users";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const Database = new Firebase();
const firebaseAdmin = new FirebaseAdmin();
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
  const [ModalOpen, setModelOpen] = useState(false);

  const [collaborators, setCollaborators] = useState([]);
  const title = location.state.title;
  const contentPage = location.state.contentPage[1].content;

  console.log(contentPage);

  const handleChange = (data) => {
    setContent(data);
    submitSlide();
    getPages();
  };

  const openNav = () => {
    setModelOpen(!ModalOpen);
    // console.log(firebaseAdmin.getAll());

  };

  const getPages = async () => {
    console.log(slides);

    const pages = await Database.getPagesForOneSlide(title);
    setSlides(pages);
    console.log(pages);
    console.log(slides);
  };

  const submitSlide = async () => {
    await Database.createSlide(title, content, collaborators, index)
      .then((res) => {
        notyf.success("Your changes have been successfully saved!");
        return true;
      })
      .catch((err) => {
        notyf.error("Réessayer plus tard !");
        return false;
      });
  };

  const addSlide = () => {
    Database.createSlide(title, "", collaborators, slides.length + 1)
      .then((res) => {
        getPages();
        notyf.success("Nouvelle slide");
        return true;
      })
      .catch((err) => {
        notyf.error("Réessayer plus tard !");
        return false;
      });
  };

  const newPage = async () => {
    submitSlide().then((status) => {
      setContent("");
    });
  };

  const changePage = async (event, selected, content) => {
    event.preventDefault();
    setIndex(selected);
    setContent(content);

    var p = document.getElementById(selected)
    p.style.classList.add = "bg-black text-white  "

  };

  useEffect(() => {
    console.log(contentPage);
    setContent(contentPage);
    getPages();
  }, []);

  return (
    // <div className="text-center p-5 d-flex flex-column justify-content-center w-100 ">
    // ...
    <div className="bg-white">
      <div>
        {ModalOpen === true ? (
          <div
            class="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div class="fixed z-10 inset-0 overflow-y-auto">
              <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          class="h-6 w-6 text-red-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </div>
                      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          class="text-lg leading-6 font-medium text-gray-900"
                          id="modal-title"
                        >
                          Ajouter un collaboratteur
                        </h3>
                        <div class="mt-2">
                          <p class="text-sm text-gray-500">
                            Vous etes sur le point de supprimer cette slide, il
                            est impossible de faire demi tour etes vous sure ?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      // onClick={confirmDelete}
                      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Ajouter
                    </button>
                    <button
                      type="button"
                      onClick={openNav}
                      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <main className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              {title.length > 0 ? `${title}` : ""}
            </h1>

            <div className="flex items-center">
              <div className="relative inline-block text-left">
                <Button variant="outlined" onClick={() => addSlide()}>
                  <Typography
                    variant="p"
                    component="div"
                    className="m-8"
                    sx={{ flexGrow: 1 }}
                  >
                    ajouter une slide
                  </Typography>
                </Button>

                <Button variant="outlined" onClick={() => openNav()}>
                  <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
                    ajouter un collaborateur
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

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10 overflow-auto">
              <div className="hidden lg:block">
                {slides.map((slide) => (
                  <>
                  <button
                      type="button"
                      className="card card-side bg-base-100 shadow-xl flex flex-row justify-content-center p-5 w-full"
                      onClick={(event) =>
                        changePage(event, slide.index, slide.data.content)
                      }
                      id={slide.index}
                    ><div className="">
                    
                      <h1>{slide.index}</h1>
                    
                  </div></button>
                  <br/>
                  </>
                ))}
              </div>

              <div className="lg:col-span-3">
                <div
                  style={{
                    display: title.length > 0 ? "block" : "none",
                    height: "1000px",
                  }}
                >
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
