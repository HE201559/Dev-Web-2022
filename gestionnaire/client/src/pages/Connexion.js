import { React, Component } from "react";
import Navigation from "../component/Navigation";



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            motdepasse: '',
            utilisateur: [],
            tousEmails: [],
            tousEmailsArray: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }


    async componentDidMount() {

        await fetch(`http://176.96.231.198:5000/findTousUtilisateurs`)
            .then(response => response.json())
            .then(json => {
                this.setState({ tousEmails: json })

            })

        this.state.tousEmails.map(email => (
            this.state.tousEmailsArray.push(email.email)
        ))
        console.log(this.state.tousEmailsArray)
    };




    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.tousEmailsArray.includes(this.state.email) === false) {
            alert('Email inconnue')
        }
        else {
            //alert('Email OK')
            await fetch(`http://176.96.231.198:5000/connexion/${this.state.email}`)
                .then(response => response.json())
                .then(json => {
                    this.setState({ utilisateur: json })

                })
            console.log(this.state.utilisateur[0].email)
            var bcrypt = require('bcryptjs');
            bcrypt.compare(this.state.motdepasse, this.state.utilisateur[0].motdepasse, function (err, res) {
                if (res) {
                    console.log(localStorage.getItem('Connecte'))
                    localStorage.setItem('Connecte', true)
                    console.log(localStorage.getItem('Connecte'))
                    window.location.href = "https://gestionnaire-collection.netlify.app/"
                }
                else {
                    alert("Mot de passe incorrect")
                }
            })
            localStorage.setItem('EmailUtilisateur', this.state.email)
        }
    }


    render() {
        return (
            <div style={{ textAlign: 'center', height: '47.1pc' }}>
                <Navigation />
                <h1 style={{ marginTop: '6%', marginBottom: '13%' }}>Connexion</h1>
                <form style={{ textAlign: "center" }} onSubmit={this.handleSubmit}>
                    <div style={{ width: '49%', float: 'left', textAlign: 'center' }}>
                        <label>
                            Email :
                            <input style={{ marginLeft: '1%' }} type="text" value={this.state.email} onChange={text => this.setState({ email: text.target.value })} />
                        </label>
                        <br /><br />
                    </div>
                    <div style={{ width: '49%', float: 'right', textAlign: 'center' }}>
                        <label>
                            Mot de passe :
                            <input style={{ marginLeft: '1%' }} type="password" value={this.state.motdepasse} onChange={text => this.setState({ motdepasse: text.target.value })} />
                        </label>
                        <br /><br />
                    </div>
                    <input style={{ marginTop: '5%', fontSize: '130%' }} class="btn btn-success" type="submit" value="Se connecter" />
                </form>
            </div>
        );
    }
}

export default Login;