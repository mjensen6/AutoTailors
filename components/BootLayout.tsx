import {Navbar, Nav, Container} from 'react-bootstrap'
import React from "react";


  
  const Layout: React.FC = (props) => (
    <div>

          <Navbar bg="dark" variant="dark">
              <Container>
                  <Navbar.Brand href="/">AutoTailors</Navbar.Brand>
                  <Nav className="me-auto">
                      <Nav.Link href="/shop">Shop</Nav.Link>
                      <Nav.Link href="/garage">Garage</Nav.Link>
                      <Nav.Link href="/aboutUs">About Us</Nav.Link>
                  </Nav>
              </Container>
          </Navbar>
      <div>{props.children}</div>
    </div>
  );
  
  export default Layout;