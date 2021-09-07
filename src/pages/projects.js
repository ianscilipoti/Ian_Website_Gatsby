import React, {useState} from 'react'
import PageNames from '../components/pageNames'
import {directoryLink, tutorialText} from './projects.module.scss'

const ProjectsPage = (props) => {

  return <div>
    
    <PageNames voronoiData={props.voronoiClipData}/>
    <h2 className={tutorialText}>Click polygons to explore!</h2>
    
  </div>
}


export default ProjectsPage