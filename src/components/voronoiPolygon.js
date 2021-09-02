import React from 'react'
import {svgVoronoi, polygon, backgroundImage} from './voronoiPolygon.module.scss'
import Img from "gatsby-image"

import {Link} from 'gatsby'
//
const VoronoiPolygon = (props) => {

    const getCenterPt = () => {
        let polyBounds = {
            minX: 100*2,
            maxX: -100,
            minY: 100*2,
            maxY: -100,
        }

        for (let i = 0; i < props.allData.halfedges.length; i ++)
        {
            const halfEdgePt = props.allData.halfedges[i].getStartpoint();
            polyBounds.minX = Math.min(polyBounds.minX, halfEdgePt.x);
            polyBounds.maxX = Math.max(polyBounds.maxX, halfEdgePt.x);
            polyBounds.minY = Math.min(polyBounds.minY, halfEdgePt.y);
            polyBounds.maxY = Math.max(polyBounds.maxY, halfEdgePt.y);
        }
        return {x:(polyBounds.minX + polyBounds.maxX)/2, y:(polyBounds.minY + polyBounds.maxY)/2};
    }

    const centerPt = getCenterPt();
    const isPageGroupPoly = props.allData.site.previewImg;//kinda messy. Only pages involved in groups are passed a preview image

    return <Link to={props.allData.site.url}>
        {props.previewImg ? 

            <h1 style={{position:"fixed", left: `${centerPt.x}%`, top: `${centerPt.y}%`}}>{props.allData.site.title}</h1> 
        
        : ""}
        <svg className={svgVoronoi} viewBox="0 0 100 100">
            <defs>
                {isPageGroupPoly ? 
                    <pattern id={`bg${props.id}`} patternUnits="userSpaceOnUse" width="100%" height="100%" >
                        {/* <Img fluid={props.previewImg.childImageSharp.fluid}/> */}
                        <image style={{opacity:0.5}}href={props.allData.site.previewImg.childImageSharp.fixed.src} height="100%"/>
                    </pattern>
                :
                    <radialGradient id={`bg${props.id}`} cx={props.position.x} cy={props.position.y} r={300} fx={props.position.x} fy={props.position.x} gradientUnits="userSpaceOnUse">
                        <stop offset="5%" style={{"stopColor": props.color, "stopOpacity":1}} />
                        <stop offset="100%" style={{"stopColor":"rgb(0,0,0)", "stopOpacity":1}} />
                    </radialGradient>
                }
            </defs>
        
            <polygon className={`${polygon} ${(isPageGroupPoly && props.displayingPageGroup) ? backgroundImage:''}`} fill={`url(#bg${props.id})`} points={props.points}/>
        </svg>
    </Link> 
}

export default VoronoiPolygon