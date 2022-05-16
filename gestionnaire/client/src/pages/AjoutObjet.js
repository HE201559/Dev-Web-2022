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

    await fetch(`https://176.96.231.198:5000/findAllBiblioCollection`)
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
      await fetch('https://176.96.231.198:5000/ajoutObjetTbBiblio', {

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


      await fetch('https://176.96.231.198:5000/ajoutObjetTbObjets', {

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
      <div style={{ textAlign: "center" }}>
        <Navigation />
        <Container>
          <h2 style={{ marginTop: '6%', marginBottom: '13%', textShadow: '2px 2px white' }}> Ajoutez un nouvel objet à votre collection {localStorage.getItem('nomBibli')} </h2>
          <form style={{ textAlign: "center" }} onSubmit={this.handleSubmit}>
            <div style={{ width: '49%', float: 'left', textAlign: 'center' }}>
              <label>
                Nom : <br></br>
                <input type="text" value={this.state.nom} onChange={text => this.setState({ nom: text.target.value })} />   {/* onChange : permet que dés qu'il y a
               un changement dans un champ texte, le texte est update dans le state ( ce qui permet par la suite de récupérer et envoyer ces données )*/}
              </label>
              <br /><br />
              <label>
                Description de l'objet : <br></br>
                <input type="text" value={this.state.description} onChange={text => this.setState({ description: text.target.value })} />
              </label>
              <br /><br />
              <label>
                Prix : <br></br>
                <input type="number" value={this.state.prix} onChange={text => this.setState({ prix: text.target.value })} />
              </label>
              <br /><br />
            </div>
            <div style={{ width: '49%', float: 'right', textAlign: 'center' }}>
              <label>
                Date d'acquisition : <br></br>
                <input type="date" value={this.state.dateAcquisition} onChange={text => this.setState({ dateAcquisition: text.target.value })} />
              </label>
              <br /><br />
              <label>
                Etat : <br></br>
                <input type="text" value={this.state.etat} onChange={text => this.setState({ etat: text.target.value })} />
              </label>
              <br /><br />
              <label>
                Edition : <br></br>
                <input type="text" value={this.state.edition} onChange={text => this.setState({ edition: text.target.value })} />
              </label>
              <br /><br />
            </div><br></br>
            <input type="submit" style={{ marginTop: '1%', fontSize: '120%' }} class="btn btn-success" value="Ajouter un objet" />
          </form>
        </Container>
      </div >
    );
  }
}

export default AjoutObjet;