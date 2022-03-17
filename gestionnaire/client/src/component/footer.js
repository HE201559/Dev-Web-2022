import React from "react";
import { Navbar, Nav, Container} from 'react-bootstrap';

function Footer(){




    return (
        <div>
             <Navbar bg="light" expand="lg" style={{textAlign:"center", marginTop:'10%'}} >  {/* A retirer margintop: juste pour montrer début que c'est un footer  */}
                <Container > 
                    <Nav.Link href="/apropos" style={{ marginRight:'5%'}}>A Propos</Nav.Link>
                    <Nav.Link href="/contact" style={{ marginRight:'5%'}}>Contact</Nav.Link>
                    <Nav.Link href="/gdpr" style={{ marginRight:'5%'}}>Gdpr</Nav.Link>
                </Container>
            </Navbar>
        </div>
    )
  
}
export default Footer;