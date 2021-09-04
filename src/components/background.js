import React, { useEffect, useState, useRef} from 'react'
import { useLocation } from "@reach/router"
import Voronoi from 'voronoi'
import VoronoiPolygon from './voronoiPolygon'
import {voronoiBackground} from './background.module.scss'
import { useStaticQuery, graphql } from 'gatsby'

//consts
const boundingBoxSize = 100;
const boundingBoxPadding = 100;
const bbox = {xl: -boundingBoxPadding, xr: boundingBoxSize + boundingBoxPadding, yt: 0, yb: boundingBoxSize};
const selectedHighlightMovement = 120;
const animationCutoff = 0.3;
const dampening = 12.0;

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
                            createPolygon
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
                        previewImg {
                            childImageSharp {
                                fixed(width: 1000, quality: 90) {
                                    src
                                }
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
    ).filter(area => !(area.hasOwnProperty("createPolygon") && area.createPolygon === false));
        // debugger;
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
        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })

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

                for (let i = 0; i < voronoiAreas.length; i ++)
                {
                    const thisAreaData = voronoiAreas[i];
                    const isWithinUrlGroup = thisAreaData.url.startsWith(currentPageInfo.urlGroup); 
                    if (isWithinUrlGroup)
                    {
                        groupBounds.minX = Math.min(groupBounds.minX, thisAreaData.x);
                        groupBounds.maxX = Math.max(groupBounds.maxX, thisAreaData.x);
                        groupBounds.minY = Math.min(groupBounds.minY, thisAreaData.y);
                        groupBounds.maxY = Math.max(groupBounds.maxY, thisAreaData.y);
                    }
                }

                const newDesiredPositions = [];
                for (let i = 0; i < voronoiAreas.length; i ++)
                {
                    const thisAreaData = voronoiAreas[i];
                    const isWithinUrlGroup = thisAreaData.url.startsWith(currentPageInfo.urlGroup); 
                    //------------------- add new field to config that is url groups



                    //arrange group url areas to fill entire screen. All other areas drop down
                    if (isWithinUrlGroup)
                    {
                        newDesiredPositions.push(
                            {
                                x: invLerp(groupBounds.minX - boundingBoxSize/3, groupBounds.maxX + boundingBoxSize/3, thisAreaData.x)*boundingBoxSize,
                                y: invLerp(groupBounds.minY - boundingBoxSize/3, groupBounds.maxY + boundingBoxSize/3, thisAreaData.y)*boundingBoxSize
                            }
                        );
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
                // debugger;
                return newVoronoiPositions;
            });

            //verify if the animation is done
            if (animationComplete)
            {
                setIsAnimating(false);
            }
            else
            {
                animationRequestRef.current = window.requestAnimationFrame(updateCanvas);
            }
            //window.requestAnimationFrame(updateCanvas);
        }
        recalculateDesiredVoronoiPositions();
        tryStartUpdateLoop();

        return () => { 
            cancelAnimationFrame(animationRequestRef.current);
            setIsAnimating(false);
        };
    },[location])

     //get the index of the voronoiArea object of the current page
    const getVoronoiAreaInfo = () =>
    {
         const pthnm = location.pathname;
         const safePathname = pthnm.substr(-1) === "/" && pthnm.length>1  ? pthnm.slice(0, -1) : pthnm;
        
         for(let i = 0; i < voronoiAreas.length; i ++)
         {
             const voronoiArea = voronoiAreas[i];
             
             if (voronoiArea.hasOwnProperty('url') && voronoiArea.url === safePathname)
             {
                 return {type: "area", index: i};
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

         console.error("page indentifier invalid");
         return {type: "error", index: -1};
    }

    const recalculateDiagram = () =>
    {
        voronoiObj.current.recycle(diagram.current);
        diagram.current = voronoiObj.current.compute(voronoiPositions, bbox);
    }

    //get points formatted for clipping paths
    //don't call without calling recalculateDiagram first!
    const getPolygonClippingData = () =>
    {
        const headerHeightPx = 56;
        function voronoiCoordToPixelX (x)
        {

            let pageHeightMinusHeader = dimensions.height - headerHeightPx;//height of viewbox in pixels
            let extraSideSpace = (dimensions.width - pageHeightMinusHeader)/2;//this much space on either side of viewbox
            return (x / boundingBoxSize) * pageHeightMinusHeader + extraSideSpace;
        }

        function voronoiCoordToPixelY (y)
        {

            let pageHeightMinusHeader = dimensions.height - headerHeightPx;//height of viewbox in pixels
            return (y / boundingBoxSize) * pageHeightMinusHeader;
        }

        const polygonsClippingData = {};
        for (let i = 0; i < diagram.current.cells.length; i ++)
        {
            const cell = diagram.current.cells[i];
            if (cell.halfedges != null && cell.halfedges.length > 0)
            {
                let polygonPoints = cell.halfedges.map(halfEdge => {return `${voronoiCoordToPixelX(halfEdge.getStartpoint().x)}px ${voronoiCoordToPixelY(halfEdge.getStartpoint().y)}px`}).join(', ');
                polygonsClippingData[cell.site.url] = polygonPoints;
            }
            else 
            {
                //if there are 0 points then define an arbitrary offscreen polygon to ensure the window doesn't get rendered
                polygonsClippingData[cell.site.url] = '0px 0px, -1px -1px, -1px 0px';
            }
        }

        return polygonsClippingData;
    }

    const getPolygonClippingData1 = () =>
    {
        const dataPerUrl = {};

        for (let i = 0; i < diagram.current.cells.length; i ++)
        {
            const cell = diagram.current.cells[i];
            dataPerUrl[cell.site.url] = cell;
        }
        return dataPerUrl;
    }

    return <React.Fragment>
        {recalculateDiagram()}
        <div className={voronoiBackground}>
            {diagram.current.cells.filter(cell => cell.halfedges != null && cell.halfedges.length > 0).map((cell, i) =>
                <VoronoiPolygon key={i} id={i} allData={cell} isAnimating={isAnimating} displayingPageGroup={getVoronoiAreaInfo().type === "group"}/>
            )}
        </div>
        {/* pass the cells down to be used for clipping / animations */}
        {props.children(getPolygonClippingData(), isAnimating)}
    </React.Fragment>
}

export default Background1