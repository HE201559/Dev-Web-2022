import React from 'react';
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <div className="navigation">
            <ul>
                <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Accueil</li>
                </NavLink>
                <NavLink to="/Inscription" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Inscription</li>
                </NavLink>
                <NavLink to="/Connexion" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Connexion</li>
                </NavLink>
                <NavLink to="/Contact" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Contact</li>
                </NavLink>
                <NavLink to="/Gdpr" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Gdpr</li>
                </NavLink>
                <NavLink to="/About" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>About</li>
                </NavLink>
            </ul>
        </div>
    );
};

export default Navigation;