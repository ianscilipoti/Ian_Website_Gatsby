import React from 'react'
import {page, pageContent, pageBadge, pageBody} from './pageLayout.module.scss'

const pageLayout = (props) => {
    return <div className={page} style={{"clipPath": `polygon(${props.voronoiClipData[props.pageIdentifier]})`, "WebkitClipPath":`polygon(${props.voronoiClipData[props.pageIdentifier]})`, "backgroundColor":"red"}}>
        <div className={pageContent}>
            <h1 className={pageBadge}>
                {props.pageName}
            </h1>
            <div className={pageBody}>
                {props.children}
            </div>
        </div>        
    </div>
}

export default pageLayout