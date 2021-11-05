import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const PageBackground = (props) => 
{
    const blurStyle = props.blur ? `blur(${props.blur}px)` : "none";
    
    const imgStyle = {
        zIndex:-1,
        filter: blurStyle,
        WebkitFilter: blurStyle,
        // width: "100%",//props.centerPt ? "100%" : "100%",
        height: props.centerPt ? "auto" : "100%",
        width:`${props.scale}%`,
        maxWidth:"700px",
        opacity: props.opacity,
        position:"absolute",
        top: props.centerPt ? `${props.centerPt.y}px` : `${props.offset}px`, 
        left: props.centerPt ? `${props.centerPt.x}px` : "50%",
        transform: props.centerPt ? "translate(-50%, -50%)" : "translateX(-50%)",
    };
    
    const wrapperStyle = {
        left:`50%`,
        transform:"translateX(-50%)",
        top:"0px",
        position:"absolute",
        overflow:"hidden",
        width:`100%`,
        height:`100%`,        
        pointerEvents: "none",
        zIndex:-1,
    } 
    return <div style={wrapperStyle}>
            <GatsbyImage style={imgStyle} image={getImage(props.imgSrc)} alt=""/>
        </div>
    
}

PageBackground.defaultProps = {offset: 0, centerPt: false, scale:100};
export default PageBackground