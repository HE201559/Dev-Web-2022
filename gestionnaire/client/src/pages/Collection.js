import { React, Component } from "react";
import Navigation from "../component/Navigation";
import { NavLink } from "react-router-dom";
import { Row, Col, Container, Card, ListGroup, ListGroupItem } from 'react-bootstrap'

class Collection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      biblioId: localStorage.getItem('biblioId'),
      donneesCollection: []
    };

  }
  async componentDidMount() {

    await fetch(`http://localhost:5000/findBiblioCollection/${this.state.biblioId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ donneesCollection: json })
        console.log(this.state.donneesCollection)
      })


  }
  render() {
    return (
      <div>
        <Navigation />
        <Container>
          <p> page collection </p>
          <Row>
            {this.state.donneesCollection.map(collection => (

              <Col md={4}>
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{collection.nom}</Card.Title>
                    <Card.Text>
                      {collection.description}
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Prix : {collection.prix} €</ListGroupItem>
                    <ListGroupItem>Etat : {collection.etat}</ListGroupItem>
                    <ListGroupItem>Edition : {collection.edition}</ListGroupItem>
                  </ListGroup>
                  <Card.Footer>
                    <ListGroupItem>Date d'acquisition : {collection.dateAcquisition}</ListGroupItem>
                  </Card.Footer>
                </Card>
              </Col>
            )
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Collection;