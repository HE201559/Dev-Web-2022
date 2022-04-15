import React from 'react';
import { NavLink } from "react-router-dom";

const Navigation = () => {
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
};

export default Navigation;