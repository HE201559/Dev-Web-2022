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

  handleChange = (text, idTemplate) => {
    let temp = this.state.ajoutTemplate;

    temp[idTemplate] = text.target.value;

    this.setState({ ajoutTemplate: temp });


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

      })
      .then(() => {

        let items = {};
        for (let oui in this.state.donneTemplate) {
          items[this.state.donneTemplate[oui].id_Template] = ''
        }
        this.setState({ ajoutTemplate: items });
        console.log(this.state.ajoutTemplate);
        //);


        //   //console.log(oui)
        //   // this.setState(previousState => ({
        //   //   ajoutTemplate: [...previousState.ajoutTemplate, [oui.id_Template, 'oui']]
        //   // }));
        //   //this.setState({ ajoutTemplate: this.state.ajoutTemplate.concat('pute') })
        //}
        //console.log(this.state.ajoutTemplate)
        //console.log(this.state.ajoutTemplate)
      })
      .then(() => this.setState({ loading: false }));
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.dateAcquisition > this.state.dateActuelle) {
      alert("La date du " + this.state.dateAcquisition + " n'est pas encore arrivée à moins que vous ne veniez du futur")
    }

    else if (this.state.nom === '' || this.state.description === '' || this.state.prix === '' || this.state.dateAcquisition === '' || this.state.etat === '' || this.state.edition === '') {
      alert("Vous n'avez pas rempli tous les champs obligatoire (template exclues)")
    }

    else {

      fetch(`http://localhost:5000/findAllBiblioCollection`)
        .then(response => response.json())
        .then(json => {
          this.setState({ objetId: 1 + json[0].max })
          console.log(this.state.objetId)
        })
        .then(fetch('http://localhost:5000/ajoutObjetTbBiblio', {

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

            this.setState({ objetId: json[0].idObjet })
          }).catch((error) => {
            console.log(error)
          })
          .then(

            fetch('http://localhost:5000/ajoutObjetTbObjets', {

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
                objetId: this.state.objetId,
                image: this.state.image,
              }),


            })
              .then(res => res.text())
              .then(text => console.log(text))
              .then(response => response.json())
              .then(json => {
                this.setState({ objetId: json[0].idObjet })

              }).catch((error) => {
                console.log(error)
              })
              .then(

                Object.keys(this.state.ajoutTemplate).map((envoie) => {

                  if (this.state.ajoutTemplate[envoie] !== '' && this.state.ajoutTemplate[envoie].length < 50) {
                    console.log(envoie);
                    fetch('http://localhost:5000/ajoutDonneesTemplate', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "true"
                      },
                      body: JSON.stringify({

                        donneesTemplate: this.state.ajoutTemplate[envoie],
                        idObjet: this.state.objetId,
                        id_Template: envoie

                      }),
                    })

                      .then(response => response.json())
                      .then(json => {

                      }).catch((error) => {
                        console.log(error)
                        alert("Une érreure c'est produite lors de l'ajout d'une template.")
                        this.setState({ reussi: 'rate' })
                      })

                  }

                }
                )
              )
          )


        )
      console.log(this.state.objetId)

      window.location.href = "http://localhost:3000/Collection"
    }

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
              <>
                <label>
                  {template.nom_Template} :

                  <input type="text" value={this.state.ajoutTemplate[template.id_Template]} onChange={text => this.handleChange(text, template.id_Template)} />
                </label>
                <br /><br />

              </>

            ))}
            <input type="submit" style={{ marginBottom: '4.5%' }} class="btn btn-success" value="Ajouter un objet" />
          </form>
        </Container>
      </div>
    );
  }
}

export default AjoutObjet;