import React from 'react';
import Navigation from '../component/Navigation';


const Contact = () => {
    return (
        <div style={{ height: '47.1em' }}>
            <Navigation />
            <div style={{ textShadow: '1px 1px white' }}>
                <h1 style={{ textAlign: 'center', marginTop: '6%' }}>Contactez nous</h1>
                <p style={{ marginBottom: '10%', textAlign: 'center', fontSize: '120%', marginTop: '2%' }}>
                    Vous avez un problème au niveau de l'utilisation du site web ou souhaitez simplement nous poser des questions ? <br></br>
                    Contactez nous avec les moyens suivants :
                </p>
                <div style={{ width: '49%', float: 'left', textAlign: 'center', fontSize: '130%' }}>
                    <h2> Adresse </h2>
                    <p> Avenue de la collection</p>
                    <p> Numéro 15</p>
                    <p>  1348 Collect </p>
                </div>
                <div style={{ width: '49%', float: 'right', textAlign: 'center', fontSize: '130%' }}>
                    <h2> Contacts </h2>
                    <p> Pour toute information : info@ucollect.com</p>
                    <p> Envie de postuler ? job@ucollect.com</p>
                    <p> 0444 444 444 444 </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;