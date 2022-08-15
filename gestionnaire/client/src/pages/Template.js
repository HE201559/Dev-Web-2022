import React from 'react';
import Navigation from "../component/Navigation";
import secureLocalStorage from "react-secure-storage";
import { Row, Col, Container, Card, ListGroup, ListGroupItem, Modal, Button, Carousel, Alert } from 'react-bootstrap'
import Popup from 'reactjs-popup';
import dateFormat from 'dateformat';
// import { Carousel } from '@trendyol-js/react-carousel';

class Template extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            nom_Template: '',
            id_Bibli: secureLocalStorage.getItem("secureBiblioId"),
            biblioNom: secureLocalStorage.getItem('nomBibli'),
            donneesCollection: [],
            id_Template: '',
            donneesTemplate: '',
            donneesTemplateTemp: '',
            reussi: '',
            show: false
            // personne: []
        };
        this.templatePost = this.templatePost.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    showModal = () => {
        this.setState({ show: !this.state.show });
    };

    hideModal = () => {
        this.setState({ show: !this.state.show });
    };

    navCollection = () => {
        window.location.href = "https://www.ucollect.fun/Collection"
    };

    async templatePost(event) {
        event.preventDefault()
        if (this.state.nom_Template.length > 50 || this.state.nom_Template === '') {
            alert("votre nom de template n'a pas été acceptée, merci de réessayer.")
        }
        else {
            await fetch('https://whale-app-k7hlb.ondigitalocean.app/ajoutTemplate', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "true"
                },
                body: JSON.stringify({

                    nom_Template: this.state.nom_Template,
                    id_Bibli: this.state.id_Bibli,

                }),
            })
                //.then(res => res.text())
                //.then(text => console.log(text))
                .then(response => response.json())
                .then(json => {
                    this.setState({ id_Template: json[0].id_Template })
                    console.log(this.state.id_Template)
                    this.setState({ show: true });
                }).catch((error) => {
                    console.log(error)
                    alert("Erreur, veuillez réessayer")
                })
                .then(
                    fetch(`https://whale-app-k7hlb.ondigitalocean.app/findBiblioCollectionPossedee/${this.state.id_Bibli}`)
                        .then(response => response.json())
                        .then(json => {
                            this.setState({ donneesCollection: json })
                            console.log(this.state.donneesCollection)
                        })
                );
        }
    }

    async donneesTemplatePost(event, idObjet) {
        event.preventDefault()
        if (this.state.donneesTemplate.length > 50 || this.state.donneesTemplate === '') {
            alert("Cette donnée n'a pas été acceptée, merci de réessayer.")
        }
        else {
            await fetch('https://whale-app-k7hlb.ondigitalocean.app/ajoutDonneesTemplate', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "true"
                },
                body: JSON.stringify({

                    donneesTemplate: this.state.donneesTemplate,
                    idObjet: idObjet,
                    id_Template: this.state.id_Template

                }),
            })
                // .then(res => res.text())
                // .then(text => console.log(text))
                .then(response => response.json())
                .then(this.setState({ reussi: 'reussi' }))
                .then(this.setState({ donneesTemplateTemp: this.state.donneesTemplate }))
                .then(this.setState({ donneesTemplate: '' }))
                .then(json => {

                }).catch((error) => {
                    console.log(error)
                    this.setState({ reussi: 'rate' })
                })
        }
    }



    handleChange(event) {

        this.setState({ nom_Template: event.target.value });
    }

    handleSubmit(event) {
        //this.templatePost();
        alert('A name was submitted: ' + this.state.nom_Template);
        event.preventDefault();
    }


    render() {
        return (
            <div>
                <Navigation />


                <form style={{ textAlign: "center" }} onSubmit={this.templatePost}>

                    <label>
                        <h3 style={{ fontSize: '180%', marginTop: '5%' }}> Nom de la Template a ajouter a la bibliotheque {this.state.biblioNom} :</h3>
                        <input type="text" style={{ marginTop: '6%' }} value={this.state.nom_Template} onChange={this.handleChange} />
                    </label>
                    <br />
                    <input class="btn btn-success" type="submit" style={{ marginTop: '1.5%' }} value="Ajouter une template" />
                </form>
                {this.state.donneesCollection.length !== 0 &&
                    <Carousel show={this.state.show}>
                        {this.state.donneesCollection.map(collection => (
                            <Carousel.Item key={collection.idObjet}>
                                {/* <Button>{collection.nom}</Button> */}
                                <Row className="justify-content-md-center">
                                    <Card style={{ width: '18rem', marginTop: '5%', marginBottom: '5%' }} class="justify-content-center">
                                        <Card.Header style={{ marginTop: '1%' }}>
                                            <Card.Title> Ajouter une donné de template </Card.Title>
                                            <Card.Text>
                                                À l'objet : {collection.nom}
                                            </Card.Text>
                                        </Card.Header>
                                        <Card.Body>
                                            <form style={{ textAlign: 'center' }} onSubmit={event => this.donneesTemplatePost(event, collection.idObjet)}>
                                                <label style={{ marginRight: '1%' }}>
                                                    Donnée de template:
                                                    <input type="text" value={this.state.donneesTemplate} onChange={text => this.setState({ donneesTemplate: text.target.value })} />
                                                </label>
                                                <br></br>
                                                <input style={{ marginTop: '5%' }} type="submit" class="btn btn-outline-primary" value={"Ajouter"} />
                                            </form>
                                        </Card.Body>
                                        <Card.Footer style={{ marginTop: '1%' }}>
                                            {collection.dateAcquisition !== '' && (<ListGroupItem>Date d'acquisition : {dateFormat(collection.dateAcquisition, 'dd-mm-yyyy')}</ListGroupItem>)}
                                            {collection.dateAcquisition === '' && (<ListGroupItem>Date d'acquisition : {'inconnu'}</ListGroupItem>)}
                                        </Card.Footer>
                                    </Card>
                                </Row>
                            </Carousel.Item>

                        ))}
                    </Carousel>
                }
                {this.state.reussi === 'reussi' && (
                    <Alert variant="success" style={{ marginLeft: '5%', marginRight: '5%', marginTop: '1%', marginBottom: '1%' }}>
                        <Alert.Heading>La donnée "{this.state.donneesTemplateTemp}" a bien été ajoutée</Alert.Heading>
                    </Alert>
                )}
                {this.state.reussi === 'rate' && (
                    <Alert variant="danger" style={{ marginLeft: '5%', marginRight: '5%', marginTop: '1%', marginBottom: '1%' }}>
                        <Alert.Heading>Une érreure c'est produite, veuillez réessayer. </Alert.Heading>
                    </Alert>
                )}



                <Modal show={this.state.show ? this.state.show : undefined} onHide={this.hideModal} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        La template a bien été ajoutée, voulez vous ajouter une valeur d'entrée a vos objets actuellement possédées ?
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col style={{ textAlign: 'left' }}>
                                <button type="button" class="btn btn-outline-danger" onClick={this.navCollection} > Non </button>
                            </Col>
                            <Col style={{ textAlign: 'right' }}>
                                <button type="button" class="btn btn-outline-success" onClick={this.hideModal} > Oui </button>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
                <Row>
                    <Col style={{ position: 'absolute', textAlign: 'center', bottom: '3%' }}>
                        <button type="button" class="btn btn-outline-success" onClick={this.navCollection} > Revenir a la collection </button>
                    </Col>
                </Row>
            </div >
        );
    }
}

export default Template;