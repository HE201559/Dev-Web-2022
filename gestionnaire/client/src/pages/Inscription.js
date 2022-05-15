import { React, Component } from "react";
import Navigation from "../component/Navigation";
import moment from "moment";


class Inscription extends Component {

  constructor(props) {
    super(props);
    this.state = {
      /*nom:'flo',
      prenom:'deg',
      email:'flo.degives@live.be',
      datenaissance:'1998-08-08',
      motdepasse:'AA1811&&aa',
      confirmmotdepasse:'AA1811&&aa',
      tousEmails:[],
      tousEmailsArray:[],*/
      nom: '',
      prenom: '',
      email: '',
      datenaissance: '',
      motdepasse: '',
      confirmmotdepasse: '',
      tousEmails: [],
      tousEmailsArray: [],
      dateActuelle: moment().format("YYYY-MM-DD"),
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  }
  async componentDidMount() {

    await fetch(`https://176.96.231.198:5000/findTousUtilisateurs`)
      .then(response => response.json())
      .then(json => {
        this.setState({ tousEmails: json })

      })

    this.state.tousEmails.map(email => (
      this.state.tousEmailsArray.push(email.email)
    ));


  }


  async handleSubmit(event) {


    // Test que tous les champs sont remplis
    if (this.state.nom === '' || this.state.prenom === '' || this.state.email === '' || this.state.motdepasse === '' || this.state.confirmmotdepasse === '' || this.state.datenaissance === '') {
      alert("Complétez tous les champs avant l'inscription")
    }
    // Test qu'une email a la bonne syntaxe
    else if (this.state.email.length < 8 || this.state.email.includes('.') === false || this.state.email.includes('@') === false) {
      alert("Inserez une email correcte");
    }

    else if (this.state.datenaissance > this.state.dateActuelle) {
      alert("La date du " + this.state.datenaissance + " n'est pas encore arrivée à moins que vous ne veniez du futur")
    }


    else if (this.state.password !== this.state.confirmPassword) {
      alert("Les mots de passes ne correspondent pas");
    }

    else if (this.state.tousEmailsArray.includes(this.state.email) === true) {
      alert('Email déjà utilisée par un autre compte')
    }
    //A rajouter après que ça fonctionne et voir ce qu'on met en password policy
    /*else if(this.state.password.length <8 || this.state.password.match(/\d+/) == null || this.state.password === this.state.password.toLowerCase()){
       alert("Mot de passe pas assez complique")
    }*/

    else {

      event.preventDefault()




      await fetch('https://176.96.231.198:5000/inscription', {

        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "true"
        },
        body: JSON.stringify({
          nom: this.state.nom,
          prenom: this.state.prenom,
          email: this.state.email,
          datenaissance: this.state.datenaissance,
          motdepasse: this.state.motdepasse,
        }),


      })
        .then(res => res.text())
        .then(text => console.log(text))
        .then(response => response.json())
        .then(json => {


        }).catch((error) => {

        });

      window.location.href = "https://gestionnaire-collection.netlify.app/PostInscription"
    };

  }


  render() {
    return (
      <div style={{ textAlign: 'center', height: '47.1pc' }}>
        <Navigation />
        <div style={{ textShadow: '1px 1px white' }}>
          <h1 style={{ marginTop: '6%', marginBottom: '13%' }}>Inscrivez-vous sur Ucollect !</h1>
          <form style={{ textAlign: "center" }} onSubmit={this.handleSubmit}>
            <div style={{ width: '49%', float: 'left', textAlign: 'center' }}>
              <label>
                Nom : <br></br>
                <input type="text" value={this.state.nom} onChange={text => this.setState({ nom: text.target.value })} />   {/* onChange : permet que dés qu'il y a
               un changement dans un champ texte, le texte est update dans le state ( ce qui permet par la suite de récupérer et envoyer ces données )*/}
              </label>
              <br /><br />
              <label>
                Prénom : <br></br>
                <input type="text" value={this.state.prenom} onChange={text => this.setState({ prenom: text.target.value })} />
              </label>
              <br /><br />
              <label>
                Email : <br></br>
                <input type="text" value={this.state.email} onChange={text => this.setState({ email: text.target.value })} />
              </label>
              <br /><br />
            </div>
            <div style={{ width: '49%', float: 'left', textAlign: 'center' }}>
              <label>
                Date de naissance : <br></br>
                <input type="date" value={this.state.datenaissance} onChange={text => this.setState({ datenaissance: text.target.value })} />
              </label>
              <br /><br />
              <label>
                Mot de passe : <br></br>
                <input type="password" value={this.state.motdepasse} onChange={text => this.setState({ motdepasse: text.target.value })} />
              </label>
              <br /><br />
              <label>
                Confirmer mot de passe : <br></br>
                <input type="password" value={this.state.confirmmotdepasse} onChange={text => this.setState({ confirmmotdepasse: text.target.value })} />
              </label>
              <br /><br />
            </div>
            <input style={{ fontSize: '130%', marginTop: '1%' }} type="submit" class="btn btn-success" value="S'inscrire" />
          </form>
        </div>
      </div>
    );
  }
}

export default Inscription;