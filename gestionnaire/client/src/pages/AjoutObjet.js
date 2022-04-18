import { React, Component } from "react";
import Navigation from "../component/Navigation";
import { NavLink } from "react-router-dom";
import { Row, Col, Container, Card, ListGroup, ListGroupItem } from 'react-bootstrap'

class AjoutObjet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nom: '',
      description: '',
      prix: '',
      dateAcquisition: '',
      etat: '',
      edition: '',
      biblioId: localStorage.getItem('biblioId'),
      objetId: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  async componentDidMount() {

    await fetch(`http://localhost:5000/findAllBiblioCollection`)
      .then(response => response.json())
      .then(json => {
        this.setState({ objetId: 1 + json[0].max })
        console.log(this.state.objetId)
      })


  }

  async handleSubmit(event) {
    event.preventDefault()
    console.log(this.state.objetId)
    await fetch('http://localhost:5000/ajoutObjetTbBiblio', {

      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "true"
      },
      body: JSON.stringify({
        // nom:this.state.nom,
        // description:this.state.description,
        // prix:this.state.prix,      
        // dateAcquisition:this.state.dateAcquisition,
        // etat:this.state.etat,
        // edition:this.state.edition,
        biblioId: this.state.biblioId,
        //objetId:Number(this.state.objetId),
      }),


    })
      .then(res => res.text())
      .then(text => console.log(text))
      .then(response => response.json())
      .then(json => {


      }).catch((error) => {
        console.log(error)
      });


    await fetch('http://localhost:5000/ajoutObjetTbObjets', {

      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "true"
      },
      body: JSON.stringify({
        nom: this.state.nom,
        description: this.state.description,
        prix: this.state.prix,
        dateAcquisition: this.state.dateAcquisition,
        etat: this.state.etat,
        edition: this.state.edition,
        //biblioId: this.state.biblioId,
        objetId: Number(this.state.objetId),
      }),


    })
      .then(res => res.text())
      .then(text => console.log(text))
      .then(response => response.json())
      .then(json => {


      }).catch((error) => {
        console.log(error)
      });

    window.location.href = "http://localhost:3000/Collection"
  };





  render() {
    return (
      <div>
        <Navigation />
        <Container>
          <h2> Ajoutez un nouvel objet à votre collection {localStorage.getItem('nomBibli')} </h2>
          <form style={{ textAlign: "center" }} onSubmit={this.handleSubmit}>
            <label>
              Nom :
              <input type="text" value={this.state.nom} onChange={text => this.setState({ nom: text.target.value })} />   {/* onChange : permet que dés qu'il y a
               un changement dans un champ texte, le texte est update dans le state ( ce qui permet par la suite de récupérer et envoyer ces données )*/}
            </label>
            <br /><br />
            <label>
              Description de l'objet :
              <input type="text" value={this.state.description} onChange={text => this.setState({ description: text.target.value })} />
            </label>
            <br /><br />
            <label>
              Prix :
              <input type="text" value={this.state.prix} onChange={text => this.setState({ prix: text.target.value })} />
            </label>
            <br /><br />
            <label>
              Date d'acquisition :
              <input type="date" value={this.state.dateAcquisition} onChange={text => this.setState({ dateAcquisition: text.target.value })} />
            </label>
            <br /><br />
            <label>
              Etat :
              <input type="text" value={this.state.etat} onChange={text => this.setState({ etat: text.target.value })} />
            </label>
            <br /><br />
            <label>
              Edition :
              <input type="text" value={this.state.edition} onChange={text => this.setState({ edition: text.target.value })} />
            </label>
            <br /><br />
            <input type="submit" value="Ajouter un objet" />
          </form>
        </Container>
      </div>
    );
  }
}

export default AjoutObjet;