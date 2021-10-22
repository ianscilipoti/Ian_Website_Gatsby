import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'gatsby'
import Container from 'react-bootstrap/Container'

const Header = () => {

    return <Navbar style={{zIndex:3}} collapseOnSelect="true"  bg="dark" variant="dark" expand="sm" fixed="top">
        <Container>
            <Link className="navbar-brand" eventKey={0} to="/">IAN SCILIPOTI</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
                <Nav.Item>
                    <Nav.Link eventKey="1" as={Link} to="/">
                    about
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="2" as={Link} to="/contact">
                    contact
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="3" as={Link} to="/projects">
                    projects
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    
}

export default Header