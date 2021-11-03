const sumoSize = 41.7;

let requestId = null;

// sumo one
const sumoOne = {
  img: new Image(),
  x: 0,
  y: 0,
};
sumoOne.img.src = "/assets/sumoOne.png";

// sumo two
const sumoTwo = {
  img: new Image(),
  x: 0,
  y: 0,
};
sumoTwo.img.src = "/assets/sumoTwo.png";

// sumoFight
const sumoFight = {
  img: new Image(),
  x: 0,
  y: 0,
  width: 216.4,
  height: 115.5,
};
sumoFight.img.src = "/assets/sumosFighting.png";

const resetSprite = (spriteObj, x, y) => {
  spriteObj.x = x;
  spriteObj.y = y;
};

//! UNNECESSARY FUNCTIONS , swap for ctx.drawImage()

const drawSumoOne = (ctx) => {
  ctx.clearRect(0, 0, 250, 250);

  ctx.drawImage(
    sumoOne.img,
    sumoOne.x,
    sumoOne.y,
    sumoSize,
    sumoSize,
    0,
    0,
    250,
    250
  );
};

const drawSumoTwo = (ctx) => {
  ctx.clearRect(0, 0, 250, 250);

  ctx.drawImage(
    sumoTwo.img,
    sumoTwo.x,
    sumoTwo.y,
    sumoSize,
    sumoSize,
    0,
    0,
    250,
    250
  );
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
