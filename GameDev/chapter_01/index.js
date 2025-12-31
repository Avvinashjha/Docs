const canvas = document.getElementById("root");

const ctx = canvas.getContext("2d");

/**
 * Draw a line
 */

// define the line coordinates
const x1 = 10;
const y1 = 10;
const x2 = 10;
const y2 = 300;

// // dra3w a line from (x1, y1) to (x2, y2)

// // add color to line
ctx.strokeStyle= "#0000ff";
// // add line width
ctx.strokeWidth = 5;

// // start the drawing
ctx.beginPath();

ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();
/**
 * Draw a rectangle
 */
// ctx.fillStyle = "rgba(255, 0,120, .5)"
// ctx.fillRect(50, 50, 100, 100);

// ctx.fillStyle = 'rgba(0, 255, 0)'; // green color
// ctx.fillRect(50, 10, 50, 50);

// draw a 4 x 4 Board



function drawXbyXBoard(x, y, color1, color2){
    const canvasWidth = ctx.canvas.width/x;
    const canvasHeight = ctx.canvas.height / y;
    for(let i = 0; i < x; i++){
        for(let j = 0; j < y; j++){
            ctx.fillStyle = ((i + j) % 2 === 0 ? color1: color2);
            ctx.fillRect(i * canvasWidth, j * canvasHeight, canvasWidth, canvasHeight);
            
        }
    }
}

function drawXxyLines (ctx, startX, startY, lineGap){
    
}


// drawXbyXBoard(8,8, "#000", "#fff")

