import React from 'react'
import {voronoiCoordToPixelX, voronoiCoordToPixelY} from '../common/common.js'

const PageNames = (props) => 
{
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
        {props.voronoiData.filter(cell => cell.site.backgroundImg).map((cell) => {
            const xPx = voronoiCoordToPixelX(cell.site.x, dimensions.width, dimensions.height);
            const yPx = voronoiCoordToPixelY(cell.site.y, dimensions.width, dimensions.height);
            let positionStyle = {left: `${xPx}px`, top:`${yPx}px`, position:"absolute", pointerEvents:"none", transform:"translateX(-50%)"}//left:`${xPx}px`, 
    
            return <h2 key={cell.site.color} style={positionStyle}>{cell.site.title.toUpperCase()}</h2>
        })}
    </React.Fragment>
}

export default PageNames