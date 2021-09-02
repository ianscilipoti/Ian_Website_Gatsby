import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { graphql, Link, useStaticQuery, navigate } from 'gatsby'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'

const Header = () => {
    const pagesQuery = useStaticQuery(graphql`
    query {
        allMarkdownRemark {
            edges {
                node {
                    fields {
                        directory
                        slug
                    }
                }
            }
        }
    }`)
    return <Navbar collapseOnSelect="true"  bg="dark" variant="dark">
        {/* style={{backgroundColor:"black"}} */}
        <Container>
            <Link className="navbar-brand" to="/">IAN SCILIPOTI</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
            <Link className="nav-link" to="/">about</Link>
                <Link className="nav-link" to="/contact">contact</Link>
                {/* <Link className="nav-link" to="/projects">projects</Link> */}
                <NavDropdown title="projects" id="collasible-nav-dropdown">
   
                    <NavDropdown.Item onClick={() => navigate('/projects/')}>
                        all
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    {pagesQuery.allMarkdownRemark.edges.map(edge => <NavDropdown.Item key={edge.node.fields.slug} onClick={()=>navigate(`/projects/${edge.node.fields.slug}`)}>
                        {edge.node.fields.slug}
                    </NavDropdown.Item>)}
                </NavDropdown>
                <Link className="nav-link" to="/blog">blog</Link>
                
                
                
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    
}

export default Header