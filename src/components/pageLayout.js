import React from 'react'
import {page, pageContent, pageBadge, pageBody} from './pageLayout.module.scss'

const pageLayout = (props) => {
    return <div className={page} style={{"clipPath": `polygon(${props.voronoiClipData[props.pageIdentifier]})`, "WebkitClipPath":`polygon(${props.voronoiClipData[props.pageIdentifier]})`}}>
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

pageLayout.defaultProps = { contentWidth: 650};

export default pageLayout