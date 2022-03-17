import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Inscription from './pages/inscription';
import Connexion from './pages/connexion';
import NavBar from './component/navbar';
import Footer from './component/footer';
import Accueil from './pages/accueil';
import Gdpr from './pages/gdpr';
import Contact from './pages/contact';
import Apropos from './pages/apropos';


class App extends Component {

  render(){
    return (
      <div>
      <NavBar />
      <Router>
          <Switch>
              <Route exact path='/' component={Accueil}></Route>
              <Route exact path='/inscription' component={Inscription}></Route>
              <Route exact path='/connexion' component={Connexion}></Route>      
              <Route exact path='/apropos' component={Apropos}></Route>  
              <Route exact path='/contact' component={Contact}></Route>  
              <Route exact path='/gdpr' component={Gdpr}></Route>       
              <Redirect to="/" />
          </Switch>
      </Router>
      <Footer />
      </div>
    )
  }
}



export default App;