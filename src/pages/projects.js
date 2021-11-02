import React from 'react'
import PageNames from '../components/pageNames'
import ClipToCell from '../components/clipToCell'
import PageBackground from '../components/pageBackground'
import {voronoiCoordToPixelX, voronoiCoordToPixelY} from '../common/common.js'
import {Helmet} from 'react-helmet'

const ProjectsPage = (props) => {
  const [dimensions, setDimensions] = React.useState(typeof window !== "undefined" ? 
  {height: window.innerHeight, width: window.innerWidth} : 
  {height: 0, width: 0})

  React.useEffect(() => {
    function handleResize() {
      setDimensions({
          height: window.innerHeight,
          width: window.innerWidth
      })
    }
    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  })
  // const cols = ["red", "green", "yellow", "blue", "purple", "orange", "cyan"];

  return <React.Fragment>
    <Helmet>
      <title>Projects</title>
      <meta name="description" content="Read about Ian's work and personal projects." />
    </Helmet>

      {props.voronoiClipData.filter(cell => cell.site.url.startsWith("/projects")).map((cell, i) => 
        <ClipToCell key={cell.site.url} cell={cell}>
          <PageBackground imgSrc={cell.site.backgroundImg} opacity={0.35} blur={1} centerPt={{
              x:voronoiCoordToPixelX(cell.site.x, dimensions.width, dimensions.height), 
              y:voronoiCoordToPixelY(cell.site.y, dimensions.width, dimensions.height)
            }}/>
        </ClipToCell>
      )}

      {!props.isAnimating && <PageNames voronoiData={props.voronoiClipData}/>}
  </React.Fragment>
}


export default ProjectsPage