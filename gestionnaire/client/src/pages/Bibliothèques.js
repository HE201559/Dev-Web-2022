import { React, Component } from "react";
import Navigation from "../component/Navigation";
import { Row, Col, Container, Modal, Card } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import moment from "moment";
import dateFormat from 'dateformat';


class Bibliothèques extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toutesBibliotheques: [],
      email: localStorage.getItem('EmailUtilisateur'),
      nombreCollection: 1,
      show: false,
      emailUser: localStorage.getItem('EmailUtilisateur'),
      nomBibli: '',
      biblioDateCre: moment().format("YYYY-MM-DD"),
      biblioId: localStorage.getItem('biblioId'),
      idBibliAsupp: '',
      nomBibliAsupp: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  navCollection = () => {
    window.location.href = "https://gestionnaire-collection.netlify.app/Collection"
  };



  async componentDidMount() {

    await fetch(`https://176.96.231.198:5000/findBibliotheques/${this.state.email}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ toutesBibliotheques: json })
        console.log(this.state.toutesBibliotheques)
      })
  }

  async handleSubmit(event) {
    event.preventDefault()
    if (this.state.nomBibli === '') {
      alert("Une bibliothèque sans nom n'est pas une bonne idée... ")
    }

    else {

      await fetch('https://176.96.231.198:5000/ajoutBibliotheque', {

        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "true"
        },
        body: JSON.stringify({
          emailUser: this.state.emailUser,
          nomBibli: this.state.nomBibli,
          biblioDateCre: this.state.biblioDateCre,
        }),
      })
        .then(res => res.text())
        .then(text => console.log(text))
        .then(response => response.json())
        .then(json => {


        }).catch((error) => {
          console.log(error)
        });

      window.location.href = "https://gestionnaire-collection.netlify.app/Bibliotheques"

    }


  };

  handleSuppressionBiblio(idBibliASupp) {
    console.log(idBibliASupp)
    fetch(`https://176.96.231.198:5000/supprimerBiblio/${idBibliASupp}`, {

      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "true"
      },
      body: JSON.stringify({
        idBiblio: { idBibliASupp }
      }),


    })
      .then(res => res.text())
      .then(text => console.log(text))
      .then(response => response.json())
      .then(json => {


      }).catch((error) => {

      });

    window.location.href = "https://gestionnaire-collection.netlify.app/Bibliotheques"
  };







  render() {

    return (
      <div id="principal">
        <Navigation />
        <Container>
          <Row>
            <form style={{ marginTop: '5%' }} onSubmit={this.handleSubmit}>
              <label >
                <p style={{ fontSize: '140%' }}> Ajouter une bibliotheque : </p>
                <input style={{ fontSize: '110%' }} type="text" value={this.state.nomBibli} onChange={text => this.setState({ nomBibli: text.target.value })} />
              </label>
              <input class="btn btn-success" type="submit" value="Ajouter une bibliotheque" />
            </form>
          </Row>
          {this.state.toutesBibliotheques.map(bibli => (
            <Row>
              <Col lg={4} xs={4} style={{ textAlign: 'center' }}>

                <NavLink id="texte" style={{ width: 'auto', marginTop: '20%' }} onClick={() => localStorage.setItem('biblioId', bibli.biblioId)} to="/Collection" className={(nav) => (nav.isActive ? "nav-active" : "nav")}>
                  <li onClick={() => localStorage.setItem('nomBibli', bibli.nomBibli)} style={{ fontSize: '170%', fontWeight: 'bold', color: 'black' }}> {bibli.nomBibli}</li>
                </NavLink>

              </Col>
              <Col id="texte" lg={4}>
                <p style={{ fontSize: '130%', marginTop: '21%', fontWeight: 'bold' }}> Date de création : {dateFormat(bibli.biblioDateCre, 'dd-mm-yyyy')}</p>
              </Col>
              <Col lg={4}>
                <Card.Link style={{ textAlign: 'center', marginBottom: '3%' }}>
                  <button style={{ fontSize: '100%', marginTop: '21%' }} type="button" class="btn btn-danger" onClick={() => { this.showModal(); this.setState({ idBibliAsupp: bibli.biblioId }); this.setState({ nomBibliAsupp: bibli.nomBibli }); }} > Supprimer la bibliotheque </button>
                </Card.Link>
              </Col>
            </Row>
          )
          )}
          <Modal show={this.state.show} onHide={this.hideModal}  >
            <Modal.Header closeButton>
              Êtes-vous certain de vouloir supprimer la bibliotheque {this.state.nomBibliAsupp}
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col style={{ textAlign: 'center' }}>
                  <button type="button" class="btn btn-outline-danger" onClick={() => this.handleSuppressionBiblio(this.state.idBibliAsupp)}> Supprimer </button>
                </Col>
                <Col style={{ textAlign: 'center' }}>
                  <button type="button" class="btn btn-outline-success" onClick={this.hideModal} > Pas l'envie !  </button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
        </Container>
      </div >
    );
  }
}

export default Bibliothèques;
