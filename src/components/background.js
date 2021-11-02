import React, { useEffect, useState, useRef} from 'react'
import { useLocation } from "@reach/router"
import Voronoi from 'voronoi'
import VoronoiPolygon from './voronoiPolygon'
import {voronoiBackground} from './background.module.scss'
import { useStaticQuery, graphql } from 'gatsby'
import {boundingBoxSize, boundingBoxPadding, headerHeightPx, minPageHeight} from '../common/common.js'

//consts
const bbox = {xl: -boundingBoxPadding, xr: boundingBoxSize + boundingBoxPadding, yt: 0, yb: boundingBoxSize};
const selectedHighlightMovement = 170;
const animationCutoff = 0.1;
const dampening = 5.5;
const verticalStackBreakpoint = 750;

const invLerp = (a, b, v) => 
{
    return (v - a) / (b - a);
}

const Background1 = (props) =>
{

    const voronoiInfoQuery = useStaticQuery(graphql`
    query {
        allSite {
            edges {
                node {
                    siteMetadata {
                        pageVoronoiData {
                            y
                            x
                            url
                            selectedHighlightMovementOverride
                            color
                        }
                        pageGroups
                    }
                }
            }
        }
        allMarkdownRemark {
            edges {
                node {
                    frontmatter {
                        x
                        y
                        color
                        title
                        description
                        backgroundImg {
                            childImageSharp {
                                fixed(width: 1000, quality: 90) {
                                    src
                                }
                                gatsbyImageData (
                                    placeholder: BLURRED
                                    quality: 100
                                )
                            }
                            relativePath
                        }
                    }
                    fields {
                        directory
                        slug
                    }
                }
            }
        }
    }`)
    const location = useLocation()
    const voronoiAreas = voronoiInfoQuery.allSite.edges[0].node.siteMetadata.pageVoronoiData.concat(
        voronoiInfoQuery.allMarkdownRemark.edges.map(edge => ({...edge.node.frontmatter, url:`/${edge.node.fields.directory}/${edge.node.fields.slug}`}))
    );
    
    const [voronoiPositions, setVoronoiPositions] = useState(voronoiAreas.map(area => ({...area})));
    const [dimensions, setDimensions] = React.useState(typeof window !== "undefined" ? 
        {height: window.innerHeight, width: window.innerWidth} : 
        {height: 0, width: 0})
    const voronoiObj = useRef(new Voronoi());
    let diagram = useRef(voronoiObj.current.compute(voronoiPositions, bbox));
    let [isAnimating, setIsAnimating] = useState(false);
    
    //these change whenever a route change happens
    let desiredVoronoiPositions = useRef(voronoiAreas.map(area => ({x: area.x, y: area.y})));
    
    let animationRequestRef = useRef();

    React.useEffect(() => {
        function handleResize() {
        setDimensions({
            height: window.innerHeight,
            width: window.innerWidth
        })
        }
        // handleResize();
        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })

    const urlWithinGroup = (url, group) => url.startsWith(group);

    useEffect(() => {
        
        //get the goal position of each voronoi polygon based on the current page directory
        const recalculateDesiredVoronoiPositions = () =>
        {

            const currentPageInfo = getVoronoiAreaInfo();
            
            // if (areaData.hasOwnProperty("overrideUrlGroup") && areaData.overrideUrlGroup !== null)
            if (currentPageInfo.type === "group")
            {
                
                //calculate bounding box for url group
                let groupBounds = {
                    minX: boundingBoxSize*2,
                    maxX: -boundingBoxSize,
                    minY: boundingBoxSize*2,
                    maxY: -boundingBoxSize,
                }
                let numWithinGroup = 0;

                for (let i = 0; i < voronoiAreas.length; i ++)
                {
                    const thisAreaData = voronoiAreas[i];
                    const isWithinUrlGroup = urlWithinGroup(thisAreaData.url, currentPageInfo.urlGroup) && !thisAreaData.url.includes("-"); //- char is used to indicate bg polys
                    if (isWithinUrlGroup)
                    {
                        groupBounds.minX = Math.min(groupBounds.minX, thisAreaData.x);
                        groupBounds.maxX = Math.max(groupBounds.maxX, thisAreaData.x);
                        groupBounds.minY = Math.min(groupBounds.minY, thisAreaData.y);
                        groupBounds.maxY = Math.max(groupBounds.maxY, thisAreaData.y);
                        numWithinGroup ++;
                    }
                }

                const newDesiredPositions = [];
                let numSeenWithinGroup = 0;
                for (let i = 0; i < voronoiAreas.length; i ++)
                {
                    const thisAreaData = voronoiAreas[i];
                    const isWithinUrlGroup = urlWithinGroup(thisAreaData.url, currentPageInfo.urlGroup);
                    const isBackgroundPoly = thisAreaData.url.includes("-");
                    const padding = 15;

                    const minHeightScaler = Math.min((dimensions.height / minPageHeight), 1);
                    const minHeightOffset = (1 - minHeightScaler) * boundingBoxSize * 0.5;
                    const viewBoxWidthPx = Math.max(minPageHeight, dimensions.height) + headerHeightPx;//box is a square that fits the 
                    const widthScaler = Math.min(dimensions.width / viewBoxWidthPx, 1);

                    //arrange group url areas to fill entire screen. All other areas drop down
                    if (isWithinUrlGroup)
                    {
                        
                        if (dimensions.width/dimensions.height > 1.3)
                        {  
                            //normal layout
                            newDesiredPositions.push(
                                {
                                    x: ((invLerp(groupBounds.minX - padding, groupBounds.maxX + padding, thisAreaData.x)-0.5)*widthScaler + 0.5)*boundingBoxSize,
                                    y: invLerp(groupBounds.minY - padding, groupBounds.maxY + padding, thisAreaData.y)*boundingBoxSize * minHeightScaler + minHeightOffset
                                }
                            );    
                        }
                        else
                        {//vertical lahout
                            if(!isBackgroundPoly)
                            {
                                
                                const rowHeight = ((boundingBoxSize)/(numWithinGroup+1))*minHeightScaler;
                                newDesiredPositions.push({
                                    //for x do a weighted avg of the original position in the bounding box and the center pt to give it more style
                                    x: invLerp(groupBounds.minX - padding, groupBounds.maxX + padding, thisAreaData.x)*boundingBoxSize*0.02 + 0.98*((groupBounds.minX + groupBounds.maxX)/2),
                                    y: (numSeenWithinGroup+1)*rowHeight + minHeightOffset
                                });
                            }
                            else
                            {
                                newDesiredPositions.push(
                                    {
                                        x: 1000,
                                        y: -i*boundingBoxSize
                                    }
                                );  
                            }
                        }
                        numSeenWithinGroup++;
                    }
                    else {
                        newDesiredPositions.push(
                            {
                                x: thisAreaData.x,// + fromCenter.x*5,
                                y: thisAreaData.y + boundingBoxSize
                            }
                        );
                    }
                }

                desiredVoronoiPositions.current = newDesiredPositions;
            }
            else if (currentPageInfo.type === "area")
            {
                
                const areaData = voronoiAreas[currentPageInfo.index];
                //how much does being visiting this page cause other page polygons to move
                let nonHighlightedSiteOffset = selectedHighlightMovement;

                if (areaData.hasOwnProperty("selectedHighlightMovementOverride") && areaData.selectedHighlightMovementOverride !== null)
                {
                    nonHighlightedSiteOffset = areaData.selectedHighlightMovementOverride;
                }

                const newDesiredPositions = [];
                for (let i = 0; i < voronoiAreas.length; i ++)
                {
                    const originalVoronoiPosition = voronoiAreas[i];

                    if (i !== currentPageInfo.index)
                    {
                        // let directionToHoveredSiteX = boundingBoxSize/2 - originalVoronoiPosition.x;
                        // let directionToHoveredSiteY = boundingBoxSize/2 - originalVoronoiPosition.y;
                        let directionToHoveredSiteX = areaData.x - originalVoronoiPosition.x;
                        let directionToHoveredSiteY = areaData.y - originalVoronoiPosition.y;
                        const vectorMagnitude = Math.sqrt(directionToHoveredSiteX*directionToHoveredSiteX + directionToHoveredSiteY*directionToHoveredSiteY);
                        directionToHoveredSiteX /= vectorMagnitude;
                        directionToHoveredSiteY /= vectorMagnitude;
                        newDesiredPositions.push({
                            x: voronoiAreas[i].x - directionToHoveredSiteX * nonHighlightedSiteOffset,
                            y: voronoiAreas[i].y - directionToHoveredSiteY * nonHighlightedSiteOffset});
                    }
                    else
                    {
                        newDesiredPositions.push({
                            x: boundingBoxSize/2,
                            y: boundingBoxSize/2
                        });
                    }
                }
                
                desiredVoronoiPositions.current = newDesiredPositions;
            }
            
        }

        const tryStartUpdateLoop = () =>
        {
            if (!isAnimating)
            {
                animationRequestRef.current = window.requestAnimationFrame(updateCanvas);
            }

        }

        const updateCanvas = () =>
        {
            
            setIsAnimating(true);

            let animationComplete = true;

            setVoronoiPositions(previousVoronoiPositions => {
                let newVoronoiPositions = [];
                for (let i = 0; i < previousVoronoiPositions.length; i ++)
                {
                    
                    let offsetX = (desiredVoronoiPositions.current[i].x - previousVoronoiPositions[i].x) / dampening;
                    let offsetY = (desiredVoronoiPositions.current[i].y - previousVoronoiPositions[i].y) / dampening;
                    newVoronoiPositions.push({...voronoiAreas[i], x: (previousVoronoiPositions[i].x + offsetX), y: (previousVoronoiPositions[i].y + offsetY)});
                    
                    if (animationComplete && Math.max(Math.abs(offsetX), Math.abs(offsetY)) > animationCutoff)
                    {
                        animationComplete = false;
                    }
                }
                return newVoronoiPositions;
            });

            //verify if the animation is done
            if (animationComplete)
            {
                setIsAnimating(false);
                if (props.animationFinished)
                {
                    props.animationFinished();
                }
            }
            else
            {
                animationRequestRef.current = window.requestAnimationFrame(updateCanvas);
            }
        }
        recalculateDesiredVoronoiPositions();
        tryStartUpdateLoop();

        return () => { 
            cancelAnimationFrame(animationRequestRef.current);
            setIsAnimating(false);
        };
    },[location, dimensions])

     //get the index of the voronoiArea object of the current page
    const getVoronoiAreaInfo = () =>
    {
        const pthnm = location.pathname;
        const safePathname = pthnm.substr(-1) === "/" && pthnm.length>1  ? pthnm.slice(0, -1) : pthnm;
        let ind404;
         for(let i = 0; i < voronoiAreas.length; i ++)
         {
             const voronoiArea = voronoiAreas[i];
             
             if (voronoiArea.hasOwnProperty('url') && voronoiArea.url === safePathname)
             {
                 return {type: "area", index: i};
             } 
             else if (voronoiArea.url == "/404")
             {
                ind404 = i;
             }
         }
         //check to see if this is a page group
         const pageGroups = voronoiInfoQuery.allSite.edges[0].node.siteMetadata.pageGroups;
         for(let i = 0; i < pageGroups.length; i ++)
         {
             const group = pageGroups[i];
             if (group === safePathname)
             {
                 return {type: "group", urlGroup: group};
             }

         }

         console.error("page indentifier invalid: ", pthnm);
         return {type: "area", index: ind404};
    }

    const recalculateDiagram = () =>
    {
        voronoiObj.current.recycle(diagram.current);
        diagram.current = voronoiObj.current.compute(voronoiPositions, bbox);
    }

    const isValidCell = (cell) => cell.halfedges != null && cell.halfedges.length;

    const isCellVisible = (cell) => {
        const areaInfo = getVoronoiAreaInfo();
        if (areaInfo.type === "group")
        {
            return urlWithinGroup(cell.site.url, areaInfo.urlGroup) && !cell.site.url.includes("-");
        }
        else
        {
            return voronoiAreas[areaInfo.index].url === cell.site.url;
        }
    }

    return <React.Fragment>
        {recalculateDiagram()}
        {/* color backgrounds */}
        
        { typeof window === "undefined" ? <></> : <React.Fragment>
            <div className={voronoiBackground} style={{zIndex:-1, height:(dimensions.height - headerHeightPx)}}>
                {diagram.current.cells.filter(cell => isValidCell(cell)).map((cell, i) =>
                    <VoronoiPolygon key={cell.site.url} id={cell.site.url} allData={cell} isAnimating={isAnimating} renderStrokeOnly={false} hasContent={isCellVisible(cell)}/>
                )}
            </div>
            {/* strokes. Could improve performance here probably */}
            <div className={voronoiBackground} style={{zIndex:2, height:(dimensions.height - headerHeightPx)}}>
                
                {diagram.current.cells.filter(cell => isValidCell(cell)).map((cell, i) =>
                    <VoronoiPolygon key={i} id={cell.site.url} allData={cell} isAnimating={isAnimating} renderStrokeOnly={true} />
                )}
            </div>
        </React.Fragment>
        }
        {/* pass the cells down to be used for clipping / animations */}
        {props.children(diagram.current.cells, isAnimating)}
    </React.Fragment>
}

export default Background1