import React from 'react';
import Navigation from '../component/Navigation';


const Home = () => {
    return (
        <div>
            <Navigation/>
            <div className='home'>
                <h2>Bienvenue sur votre gestionnaire de collection</h2>
                <h1>Ucollect</h1>
                <p>Gérer simplement vos collections.</p>
                <button>Mes collections</button>
            </div>

            
        </div>
    );
};

export default Home;