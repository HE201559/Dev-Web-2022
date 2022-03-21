import { React, Component } from "react";
import Navigation from "../component/Navigation";



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudo: '',
            motdepasse: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event) {
        alert('test recuperation données  : ' + this.state.pseudo + ' ' + this.state.motdepasse);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Navigation />
                <p>Page de connexion</p>
                <form style={{ textAlign: "center" }} onSubmit={this.handleSubmit}>
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
                    <input type="submit" value="Se connecter" />
                </form>
            </div>
        );
    }
}

export default Login;