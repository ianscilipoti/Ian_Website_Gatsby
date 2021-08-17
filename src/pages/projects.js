import React from "react"
import PageLayout from '../components/pageLayout'

const ProjectsPage = (props) => {
  return <PageLayout pageName="PROJECTS" pageIdentifier="projects" voronoiClipData={props.voronoiClipData}>
    <p>Check out some of my work! </p>

  </PageLayout>
}

export default ProjectsPage