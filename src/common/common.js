const headerHeightPx = 56;//from the react bootstrap header
const minPageHeight = 750;//shared with voronoiPolygon.module.scss

export const boundingBoxSize = 100;
export const boundingBoxPadding = 100;

export function voronoiCoordToPixelX (x, pageWidth, pageHeight)
{
    let pageHeightMinusHeader = Math.max(minPageHeight + headerHeightPx, pageHeight) - headerHeightPx;//height of viewbox in pixels
    let extraSideSpace = (pageWidth - pageHeightMinusHeader)/2;//this much space on either side of viewbox
    return (x / boundingBoxSize) * pageHeightMinusHeader + extraSideSpace;
}

export function voronoiCoordToPixelY (y, pageWidth, pageHeight)
{

    let pageHeightMinusHeader = Math.max(minPageHeight + headerHeightPx, pageHeight) - headerHeightPx;//height of viewbox in pixels
    return (y / boundingBoxSize) * pageHeightMinusHeader;
}

