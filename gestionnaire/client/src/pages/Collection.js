import { React, Component } from "react";
import Navigation from "../component/Navigation";
import { Row, Col, Container, Card, ListGroup, ListGroupItem, Modal } from 'react-bootstrap'
import Popup from 'reactjs-popup';
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
      donneesCollectionVendu: [],
      valeurCollection: '',
      nombreObjets: '',
      biblioDateCre: '',
      show: false,
      nomAsupp: '',
      idObjetASupp: '',
      image: '',
      imageFormat: '',
      prix_revente: '',
      benefices: '',
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

    await fetch(`http://176.96.231.198:5000/findBiblioCollectionPossedee/${this.state.biblioId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ donneesCollection: json })
        console.log(this.state.donneesCollection)
      })

    await fetch(`http://176.96.231.198:5000/findBiblioCollectionVendu/${this.state.biblioId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ donneesCollectionVendu: json })
        console.log(this.state.donneesCollectionVendu)
      })

    await fetch(`http://176.96.231.198:5000/findBibliothequesDateCrea/${this.state.biblioId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ toutesBibliotheques: json })
        this.setState({ biblioDateCre: json[0].biblioDateCre })
        console.log(this.state.biblioDateCre)
      })

    await fetch(`http://176.96.231.198:5000/findCollectionInfos/${this.state.biblioId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ valeurCollection: json[0].valeur })
        this.setState({ nombreObjets: json[0].nombre })
        //this.setState({ biblioDateCre: json[0].biblioDateCre })
      })

    await fetch(`http://176.96.231.198:5000/findBenefices/${this.state.biblioId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ benefices: json[0].benefice })
        console.log(this.state.benefices)
      })


  }

  navAjoutObjet() {
    window.location.href = "https://gestionnaire-collection.netlify.app/AjoutObjet"
  }

  async handleSubmit(event, idObjetAvendre) {
    event.preventDefault()
    await fetch(`http://176.96.231.198:5000/vendreObjet/${idObjetAvendre}`, {

      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "true"
      },
      body: JSON.stringify({
        idObjet: idObjetAvendre,
        prixRevente: this.state.prix_revente,
      }),


    })
      .then(res => res.text())
      .then(text => console.log(text))
      .then(response => response.json())
      .then(json => {


      }).catch((error) => {

      });

    window.location.href = "https://gestionnaire-collection.netlify.app/Collection"


  }

  handleSuppressionObjet(idObjetAsupp) {
    console.log(idObjetAsupp)
    fetch(`http://176.96.231.198:5000/supprimerObjet/${idObjetAsupp}`, {

      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "true"
      },
      body: JSON.stringify({
        idObjet: { idObjetAsupp },
      }),


    })
      .then(res => res.text())
      .then(text => console.log(text))
      .then(response => response.json())
      .then(json => {


      }).catch((error) => {

      });

    window.location.href = "https://gestionnaire-collection.netlify.app/Collection"
  };



  render() {
    return (
      <div id="principal">
        {/* <button type="button" class="btn btn-outline-danger" onClick={() => this.test()}> Tester </button> */}
        <Navigation />
        <Container>
          <Row style={{ textAlign: 'center' }}>
            <h2 style={{ marginTop: '5%', marginBottom: '3%' }}> Détails de la collection {this.state.biblioNom} </h2>
            <Col md={4} style={{ textAlign: 'center' }}>


              <h4>Valeur de la collection : <br></br> {Number(this.state.valeurCollection).toFixed(2)} €</h4>
            </Col>
            <Col md={4} style={{ textAlign: 'center' }}>
              <h4>Nombre d'objets dans la collection : <br></br> {this.state.donneesCollection.length}</h4>
            </Col>
            <Col md={4} style={{ textAlign: 'center' }}>
              <h4>Date de création de la bibliotheque : <br></br> {dateFormat(this.state.biblioDateCre, 'dd-mm-yyyy')}</h4>
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
                <button type="button" style={{ fontSize: '140%' }} class="btn btn-success" onClick={this.navAjoutObjet}> Ajouter un objet </button>
              </Col>
            </Row>
            {this.state.donneesCollection.map(collection => (

              <Col md={3}>
                {collection.possede === '0' && (
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
                        {collection.prix !== '' && collection.prix && (<ListGroupItem>Prix : {Number(collection.prix).toFixed(2)} €</ListGroupItem>)}
                        {collection.etat !== '' && collection.etat && (<ListGroupItem>Etat : {collection.etat}</ListGroupItem>)}
                        {collection.edition !== '' && collection.edition && (<ListGroupItem>Edition : {collection.edition}</ListGroupItem>)}
                        {collection.perso1 !== '' && collection.perso1 && (<ListGroupItem>{collection.perso1}</ListGroupItem>)}
                        {collection.perso2 !== '' && collection.perso2 && (<ListGroupItem>{collection.perso2}</ListGroupItem>)}
                        {collection.perso3 !== '' && collection.perso3 && (<ListGroupItem>{collection.perso3}</ListGroupItem>)}
                      </ListGroup>
                    </Card.Body>
                    <Card.Footer>
                      {collection.dateAcquisition !== '' && (<ListGroupItem>Date d'acquisition : {dateFormat(collection.dateAcquisition, 'dd-mm-yyyy')}</ListGroupItem>)}
                      {collection.dateAcquisition === '' && (<ListGroupItem>Date d'acquisition : {'inconnu'}</ListGroupItem>)}
                    </Card.Footer>
                    <Popup trigger={<button style={{ width: '78%', marginLeft: '11.1%', marginBottom: '2.5%' }} type="button" class="btn btn-outline-info" > Vendre {collection.nom} </button>} modal>
                      <Card>
                        <Card.Header>
                          <Card.Title>Vendre {collection.nom} </Card.Title>
                          <Card.Text>
                            Prix d'achat : {collection.prix}
                          </Card.Text>
                        </Card.Header>
                        <Card.Body>
                          <form style={{ textAlign: 'center' }} onSubmit={event => this.handleSubmit(event, collection.idObjet)}>
                            <label style={{ marginRight: '1%' }}>
                              Prix de revente :
                              <input type="text" value={this.state.prix_revente} onChange={text => this.setState({ prix_revente: text.target.value })} />
                            </label>
                            <br></br>
                            <input style={{ marginTop: '5%' }} type="submit" class="btn btn-outline-success" value={"Revendre " + collection.nom} />
                          </form>
                        </Card.Body>
                        <Card.Footer>
                          {collection.dateAcquisition !== '' && (<ListGroupItem>Date d'acquisition : {dateFormat(collection.dateAcquisition, 'dd-mm-yyyy')}</ListGroupItem>)}
                          {collection.dateAcquisition === '' && (<ListGroupItem>Date d'acquisition : {'inconnu'}</ListGroupItem>)}
                        </Card.Footer>
                      </Card>
                    </Popup>
                    <Card.Link style={{ textAlign: 'center', marginBottom: '3%' }}>
                      <button type="button" class="btn btn-outline-danger" onClick={() => { this.showModal(); this.setState({ nomAsupp: collection.nom }); this.setState({ idObjetASupp: collection.idObjet }) }} > Supprimer l'objet {collection.nom} </button>
                    </Card.Link>
                  </Card>
                )}

              </Col>


            )
            )}
          </Row>

        </Container>
        <Container>
          <Row style={{ marginTop: '4%', marginBottom: '3%' }}>
            <Col md={4}>
              <h3 style={{ fontSize: '180%', marginBottom: '3%', marginTop: '5%' }}> Objets revendus </h3>
            </Col>
            <Col md={4}>
              <h3 style={{ fontSize: '150%', marginBottom: '3%', marginTop: '5%' }}> Nombre de reventes : {this.state.donneesCollectionVendu.length}  </h3>
            </Col>
            <Col md={4}>
              <h3 style={{ fontSize: '150%', marginBottom: '3%', marginTop: '5%' }}> Bénéfices / Pertes total :  {Number(this.state.benefices).toFixed(2)} € </h3>
            </Col>
          </Row>
          <Row>
            {this.state.donneesCollectionVendu.map(collection => (

              <Col md={3}>
                {collection.possede === '1' && (
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
                        {collection.prix !== '' && (<ListGroupItem>Prix d'achat : {Number(collection.prix).toFixed(2)} €</ListGroupItem>)}
                        {collection.etat !== '' && (<ListGroupItem>Prix de revente : {Number(collection.prix_revente).toFixed(2)} €</ListGroupItem>)}
                      </ListGroup>
                    </Card.Body>
                    <Card.Footer>
                      <ListGroupItem>Bénéfices  : {Number(collection.prix_revente - collection.prix).toFixed(2)} € </ListGroupItem>
                    </Card.Footer>
                    <Card.Link style={{ textAlign: 'center', marginBottom: '3%' }}>
                      <button type="button" class="btn btn-outline-danger" onClick={() => { this.showModal(); this.setState({ nomAsupp: collection.nom }); this.setState({ idObjetASupp: collection.idObjet }) }} > Supprimer l'objet {collection.nom} </button>
                    </Card.Link>
                  </Card>
                )}
              </Col>


            )
            )}
          </Row>
        </Container>


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

      </div >
    );
  }
}

export default Collection;