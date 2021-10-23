import React from "react"
import PageLayout from '../components/pageLayout'
import PageBackground from '../components/pageBackground'
import {basicLink} from '../common/common.module.scss'
import { graphql, useStaticQuery, Link } from 'gatsby'

import ClipToCell from '../components/clipToCell'


const Page404 = (props) => {

    const backgroundImage = useStaticQuery(graphql`
    query {
      file(relativePath: {eq: "pages/404bg.png"}) {
        childImageSharp {
          gatsbyImageData (
            placeholder: BLURRED
          )
        }
      }

    }
  `)
 
  return <React.Fragment>
    
    <ClipToCell cell={props.voronoiClipData.find(cell => cell.site.url === "/404")}>
      <PageBackground imgSrc={backgroundImage.file} blur={5} opacity={0.15}/>
    </ClipToCell>
    <PageLayout pageName="ERROR 404" textColor="white" styles={{maxWidth:"600px"}}>
        Something went wrong!

        <Link className={basicLink} to="/"> Go to home page!</Link>
    </PageLayout>
  </React.Fragment>
}

export default Page404