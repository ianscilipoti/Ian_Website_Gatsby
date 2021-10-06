import React from 'react'
import PageNames from '../components/pageNames'
import {tutorialText} from './projects.module.scss'
import ClipToCell from '../components/clipToCell'
import PageBackground from '../components/pageBackground'
import {voronoiCoordToPixelX, voronoiCoordToPixelY} from '../common/common.js'

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

  return <React.Fragment>
    <div>
      {props.voronoiClipData.filter(cell => cell.site.url.startsWith("/projects")).map(cell => 
        <ClipToCell key={cell.site.url} cell={cell}>
          <PageBackground imgSrc={cell.site.backgroundImg.childImageSharp.fixed.src} opacity={0.5} scale={0.5} centerPt={{
              x:voronoiCoordToPixelX(cell.site.x, dimensions.width, dimensions.height), 
              y:voronoiCoordToPixelY(cell.site.y, dimensions.width, dimensions.height)
            }}/>
        </ClipToCell>
      )}

      {!props.isAnimating ? <PageNames voronoiData={props.voronoiClipData}/> : "POOOOOOOO"}
    </div>
    {/* <h2 className={tutorialText}>Click polygons to explore!</h2> */}
  </React.Fragment>
}


export default ProjectsPage