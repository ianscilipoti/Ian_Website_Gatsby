import React from "react"
import PageLayout from '../components/pageLayout'
import PageBackground from '../components/pageBackground'
import {emailButton} from './contact.module.scss'
import {buttonBase} from '../common/common.module.scss'
import { graphql, useStaticQuery } from 'gatsby'
// import Img from "gatsby-image"
// import { useStaticQuery } from "gatsby";
import face from './me.jpeg';
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


const ContactPage = (props) => {
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
  return <PageLayout pageName="CONTACT" url="/contact" voronoiClipData={props.voronoiClipData} textColor="white">
    <PageBackground imgSrc={backgroundImage.file} blur opacity={0.15}/>
    <Row>
      <Col>
        <p>If you have any questions about what you see here or business inquiries feel free to reach out. </p>
        <br/>
        <div style={{textAlign:"center"}}>
          <a className={`${emailButton} ${buttonBase}`} href="mailto:ianscilipoti@gmail.com">Send me an email!</a>
        </div>

        
        
      </Col>
    
      <Col>
        <Image width={175} src={face} roundedCircle />
      </Col>
    </Row>


   

    

  </PageLayout>
}

export default ContactPage