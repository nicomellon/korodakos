class Sumo {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvasHeight = canvas.height;
    this.size = 50;
    this.x = 50;
    this.y = canvas.height / 2;
    this.speed = 2;
    this.isMovingX = false;
    this.isMovingY = false;
    this.directionX = 0;
    this.directionY = 0;
  }

  update() {
    if (this.isMovingX) {
      this.x = this.x + this.directionX * this.speed;
    }
    if (this.isMovingY) {
      this.y = this.y + this.directionY * this.speed;
    }
  }

  setDirection(direction) {
    // +1 down  -1 up
    if (direction === "right") this.directionX = 1;
    else if (direction === "left") this.directionX = -1;
    else if (direction === "up") this.directionY = -1;
    else if (direction === "down") this.directionY = 1;
  }

  draw() {
    this.ctx.fillStyle = "#66D3FA";
    // fillRect(x, y, width, height)
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}
