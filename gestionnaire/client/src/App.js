import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Connexion from "./pages/Connexion";
import Contact from "./pages/Contact";
import Gdpr from "./pages/Gdpr";
import Home from "./pages/Home";
import Inscription from "./pages/Inscription";
import Bibliothèques from "./pages/Bibliothèques";
import PostInscription from "./pages/PostInscription";
import Collection from "./pages/Collection"
import AjoutObjet from "./pages/AjoutObjet"
import Admin from "./pages/Admin";
import "./App.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const App = () => {

  return (

    <div className="App" id="app" >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Connexion" element={<Connexion />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Gdpr" element={<Gdpr />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Inscription" element={<Inscription />} />
          <Route path="/Bibliotheques" element={<Bibliothèques />} />
          <Route path="/PostInscription" element={<PostInscription />} />
          <Route path="/Collection" element={<Collection />} />
          <Route path="/AjoutObjet" element={<AjoutObjet />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div >
  )

}

export default App;