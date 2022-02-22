import React from "react"
import PageLayout from '../components/pageLayout'
import PageBackground from '../components/pageBackground'
import {emailButton, me} from './contact.module.scss'
import {buttonBase} from '../common/common.module.scss'
import { graphql, useStaticQuery } from 'gatsby'
import face from './me.jpeg';
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ClipToCell from '../components/clipToCell'
import {sm} from '../common/common.js'
import {Helmet} from 'react-helmet'


const ContactPage = (props) => {
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
  const backgroundImage = useStaticQuery(graphql`
    query {
      file(relativePath: {eq: "pages/contactbg.jpg"}) {
        childImageSharp {
          gatsbyImageData (
            placeholder: BLURRED
          )
        }
      }

    }
  `)

  const bottomHTML = <div style={{textAlign:"center", margin:"20px 0"}}>
    <a className={`${emailButton} ${buttonBase}`} href="mailto:ianscilipoti@gmail.com">Send me an email!</a>
  </div>;

  const resumeBottomHTML = <div style={{textAlign:"center", margin:"20px 0"}}>
    <a className={`${emailButton} ${buttonBase}`} target="_blank" rel="noopener noreferrer" href="/Resume.pdf">Ian's Resume</a>
  </div>;

  return <React.Fragment>

    <Helmet>
      <title>Contact Me</title>
      <meta name="description" content="Email me with questions or inquiries." />
    </Helmet>
    
    <ClipToCell cell={props.voronoiClipData.find(cell => cell.site.url === "/contact")}>
      <PageBackground imgSrc={backgroundImage.file} blur={5} opacity={0.15}/>
    </ClipToCell>
    <PageLayout pageName="CONTACT" textColor="white" styles={{maxWidth:"600px"}}>
      
      <Row sm={2} md={2} xs={1}>
        <Col style={{textAlign:"center"}}>
          <p style={{position:"relative", top:"50%", transform:"translateY(-50%)", marginBottom:"20px", fontSize:"100%"}}>
            If you have any questions about what you see here or business inquiries feel free to reach out. 
          </p>
          {/* {isLg && bottomHTML} */}
        </Col>
      
        <Col>
          <Image className={me} src={face} roundedCircle />
        </Col>
      </Row>
      {/* <br/> */}
      
      <Row sm={2} md={2} xs={1}>
      <Col>
        {bottomHTML}
      </Col>
      <Col>
        {resumeBottomHTML}
      </Col>
      </Row>
    </PageLayout>
  </React.Fragment>
}

export default ContactPage