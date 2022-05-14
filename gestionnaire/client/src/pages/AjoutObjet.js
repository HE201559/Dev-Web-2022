import { React, Component } from "react";
import Navigation from "../component/Navigation";
// import { NavLink } from "react-router-dom";
// import { Row, Col, Container, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import moment from "moment";

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
      image: '',
      dateActuelle: moment().format("YYYY-MM-DD"),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  async componentDidMount() {

    await fetch(`http://176.96.231.198:5000/findAllBiblioCollection`)
      .then(response => response.json())
      .then(json => {
        this.setState({ objetId: 1 + json[0].max })
        console.log(this.state.objetId)
      })


  }

  async handleSubmit(event) {
    event.preventDefault()

    if (this.state.dateAcquisition > this.state.dateActuelle) {
      alert("La date du " + this.state.dateAcquisition + " n'est pas encore arrivée à moins que vous ne veniez du futur")
    }

    else if (this.state.nom === '' || this.state.description === '' || this.state.prix === '' || this.state.dateAcquisition === '' || this.state.etat === '' || this.state.edition === '') {
      alert("Vous n'avez pas rempli tous les champs")
    }

    else {
      console.log(this.state.objetId)
      await fetch('http://176.96.231.198:5000/ajoutObjetTbBiblio', {

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


      await fetch('http://176.96.231.198:5000/ajoutObjetTbObjets', {

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
          image: this.state.image,
          perso1: this.state.perso1,
          perso2: this.state.perso2,
          perso3: this.state.perso3,
        }),


      })
        .then(res => res.text())
        .then(text => console.log(text))
        .then(response => response.json())
        .then(json => {


        }).catch((error) => {
          console.log(error)
        });

      window.location.href = "https://gestionnaire-collection.netlify.app/Collection"
    }


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
              <input type="number" value={this.state.prix} onChange={text => this.setState({ prix: text.target.value })} />
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
            <label>
              Image :
            </label>
            <br /><br />
            <label>
              Perso1 :
              <input type="text" value={this.state.perso1} onChange={text => this.setState({ perso1: text.target.value })} />
            </label>
            <br /><br />
            <label>
              Perso2 :
              <input type="text" value={this.state.perso2} onChange={text => this.setState({ perso2: text.target.value })} />
            </label>
            <br /><br />
            <label>
              Perso3 :
              <input type="text" value={this.state.perso3} onChange={text => this.setState({ perso3: text.target.value })} />
            </label>
            <br /><br />
            <input type="submit" style={{ marginBottom: '4.5%' }} class="btn btn-success" value="Ajouter un objet" />
          </form>
        </Container>
      </div>
    );
  }
}

export default AjoutObjet;