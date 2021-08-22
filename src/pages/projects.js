import React, {useState} from 'react'
import PageLayout from '../components/pageLayout'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useStaticQuery } from "gatsby";
import { graphql } from 'gatsby'
import Img from "gatsby-image"
//import { Link } from 'gatsby'
import { Router, navigate, Link, useParams} from "@reach/router"



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
  
  return <PageLayout pageName="PROJECTS" pageIdentifier="projects" voronoiClipData={props.voronoiClipData} contentWidth={950}>
    <Carousel style={{height:"400px"}} activeIndex={index} onSelect={handleSelect}>
      {projectData.allMarkdownRemark.edges.map((edge, i) => {
        return <Carousel.Item key={i}>
            <Link to={`/projects/${edge.node.frontmatter.title}`}>
              <Img
                className="d-block w-100"
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

  return <Modal show={true} onHide={() => navigate('/projects')}>
    <Modal.Header closeButton>
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