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
      allMarkdownRemark {
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
  const scrollEvent = (e) => {
    // console.log('Current scroll position:', e.target.scrollTop);
    setScrollPos(e.target.scrollTop);
  }
  const sm = 768; //small size

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
        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)
        }
  })

  return <PageLayout pageName="WELCOME" url="/" voronoiClipData={props.voronoiClipData} contentWidth={1150} scrollEvent={scrollEvent} textColor={"white"} >
      <PageBackground imgSrc={projectData.file} opacity={0.08} blur offset={-scrollPos/6}/>

      <Row sm={1} md={2} xs={1}>
        <Col>
          <p className={textBlock} style={{width:"83%", marginLeft:"auto", paddingTop: "0px"}}>
            <span className={highlight}> I am a developer </span> and hobbiest based out of upstate New York. My formal education is in Computer Science. 
          </p>

          <p className={textBlock} style={{width:"90%", marginRight:"auto"}}>
            <span className={highlight}>My passion </span> lies in the intersection of 
            creativitiy and technology. At heart, my work is a consequence of my drive to learn and explore. 
          </p>

          <p className={textBlock} style={{width:"90%", marginRight:"auto", marginLeft:"15px"}}>
            <span className={highlight}>Please explore </span> the projects outlined on this website.
            These projects began with a fascination in specific technologies and grew into the creative visually oriented projects I describe on this site. 
          </p>

          {dimensions.width < sm && <ResizableCarousel height={300} projectData={projectData}/>}

          

          
        </Col>

        <Col>
          {dimensions.width > sm && <ResizableCarousel height={400} projectData={projectData}/>}
        </Col>
      </Row>

      <p className={textBlock} style={{width:"min(500px, 90%)", marginLeft:"auto", marginRight:"auto", marginTop:"10px"}}>    
            <span className={highlight}>The design </span>
            of this website is centered around the Voronoi diagram. The Voronoi diagram is a staple of procedural content generation and one of the many mathematical and algorithmic concepts I use in my work. 
          </p>
      {/* <div className={backgroundBanner} style={{backgroundColor:"#9A6965"}}>
      <div className={backgroundBannerImg} style={{backgroundImage:`url(${bg1})`}}/>
        <div className={backgroundBannerChild} style={{top:"30px"}}> 
          <Row>
            <Col>
              <Image width={175} style={{left:"50%", transform:"translateX(-50%)", position:"relative"}} src={face} roundedCircle />
            </Col>
            <Col>
              <p className={textBlock} style={{width:"70%", position:"relative", marginLeft:"auto", marginRight:"auto", top:"50%", transform:"translateY(-50%)", paddingTop: "0px"}}>
                <span className={highlight}> I am a </span> developer and hobbiest based out of upstate New York. My formal education is in Computer Science. 
              </p>
            </Col>
          </Row>
        </div>
      </div>

      <div className={backgroundBanner} style={{transform:"rotate(4deg)", backgroundColor:"#69659A", marginTop:"-100px"}}>
        
        <div className={backgroundBannerChild} style={{transform:"rotate(-4deg)", top:"30px"}}> 
          <Row>
            <Col>
              <p className={textBlock} style={{width:"70%", position:"relative", marginLeft:"auto", marginRight:"auto", top:"50%", transform:"translateY(-50%)", paddingTop: "0px"}}>
                <span className={highlight}>My pashion </span> lies in the intersection of creativitiy and technology. 
              </p>
            </Col>
            <Col>
              <ResizableCarousel height={400} projectData={projectData}/>
            </Col>
          </Row>
        </div>
      </div>

      <div className={backgroundBanner} style={{transform:"rotate(-2deg)", backgroundColor:"#659A69", paddingBottom:"200px", marginTop:"-100px", marginBottom:"-50px"}}>
        <div className={backgroundBannerChild} style={{transform:"rotate(2deg)", top:"30px"}}> 
          <p className={textBlock} style={{width:"70%", position:"relative", marginLeft:"auto", marginRight:"auto", paddingTop: "0px"}}>
            <span className={highlight}> I am a </span> developer and hobbiest based out of upstate New York. My formal education is in Computer Science. 
          </p>
        </div>
      </div> */}
  </PageLayout>
}

export default IndexPage