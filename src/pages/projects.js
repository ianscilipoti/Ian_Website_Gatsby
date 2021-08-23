import React, {useState} from 'react'
import PageLayout from '../components/pageLayout'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useStaticQuery } from "gatsby";
import { graphql } from 'gatsby'
import Img from "gatsby-image"
import { Router, navigate, Link, useParams} from "@reach/router"
import {
  Transition as ReactTransition,
} from "react-transition-group"



const ProjectsPage = (props) => {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const projectData = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              description
              previewImg {
                childImageSharp {
                  fluid(maxWidth: 1024) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            html
          }
        }
      }
    }
  `)

  const transitionStyles = {
    entering: { opacity: 0.0, visibility: "hidden"},
    entered:  {transitionDelay: "200ms", transition: `opacity ${800}ms ease-in-out`, opacity: 1.0 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
  };
  
  
  return <PageLayout pageName="PROJECTS" pageIdentifier="projects" voronoiClipData={props.voronoiClipData} contentWidth={950}>
    {/* <ReactTransition appear={true} in={true} timeout={1000} exit={false} mountOnEnter={true}>
      {state => (
        <div style={{...transitionStyles[state]}}> */}
                {/* </div>
      )}
    </ReactTransition>    */}
    <Row>
      <Col>
        
      </Col>
      <Col>
        <Carousel style={{height:"400px"}} activeIndex={index} interval={null} onSelect={handleSelect}>
          {projectData.allMarkdownRemark.edges.map((edge, i) => {
            return <Carousel.Item key={i}>
                <Link to={`/projects/${edge.node.frontmatter.title}`}>
                  <Img
                    // className="d-block w-100"
                    fluid={edge.node.frontmatter.previewImg.childImageSharp.fluid}
                    alt="First slide"
                  />

                  <Carousel.Caption style={{backgroundColor:"rgba(0, 0, 0, 0.5"}}>
                    <h3>{edge.node.frontmatter.title}</h3>
                    <p>{edge.node.frontmatter.description}</p>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
          })}
        </Carousel>
      </Col>
    </Row>


      
      {/* <Link to="/projects/painter">gotopainter</Link>{` `}
      <Link to="/projects/test">gototest</Link> */}

      <Router>
        {/* {projectData.allMarkdownRemark.edges.map((edge, i) => 
          <div path={`${edge.node.frontmatter.title}`} key={i}>
            <Modal show={true} onHide={() => navigate('/projects')}>
                <Modal.Header closeButton>
                  <Modal.Title>{edge.node.frontmatter.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{edge.node.html}</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
            </Modal>
          </div>
        )} */}          
          <Project path="/projects/:project" projectData={projectData}/>
          
      </Router>
  </PageLayout>
}

let Project = (props) => {
  let { project } = useParams();

  

  const pageNode = props.projectData.allMarkdownRemark.edges.find(element => element.node.frontmatter.title === project);

  return <Modal show={true} size="lg" style={{top:"100px"}} onHide={() => navigate('/projects')}>
    <Modal.Header closeButton style={{color:"white", backgroundColor:"black"}}>
      <Modal.Title>{pageNode.node.frontmatter.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body> 
      <div dangerouslySetInnerHTML={{__html: pageNode.node.html}}>

      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => navigate('/projects')}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
}


export default ProjectsPage