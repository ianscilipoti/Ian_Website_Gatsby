import React from 'react'

import {svgVoronoi, polygon} from './voronoiPolygon.module.scss'
import {navigate} from 'gatsby'

const VoronoiPolygon = (props) => {

    const isPageGroupPoly = props.allData.site.previewImg;//kinda messy. Only pages involved in groups are passed a preview image

    const getFormattedPoints = () => props.allData.halfedges.map(halfEdge => {return `${halfEdge.getStartpoint().x},${halfEdge.getStartpoint().y}`}).join(' ');
    return <svg className={svgVoronoi} viewBox="0 0 100 100" onClick={() => {if(!props.isAnimating){navigate(props.allData.site.url)}}}>
            <defs>
                {isPageGroupPoly ? 
                    <pattern id={`bg${props.id}`} patternUnits="userSpaceOnUse" x="-50%"width="200%" height="100%">
                        {/* <Img fluid={props.previewImg.childImageSharp.fluid}/> */}
                        <rect width="200%" height="100%" fill={props.allData.site.color} />
                        {/* <image style={{...defaultStyles, ...getTransitionStyles[state]}} href={props.allData.site.previewImg.childImageSharp.fixed.src} height="100%"/> */}
                        <image href={props.allData.site.previewImg.childImageSharp.fixed.src} height="100%"/>
                    </pattern>
                :
                    <radialGradient id={`bg${props.id}`} cx={props.allData.site.x} cy={props.allData.site.y} r={300} fx={props.allData.site.x} fy={props.allData.site.x} gradientUnits="userSpaceOnUse">
                        <stop offset="5%" style={{"stopColor": props.allData.site.color, "stopOpacity":1}} />
                        <stop offset="100%" style={{"stopColor":"rgb(0,0,0)", "stopOpacity":1}} />
                    </radialGradient>
                }
            </defs>
        
            <polygon className={`${polygon}`} fill={`url(#bg${props.id})`} points={getFormattedPoints()}/>
        </svg>
}

export default VoronoiPolygon