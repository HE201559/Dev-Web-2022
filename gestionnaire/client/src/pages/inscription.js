import { React, Component } from "react";
import Navigation from "../component/Navigation";

class Inscription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            prenom: '',
            email: '',
            pseudo: '',
            motdepasse: '',
            confirmmotdepasse: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        alert('test recuperation données  : ' + this.state.nom + ' ' + this.state.prenom + ' ' + this.state.email + ' ' + this.state.pseudo + ' ' + this.state.motdepasse + ' ' + this.state.confirmmotdepasse);
        event.preventDefault();

    }
    /* fonction permettant d'envoyer les données (celle qui permettra
     d'envoyer dans la db btw ) d'abord test la récupération des données au clic sur envoyer */


    render() {
        return (

            <div>
                <Navigation />

                <p>Page d'inscription</p>
                <form style={{ textAlign: "center" }} onSubmit={this.handleSubmit}>
                    <label>
                        Nom :
                        <input type="text" value={this.state.nom} onChange={text => this.setState({ nom: text.target.value })} />   {/* onChange : permet que dés qu'il y a
               un changement dans un champ texte, le texte est update dans le state ( ce qui permet par la suite de récupérer et envoyer ces données )*/}
                    </label>
                    <br /><br />
                    <label>
                        Prénom :
                        <input type="text" value={this.state.prenom} onChange={text => this.setState({ prenom: text.target.value })} />
                    </label>
                    <br /><br />
                    <label>
                        Email :
                        <input type="text" value={this.state.email} onChange={text => this.setState({ email: text.target.value })} />
                    </label>
                    <br /><br />
                    <label>
                        Pseudo :
                        <input type="text" value={this.state.pseudo} onChange={text => this.setState({ pseudo: text.target.value })} />
                    </label>
                    <br /><br />
                    <label>
                        Mot de passe :
                        <input type="text" value={this.state.motdepasse} onChange={text => this.setState({ motdepasse: text.target.value })} />
                    </label>
                    <br /><br />
                    <label>
                        Confirmer mot de passe :
                        <input type="text" value={this.state.confirmmotdepasse} onChange={text => this.setState({ confirmmotdepasse: text.target.value })} />
                    </label>
                    <br /><br />
                    <input type="submit" value="S'inscrire" />
                </form>
            </div>
        );
    }
}

export default Inscription;