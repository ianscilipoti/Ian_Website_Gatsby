import React from 'react'
import { Link } from 'gatsby'
import {logoText} from './header.module.scss'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'

const Header = () => {
    return <Navbar collapseOnSelect="true" style={{backgroundColor:"black"}} variant="dark">
        <Container>
            <Link className="navbar-brand" to="/">IAN SCILIPOTI</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
            <Link className="nav-link" to="/">about</Link>
                <Link className="nav-link" to="/contact">contact</Link>
                <Link className="nav-link" to="/projects">projects</Link>
                <Link className="nav-link" to="/blog">blog</Link>
                
                
                {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    
}

export default Header