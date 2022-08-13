import { React, Component } from "react";
import Navigation from "../component/Navigation";
// import { NavLink } from "react-router-dom";
// import { Row, Col, Container, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Container, Spinner } from 'react-bootstrap'
import moment from "moment";
import secureLocalStorage from "react-secure-storage";

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
      biblioId: secureLocalStorage.getItem('biblioId'),
      objetId: '',
      image: '',
      dateActuelle: moment().format("YYYY-MM-DD"),
      ajoutTemplate: [],
      donneTemplate: [],
      loading: true

    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (text, idObjet) => {
    //this.setState({ ajoutTemplate: this.state.ajoutTemplate.concat([text.target.value], [idObjet]) });
    this.setState(prevState => {
      let ajoutTemplate = Object.assign({}, prevState.ajoutTemplate);  // creating copy of state variable jasper
      ajoutTemplate[idObjet].nom_Template = text.target.value;                     // update the name property, assign a new value                 
      return { ajoutTemplate };                                 // return new object jasper object
    })
  };

  componentDidMount() {

    fetch(`http://localhost:5000/findAllBiblioCollection`)
      .then(response => response.json())
      .then(json => {
        this.setState({ objetId: 1 + json[0].max })
        console.log(this.state.objetId)
      })

    fetch(`http://localhost:5000/findTemplateId/${this.state.biblioId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ donneTemplate: json })
        // console.log(this.state.donneTemplate)
        //this.setState({ ajoutTemplate: json })
        //console.log(this.state.donneTemplate)
        //let items = {};

        //console.log(this.state.ajoutTemplate)
        //console.log(this.state.donneTemplate)
      })
      .then(() => {
        //this.setState({ donneTemplate: this.state.ajoutTemplate })
        //console.log(this.state.donneTemplate)
        //let items = {};
        //for (let oui in this.state.donneTemplate) {
        //   //this.setState({ ajoutTemplate.nom_Template : ''})
        //   // this.setState(prevState => ({
        //   //   donneTemplate: [...prevState.donneTemplate, [oui.id_Template], ['']]
        //   // }))
        let oui = 0;
        this.state.donneTemplate.map(arr => {

          oui += oui;
          this.setState(prevState => {
            //for (let oui in this.state.donneTemplate) {
            let ajoutTemplate = Object.assign({}, prevState.donneTemplate);  // creating copy of state variable jasper
            ajoutTemplate[oui].id_Template = this.state.donneTemplate[oui].id_Template;                     // update the name property, assign a new value                 
            ajoutTemplate[oui].nom_Template = 'oui';                     // update the name property, assign a new value                 
            return { ajoutTemplate };                                 // return new object jasper object
            //}
          })
        }


        );


        //   //console.log(oui)
        //   // this.setState(previousState => ({
        //   //   ajoutTemplate: [...previousState.ajoutTemplate, [oui.id_Template, 'oui']]
        //   // }));
        //   //this.setState({ ajoutTemplate: this.state.ajoutTemplate.concat('pute') })
        //}
        //console.log(this.state.ajoutTemplate)
        console.log(this.state.ajoutTemplate)
      })
      .then(() => this.setState({ loading: false }));
  }

  async handleSubmit(event) {
    event.preventDefault()
    for (let oui of this.state.ajoutTemplate) {

      console.log(oui);
    }
    // if (this.state.dateAcquisition > this.state.dateActuelle) {
    //   alert("La date du " + this.state.dateAcquisition + " n'est pas encore arrivée à moins que vous ne veniez du futur")
    // }

    // else if (this.state.nom === '' || this.state.description === '' || this.state.prix === '' || this.state.dateAcquisition === '' || this.state.etat === '' || this.state.edition === '') {
    //   alert("Vous n'avez pas rempli tous les champs")
    // }

    // else {
    //   console.log(this.state.objetId)
    //   await fetch('http://localhost:5000/ajoutObjetTbBiblio', {

    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       "Access-Control-Allow-Origin": "true"
    //     },
    //     body: JSON.stringify({
    //       // nom:this.state.nom,
    //       // description:this.state.description,
    //       // prix:this.state.prix,      
    //       // dateAcquisition:this.state.dateAcquisition,
    //       // etat:this.state.etat,
    //       // edition:this.state.edition,
    //       biblioId: this.state.biblioId,
    //       //objetId:Number(this.state.objetId),
    //     }),


    //   })
    //     .then(res => res.text())
    //     .then(text => console.log(text))
    //     .then(response => response.json())
    //     .then(json => {


    //     }).catch((error) => {
    //       console.log(error)
    //     });


    //   await fetch('http://localhost:5000/ajoutObjetTbObjets', {

    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       "Access-Control-Allow-Origin": "true"
    //     },
    //     body: JSON.stringify({
    //       nom: this.state.nom,
    //       description: this.state.description,
    //       prix: this.state.prix,
    //       dateAcquisition: this.state.dateAcquisition,
    //       etat: this.state.etat,
    //       edition: this.state.edition,
    //       //biblioId: this.state.biblioId,
    //       objetId: Number(this.state.objetId),
    //       image: this.state.image,
    //     }),


    //   })
    //     .then(res => res.text())
    //     .then(text => console.log(text))
    //     .then(response => response.json())
    //     .then(json => {


    //     }).catch((error) => {
    //       console.log(error)
    //     });

    //   window.location.href = "http://localhost:3000/Collection"
    // }


  };





  render() {
    if (this.state.loading) {
      return <Spinner /> // or whatever you want to show if the app is loading
    }
    return (
      <div>
        <Navigation />
        <Container>
          <h2 style={{ textAlign: "center" }}> Ajoutez un nouvel objet à votre collection {localStorage.getItem('nomBibli')} </h2>
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
            {this.state.donneTemplate.map(template => (

              <form style={{ textAlign: "center" }} key={template.id_Template}>
                <label>
                  {template.nom_Template} :
                  {/* {
                    this.state.donneTemplate.findIndex(obj => {
                      return obj.id_Template === template.id_Template;
                    })
                  } */}
                  {this.state.ajoutTemplate[
                    this.state.donneTemplate.findIndex(obj => {
                      return obj.id_Template === template.id_Template;
                    })
                  ].nom_Template}
                  {/* {this.state.ajoutTemplate[
                    0
                  ].nom_Template} */}
                  {/* {this.state.ajoutTemplate.filter(obj => {
                    return obj === template.id_Template;
                  })} */}
                  {/* <input type="text" value={this.state.ajoutTemplate[this.state.ajoutTemplate.find(obj => {
                    return obj.id_Template === template.id_Template;
                  })][1]} onChange={text => this.handleChange(text, template.id_Template)} /> */}
                </label>
                <br /><br />
              </form>

            ))}
            <input type="submit" style={{ marginBottom: '4.5%' }} class="btn btn-success" value="Ajouter un objet" />
          </form>
        </Container>
      </div>
    );
  }
}

export default AjoutObjet;