import React from "react"
import PageLayout from '../components/pageLayout'
import {basicLink} from '../common/common.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { graphql, Link, useStaticQuery } from 'gatsby'
import Carousel from 'react-bootstrap/Carousel';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import backgroundSrc from './indexBg.png';
import PageBackground from '../components/PageBackground'
import {highlight, textBlock} from './index.module.scss'

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
  const [scrollPos, setScrollPos] = React.useState(0);
  const scrollEvent = (e) => {
    // console.log('Current scroll position:', e.target.scrollTop);
    setScrollPos(e.target.scrollTop);
  }

  return <PageLayout pageName="WELCOME" url="/" voronoiClipData={props.voronoiClipData} contentWidth={900} scrollEvent={scrollEvent}>
      <PageBackground imgSrc={backgroundSrc} opacity={0.25} blur offset={-scrollPos/6}/>
      <p className={textBlock} style={{width:"80%", marginRight:"auto", paddingTop: "0px"}}>
        <span className={highlight}> I am a </span> developer and hobbiest based out of upstate New York. My formal education is in Computer Science. 
        However my interests cover a wide range of creative persuits.
      </p>

      <p className={textBlock} style={{width:"80%", marginLeft:"auto"}}>
        <span className={highlight}>This websites </span>serves as a place to showcase my work to the world. And for you, the world, to get to know me. Check out some projects below!
      </p>
      
      <Carousel>
        {projectData.allMarkdownRemark.edges.map((edge, i) => {
          return <Carousel.Item key={i}>
                <Link to={`/projects/${edge.node.fields.slug}`}>
                  <GatsbyImage image={getImage(edge.node.frontmatter.previewImg)} alt={`${edge.node.frontmatter.title} preview image`}/>

                <Carousel.Caption style={{backgroundColor:"rgba(0, 0, 0, 0.5"}}>
                  <h3>{edge.node.frontmatter.title}</h3>
                  <p>{edge.node.frontmatter.description}</p>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
        })}
      </Carousel>

      <p className={textBlock} style={{width:"80%", marginRight:"auto"}}>
        <span className={highlight}>My interests </span> range from computer graphics and procedural content to electrical engineering and music (and a lot in-between). 
      </p>
        
      <p className={textBlock} style={{width:"80%", marginLeft:"auto"}}>    
        <span className={highlight}>The design </span>
        of this website is centered around the <a className={basicLink} href="https://en.wikipedia.org/wiki/Voronoi_diagram" target="_blank" rel="noreferrer">Voronoi Diagram</a>. 
        You will find that much of the work here is based around procedural content generation and graphics. 
      </p>
  </PageLayout>
}

export default IndexPage