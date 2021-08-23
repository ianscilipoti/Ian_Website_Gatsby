import React, { useEffect, useState, useRef} from 'react'
import { useLocation } from "@reach/router"
import Voronoi from 'voronoi'
import VoronoiPolygon from './voronoiPolygon'
import {voronoiBackground, voronoiForeground} from './background.module.scss'

const voronoiAreas = [
    {
        identifier: "about", 
        url: "/",
        x:15, 
        y:40,
        // color: "#2c4d8f",
        color: "#ccdebd",
        selectedHighlightMovementOverride:80
    }, 
    {
        identifier: "contact", 
        url: "/contact",
        x:80,
        y:55,
        color: "#24736b",
        selectedHighlightMovementOverride:70
    }, 
    {
        identifier: "projects", 
        url: "/projects",
        x:40, 
        y:10,
        // color: "#4d3c99",
        color: "#c5e1e8",
        selectedHighlightMovementOverride:120
    },
    {
        identifier: "blog", 
        x:48, 
        y:70,
        url: "/blog",
        color: "#114e5c"
    },
    {
        identifier: "bg1", 
        x:100, 
        y:70,
        color: "#1a3824",
    },
    {
        identifier: "bg2", 
        x:120, 
        y:30,
        color: "#21254a",
    },
    {
        identifier: "bg3", 
        x:5, 
        y:35,
        color: "#252652",
    }
];

//consts
const boundingBoxSize = 100;
const boundingBoxPadding = 100;
const bbox = {xl: -boundingBoxPadding, xr: boundingBoxSize + boundingBoxPadding, yt: 0, yb: boundingBoxSize};
const selectedHighlightMovement = 100;
const animationCutoff = 0.3;
const dampening = 5.0;

const Background1 = (props) =>
{

    const location = useLocation()
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
            let siteOffset = selectedHighlightMovement;

            if (voronoiAreas[currentPageVoronoiIndex].hasOwnProperty('selectedHighlightMovementOverride'))
            {
                siteOffset = voronoiAreas[currentPageVoronoiIndex].selectedHighlightMovementOverride;
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
                        x: voronoiAreas[i].x - directionToHoveredSiteX * siteOffset,
                        y: voronoiAreas[i].y - directionToHoveredSiteY * siteOffset});
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

         //get the index of the voronoiArea object of the current page
        const getVoronoiAreaIndex = () =>
        {
            for(let i = 0; i < voronoiAreas.length; i ++)
            {
                const voronoiArea = voronoiAreas[i];
                if (voronoiArea.hasOwnProperty('url') && voronoiArea.url.split('/')[1] === location.pathname.split('/')[1])
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
                polygonsData.push({id:cell.site.identifier, points: polygonPoints, color: cell.site.color, position: {x: cell.site.x, y: cell.site.y}});
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
                polygonsClippingData[cell.site.identifier] = polygonPoints;
            }
            else 
            {
                //if there are 0 points then define an arbitrary offscreen polygon to ensure the window doesn't get rendered
                polygonsClippingData[cell.site.identifier] = '0px 0px, -1px -1px, -1px 0px';
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
        {/* this just renders the strokes above everything else to ensure borders
        <div className={voronoiForeground}>
            {getPolygonsData().map((polygonData, i) => 
                <VoronoiPolygon key={i} id={i} fill={false} position={polygonData.position} points={polygonData.points}/>
            )}
        </div> */}
        {/* pass the cells down to be used for clipping / animations */}
        {props.children(getPolygonClippingData())}
    </React.Fragment>
}

export default Background1