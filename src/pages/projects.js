import React, {useState} from 'react'
import PageLayout from '../components/pageLayout'
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {directoryLink, tutorialText} from './projects.module.scss'

import { graphql, Link, useStaticQuery } from 'gatsby'
import Img from "gatsby-image"
// import { Router, Link, useParams} from "@reach/router"

// import {
//   Transition as ReactTransition,
// } from "react-transition-group"




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
                  fluid(maxWidth: 512) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            fields {
              slug
            }
            html
          }
        }
      }
    }
  `)

  // const transitionStyles = {
  //   entering: { opacity: 0.0, visibility: "hidden"},
  //   entered:  {transitionDelay: "200ms", transition: `opacity ${800}ms ease-in-out`, opacity: 1.0 },
  //   exiting:  { opacity: 0 },
  //   exited:  { opacity: 0 },
  // };
  
  
  // return <PageLayout pageName="PROJECTS" voronoiClipData={props.voronoiClipData["/projects"]} contentWidth={950}>
  //   Enjoy a selection of my work. These projects are a range from freelance projects to hobby work.
  //   <Row className="pt-5">
  //     <Col xs={10}> 
  //       <Row className="pb-2">
  //         <Carousel activeIndex={index} onSelect={handleSelect}>
  //           {projectData.allMarkdownRemark.edges.map((edge, i) => {
  //             return <Carousel.Item key={i}>
  //                 <Link to={`/projects/${edge.node.frontmatter.title}`}>
  //                   <Img
  //                     // className="d-block w-100"
  //                     fluid={edge.node.frontmatter.previewImg.childImageSharp.fluid}
  //                     alt="First slide"
  //                   />

  //                   <Carousel.Caption style={{backgroundColor:"rgba(0, 0, 0, 0.5"}}>
  //                     <h3>{edge.node.frontmatter.title}</h3>
  //                     <p>{edge.node.frontmatter.description}</p>
  //                   </Carousel.Caption>
  //                 </Link>
  //               </Carousel.Item>
  //           })}
  //         </Carousel>
  //       </Row>
  //     </Col>
  //     <Col>
  //       <Row >
  //         <br/>
  //         <h3>Directory</h3>
  //       </Row>
        
  //       <Row>
  //         <br/>
  //         <ul style={{marginLeft: "0", paddingLeft: "40px"}}>
  //           {projectData.allMarkdownRemark.edges.map((edge, i) => {
  //             return <li key={edge.node.frontmatter.title}>
  //               <Link className={directoryLink} to={`/projects/${edge.node.fields.slug}`}>
  //                 {edge.node.frontmatter.title}
  //               </Link>
  //             </li>
  //           })}
  //         </ul>
  //       </Row>
  //     </Col>
  //   </Row>
  // </PageLayout>
  return <h2 className={tutorialText}>Click polygons to explore!</h2>
}


export default ProjectsPage