import React, { Component } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { Row, Col } from 'react-bootstrap';


class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tousEmails: [],
            tousEmailsArray: [],
            donneesCollection: [],
            node: '',
            emailState: '',
            toutesBibliotheques: [],
            allObjets: [],
            nodeDeuxiemeTree: 50000000,
            nodeTroisiemeTree: 100000000,
            nombreUsers: [],
        };

        this.supprimerUtilisateur = this.supprimerUtilisateur.bind(this);
    }

    async componentDidMount() {

        await fetch(`http://localhost:5000/findTousUtilisateurs`)
            .then(response => response.json())
            .then(json => {
                this.setState({ tousEmails: json })

            })


        this.state.tousEmails.map(email => (
            this.state.tousEmailsArray.push(email.email)
        ))

        console.log(this.state.tousEmails)

        await fetch(`http://localhost:5000/findAllBibliotheques`)
            .then(response => response.json())
            .then(json => {
                this.setState({ toutesBibliotheques: json })
                console.log(this.state.toutesBibliotheques)
            })

        await fetch(`http://localhost:5000/findAllObjets`)
            .then(response => response.json())
            .then(json => {
                this.setState({ allObjets: json })
                console.log(this.state.allObjets)
            })




    }

    supprimerUtilisateur(email) {
        console.log(email)
        fetch(`http://localhost:5000/supprimerUtilisateur/${email}`, {

            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "true"
            },
            body: JSON.stringify({
              email: { email },
            }),
      
      
          })
            .then(res => res.text())
            .then(text => console.log(text))
            .then(response => response.json())
            .then(json => {
      
      
            }).catch((error) => {
      
            });
            window.location.href = "http://localhost:3000/Admin"
    }





    render() {
        return (

            <div>
                <Row>
                    <Col>
                        <p> Nombre d'utilisateurs : {this.state.tousEmailsArray.length} </p>
                    </Col>
                    <Col>
                        <p> Nombre de collections  : {this.state.toutesBibliotheques.length} </p>
                    </Col>
                    <Col>
                        <p> Nombre d'objets  : {this.state.allObjets.length} </p>
                    </Col>
                </Row>
                <TreeView
                    aria-label="multi-select"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    multiSelect
                    sx={{ height: 240, flexGrow: 1, maxWidth: 400 }}
                >
                    {this.state.tousEmails.map(email => (

                        <TreeItem nodeId={email.Id} label={email.email}>
                            <button type="button" class="btn btn-outline-danger" onClick={() => { this.supprimerUtilisateur(email.email) }} > Supprimer l'utilisateur {email.email} </button>
                            {this.state.toutesBibliotheques.filter(bibliotheque => bibliotheque.emailUser === email.email).map(filterbibliotheques => (

                                <TreeItem nodeId={this.state.nodeDeuxiemeTree} label={filterbibliotheques.nomBibli} >
                                    {/* <button type="button" class="btn btn-outline-danger"> Supprimer la collection {filterbibliotheques.nomBibli} </button> */}
                                    <script>
                                        {this.state.nodeDeuxiemeTree = 1 + this.state.nodeDeuxiemeTree}
                                        {/* {this.setState({ nodeDeuxiemeTree: this.state.nodeDeuxiemeTree + 1 })} */}
                                        {/* {this.setState((state) => { return { nodeDeuxiemeTree: state.nodeDeuxiemeTree + 1 } })} */}



                                    </script>
                                    {
                                        this.state.allObjets.filter(Objets => Objets.biblioId === filterbibliotheques.biblioId).map(filterObjets => (
                                            <TreeItem nodeId={this.state.nodeTroisiemeTree} label={filterObjets.nom} >
                                                {/* <button type="button" class="btn btn-outline-danger"> Supprimer l'objet {filterObjets.nom} </button> */}
                                                <script>
                                                    {this.state.nodeTroisiemeTree = 1 + this.state.nodeTroisiemeTree}
                                                    {/* {this.setState({ nodeTroisiemeTree: this.state.nodeTroisiemeTree + 1 })} */}
                                                    {/* {this.setState((state) => { return { nodeTroisiemeTree: state.nodeTroisiemeTree + 1 } })} */}


                                                </script>
                                            </TreeItem>
                                        ))
                                    }
                                </TreeItem>
                            ))}

                        </TreeItem>

                    ))}

                    {/* <TreeItem nodeId="5" label="Documents">
                        <TreeItem nodeId="10" label="OSS" />
                        <TreeItem nodeId="6" label="MUI">
                            <TreeItem nodeId="8" label="index.js" />
                        </TreeItem>
                    </TreeItem> */}
                </TreeView>
            </div >
        );
    };
};


export default Admin;