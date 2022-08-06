import React from 'react';
import Navigation from "../component/Navigation";
import secureLocalStorage from "react-secure-storage";


class Template extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            nom_Template: '',
            id_Bibli: secureLocalStorage.getItem("secureBiblioId"),
            // personne: []
        };
        this.templatePost = this.templatePost.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async templatePost(event) {
        event.preventDefault()
        await fetch('http://localhost:5000/ajoutTemplate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "true"
            },
            body: JSON.stringify({

                nom_Template: this.state.nom_Template,
                id_Bibli: this.state.id_Bibli,

            }),
        })
            .then(res => res.text())
            .then(text => console.log(text))
            .then(response => response.json())
            .then(json => {


            }).catch((error) => {
                console.log(error)
            });
    }




    handleChange(event) {

        this.setState({ nom_Template: event.target.value });
    }

    handleSubmit(event) {
        //this.templatePost();
        alert('A name was submitted: ' + this.state.nom_Template);
        event.preventDefault();
    }

    // testApi = async () => {
    //     let data = await api.get('findAllObjets').then(({ data }) => data);
    //     this.setState({ personne: data });
    //     console.log(this.state.personne[2].prix);
    // }

    render() {
        return (
            <div>
                <Navigation />
                hello
                <br />
                {/* <button onClick={() => this.testApi()}>oui</button> */}

                test : {secureLocalStorage.getItem("secureBiblioId")}
                test test

                <form style={{ textAlign: "center" }} onSubmit={this.templatePost}>
                    <label>
                        <h3 style={{ fontSize: '180%' }}> Nom de la Template a ajouter a la bibliotheque {secureLocalStorage.getItem("secureBiblioId")} :</h3>
                        <input type="text" style={{ marginTop: '6%' }} value={this.state.nom_Template} onChange={this.handleChange} />
                    </label>
                    <br />
                    <input class="btn btn-success" type="submit" style={{ marginTop: '1%' }} value="Ajouter une template" />
                </form>
            </div>
        );
    }
}

export default Template;