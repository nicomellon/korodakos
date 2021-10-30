class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.size = 40;
    this.y = canvas.height / 2;
    this.speedRight = 0;
    this.speedLeft = 0;
    this.speedDown = 0;
    this.speedUp = 0;
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.isMovingDown = false;
    this.isMovingUp = false;
    this.maxSpeed = 3;
    this.agility = 0.03;
  }

  //! need help refactoring
  calculateSpeed() {
    if (this.isMovingRight) {
      if (this.speedRight <= this.maxSpeed) this.speedRight += this.agility;
    } else if (this.speedRight > 0) this.speedRight -= this.agility;

    if (this.isMovingLeft) {
      if (this.speedLeft <= this.maxSpeed) this.speedLeft += this.agility;
    } else if (this.speedLeft > 0) this.speedLeft -= this.agility;

    if (this.isMovingDown) {
      if (this.speedDown <= this.maxSpeed) this.speedDown += this.agility;
    } else if (this.speedDown > 0) this.speedDown -= this.agility;

    if (this.isMovingUp) {
      if (this.speedUp <= this.maxSpeed) this.speedUp += this.agility;
    } else if (this.speedUp > 0) this.speedUp -= this.agility;
  }

  update() {
    this.x = this.x + this.speedRight - this.speedLeft;
    this.y = this.y + this.speedDown - this.speedUp;
  }

  /* draw() {
    // this.ctx.fillStyle = "#66D3FA";
    // fillRect(x, y, width, height)
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  } */
}

class PlayerOne extends Player {
  constructor(canvas) {
    super(canvas);
    this.x = canvas.width / 4;
  }
}

class PlayerTwo extends Player {
  constructor(canvas) {
    super(canvas);
    this.x = (canvas.width * 3) / 4;
  }
}
