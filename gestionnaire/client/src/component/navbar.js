import React from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';





function NavBar(){

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container style={{}}>
                    <Navbar.Brand href="/accueil" style={{marginRight:'75%'}}>Accueil</Navbar.Brand>
                    <Nav.Link href="/inscription" style={{textAlign:'right', marginRight:'5%'}}>Inscription</Nav.Link>
                    <Nav.Link href="/connexion" style={{textAlign:'right'}}>Connexion</Nav.Link>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar;