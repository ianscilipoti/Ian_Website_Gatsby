import React from 'react'
import {page} from '../common/common.module.scss'
//props.cell
const PageBackground = (props) => 
{
    // return <img style={{objectFit: "cover", height:"100%", left:"-50%"}} src={props.previewImg.childImageSharp.fixed.src}/>
    const blurStyle = props.blur ? "blur(3px)" : "none";
    return <div style={{
        backgroundImage: `url('${props.imgSrc}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // backgroundPosition: props.centerPt ? `${props.centerPt.x}px ${props.centerPt.y}px` : "center",
        backgroundPosition: "center",
        position: "fixed",
        top: props.centerPt ? `calc(${props.centerPt.y}px - 50%)` : "0px",
        left: props.centerPt ? `calc(${props.centerPt.x}px - 50%)` : "0px",
        width: "100%",
        height: "100%",
        zIndex: "-1",
        opacity: props.opacity,
        pointerEvents: "none",
        filter: blurStyle,
        webkitFilter: blurStyle,
    }}/>
}

export default PageBackground