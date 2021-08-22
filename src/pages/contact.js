import React from "react"
import PageLayout from '../components/pageLayout'
import {emailButton} from './contact.module.scss'
import {buttonBase} from '../styles/common.module.scss'

const ContactPage = (props) => {
  return <PageLayout pageName="CONTACT" pageIdentifier="contact" voronoiClipData={props.voronoiClipData}>
      <p>If you have any questions about what you see here or business inquiries feel free to reach out. </p>
      <br/>
      {/* style={{left:"50%", transform:"translateX(-50%)", position:"absolute"}} */}
      <a className={`${emailButton} ${buttonBase}`} href="mailto:ianscilipoti@gmail.com">Send me an email!</a>
  </PageLayout>
}

export default ContactPage