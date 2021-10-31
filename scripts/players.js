class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.size = 40;
    this.y = canvas.height / 2;
    this.velocity = { x: 0, y: 0 };
    this.acceleration = 0.05;
    this.direction = { x: 0, y: 0 };
    // this.keyDown = { right: false, left: false, down: false, up: false };
    this.maxSpeed = 3;
    this.friction = 0.02;
  }

  applyFriction() {
    let speed = Math.sqrt(
      this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y
    );
    const angle = Math.atan2(this.velocity.y, this.velocity.x);
    if (speed > this.friction) {
      speed -= this.friction;
    } else {
      speed = 0;
    }
    this.velocity.x = Math.cos(angle) * speed;
    this.velocity.y = Math.sin(angle) * speed;
  }

  update() {
    //update velocity
    this.velocity.x += this.acceleration * this.direction.x;
    this.velocity.y += this.acceleration * this.direction.y;

    this.applyFriction();

    console.log(this.velocity.x, this.velocity.y);

    //update position
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
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
