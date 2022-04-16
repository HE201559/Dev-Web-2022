import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Connexion from "./pages/Connexion";
import Contact from "./pages/Contact";
import Gdpr from "./pages/Gdpr";
import Home from "./pages/Home";
import Inscription from "./pages/Inscription";
import Bibliothèques from "./pages/Bibliothèques";
import PostConnexion from "./pages/PostConnexion";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <div className="App">
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
          <Route path="/PostConnexion" element={<PostConnexion />} />
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App;