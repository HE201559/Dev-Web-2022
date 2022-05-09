import React from 'react';
import Navigation from '../component/Navigation';


const About = () => {
    return (
        <div style={{ height: '47.1em', textAlign: 'center' }}>
            <Navigation />
            <h1 style={{ marginTop: '6%' }}>A propos</h1>
            <h2 style={{ marginTop: '2%', marginBottom: '10%' }}> Qui sommes nous ? </h2>

            <div style={{ width: '38%', float: 'left', marginLeft: '10%' }}>
                <h2> Des etudiants ? </h2>
                <p>Nous sommes des étudiants de la Ecole Pratique des Hautes Etudes
                    Commerciales de Louvain-la-Neuve ( EPHEC ) </p>
                <p> Dans le cadre de nos études en technologies de l'informatique, et plus particulièrement du cours de
                    développement Web de deuxième année, nous devons,
                    pour la réussite de ce cours, créer un site web dans son entièreté
                </p>
            </div>
            <div style={{ width: '38%', float: 'right', marginRight: '10%' }}>
                <h2> Mais encore ? </h2>
                <p> C'est pourquoi nous avons décidé de créer Ucollect, un site permettant à tout utilisateur, une fois inscrit et connecté,
                    de gérer ses collections de manière centralisée. Ce site est plus particulièrement dirigé vers un but d'achat-revente.
                    Il vous permet donc de calculer très simplement les bénéfices (ou pertes) générés par chaque collection. *
                </p>

            </div>
            <div style={{ marginTop: '28%', textAlign: 'left', fontSize: '80%', marginLeft: '8%' }}>
                <p> * Nous tenons à signaler qu'aucune vente ou transaction ne se fait directement sur notre site</p>
            </div>

        </div>
    );
};

export default About;