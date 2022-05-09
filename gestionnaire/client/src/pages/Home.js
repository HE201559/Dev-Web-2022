import React from 'react';
import Navigation from '../component/Navigation';


const Home = () => {
    return (
        <div>
            <Navigation/>
            <div className='home' id='accueil' style={{height:'41.8em'}}>
                <h2>Bienvenue sur votre gestionnaire de collection</h2>
                <h1>Ucollect</h1>
                <p style={{marginBottom:'11%'}}>Gérer simplement vos collections.</p>
                <p style={{textAlign:"left", width:'35%', marginLeft:'10%', fontSize:'140%'}} > Bienvenue sur le site UCollect !</p>
                <p style={{textAlign:"left", width:'35%', marginLeft:'10%'}}>Sur ce site, vous pourrez, après avoir créer un compte et vous être connecté, utiliser toute les fonctionnalités
                    de notre site et commencer à gérer vos collections avec la plus grande des simplicités !
                    Créez autant de collection que vous le désirez et stocker l'entièreté de vos objets sans aucune limite !
                </p>
            </div>            
        </div>
    );
};

export default Home;