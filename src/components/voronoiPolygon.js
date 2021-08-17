import React from 'react'
import {svgVoronoi, polygon} from './voronoiPolygon.module.scss'

// const convertPointsToStr = (points) => {
//     return points.map(point => (point[0] + ',' + point[1])).join(' ');
// }

const VoronoiPolygon = (props) => {

    return <svg className={svgVoronoi} viewBox="0 0 100 100">
        <defs>
        <radialGradient id={`gradient${props.id}`} cx={props.position.x} cy={props.position.y} r={300} fx={props.position.x} fy={props.position.x} gradientUnits="userSpaceOnUse">
            <stop offset="5%" style={{"stopColor": props.color, "stopOpacity":1}} />
            <stop offset="100%" style={{"stopColor":"rgb(0,0,0)", "stopOpacity":1}} />
        </radialGradient>
        </defs>
        
        <polygon className={polygon} fill={`url(#gradient${props.id})`} points={props.points}>
                    
        </polygon>
    </svg>
    
}

export default VoronoiPolygon