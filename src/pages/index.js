import React from "react"
import PageLayout from '../components/pageLayout'
import '../common/common.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { graphql, Link, useStaticQuery } from 'gatsby'
import Carousel from 'react-bootstrap/Carousel';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const IndexPage = (props) => {
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
                  gatsbyImageData(
                    width: 1024
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)


  return <PageLayout pageName="WELCOME" url="/" voronoiClipData={props.voronoiClipData} contentWidth={750}>
      <p>
        I am a developer/hobbiest/artistically inclined person located in upstate New York. This websites serves as a 
        hub for all things I do including blog posts about my process as well as project showcases. 
      </p>

      <Carousel>
        {projectData.allMarkdownRemark.edges.map((edge, i) => {
          return <Carousel.Item key={i}>
                <Link to={`/projects/${edge.node.fields.slug}`}>
                  <GatsbyImage image={getImage(edge.node.frontmatter.previewImg)}
                />

                <Carousel.Caption style={{backgroundColor:"rgba(0, 0, 0, 0.5"}}>
                  <h3>{edge.node.frontmatter.title}</h3>
                  <p>{edge.node.frontmatter.description}</p>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
        })}
      </Carousel>

      <p>
        My interests range from computer graphics and procedural content to electrical engineering and music (and a lot in-between).
        </p>
        
      <p> The very design
        of this website is centered around the <a href="https://en.wikipedia.org/wiki/Voronoi_diagram" target="_blank" rel="noreferrer">Voronoi Diagram</a>. 
        You will find that much of the work here is based around procedural content generation and graphics. 

      </p>
  </PageLayout>
}

export default IndexPage