import { React, Component } from "react";
import Navigation from "../component/Navigation";
import { NavLink } from "react-router-dom";
import { Row, Col, Container, Card, ListGroup, ListGroupItem } from 'react-bootstrap'

class Collection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      biblioId: localStorage.getItem('biblioId'),
      biblioNom: localStorage.getItem('nomBibli'),
      donneesCollection: [],
      valeurCollection: '',
      nombreObjets: '',
    };

  }
  async componentDidMount() {

    await fetch(`http://localhost:5000/findBiblioCollection/${this.state.biblioId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ donneesCollection: json })
        console.log(this.state.donneesCollection)
      })

    await fetch(`http://localhost:5000/findCollectionInfos/${this.state.biblioId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ valeurCollection: json[0].valeur })
        this.setState({ nombreObjets: json[0].nombre })
        console.log(this.state.nombreObjets)
      })

  }

  navAjoutObjet() {
    window.location.href = "http://localhost:3000/AjoutObjet"
  }


  render() {
    return (
      <div>
        <Navigation />
        <Container>
          <Row>
            <h2 style={{ marginTop: '5%', marginBottom: '3%' }}> Détails de la collection {this.state.biblioNom} </h2>
            <Col md={4}>


              <p>Valeur de la collection : <br></br> {this.state.valeurCollection}</p>
            </Col>
            <Col md={4}>
              <p>Nombre d'objets dans la collection : <br></br> {this.state.nombreObjets}</p>
            </Col>
            <Col md={4}>
              {/* <NavLink to="/AjoutObjet" style={{ marginBottom: '5%' }} className={(nav) => (nav.isActive ? "nav-active" : "nav")}>
                <li style={{ fontSize: '150%' }}> Ajouter un objet </li>
              </NavLink> */}
              <button type="button" style={{ fontSize: '170%', width: '69%' }} class="btn btn-outline-success" onClick={this.navAjoutObjet}> Ajouter un objet </button>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <h3 style={{ fontSize: '150%', marginBottom: '3%', marginTop: '5%' }}> Objets de collection</h3>
            {this.state.donneesCollection.map(collection => (
              <Col md={4}>
                <Card style={{ width: '18rem', marginBottom: '8%' }}>
                  <Card.Header>
                    <Card.Title>{collection.nom}</Card.Title>
                    <Card.Text>
                      {collection.description}
                    </Card.Text>
                  </Card.Header>
                  <Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>Prix : {collection.prix} €</ListGroupItem>
                      <ListGroupItem>Etat : {collection.etat}</ListGroupItem>
                      <ListGroupItem>Edition : {collection.edition}</ListGroupItem>
                    </ListGroup>
                  </Card.Body>
                  <Card.Footer>
                    <ListGroupItem>Date d'acquisition : {collection.dateAcquisition}</ListGroupItem>
                  </Card.Footer>
                </Card>
              </Col>
            )
            )}
          </Row>
        </Container>
      </div >
    );
  }
}

export default Collection;