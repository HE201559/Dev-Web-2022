import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap";

class Navigation extends Component {
    
    constructor(props) {
        super(props);
        this.state={
           connecte: localStorage.getItem('Connecte'),
           } 
      }

      handleDeconnect=() => { 


          localStorage.setItem('Connecte', false)
          console.log(this.state.connecte)
          this.state.connecte='false'
          console.log(this.state.connecte)
          localStorage.setItem('EmailUtilisateur', 'null')
          
          window.location.href="http://localhost:3000/";
      }

    render(){
        if(this.state.connecte === "false" ){
            return (
                <div className="navigation">
                    <ul>
                        <NavLink to="/" className="logo">
                            <li>Ucollect</li>
                        </NavLink>
                        <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "nav")}>
                            <li>Accueil</li>
                        </NavLink>
                        <NavLink to="/About" className={(nav) => (nav.isActive ? "nav-active" : "nav")}>
                            <li>About</li>
                        </NavLink>
                        <NavLink to="/Inscription" className={(nav) => (nav.isActive ? "nav-active" : "nav")}>
                            <li>Inscription</li>
                        </NavLink>
                        <NavLink to="/Connexion" className={(nav) => (nav.isActive ? "nav-active" : "nav")}>
                            <li>Connexion</li>
                        </NavLink>
                        <NavLink to="/Contact" className={(nav) => (nav.isActive ? "nav-active" : "nav")}>
                            <li>Contact</li>
                        </NavLink>
                    </ul>
                </div>
            );
        }
        if(this.state.connecte === "true" ){
            return (
                <div className="navigation">
                    <ul>
                        <NavLink to="/" className="logo">
                            <li>Ucollect</li>
                        </NavLink>
                        <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "nav")}>
                            <li>Accueil</li>
                        </NavLink>
                        <NavLink to="/Bibliotheques" className={(nav) => (nav.isActive ? "nav-active" : "nav")}>
                            <li>Mes collections</li>
                        </NavLink>
                        <NavLink to="/About" className={(nav) => (nav.isActive ? "nav-active" : "nav")}>
                            <li>About</li>
                        </NavLink>
                        <NavLink to="/Contact" className={(nav) => (nav.isActive ? "nav-active" : "nav")}>
                            <li>Contact</li>
                        </NavLink>
                        <button onClick={this.handleDeconnect}> Se deconnecter </button>
                    </ul>
                </div>
            );
        }
    }   
};

export default Navigation;