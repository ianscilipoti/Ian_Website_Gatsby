import React from "react"
import PageLayout from '../components/pageLayout'
import PageBackground from '../components/pageBackground'
import { graphql, useStaticQuery } from 'gatsby'
import ClipToCell from '../components/clipToCell'
import {Helmet} from 'react-helmet'


const DemoReelPage = (props) => {
  const backgroundImage = useStaticQuery(graphql`
    query {
      file(relativePath: {eq: "pages/demoreelbg.png"}) {
        childImageSharp {
          gatsbyImageData (
            placeholder: BLURRED
          )
        }
      }

    }
  `)


  return <React.Fragment>

    <Helmet>
      <title>Demo Reel</title>
      <meta name="description" content="Check out an overview of my work!" />
    </Helmet>
    
    <ClipToCell cell={props.voronoiClipData.find(cell => cell.site.url === "/demoreel")}>
      <PageBackground imgSrc={backgroundImage.file} blur={5} opacity={0.15}/>
    </ClipToCell>

    <PageLayout pageName="DEMO REEL" textColor="white" styles={{maxWidth:"750px"}}>
    <div style={{padding:"56.25% 0 0 0", position:"relative"}}>
      <iframe src="https://player.vimeo.com/video/670963411?h=03762a7e44&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen 
              style={{position:"absolute", top:0, left:0, width:"100%", height:"100%"}} 
              title="Ian Scilipoti Demo Reel 2022">
      </iframe>
    </div>
    <script src="https://player.vimeo.com/api/player.js"></script>
    </PageLayout>
  </React.Fragment>
}

export default DemoReelPage