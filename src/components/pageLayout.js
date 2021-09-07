import React from 'react'
import {page, pageContent, pageBadge, pageBody} from './pageLayout.module.scss'
import {voronoiCoordToPixelX, voronoiCoordToPixelY} from '../common/common.js'

const PageLayout = (props) => {
    const [dimensions, setDimensions] = React.useState(typeof window !== "undefined" ? 
        {height: window.innerHeight, width: window.innerWidth} : 
        {height: 0, width: 0})
    
    React.useEffect(() => {
        function handleResize() {
        setDimensions({
            height: window.innerHeight,
            width: window.innerWidth
        })
        }
        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })

    const getOurClipData = () => {
        let thisCell =  props.voronoiClipData.find(cell => cell.site.url === props.url);
        let pointsStr = '0px 0px, -1px -1px, -1px 0px';
        if (thisCell.halfedges != null && thisCell.halfedges.length > 0)
        {
            let polygonPoints = thisCell.halfedges.map(halfEdge => {return `
                ${voronoiCoordToPixelX(halfEdge.getStartpoint().x, dimensions.width, dimensions.height)}px 
                ${voronoiCoordToPixelY(halfEdge.getStartpoint().y, dimensions.width, dimensions.height)}px`}).join(', ');
                pointsStr = polygonPoints;
        }
        return `polygon(${pointsStr})`
    }

    const polygonStr = getOurClipData();
    return <div className={page} style={{"clipPath": polygonStr, "WebkitClipPath":polygonStr, color:props.textColor}}>
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
}

PageLayout.defaultProps = {parentDirectory: null, contentWidth: 650, textColor:"black"};

export default PageLayout