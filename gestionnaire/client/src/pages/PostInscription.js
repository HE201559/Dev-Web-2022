import React from 'react';
import Navigation from '../component/Navigation';
import { NavLink } from "react-router-dom";

const PostInscription = () => {
    return (
        <div>
            <Navigation />
            <p>Page PostConnexion</p>
            <h1>Félicitation pour votre inscription !</h1>
            <NavLink to="/Connexion" className={(nav) => (nav.isActive ? "nav-active" : "nav")}>
                <li>Connexion</li>
            </NavLink>
            <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "nav")}>
                <li>Accueil</li>
            </NavLink>
        </div>
    );
};

export default PostInscription;