import { initializeApp } from "firebase/app";
import { GoogleAuthProvider ,getAuth , signInWithRedirect , getRedirectResult } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "fir-esgi-leandre.firebaseapp.com",
  databaseURL: "https://fir-esgi-leandre-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-esgi-leandre",
  storageBucket: "fir-esgi-leandre.appspot.com",
  messagingSenderId: "450058502869",
  appId: "1:450058502869:web:eb714194b5b7d5ce5dd85c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider(app)

