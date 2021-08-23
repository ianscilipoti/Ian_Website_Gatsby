import React from 'react'
import {page, pageContent, pageBadge, pageBody} from './pageLayout.module.scss'

const pageLayout = (props) => {
    const polygonStr = `polygon(${props.voronoiClipData[props.pageIdentifier]})`;
    return <div className={page} style={{"clipPath": polygonStr, "WebkitClipPath":polygonStr, color:props.textColor}}>
        <div className={pageContent} style={{maxWidth:`${props.contentWidth}px`}}>
            <h1 className={pageBadge}>
                {props.pageName}
            </h1>
            <div className={pageBody}>
                <hr/>
                {props.children}
            </div>
        </div>        
    </div>
}

pageLayout.defaultProps = { contentWidth: 650, textColor:"black"};

export default pageLayout