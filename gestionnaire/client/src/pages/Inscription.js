import {React, Component} from "react";
import Navigation from "../component/Navigation";


class Inscription extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nom:'flo',
      prenom:'deg',
      email:'flo.degives@live.be',
      datenaissance:'1998-08-08',
      motdepasse:'AA1811&&aa',
      confirmmotdepasse:'AA1811&&aa',
      };

      this.handleSubmit = this.handleSubmit.bind(this);

  }



    async handleSubmit(event) {
        
  // Test que tous les champs sont remplis
    if(this.state.nom === '' || this.state.prenom === '' || this.state.email === '' || this.state.motdepasse === '' || this.state.confirmmotdepasse === ''){
        alert("Complétez tous les champs avant l'inscription")
    }
   // Test qu'une email a la bonne syntaxe
    /*else if( this.state.email.length < 8 || this.state.email.includes('.') === false || this.state.email.includes('@') === false) {
        alert("Inserez une email correcte");
    }*/


    else if(this.state.password !== this.state.confirmPassword){
            alert("Les mots de passes ne correspondent pas");
    }
   //A rajouter après que ça fonctionne et voir ce qu'on met en password policy
    /*else if(this.state.password.length <8 || this.state.password.match(/\d+/) == null || this.state.password === this.state.password.toLowerCase()){
       alert("Mot de passe pas assez complique")
    }*/

    else{ 

    event.preventDefault();
    await fetch('http://localhost:5000/inscription',{
         
          method:'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":"true"
          },
          body: JSON.stringify({
            nom:this.state.nom,
            prenom:this.state.prenom,
            email:this.state.email,      
            datenaissance:this.state.datenaissance,
            motdepasse:this.state.motdepasse,
          }),
          
          
        })
        .then(res => res.text())
        .then(text => console.log(text))
        .then(response => response.json())
        .then(json => {
    
            
          }).catch((error) => {
            console.log(error)
            
            alert("Echec de l'inscription");   
      });

    
    };
} 


  render() {
    return (
      <div>
        <Navigation />
        <p>Page d'inscription</p>
        <form style={{textAlign:"center"}} onSubmit={this.handleSubmit}>
            <label>
              Nom :
              <input type="text" value={this.state.nom} onChange={text => this.setState({nom: text.target.value})}  />   {/* onChange : permet que dés qu'il y a
               un changement dans un champ texte, le texte est update dans le state ( ce qui permet par la suite de récupérer et envoyer ces données )*/}
            </label>
            <br /><br />
            <label>
              Prénom :
              <input type="text" value={this.state.prenom} onChange={text => this.setState({prenom: text.target.value})} />
            </label>
            <br /><br />
            <label>
              Email :
              <input type="text" value={this.state.email} onChange={text => this.setState({email: text.target.value})} />
            </label>
            <br /><br />
            <label>
              Date de naissance :
              <input type="text" value={this.state.datenaissance} onChange={text => this.setState({datenaissance: text.target.value})} />
            </label>
            <br /><br />
            <label>
              Mot de passe :
              <input type="text" value={this.state.motdepasse} onChange={text => this.setState({motdepasse: text.target.value})} />
            </label>
            <br /><br />
            <label>
              Confirmer mot de passe :
              <input type="text" value={this.state.confirmmotdepasse} onChange={text => this.setState({confirmmotdepasse: text.target.value})} />
            </label>
            <br /><br />
            <input type="submit" value="S'inscrire" />
          </form>
      </div>
    );
  }
}

export default Inscription;