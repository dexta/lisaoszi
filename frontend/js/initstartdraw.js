const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

const noneCanvas = document.createElement('canvas');
const BUFFER = noneCanvas.getContext("2d");

let HEIGHT = gameCanvas.height;
let WIDTH = gameCanvas.width;

let BOX_SIZE = 200;
let BOX_RADIUS = 95;

let ROWS = 8;
let COLS = 16;

let HORIZONTAL_CIRCLES = [];
let VERTICAL_CIRCLES = [];
let BOX_GRID = [];
let TICK = 0;
let START = true;
let RUNID = 0;

let FPS = 0;
let MAXFPS = 1;
let MINFPS = 9999999;
let LASTTIME = 0;
let NORMTIME = 0;

const init = () => {
  calcCanvas();
  makeitfit();
  for(let bx=0;bx<=ROWS;bx++) {
    BOX_GRID[bx] = [];
    for(let by=0;by<=COLS;by++) {
      if(by===0&&bx===0) {
        BOX_GRID[bx][by] = false;
        continue;
      } else if(by===0&&bx>0) {
        BOX_GRID[bx][by] = new circleCorner(BOX_SIZE*(by+1)-BOX_RADIUS,BOX_SIZE*(bx+1)-BOX_RADIUS,BOX_RADIUS);
        BOX_GRID[bx][by].isHorizontal = false;
        BOX_GRID[bx][by].speed = 0.0051*(bx+1);
      } else if(bx===0&&by>0) {
        BOX_GRID[bx][by] = new circleCorner(BOX_SIZE*(by+1)-BOX_RADIUS,BOX_SIZE*(bx+1)-BOX_RADIUS,BOX_RADIUS);
        BOX_GRID[bx][by].speed = 0.0051*(by+1);
      } else {
        BOX_GRID[bx][by] = new littleCanvas(BOX_SIZE*(by+1)-BOX_RADIUS,BOX_SIZE*(bx+1)-BOX_RADIUS,BOX_RADIUS*2);
        BOX_GRID[bx][by].extAxesObjX = BOX_GRID[0][by];
        BOX_GRID[bx][by].extAxesObjY = BOX_GRID[bx][0];
      }

      BOX_GRID[bx][by].draw();
    }
  }
  BOX_GRID[0][0] = new infoText(BOX_SIZE-BOX_RADIUS,BOX_SIZE-BOX_RADIUS,BOX_RADIUS);
  BOX_GRID[0][0].gridText = ROWS*COLS;
  BOX_GRID[0][0].pointCountObj = BOX_GRID[ROWS][COLS];

  // RUNID = setInterval(draw, 1000/60 );
  draw();
};

const draw = () => {
  TICK++;
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  let DOUBLEBB = BUFFER.getImageData(0,0,WIDTH,HEIGHT);
  ctx.putImageData(DOUBLEBB,0,0);
  ctx.strokeStyle = '#000';
  ctx.lineWidth ="3";
  ctx.strokeRect(0, 0, WIDTH, HEIGHT);

  for(let y=0;y<=ROWS;y++) {
    for(let x=0;x<=COLS;x++) {
      if(!BOX_GRID[y][x]) continue;
      BOX_GRID[y][x].draw();
    }
  }
  calcFPS();
  if(START) window.requestAnimationFrame(draw);
};

const calcCanvas = () => {
  gameCanvas.height = Math.floor( window.innerHeight / 100 )*100;
  gameCanvas.width = Math.floor( window.innerWidth / 100 )*100;  
  HEIGHT = gameCanvas.height;
  WIDTH = gameCanvas.width;
  noneCanvas.height = HEIGHT;
  noneCanvas.width = WIDTH;
};

const makeitfit = () => {
  ROWS = Math.floor(HEIGHT / BOX_SIZE)-1;
  COLS = Math.floor(WIDTH / BOX_SIZE)-1;

};

const calcFPS = () => {
  let diffr = (performance.now() - LASTTIME)/1000;
  LASTTIME = performance.now();
  FPS = Math.floor(1/diffr);
  if(performance.now()-NORMTIME > 1000 * 10) {
    MAXFPS=0;MINFPS=999999;
    NORMTIME=performance.now();
  }
  if(FPS>MAXFPS) MAXFPS = FPS;
  if(FPS<MINFPS) MINFPS = FPS;
}