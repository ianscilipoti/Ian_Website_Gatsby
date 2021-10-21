import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'gatsby'
import Container from 'react-bootstrap/Container'

const Header = () => {

    return <Navbar style={{zIndex:3}} collapseOnSelect="true"  bg="dark" variant="dark" expand="sm" fixed="top">
        <Container>
            <Link className="navbar-brand" to="/">IAN SCILIPOTI</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
            <Link className="nav-link" to="/">about</Link>
                <Link className="nav-link" to="/contact">contact</Link>
                <Link className="nav-link" to="/projects">projects</Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    
}

export default Header