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
const dampening = 9.0;

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
                            globalOffset {
                                x,
                                y
                            }
                        }
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
    )
    const [voronoiPositions, setVoronoiPositions] = useState(voronoiAreas.map(area => ({...area})));
    const [dimensions, setDimensions] = React.useState(typeof window !== "undefined" ? 
        {
            height: window.innerHeight, 
            width: window.innerWidth} : 
        {
            height: 0, 
            width: 0})
    const voronoiObj = useRef(new Voronoi());
    let diagram = useRef(voronoiObj.current.compute(voronoiPositions, bbox));
    
    //these change whenever a route change happens
    let desiredVoronoiPositions = useRef(voronoiAreas.map(area => ({x: area.x, y: area.y})));
    let isAnimating = useRef(false);
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
            const currentPageVoronoiIndex = getVoronoiAreaIndex();
            const currentPageVoronoiPos = voronoiAreas[currentPageVoronoiIndex];
            //how much does being visiting this page cause other page polygons to move
            let nonHighlightedSiteOffset = selectedHighlightMovement;

            if (voronoiAreas[currentPageVoronoiIndex].hasOwnProperty("selectedHighlightMovementOverride") && voronoiAreas[currentPageVoronoiIndex].selectedHighlightMovementOverride !== null)
            {
                nonHighlightedSiteOffset = voronoiAreas[currentPageVoronoiIndex].selectedHighlightMovementOverride;
            }

            let globalOffsetX = 0;
            let globalOffsetY = 0;

            if (voronoiAreas[currentPageVoronoiIndex].hasOwnProperty("globalOffset") && voronoiAreas[currentPageVoronoiIndex].globalOffset !== null)
            {
                globalOffsetX = voronoiAreas[currentPageVoronoiIndex].globalOffset.x;
                globalOffsetY = voronoiAreas[currentPageVoronoiIndex].globalOffset.y;
            }

            const newDesiredPositions = [];
            for (let i = 0; i < voronoiAreas.length; i ++)
            {
                const originalVoronoiPosition = voronoiAreas[i];

                if (i !== currentPageVoronoiIndex)
                {
                    let directionToHoveredSiteX = currentPageVoronoiPos.x - originalVoronoiPosition.x;
                    let directionToHoveredSiteY = currentPageVoronoiPos.y - originalVoronoiPosition.y;
                    const vectorMagnitude = Math.sqrt(directionToHoveredSiteX*directionToHoveredSiteX + directionToHoveredSiteY*directionToHoveredSiteY);
                    directionToHoveredSiteX /= vectorMagnitude;
                    directionToHoveredSiteY /= vectorMagnitude;
                    newDesiredPositions.push({
                        x: voronoiAreas[i].x - directionToHoveredSiteX * nonHighlightedSiteOffset + globalOffsetX,
                        y: voronoiAreas[i].y - directionToHoveredSiteY * nonHighlightedSiteOffset + globalOffsetY});
                }
                else
                {
                    newDesiredPositions.push({
                        x: boundingBoxSize/2 + globalOffsetX,
                        y: boundingBoxSize/2 + globalOffsetY
                    });
                }
            }
            
            desiredVoronoiPositions.current = newDesiredPositions;
        }

         //get the index of the voronoiArea object of the current page
        const getVoronoiAreaIndex = () =>
        {
            for(let i = 0; i < voronoiAreas.length; i ++)
            {
                const voronoiArea = voronoiAreas[i];
                const safePathname = location.pathname.substr(-1) === "/" ? location.pathname.slice(0, -1) : location.pathname;
                if (voronoiArea.hasOwnProperty('url') && voronoiArea.url === safePathname)
                {
                    return i;
                } 
            }
            console.error("page indentifier invalid");
            return 0;
        }

        const tryStartUpdateLoop = () =>
        {
            if (!isAnimating.current)
            {
                animationRequestRef.current = window.requestAnimationFrame(updateCanvas);
            }

        }

        const updateCanvas = () =>
        {
            isAnimating.current = true;

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
                isAnimating.current = false;
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
            isAnimating.current = false;
        };
    },[location])

    const recalculateDiagram = () =>
    {
        voronoiObj.current.recycle(diagram.current);
        diagram.current = voronoiObj.current.compute(voronoiPositions, bbox);
    }

    //don't call without calling recalculateDiagram first!
    //gets general data for renderinng VoronoiPolygonn elements
    const getPolygonsData = () =>
    {
        const polygonsData = [];
        for (let i = 0; i < diagram.current.cells.length; i ++)
        {
            const cell = diagram.current.cells[i];
            if (cell.halfedges != null && cell.halfedges.length > 0)
            {
                var polygonPoints = cell.halfedges.map(halfEdge => {return `${halfEdge.getStartpoint().x},${halfEdge.getStartpoint().y}`}).join(' ');
                polygonsData.push({points: polygonPoints, color: cell.site.color, position: {x: cell.site.x, y: cell.site.y}});
                // polygonsData[cell.site.identifier] = {points: polygonPoints, color: cell.site.color, position: {x: cell.site.x, y: cell.site.y}};
            }
        }
        return polygonsData;
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

    return <React.Fragment>
        {recalculateDiagram()}
        <div className={voronoiBackground}>
            {getPolygonsData().map((polygonData, i) => 
                <VoronoiPolygon key={i} id={i} fill={true} color={polygonData.color} position={polygonData.position} points={polygonData.points}/>
            )}
        </div>
        {/* pass the cells down to be used for clipping / animations */}
        {props.children(getPolygonClippingData())}
    </React.Fragment>
}

export default Background1