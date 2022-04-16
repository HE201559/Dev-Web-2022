import { React, Component } from "react";
import Navigation from "../component/Navigation";



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            motdepasse: '',
            utilisateur:[],
            tousEmails:[],
            tousEmailsArray:[],
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }


    async componentDidMount(){

        await fetch(`http://localhost:5000/findTousUtilisateurs`)
          .then(response => response.json())
          .then(json => {
            this.setState({tousEmails: json})
            
          })

          {this.state.tousEmails.map(email => (
            this.state.tousEmailsArray.push(email.email)
      ))}
      console.log(this.state.tousEmailsArray)
    };




    async handleSubmit(event) {
        event.preventDefault();
        if(this.state.tousEmailsArray.includes(this.state.email) === false){
            alert('Email inconnue')
        }
        else{
            //alert('Email OK')
            await fetch(`http://localhost:5000/connexion/${this.state.email}`)
                .then(response => response.json())
                .then(json => {
                this.setState({utilisateur: json})
                
            })
            console.log(this.state.utilisateur[0].email)
            var bcrypt = require('bcryptjs');
                bcrypt.compare(this.state.motdepasse, this.state.utilisateur[0].motdepasse, function(err,res){
                    if(res){
                        localStorage.setItem('Connecte', true)
                        window.location.href="http://localhost:3000/"
                        }
                    else{
                        alert("Mot de passe incorrect")
                    }
                })
                localStorage.setItem('EmailUtilisateur',this.state.email )
        }
    }


    render() {
        return (
            <div>
                <Navigation />
                <p>Page de connexion</p>
                <form style={{ textAlign: "center" }} onSubmit={this.handleSubmit}>
                    <label>
                        Email :
                        <input type="text" value={this.state.email} onChange={text => this.setState({ email: text.target.value })} />
                    </label>
                    <br /><br />
                    <label>
                        Mot de passe :
                        <input type="password" value={this.state.motdepasse} onChange={text => this.setState({ motdepasse: text.target.value })} />
                    </label>
                    <br /><br />
                    <input type="submit" value="Se connecter" />
                </form>
            </div>
        );
    }
}

export default Login;