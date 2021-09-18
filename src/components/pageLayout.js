import React from 'react'
import {pageContent, pageBadge, pageBody} from './pageLayout.module.scss'
import ClipToCell from './clipToCell'
import {page} from '../common/common.module.scss'
import {voronoiCoordToPixelX, voronoiCoordToPixelY} from '../common/common.js'

const PageLayout = (props) => {
    // return <ClipToCell cell={props.voronoiClipData.find(cell => cell.site.url === props.url)}>
        return <div className={page} style={{overflowY:'scroll'}}>
            {console.log("loaded layout: ", props.url)}
            <div className={pageContent} style={{maxWidth:`${props.contentWidth}px`}} >
                <h1 className={pageBadge}>
                    {props.pageName.toUpperCase()}
                </h1>
                <div className={pageBody}>
                    <hr/>
                    {props.children}
                </div>
            </div>   
        </div>     
    // </ClipToCell>
}

PageLayout.defaultProps = {parentDirectory: null, contentWidth: 650, textColor:"black"};

export default PageLayout