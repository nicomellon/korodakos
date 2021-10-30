class Sumo {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvasHeight = canvas.height;
    this.size = 50;
    this.x = 50;
    this.y = canvas.height / 2;
    this.isMoving = false;
    this.speed = 1;
    this.direction = 0;
  }

  update() {
    if (this.isMoving) this.x = this.x + this.direction * this.speed;
  }

  setDirection(direction) {
    // +1 down  -1 up
    if (direction === "right") this.direction = 1;
    else if (direction === "left") this.direction = -1;
  }

  draw() {
    this.ctx.fillStyle = "#66D3FA";
    // fillRect(x, y, width, height)
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}
