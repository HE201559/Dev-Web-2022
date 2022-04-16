import {React, Component} from "react";
import Navigation from "../component/Navigation";


class Bibliothèques extends Component {

  constructor(props) {
    super(props);
    this.state = {
      };

  }

  render() {
    return (
      <div>
        <Navigation />
        <p>Page des biblio</p>
      </div>
    );
  }
}

export default Bibliothèques;