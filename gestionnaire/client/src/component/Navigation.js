import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
// import Button from "react-bootstrap";
import secureLocalStorage from "react-secure-storage";

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            connecte: secureLocalStorage.getItem('Connecte'),
        }
    }

    handleDeconnect = () => {


        secureLocalStorage.setItem('Connecte', false)
        console.log(this.state.connecte)
        // this.state.connecte = 'false'
        this.setState({ comment: 'false' })
        console.log(this.state.connecte)
        secureLocalStorage.setItem('EmailUtilisateur', 'null')

        window.location.href = "https://www.ucollect.fun/";
    }

    render() {
        if (this.state.connecte) {
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
                            <li>A propos</li>
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
                            <li>A propos</li>
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