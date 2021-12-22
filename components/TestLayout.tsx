import {Navbar, Nav, Container} from 'react-bootstrap'
import React, { ReactNode } from "react";


  
  const Layout: React.FC = (props) => (
    <div>

          <Navbar bg="dark" variant="dark">
              <Container>
                  <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                  <Nav className="me-auto">
                      <Nav.Link href="#home">Home</Nav.Link>
                      <Nav.Link href="#features">Features</Nav.Link>
                      <Nav.Link href="#pricing">Pricing</Nav.Link>
                  </Nav>
              </Container>
          </Navbar>
          <br />
          <Navbar bg="primary" variant="dark">
              <Container>
                  <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                  <Nav className="me-auto">
                      <Nav.Link href="#home">Home</Nav.Link>
                      <Nav.Link href="#features">Features</Nav.Link>
                      <Nav.Link href="#pricing">Pricing</Nav.Link>
                  </Nav>
              </Container>
          </Navbar>

          <br />
          <Navbar bg="light" variant="light">
              <Container>
                  <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                  <Nav className="me-auto">
                      <Nav.Link href="#home">Home</Nav.Link>
                      <Nav.Link href="#features">Features</Nav.Link>
                      <Nav.Link href="#pricing">Pricing</Nav.Link>
                  </Nav>
              </Container>
          </Navbar>

      <div>{props.children}</div>
    </div>
  );
  
  export default Layout;