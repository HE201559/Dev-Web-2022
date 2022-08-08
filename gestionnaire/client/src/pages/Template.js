import React from 'react';
import Navigation from "../component/Navigation";
import secureLocalStorage from "react-secure-storage";
import { Row, Col, Container, Card, ListGroup, ListGroupItem, Modal, Button, Carousel } from 'react-bootstrap'
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
            count: 2
            // personne: []
        };
        this.templatePost = this.templatePost.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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
            .then(res => res.text())
            .then(text => console.log(text))
            .then(response => response.json())
            .then(
                fetch(`http://localhost:5000/findBiblioCollectionPossedee/${this.state.id_Bibli}`)
                    .then(response => response.json())
                    .then(json => {
                        this.setState({ donneesCollection: json })
                        console.log(this.state.donneesCollection)
                    })
            )
            .then(json => {


            }).catch((error) => {
                console.log(error)
            });
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
                                            <form style={{ textAlign: 'center' }} onSubmit={event => this.handleSubmitModele(event, collection.idObjet)}>
                                                <label style={{ marginRight: '1%' }}>
                                                    Donnée de template:
                                                    <input type="text" value={this.state.donneModele} onChange={text => this.setState({ donneModele: text.target.value })} />
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
                {/* <span>{this.state.donneesCollection}</span>
                <button onClick={() => this.setState({ count: this.state.count - 1 })}>
                    -1
                </button>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    +1
                </button> */}


            </div >
        );
    }
}

export default Template;