import React from "react"
import PageLayout from '../components/pageLayout'
import PageBackground from '../components/pageBackground'
import {emailButton} from './contact.module.scss'
import {buttonBase} from '../common/common.module.scss'
// import Img from "gatsby-image"
// import { useStaticQuery } from "gatsby";
import face from './me.jpeg';
import backgroundSrc from './contactbg.png';
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'




const ContactPage = (props) => {
  return <PageLayout pageName="CONTACT" url="/contact" voronoiClipData={props.voronoiClipData} textColor="white">
    <PageBackground imgSrc={backgroundSrc} opacity={0.03}/>
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