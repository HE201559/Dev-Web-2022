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
            donneesCollection: [],
            id_Template: '',
            donneesTemplate: '',
            donneesTemplateTemp: '',
            reussi: ''
            // personne: []
        };
        this.templatePost = this.templatePost.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    async templatePost(event) {
        event.preventDefault()
        await fetch('http://localhost:5000/ajoutTemplate', {
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
            }).catch((error) => {
                console.log(error)
            })
            .then(
                fetch(`http://localhost:5000/findBiblioCollectionPossedee/${this.state.id_Bibli}`)
                    .then(response => response.json())
                    .then(json => {
                        this.setState({ donneesCollection: json })
                        console.log(this.state.donneesCollection)
                    })
            )
            // .then(
            //     this.showModal(),
            //     await fetch(`http://localhost:5000/findTemplateId/${JSON.stringify({
            //         nom_Template: this.state.nom_Template,
            //         id_Bibli: this.state.id_Bibli
            //     }
            //     )}

            //         `)
            //         .then(response => response.json())
            //         .then(json => {
            //             this.setState({ id_Template: json[0].id_Template })
            //             console.log(this.state.id_Template)
            //         })
            // )
            ;
    }

    async donneesTemplatePost(event, idObjet) {
        event.preventDefault()
        await fetch('http://localhost:5000/ajoutDonneesTemplate', {
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



    handleChange(event) {

        this.setState({ nom_Template: event.target.value });
    }

    handleSubmit(event) {
        //this.templatePost();
        alert('A name was submitted: ' + this.state.nom_Template);
        event.preventDefault();
    }

    // componentDidMount() {

    //     fetch(`http://localhost:5000/findBiblioCollectionPossedee/${this.state.id_Bibli}`)
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({ donneesCollection: json })
    //             console.log(this.state.donneesCollection)
    //         })
    // }
    // testApi = async () => {
    //     let data = await api.get('findAllObjets').then(({ data }) => data);
    //     this.setState({ personne: data });
    //     console.log(this.state.personne[2].prix);
    // }


    render() {
        return (
            <div>
                <Navigation />
                hello
                <br />
                {/* <button onClick={() => this.testApi()}>oui</button> */}

                test : {secureLocalStorage.getItem("secureBiblioId")}
                test test
                {this.state.id_Template}

                <form style={{ textAlign: "center" }} onSubmit={this.templatePost}>
                    <label>
                        <h3 style={{ fontSize: '180%' }}> Nom de la Template a ajouter a la bibliotheque {secureLocalStorage.getItem("secureBiblioId")} :</h3>
                        <input type="text" style={{ marginTop: '6%' }} value={this.state.nom_Template} onChange={this.handleChange} />
                    </label>
                    <br />
                    <input class="btn btn-success" type="submit" style={{ marginTop: '1%' }} value="Ajouter une template" />
                </form>
                {this.state.donneesCollection !== '' &&
                    <Carousel>
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
                                                    Donnée de template: {this.state.id_Template}
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



                <Modal show={this.state.show} onHide={this.hideModal}  >
                    <Modal.Header closeButton>
                        Voulez vous ajouter une valeur d'entrée a vos objets actuellement possédées ?
                    </Modal.Header>
                    <Modal.Body>
                        <Row>

                            <Col style={{ textAlign: 'center' }}>
                                <button type="button" class="btn btn-outline-success" onClick={this.hideModal} > quitter </button>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </div >
        );
    }
}

export default Template;