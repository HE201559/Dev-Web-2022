import React from 'react';
import Navigation from '../component/Navigation';


const Home = () => {
    return (
        <div>
            <Navigation />
            <div className='home' id='accueil'>
                <h2>Bienvenue sur votre gestionnaire de collection</h2>
                <h1>Ucollect</h1>
                <p style={{ marginBottom: '11%', fontSize: '120%' }}>Gérer simplement vos collections.</p>
                <h2 style={{ textAlign: "left", width: '35%', marginLeft: '10%' }} > Bienvenue sur le site UCollect !</h2>
                <p style={{ textAlign: "left", width: '35%', marginLeft: '10%' }}>Sur ce site, vous pourrez, après avoir créer un compte et vous être connecté, utiliser toute les fonctionnalités
                    de notre site et commencer à gérer vos collections avec la plus grande des simplicités !
                    Créez autant de collection que vous le désirez et stocker l'entièreté de vos objets sans aucune limite !
                </p>
            </div>
        </div>
    );
};

export default Home;