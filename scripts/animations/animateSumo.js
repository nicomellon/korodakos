const sumoSize = 41.76;

let requestId = null;

// sumo one
const sumoOne = {
  img: new Image(),
  x: 0,
  y: 0,
};
sumoOne.img.src = "assets/sumoOne.png";

// sumo two
const sumoTwo = {
  img: new Image(),
  x: 0,
  y: 0,
};
sumoTwo.img.src = "assets/sumoTwo.png";

const resetSprite = (spriteObj, x, y) => {
  spriteObj.x = x;
  spriteObj.y = y;
};

const drawSumo = (ctx, sumo, dx, dy, width, height) => {
  ctx.drawImage(
    sumo.img,
    sumo.x,
    sumo.y,
    sumoSize,
    sumoSize,
    dx,
    dy,
    width,
    height
  );
};

// sumoFight
const sumoFight = {
  img: new Image(),
  x: 0,
  y: 0,
  width: 216.4,
  height: 115.5,
  xPos: 100,
};
sumoFight.img.src = "assets/sumosFighting.png";

const drawSumoFight = (ctx) => {
  ctx.drawImage(
    sumoFight.img,
    sumoFight.x,
    sumoFight.y,
    sumoFight.width,
    sumoFight.height,
    sumoFight.xPos,
    0,
    sumoFight.width * 2,
    sumoFight.height * 2
  );
};
