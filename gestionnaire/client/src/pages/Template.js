import React from 'react';
import Navigation from "../component/Navigation";
import secureLocalStorage from "react-secure-storage";


class Template extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            nomTemplate: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ nomTemplate: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.nomTemplate);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Navigation />
                hello
                <br />
                test : {secureLocalStorage.getItem("secureBiblioId")}
                test test

                <form style={{ textAlign: "center" }} onSubmit={this.handleSubmit}>
                    <label>
                        <h3 style={{ fontSize: '180%' }}> Nom de la Template a ajouter a la bibliotheque {secureLocalStorage.getItem("secureBiblioId")} :</h3>
                        <input type="text" style={{ marginTop: '6%' }} value={this.state.nomTemplate} onChange={this.handleChange} />
                    </label>
                    <br />
                    <input class="btn btn-success" type="submit" style={{ marginTop: '1%' }} value="Ajouter une template" />
                </form>
            </div>
        );
    }
}

export default Template;