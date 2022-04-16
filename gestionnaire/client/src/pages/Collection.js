import {React, Component} from "react";
import Navigation from "../component/Navigation";
import { Row, Col, Container} from 'react-bootstrap';
import { NavLink } from "react-router-dom";


class Collection extends Component {

  constructor(props) {
    super(props);
    this.state = {
        
      };

  }

  render() {
    return (
      <div>
        <Navigation />
        <Container>
            <p> page collection </p>
        </Container>
      </div>
    );
  }
}

export default Collection;