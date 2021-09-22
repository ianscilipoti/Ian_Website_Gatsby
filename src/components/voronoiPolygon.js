import React from 'react'

import {svgVoronoi, polygon} from './voronoiPolygon.module.scss'
import {navigate} from 'gatsby'

const VoronoiPolygon = (props) => {

    const isPageGroupPoly = props.allData.site.previewImg;//kinda messy. Only pages involved in groups are passed a preview image

    const getFormattedPoints = props.allData.halfedges.map(halfEdge => {return `${halfEdge.getStartpoint().x},${halfEdge.getStartpoint().y}`}).join(' ');
    
    if(props.renderStrokeOnly)
    {
        return <svg className={svgVoronoi} viewBox="0 0 100 100">
            <polygon className={`${polygon}`} fill={"none"} points={getFormattedPoints}/>
        </svg>
    }
    else
    {
        return <svg style={{zIndex:props.hasContent?1:-1}} className={svgVoronoi} viewBox="0 0 100 100" onClick={() => {if(!props.isAnimating){navigate(props.allData.site.url)}}}>
            <polygon style={{pointerEvents:"all"}} fill={props.allData.site.color} points={getFormattedPoints}/>
        </svg>
    }
}

export default VoronoiPolygon