import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Connexion from "./pages/Connexion";
import Contact from "./pages/Contact";
import Gdpr from "./pages/Gdpr";
import Home from "./pages/Home";
import Inscription from "./pages/Inscription";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Connexion" element={<Connexion />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Gdpr" element={<Gdpr />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Inscription" element={<Inscription />} />
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App;