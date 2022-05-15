import React, { Component } from 'react';
import Navigation from '../component/Navigation';
import { NavLink } from "react-router-dom";

class PostInscription extends Component {

    navAccueil = () => {
        window.location.href = "https://gestionnaire-collection.netlify.app"
    };

    navConnexion = () => {
        window.location.href = "https://gestionnaire-collection.netlify.app/Connexion"
    };

    render() {
        return (
            <div>
                <Navigation />
                <div style={{ textShadow: '1px 1px white' }}>
                    <div style={{ height: '47.1em', textAlign: 'center' }}>
                        <h1 style={{ marginTop: '6%' }}>Félicitations !</h1>
                        <h3 style={{ marginTop: '2%' }}> Vous venez de vous inscrire sur Ucollect </h3>
                        <h3 style={{ marginTop: '2%', marginBottom: '8%' }}> Naviguez maintenant sur le site pour gerer vos collections ! </h3>

                        <div style={{ width: '38%', float: 'left', marginLeft: '10%' }}>
                            <h2> Retournez à l'accueil </h2>
                            <button style={{ fontSize: '180%', marginTop: '8%' }} class="btn btn-success" onClick={this.navAccueil}>Accueil</button>
                        </div>
                        <div style={{ width: '38%', float: 'right', marginRight: '10%' }}>
                            <h2> Connectez-vous ! </h2>
                            <button style={{ fontSize: '180%', marginTop: '8%' }} class="btn btn-success" onClick={this.navConnexion}>Connexion</button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
};

export default PostInscription;