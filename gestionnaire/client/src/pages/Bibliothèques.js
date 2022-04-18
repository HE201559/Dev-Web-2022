import { React, Component } from "react";
import Navigation from "../component/Navigation";
import { Row, Col, Container, Modal } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import AjoutBiblio from "./AjoutBiblio";


class Bibliothèques extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toutesBibliotheques: [],
      email: localStorage.getItem('EmailUtilisateur'),
      nombreCollection: 1,
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };


  async componentDidMount() {

    await fetch(`http://localhost:5000/findBibliotheques/${this.state.email}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ toutesBibliotheques: json })
        console.log(this.state.toutesBibliotheques)
      })



  }

  navAjoutBiblio() {
    window.location.href = "http://localhost:3000/AjoutBiblio"
  }




  render() {

    return (
      <div>
        <Navigation />
        <Container>
          <button type="button" style={{ fontSize: '170%', marginTop: '10%' }} class="btn btn-outline-success" onClick={this.showModal}> Ajouter une bibliotheque </button>
          {this.state.toutesBibliotheques.map(bibli => (
            <Row>
              <Col>
                <NavLink style={{ width: '10%', marginTop: '5%' }} onClick={() => localStorage.setItem('biblioId', bibli.biblioId)} to="/Collection" className={(nav) => (nav.isActive ? "nav-active" : "nav")}>
                  <li onClick={() => localStorage.setItem('nomBibli', bibli.nomBibli)} style={{ fontSize: '150%', marginTop: '15%' }}> {bibli.nomBibli}</li>
                </NavLink>
              </Col>
            </Row>
          )
          )}
          <Modal show={this.state.show} onHide={this.hideModal}  >
            <Modal.Header closeButton>
              Ajoutez une bibliotheque
            </Modal.Header>
            <Modal.Body>
              <AjoutBiblio />
            </Modal.Body>
          </Modal>
        </Container>
      </div >
    );
  }
}

export default Bibliothèques;