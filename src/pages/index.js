import React from "react"
import PageLayout from '../components/pageLayout'
import 'bootstrap/dist/css/bootstrap.min.css';
import { graphql, Link, useStaticQuery } from 'gatsby'
import Carousel from 'react-bootstrap/Carousel';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import PageBackground from '../components/pageBackground'
import {highlight, textBlock} from './index.module.scss'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ClipToCell from '../components/clipToCell'
import {sm} from '../common/common.js'
import {Helmet} from 'react-helmet'

const ResizableCarousel = (props) => {
  const projectData = props.projectData;
  return <Carousel fade>
    {projectData.allMarkdownRemark.edges.map((edge, i) => {
      return <Carousel.Item key={i}>
            <Link to={`/projects/${edge.node.fields.slug}`}>
              <GatsbyImage style={{left:"50%", transform:"translateX(-50%)", objectFit: "cover", height:`${props.height}px`, borderStyle:"solid", borderWidth:"6px", borderColor:"black"}} image={getImage(edge.node.frontmatter.previewImg)} alt={`${edge.node.frontmatter.title} preview image`}/>

            <Carousel.Caption style={{backgroundColor:"rgba(0, 0, 0, 0.5"}}>
              <h3>{edge.node.frontmatter.title}</h3>
              <p>{edge.node.frontmatter.description}</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
    })}
  </Carousel>
}

const IndexPage = (props) => {
  const projectData = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: {fields: frontmatter___order}) {
        edges {
          node {
            frontmatter {
              title
              description
              previewImg {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                    quality: 100
                    height: 400 
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

      file(relativePath: {eq: "pages/indexbg5.jpg"}) {
        childImageSharp {
          gatsbyImageData (
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }

    }
  `)
  const [scrollPos, setScrollPos] = React.useState(0);
 

  const [dimensions, setDimensions] = React.useState(typeof window !== "undefined" ? 
        {height: window.innerHeight, width: window.innerWidth} : 
        {height: 0, width: 0})
    
  React.useEffect(() => {
        function handleResize() {
          setDimensions({
              height: window.innerHeight,
              width: window.innerWidth
          })
        }
        function handleScroll(event) {
          setScrollPos(window.scrollY);
          
        }
        window.addEventListener('resize', handleResize)
        window.addEventListener('scroll', handleScroll)

        return _ => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('scroll', handleScroll)
        }
  })

  const isLg = dimensions.width > sm;

  return <React.Fragment>

    <Helmet>
      <title>About Ian Scilipoti</title>
      <meta name="description" content="Ian is a developer interested in procedural content and emerging tech." />
    </Helmet>

    <ClipToCell cell={props.voronoiClipData.find(cell => cell.site.url === "/")}>
      <PageBackground imgSrc={projectData.file} opacity={0.08} blur={5} offset={-scrollPos/6} scale={150}/>
    </ClipToCell>

    <PageLayout pageName="WELCOME" textColor={"white"} >
      
      <Row sm={1} md={2} xs={1}>
        <Col>
          <p className={textBlock} style={isLg ? {width:"83%", marginLeft:"auto", paddingTop:0} : {paddingTop:0}}>
            <span className={highlight}> I am a developer </span> and hobbyist based out of upstate New York. My formal education is in Computer Science. 
          </p>

          <p className={textBlock} style={isLg > sm ? {width:"90%", marginRight:"auto"} : {}}>
            <span className={highlight}>My passion </span> lies in the intersection of 
            creativity and technology. At heart, my work is a consequence of my drive to learn and explore. 
          </p>

          {!isLg && <ResizableCarousel height={300} projectData={projectData}/>}

          <p className={textBlock} style={isLg ? {width:"90%", marginRight:"auto", marginLeft:"15px"} : {}}>
            <span className={highlight}>Please explore </span> the projects outlined on this website. Many of my projects are related to computer graphics and procedural content generation. 
            
          </p>

          
        </Col>

        <Col>
          {isLg && <ResizableCarousel height={400} projectData={projectData}/>}
        </Col>
      </Row>

      <p className={textBlock} style={{maxWidth:"500px", marginLeft:"auto", marginRight:"auto", marginTop:"10px"}}>    
        <span className={highlight}>The design </span>
        of this website is centered around the Voronoi diagram. The Voronoi diagram is a staple of procedural content generation and one of the many mathematical and algorithmic concepts I use in my work. 
      </p>
  </PageLayout>
  </React.Fragment>
}

export default IndexPage