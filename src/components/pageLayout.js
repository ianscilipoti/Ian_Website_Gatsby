import React from 'react'
import {pageContent, pageBadge, pageScrollWindow} from './pageLayout.module.scss'
import ClipToCell from './clipToCell'

const PageLayout = (props) => {

    return <ClipToCell cell={props.voronoiClipData.find(cell => cell.site.url === props.url)}>
        <div className={pageScrollWindow} style={{color:props.textColor}} onScroll={props.scrollEvent}>
            <div className={pageContent} style={{maxWidth:`${props.contentWidth}px`, color:props.textColor}}>
                <h1 className={pageBadge}>
                    {props.pageName.toUpperCase()}
                </h1>
                <hr/>
                {props.children}
            </div>   
        </div>     
     </ClipToCell>
}

PageLayout.defaultProps = {parentDirectory: null, contentWidth: 650, textColor:"black"};

export default PageLayout