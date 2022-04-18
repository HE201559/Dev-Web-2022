import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap";

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            connecte: localStorage.getItem('Connecte'),
        }
    }

    handleDeconnect = () => {


        localStorage.setItem('Connecte', false)
        console.log(this.state.connecte)
        this.state.connecte = 'false'
        console.log(this.state.connecte)
        localStorage.setItem('EmailUtilisateur', 'null')

        window.location.href = "http://localhost:3000/";
    }

    render() {
        if (this.state.connecte === "true") {
            return (
                <div className="navigation">
                    <div className='logo'><a className="logo-text" href="/">Ucollect</a></div>
                    <ul>
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
                        <button type="button" style={{ fontSize: '80%', marginTop: "-0.3%" }} class="btn btn-outline-dark" onClick={this.handleDeconnect}> Se deconnecter </button>
                    </ul>
                </div>
            );
        }
        else {
            return (
                <div className="navigation">
                    <div className='logo'><a className="logo-text" href="/">Ucollect</a></div>
                    <ul>
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
    }
};

export default Navigation;