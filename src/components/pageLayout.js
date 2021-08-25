import React from 'react'
import {page, pageContent, pageBadge, pageBody} from './pageLayout.module.scss'

const PageLayout = (props) => {
    const polygonStr = `polygon(${props.voronoiClipData})`;

    return <div className={page} style={{"clipPath": polygonStr, "WebkitClipPath":polygonStr, color:props.textColor}}>
        <div className={pageContent} style={{maxWidth:`${props.contentWidth}px`}}>
            <h1 className={pageBadge}>
                {props.pageName.toUpperCase()}
            </h1>
            <div className={pageBody}>
                <hr/>
                {props.children}
            </div>
        </div>        
    </div>
}

PageLayout.defaultProps = {parentDirectory: null, contentWidth: 650, textColor:"black"};

export default PageLayout