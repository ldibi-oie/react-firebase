import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState , useEffect , componentDidMount } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, set, onValue } from "firebase/database";

import {Button } from '@mui/material'
import Typography from "@mui/material/Typography";
import Card from 'react-bootstrap/Card';

import RegisterGoogle from '../RegisterGoogle';
import Firebase from '../../database/firebase';

import './Home.css';
const db = getDatabase();
const auth = getAuth();
const Database = new Firebase();

export default function Home() {
  const [pres , setPres] = useState([])
  const [user , setUser] = useState('')
  const [popUp , setPopup] = useState(false)

  const start = () => {
    var m = Database.getPresentation()
    setPres(m)
    console.log(pres)
  }

  useEffect(() => {
    onAuthStateChanged(auth , async (currentUser) => {
      setTimeout(() => {
        setUser(auth);
        // console.log(user ,auth)  
        start();
      }, 300)
    })
  })

   

  const changePop = () => {
    setPopup(!popUp)
    console.log(popUp)
  }

  // console.log(user)

  return (
    <>

        {user.currentUser ? ( 
          <>
            <h1>Mes slides</h1>

            <Button variant="outlined">
              <Link to={"/presentation/new"} >
              <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
                Creer une presentation
              </Typography>
              </Link>
            </Button>

            <br/>

            <div className="container text-center p-5 d-flex flex-row justify-content-center w-100">
              {
                pres && Object.keys(pres).length > 0 ? pres.map((item) => {
                  return (
                    
                    <Card className="text-center m-5" style={{width: '300px', height: '300px'}}>
                      <Card.Header>{item.title}</Card.Header>
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>
                          Collaborateurs : aucun
                        </Card.Text>
                       
                        <Link to={"/diaporama/" + item.data.link} state={{ title: item.title , contentPage: item.data.slides}} className="my-4">
                          <Button  variant="contained" color="success"  className="mt-4">Lancer le diaporama</Button>
                        </Link>

                        <Link to={"/slide/" + item.data.link} state={{ title: item.title , contentPage: item.data.slides}} className="my-4">
                          <Button variant="outlined"  className="mt-4">Modifier</Button>
                        </Link>

                        <Button variant="outlined"  color='error' className="mt-4" onClick={() => Database.removeSlide(item.title)}>Supprimer</Button>
                      </Card.Body>
                      <Card.Footer className="text-muted">MySliders</Card.Footer>
                    </Card>

                  )
                }) : 'rien'
              }
            </div>
          </>
         ) : (
          <>
            <div className="container centered d-flex flex-column justify-content-center">
              <h1 className="center">Connexion à MySliders</h1>
              <br/>

              <RegisterGoogle/>
              {/* <Link to="/login" user={user}>Se connecter </Link> */}
            </div>
          </>
        )}

        

    </>
    
  )
}

