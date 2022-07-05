import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import {auth} from '../firebase.config'

export default function Profile () {
  return (
    <div>Profile ! Welcome {auth.currentUser.email} !</div> 
  )
}
