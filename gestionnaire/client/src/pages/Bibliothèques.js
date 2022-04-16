import {React, Component} from "react";
import Navigation from "../component/Navigation";
import { Row, Col, Container} from 'react-bootstrap';
import { NavLink } from "react-router-dom";


class Bibliothèques extends Component {

  constructor(props) {
    super(props);
    this.state = {
        toutesBibliotheques:[],
        email:localStorage.getItem('EmailUtilisateur'),
        nombreCollection:1,
      };

  }

  async componentDidMount(){

    await fetch(`http://localhost:5000/findBibliotheques/${this.state.email}`)
    .then(response => response.json())
    .then(json => {
    this.setState({toutesBibliotheques: json})
        console.log(this.state.toutesBibliotheques)
  })


  }

  render() {
    return (
      <div>
        <Navigation />
        <Container>
            {this.state.toutesBibliotheques.map( bibli => (
                <Row>
                    <Col>
                        <NavLink to="/Collection" className={(nav) => (nav.isActive ? "nav-active" : "nav")}>
                            <li style={{fontSize:'150%', marginTop:'15%'}}>{bibli.nomBibli}</li>
                        </NavLink>
                    </Col>                 
                </Row>
            )
                
            )}
        </Container>
      </div>
    );
  }
}

export default Bibliothèques;