import React from 'react'

import {svgVoronoi, polygon} from './voronoiPolygon.module.scss'
import {navigate} from 'gatsby'
import {hexToRGB, rgbArrToFormatted} from '../common/common.js'

const VoronoiPolygon = (props) => {

    const getFormattedPoints = props.allData.halfedges.map(halfEdge => {return `${halfEdge.getStartpoint().x},${halfEdge.getStartpoint().y}`}).join(' ');
    
    if(props.renderStrokeOnly)
    {
        return <svg className={svgVoronoi} style={{zIndex:2}} viewBox="0 0 100 100">
            <polygon className={`${polygon}`} fill={"none"} points={getFormattedPoints}/>
        </svg>
    }
    else
    {
        const rgbCol = hexToRGB(props.allData.site.color);
        const lightness = 0.35;
        const noContentColor = rgbCol.map(val => val*lightness);
        let finalColor = rgbArrToFormatted(props.hasContent ? rgbCol : noContentColor);
        return <svg style={{zIndex:props.hasContent?1:-1}} className={svgVoronoi} viewBox="0 0 100 100" onClick={() => {if(!props.isAnimating){navigate(props.allData.site.url)}}}>
            <defs>
                {props.img ? 
                <pattern id={`centerGradient${props.id}`} patternUnits="userSpaceOnUse" width="100%" height="100%">
                    <image href={props.img} height="100%" width="100%"/>
                </pattern>
                :
                <radialGradient id={`centerGradient${props.id}`} cx="0.5" cy="0.5" r="1.5" fx="0.43" fy="0.43">
                    <stop offset="10%" stopColor={finalColor} style={{stopColor:finalColor}}/>
                    <stop offset="100%" stopColor="black" style={{stopColor:"black"}}/>
                </radialGradient>
                }
            </defs>
            <polygon style={{pointerEvents:"all"}} fill={`url(#centerGradient${props.id})`} points={getFormattedPoints}/>
            {/* <polygon style={{pointerEvents:"all"}} fill={props.allData.site.color} points={getFormattedPoints}/> */}
        </svg>
    }
}

export default VoronoiPolygon