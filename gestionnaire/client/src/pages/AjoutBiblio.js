import { React, Component } from "react";
import Navigation from "../component/Navigation";
import { NavLink } from "react-router-dom";
import { Row, Col, Container, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import moment from "moment";

class AjoutBiblio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailUser: localStorage.getItem('EmailUtilisateur'),
            nomBibli: '',
            biblioDateCre: moment().format("YYYY-MM-DD"),
            biblioId: localStorage.getItem('biblioId'),

        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault()
        //console.log(this.state.biblioDateCre)
        //console.log(this.state.nomBibli)
        //console.log(this.state.emailUser)

        await fetch('http://localhost:5000/ajoutBibliotheque', {

            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "true"
            },
            body: JSON.stringify({
                emailUser: this.state.emailUser,
                nomBibli: this.state.nomBibli,
                biblioDateCre: this.state.biblioDateCre,
            }),
        })
            .then(res => res.text())
            .then(text => console.log(text))
            .then(response => response.json())
            .then(json => {


            }).catch((error) => {
                console.log(error)
            });

        window.location.href = "http://localhost:3000/Bibliotheques"
    };





    render() {
        return (
            <div>
                <Container>
                    <form style={{ textAlign: "center" }} onSubmit={this.handleSubmit}>
                        <label>
                            Nom de la bibliotheque :
                            <input type="text" value={this.state.nomBibli} onChange={text => this.setState({ nomBibli: text.target.value })} />
                        </label>
                        <br /><br />
                        <input class="btn btn-outline-success" type="submit" value="Ajouter une bibliotheque" />
                    </form>
                </Container>
            </div>
        );
    }
}

export default AjoutBiblio;