## How to draw a rectangle

```js
// get the context: context is basically when we are working with canvas the context is 2d
const canvas = document.getElementById("canvas"); // id of canvas
const ctx =  canvas.getContext("2d"); // now we have the context 

// dray a rectangle
ctx.fillStyle("#000"); // meaning the shape we will create after this will have color #ooo
ctx.fillReact(0, 0, 50, 50); 
```

To Create a rectangle there are many steps

1. Get the context of the canvas
2. add the fill color using ctx.fillStyle
3. create a rectangle using ctx.fillReact
   - fillReact take 4 parameters
     - x -> starting position in  x in the canvas
     - y ->  starting position in y in the canvas
     - width -> width of the rectangle
     - height -> height of the rectangle

## Create a X x Y Board

```js
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
```

- Here we are getting the width and height of the canvas we are drawing on using ctx.canvas.width/height
- then we are dividing them with x to get the equal width of each of the box we will draw
- similarly getting height of the box
- then dynamically drawing the react

## How to draw a line