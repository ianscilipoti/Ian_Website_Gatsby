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

    const getCenterPt = (cell) => {
        let polyBounds = {
            minX: 100*2,
            maxX: -100,
            minY: 100*2,
            maxY: -100,
        }

        for (let i = 0; i < cell.halfedges.length; i ++)
        {
            const halfEdgePt = cell.halfedges[i].getStartpoint();
            polyBounds.minX = Math.min(polyBounds.minX, halfEdgePt.x);
            polyBounds.maxX = Math.max(polyBounds.maxX, halfEdgePt.x);
            polyBounds.minY = Math.min(polyBounds.minY, halfEdgePt.y);
            polyBounds.maxY = Math.max(polyBounds.maxY, halfEdgePt.y);
        }
        polyBounds.minX = Math.max(0, polyBounds.minX);//move voronoi bounding box to query
        polyBounds.maxX = Math.min(100, polyBounds.maxX);
        polyBounds.minY = Math.max(0, polyBounds.minY);
        polyBounds.maxY = Math.min(100, polyBounds.maxY);

        return {x:(polyBounds.minX + polyBounds.maxX)/2, y:(polyBounds.minY + polyBounds.maxY)/2};
    }
      
    return <div>
        {props.voronoiData.filter(cell => cell.site.previewImg).map((cell) => {
            const centerPt = getCenterPt(cell);
            const xPx = voronoiCoordToPixelX(centerPt.x, dimensions.width, dimensions.height);
            const yPx = voronoiCoordToPixelY(cell.site.y, dimensions.width, dimensions.height);
            let positionStyle = {left: `${xPx}px`, top:`${yPx}px`, position:"absolute", pointerEvents:"none", transform:"translateX(-50%)"}//left:`${xPx}px`, 
    
            return <h2 key={cell.site.color} style={positionStyle}>{cell.site.title.toUpperCase()}</h2>
        })}
    </div>
}

export default PageNames