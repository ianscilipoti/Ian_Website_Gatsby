import React from "react"
import PageLayout from '../components/pageLayout'
import {emailButton} from './contact.module.scss'
import {buttonBase} from '../styles/common.module.scss'
// import Img from "gatsby-image"
// import { useStaticQuery } from "gatsby";
import face from './me.jpeg';
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'




const ContactPage = (props) => {
  // const imageQuery = useStaticQuery(graphql`
  //   query {
  //     file(relativePath: { eq: "pages/me.jpeg" }) {
  //       childImageSharp {
  //         fixed(width: 125, height: 125) {
  //           ...GatsbyImageSharpFixed
  //         }
  //       }
  //     }
  //   }
  // `)
  return <PageLayout pageName="CONTACT" voronoiClipData={props.voronoiClipData["/contact"]} textColor="white">
    <Row>
      <Col>
        <p>If you have any questions about what you see here or business inquiries feel free to reach out. </p>
        <br/>
        <a className={`${emailButton} ${buttonBase}`} href="mailto:ianscilipoti@gmail.com">Send me an email!</a>
      </Col>
    
      <Col>
        <Image width={200} src={face} roundedCircle />
      </Col>
    </Row>

    
  </PageLayout>
}

export default ContactPage