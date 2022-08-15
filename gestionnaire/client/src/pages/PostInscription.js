import React from 'react';
import Navigation from '../component/Navigation';
import { Row, Col, Container, Card, ListGroup, ListGroupItem, Modal, Button, Carousel, Alert } from 'react-bootstrap'

const PostInscription = () => {
    return (
        <div>
            <Navigation />

            <h1 style={{ marginTop: '1.5%', textAlign: 'center' }}>Félicitation pour votre inscription !</h1>
            <h3 style={{ marginTop: '2.5%', textAlign: 'center' }}>Vous pouvez a présent vous connecter.</h3>
            <Row>
                <Col style={{ position: 'absolute', textAlign: 'center', marginTop: '2.5%' }}>
                    <Button variant="success" onClick={() => window.location.href = "http://localhost:3000/Connexion"} > Connexion </Button>
                </Col>
            </Row>

        </div>
    );
};

export default PostInscription;