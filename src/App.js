import { useState , useEffect} from "react"
import {Routes , Route} from "react-router-dom"

import Home from "./components/Home/Home"
import Login from "./components/Login"
import Profile from "./components/Profile"
import RegisterGoogle from "./components/RegisterGoogle"
import hasAuthenticated from "./services/AuthApi"
import WysiwygEditor from "./components/editor/wysiwyg"
import NewPresentation from "./components/Presentation/newPresentation"
import RevealPresentation from "./components/Presentation/PressReveal"
import Auth from "./context/Auth"
import AuthenticatedRoute from "./components/AuthenticatedRoute"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
   const [isAuthenticated ,  setIsAuthenticated] = useState(hasAuthenticated())

   return (
    // <Auth.provider value={{isAuthenticated}}>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/register" element={<RegisterGoogle />}/>
        <Route path='/profile' element={<Profile/>} />
        <Route path="/presentation/new" element={<NewPresentation/>} />
        <Route path="/diaporama/*" element={<RevealPresentation />} />
        <Route path='/slide/*' element={<WysiwygEditor/>} />
        
      </Routes>
    // </Auth.provider>
  );
}

export default App;
