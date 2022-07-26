import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, componentDidMount } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, set, onValue } from "firebase/database";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "react-bootstrap/Card";

import RegisterGoogle from "../RegisterGoogle";
import Firebase from "../../database/firebase";

import "./Home.css";
const db = getDatabase();
const auth = getAuth();
const Database = new Firebase();

export default function Home() {
  const [pres, setPres] = useState([]);
  const [ModalOpen, setModelOpen] = useState(false);
  const [user, setUser] = useState("");
  const [popUp, setPopup] = useState(false);

  const start = () => {
    var m = Database.getPresentation();
    setPres(m);
    // console.log(pres);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      setTimeout(() => {
        setUser(auth);
        // console.log(user ,auth)
        start();
      }, 300);
    });
  });

  const changePop = () => {
    setPopup(!popUp);
    console.log(popUp);
  };

  // const removeSlide = (title) => {
  //   Database.removeSlide(title)
  // }

  // console.log(user)

  const openNav = () => {
    setModelOpen(!ModalOpen);
  };

  const confirmDelete = () => {
    setModelOpen(!ModalOpen)
    console.log("deleeeeetee")
  }

  return (
    <>
      {user.currentUser ? (
        <>
          <div class="min-h-full">
            <header class="bg-white shadow">
              <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-row justify-content-between">
                <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
                <Link to={"/presentation/new"}>
                <Button variant="outlined">
                  
                    <Typography
                      variant="p"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      +
                    </Typography>
                </Button>
                </Link>

              </div>
            </header>
            <main>
              <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div class="px-4 py-6 sm:px-0">
                  <div class="">
                    <br />

                    <Button type="button" variant="outlined" onClick={openNav}> Test delete confirm</Button>
                    {
                      ModalOpen === true ? (
                        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                  
                          <div class="fixed z-10 inset-0 overflow-y-auto">
                            <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                              <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                  <div class="sm:flex sm:items-start">
                                    <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                      <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                      </svg>
                                    </div>
                                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                      <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Deactivate account</h3>
                                      <div class="mt-2">
                                        <p class="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                  <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Deactivate</button>
                                  <button type="button" onClick={openNav} class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                  
                      ) : ""
                    }
                    <div className="container text-center p-5 d-flex flex-row flex-wrap justify-content-center w-100">
                      {pres && Object.keys(pres).length > 0
                        ? pres.map((item) => {
                            return (
                              <>
                                {" "}
                                <Card
                                  className="text-center m-5"
                                  style={{ width: "300px" }}
                                >
                                  <Card.Header>{item.title}</Card.Header>
                                  <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                      Collaborateurs : aucun
                                    </Card.Text>

                                    <Link
                                      to={"/diaporama/" + item.data.link}
                                      state={{
                                        title: item.title,
                                        contentPage: item.data.slides,
                                      }}
                                      className="my-4"
                                    >
                                      <Button
                                        variant="contained"
                                        color="success"
                                        className="mt-4"
                                      >
                                        Lancer le diaporama
                                      </Button>
                                    </Link>

                                    <Link
                                      to={"/slide/" + item.data.link}
                                      state={{
                                        title: item.title,
                                        contentPage: item.data.slides,
                                      }}
                                      className="my-4"
                                    >
                                      <button
                                        className="btn"
                                      >
                                        Modifier
                                      </button>
                                    </Link>

                                    {/* <Button variant="outlined"  color='error' className="mt-4" onClick={removeSlide(item.title)}>Supprimer</Button> */}
                                  </Card.Body>
                                  <Card.Footer className="text-muted">
                                    MySliders
                                  </Card.Footer>
                                </Card>
                              </>
                            );
                          })
                        : (<h2>Vous n'avez pas de presentation encore ! </h2>)}
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </>
      ) : (
        <>
          <div className="container centered d-flex flex-column justify-content-center">
            <h1 className="center">Connexion à MySliders</h1>
            <br />

            <RegisterGoogle />
            {/* <Link to="/login" user={user}>Se connecter </Link> */}
          </div>
        </>
      )}
    </>
  );
}
