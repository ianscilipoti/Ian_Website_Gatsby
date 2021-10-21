export const headerHeightPx = 56;//from the react bootstrap header
export const minPageHeight = 750;//shared with voronoiPolygon.module.scss

export const boundingBoxSize = 100;
export const boundingBoxPadding = 100;

export const sm = 768; //small size for mobile breaks

export function voronoiCoordToPixelX (x, pageWidth, pageHeight)
{
    // let pageHeightMinusHeader = pageHeight - headerHeightPx;  
    let pageHeightMinusHeader = Math.max(minPageHeight + headerHeightPx, pageHeight) - headerHeightPx;//height of viewbox in pixels
    let extraSideSpace = (pageWidth - pageHeightMinusHeader)/2;//this much space on either side of viewbox
    return (x / boundingBoxSize) * pageHeightMinusHeader + extraSideSpace;
}

export function voronoiCoordToPixelY (y, pageWidth, pageHeight)
{
  // let pageHeightMinusHeader = pageHeight - headerHeightPx;  
  let centeringOffset = Math.max(0, (minPageHeight + headerHeightPx) - pageHeight)/2;
  let pageHeightMinusHeader = Math.max(minPageHeight + headerHeightPx, pageHeight) - headerHeightPx;//height of viewbox in pixels
  return (y / boundingBoxSize) * pageHeightMinusHeader - centeringOffset;
}

// from css-tricks:
export function hexToRGB(h) {
    let r = 0, g = 0, b = 0;
  
    // 3 digits
    if (h.length === 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
  
    // 6 digits
    } else if (h.length === 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }
    return [r, g, b];
    // return "rgb("+ +r + "," + +g + "," + +b + ")";
  }

  export function rgbArrToFormatted (arr)
  {
    return "rgb("+ +arr[0] + "," + +arr[1] + "," + +arr[2] + ")";
  }