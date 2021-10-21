import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const PageBackground = (props) => 
{
    const blurStyle = props.blur ? `blur(${props.blur}px)` : "none";
    
    const imgStyle = {
        zIndex:-1,
        filter: blurStyle,
        WebkitFilter: blurStyle,
        width: props.centerPt ? "100%" : "150%",
        height: props.centerPt ? "100%" : "150%",
        opacity: props.opacity,
        position:"absolute",
    };
    const wrapperStyle = {
        left:"0px",
        top:"0px",
        position:"absolute",
        overflow:"hidden",
        width:"100%",
        height:"100%",
        pointerEvents: "none",
        zIndex:-1,
    } 
    return <div style={wrapperStyle}>
            <div style={{
                position:"absolute", 
                width:"100%", 
                height:"100%",
                top: props.centerPt ? `${props.centerPt.y}px` : `${props.offset}px`, 
                left: props.centerPt ? `${props.centerPt.x}px` : "50%",
                transform: props.centerPt ? "translate(-50%, -50%)" : "translateX(-50%)",
                }}>

                <GatsbyImage style={imgStyle} image={getImage(props.imgSrc)} alt=""/>
            </div>
        </div>
    
}

PageBackground.defaultProps = {offset: 0, centerPt: false};
export default PageBackground