import React from "react"
import PageLayout from '../components/pageLayout'
import {emailButton} from './contact.module.scss'
import {buttonBase} from '../common/common.module.scss'
// import Img from "gatsby-image"
// import { useStaticQuery } from "gatsby";
import face from './me.jpeg';
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'




const ContactPage = (props) => {
  return <PageLayout pageName="CONTACT" url="/contact" voronoiClipData={props.voronoiClipData} textColor="white">
    <Row>
      <Col>
        <p>If you have any questions about what you see here or business inquiries feel free to reach out. </p>
        <br/>
        
      </Col>
    
      <Col>
        <Image width={150} src={face} roundedCircle />
      </Col>
    </Row>


    <a className={`${emailButton} ${buttonBase}`} href="mailto:ianscilipoti@gmail.com">Send me an email!</a>

    

  </PageLayout>
}

export default ContactPage