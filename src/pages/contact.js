import React from "react"
import PageLayout from '../components/pageLayout'
import {emailButton} from './contact.module.scss'

const ContactPage = (props) => {
  return <PageLayout pageName="CONTACT" pageIdentifier="contact" voronoiClipData={props.voronoiClipData}>
      <p>If you have any questions about what you see here or business inquiries feel free to reach out. </p>
      <br/>
      <a className={emailButton} href="mailto:ianscilipoti@gmail.com">Send me an email!</a>
  </PageLayout>
}

export default ContactPage