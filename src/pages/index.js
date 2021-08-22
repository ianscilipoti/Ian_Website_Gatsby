import React from "react"
import PageLayout from '../components/pageLayout'
import '../styles/common.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const IndexPage = (props) => {
  return <PageLayout pageName="WELCOME" pageIdentifier="about" voronoiClipData={props.voronoiClipData}>
      <p>
        I am a developer/hobbiest/artistically inclined person located in upstate New York. This websites serves as a 
        hub for all things I do including blog posts about my process as well as project showcases. 
      </p>

      <p>
        My interests range from computer graphics and procedural content to electrical engineering and music (and a lot in-between).
        </p>
        
      <p> The very design
        of this website is centered around the <a href="https://en.wikipedia.org/wiki/Voronoi_diagram" target="_blank" rel="noreferrer">Voronoi Diagram</a>. 
        You will find that much of the work here is based around procedural content generation and graphics. 

      </p>
  </PageLayout>
}

export default IndexPage