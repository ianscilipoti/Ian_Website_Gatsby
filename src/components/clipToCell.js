import React from 'react'
import {voronoiCoordToPixelX, voronoiCoordToPixelY} from '../common/common.js'
import {page} from '../common/common.module.scss'
//props.cell
const ClipToCell = (props) => 
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

    const getOurClipData = () => {
        let thisCell =  props.cell;
        let pointsStr = '0px 0px, -1px -1px, -1px 0px';
        if (thisCell.halfedges != null && thisCell.halfedges.length > 0)
        {
            let polygonPoints = thisCell.halfedges.map(halfEdge => {return `
                ${voronoiCoordToPixelX(halfEdge.getStartpoint().x, dimensions.width, dimensions.height)}px 
                ${voronoiCoordToPixelY(halfEdge.getStartpoint().y, dimensions.width, dimensions.height)}px`}).join(', ');
                pointsStr = polygonPoints;
        }
        return `polygon(${pointsStr})`
    }
    const polygonStr = getOurClipData();

    return <div className={page} style={{"clipPath": polygonStr, "WebkitClipPath":polygonStr, pointerEvents: "none", position:"fixed", zIndex:-1}}>
        {props.children}
    </div>
}

export default ClipToCell