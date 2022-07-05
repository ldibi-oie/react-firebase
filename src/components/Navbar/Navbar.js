import React, { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { RiSlideshow3Fill } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineLogout } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import {Link} from 'react-router-dom'


import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import "./navbar.css";
const auth = getAuth();

export default function Navbar() {
  console.log(auth);

  const [email, setEmail] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    setEmail(currentUser);
  });

  const signout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        console.log("Sign-out successful.");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
          <Link to="/">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <BiMenuAltLeft />
            </IconButton>
            </Link>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Esgi - MySliders
            </Typography>

            {auth.currentUser ? (
              <Button color="inherit" className="nav-link" onClick={signout}>
                <acronym title="Se deconnecter">
                  <AiOutlineLogout />
                </acronym>
              </Button>
            ) : (
              ""
            )}

            {auth.currentUser ? (
              <Link to="/profile">
                <acronym title="Mon compte">
                  <VscAccount style={{ color: 'black'}} />
                </acronym>
              </Link>
            ) : (
              ""
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
