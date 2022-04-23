import { React, Component } from "react";
import Navigation from "../component/Navigation";
import { NavLink } from "react-router-dom";
import { Row, Col, Container, Card, ListGroup, ListGroupItem, Modal } from 'react-bootstrap'
import dateFormat from 'dateformat';
import lugia from '../images/lugia.jpg'


class Collection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem('EmailUtilisateur'),
      biblioId: localStorage.getItem('biblioId'),
      biblioNom: localStorage.getItem('nomBibli'),
      toutesBibliotheques: [],
      donneesCollection: [],
      valeurCollection: '',
      nombreObjets: '',
      biblioDateCre: '',
      show: false,
      nomAsupp: '',
      idObjetASupp: '',
      image: '',
      imageFormat: '',
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

  }

  showModal() {
    this.setState({ show: true });

  };

  hideModal = () => {
    this.setState({ show: false });
  };

  // test = () => {
  //   console.log(this.state.image)
  // };

  async componentDidMount() {

    await fetch(`http://localhost:5000/findBiblioCollection/${this.state.biblioId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ donneesCollection: json })
        console.log(this.state.donneesCollection)
      })

    await fetch(`http://localhost:5000/findBibliothequesDateCrea/${this.state.biblioId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ toutesBibliotheques: json })
        this.setState({ biblioDateCre: json[0].biblioDateCre })
        console.log(this.state.biblioDateCre)
      })

    await fetch(`http://localhost:5000/findCollectionInfos/${this.state.biblioId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ valeurCollection: json[0].valeur })
        this.setState({ nombreObjets: json[0].nombre })
        //this.setState({ biblioDateCre: json[0].biblioDateCre })
      })



  }

  navAjoutObjet() {
    window.location.href = "http://localhost:3000/AjoutObjet"
  }

  handleSuppressionObjet(idObjetAsupp) {
    console.log(idObjetAsupp)
    fetch(`http://localhost:5000/supprimerObjet/${idObjetAsupp}`, {

      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "true"
      },
      body: JSON.stringify({
        idObjet: { idObjetAsupp }
      }),


    })
      .then(res => res.text())
      .then(text => console.log(text))
      .then(response => response.json())
      .then(json => {


      }).catch((error) => {

      });

    window.location.href = "http://localhost:3000/Collection"
  };



  render() {
    return (
      <div>
        {/* <button type="button" class="btn btn-outline-danger" onClick={() => this.test()}> Tester </button> */}
        <Navigation />
        <Container>
          <Row style={{ textAlign: 'center' }}>
            <h2 style={{ marginTop: '5%', marginBottom: '3%' }}> Détails de la collection {this.state.biblioNom} </h2>
            <Col md={4} style={{ textAlign: 'center' }}>


              <p>Valeur de la collection : <br></br> {0 + this.state.valeurCollection}</p>
            </Col>
            <Col md={4} style={{ textAlign: 'center' }}>
              <p>Nombre d'objets dans la collection : <br></br> {this.state.nombreObjets}</p>
            </Col>
            <Col md={4} style={{ textAlign: 'center' }}>
              <p>Date de création de la bibliotheque : <br></br> {dateFormat(this.state.biblioDateCre, 'dd-mm-yyyy')}</p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Row style={{ marginTop: '4%', marginBottom: '3%' }}>
              <Col md={6}>
                <h3 style={{ fontSize: '180%', marginBottom: '3%', marginTop: '5%' }}> Objets de collection</h3>
              </Col>
              <Col md={6} style={{ textAlign: 'right', paddingTop: '1%', paddingRight: '0.5%' }}>
                <button type="button" style={{ fontSize: '140%' }} class="btn btn-outline-success" onClick={this.navAjoutObjet}> Ajouter un objet </button>
              </Col>
            </Row>
            {this.state.donneesCollection.map(collection => (
              <Col md={3}>
                <Card style={{ width: '18rem', marginBottom: '8%' }} >
                  <Card.Header>
                    <Card.Title>{collection.nom}</Card.Title>
                    <Card.Text>
                      {collection.description !== '' && (collection.description)}
                    </Card.Text>
                  </Card.Header>
                  {<Card.Img variant="top" src={lugia} />}
                  <Card.Body>
                    <ListGroup className="list-group-flush">
                      {collection.prix !== '' && (<ListGroupItem>Prix : {collection.prix} €</ListGroupItem>)}
                      {collection.etat !== '' && (<ListGroupItem>Etat : {collection.etat}</ListGroupItem>)}
                      {collection.edition !== '' && (<ListGroupItem>Edition : {collection.edition}</ListGroupItem>)}
                    </ListGroup>
                  </Card.Body>
                  <Card.Footer>
                    {collection.dateAcquisition !== '' && (<ListGroupItem>Date d'acquisition : {dateFormat(collection.dateAcquisition, 'dd-mm-yyyy')}</ListGroupItem>)}
                    {collection.dateAcquisition === '' && (<ListGroupItem>Date d'acquisition : {'inconnu'}</ListGroupItem>)}
                  </Card.Footer>
                  <Card.Link style={{ textAlign: 'center', marginBottom: '3%' }}>
                    <button type="button" class="btn btn-outline-danger" onClick={() => { this.showModal(); this.setState({ nomAsupp: collection.nom }); this.setState({ idObjetASupp: collection.idObjet }) }} > Supprimer l'objet {collection.nom} </button>
                  </Card.Link>
                </Card>
                <Modal show={this.state.show} onHide={this.hideModal}  >
                  <Modal.Header closeButton>
                    Êtes-vous certain de vouloir supprimer l'objet {this.state.nomAsupp}
                  </Modal.Header>
                  <Modal.Body>
                    <Row>
                      <Col style={{ textAlign: 'center' }}>
                        <button type="button" class="btn btn-outline-danger" onClick={() => this.handleSuppressionObjet(this.state.idObjetASupp)}> Supprimer </button>
                      </Col>
                      <Col style={{ textAlign: 'center' }}>
                        <button type="button" class="btn btn-outline-success" onClick={this.hideModal} > Oups non !  </button>
                      </Col>
                    </Row>
                  </Modal.Body>
                </Modal>
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