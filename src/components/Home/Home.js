import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';

import {Button } from '@mui/material'
import Typography from "@mui/material/Typography";

import RegisterGoogle from '../RegisterGoogle';
import Firebase from '../../database/firebase';

import './Home.css';
const auth = getAuth();
const Database = new Firebase();

export default function Home() {
  const [pres , setPres] = useState([])
  const [user , setUser] = useState('')

  const [popUp , setPopup] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth , (currentUser) => {
      setUser(currentUser);
      start()
    })       
  }, [])

  const start = () => {
      Database.getPresentation().then((res) => {
        setPres(res)
        console.log(res)
      })
    
  }

  const changePop = () => {
    setPopup(!popUp)
    console.log(popUp)
  }


  // console.log(user)

  return (
    <>

        {auth.currentUser  ? ( 
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

            <div>
              {
                pres.forEach(element => {
                  <Link to={"/slide/" + element.link}>{Object.keys(element)} YYYYYYYYYYYY</Link>

                })
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

