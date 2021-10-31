class Player {
  constructor(canvas, xPos, radius, color, name) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.name = name;
    this.radius = radius;
    this.color = color;
    this.pos = { x: xPos, y: canvas.height / 2 };
    this.velocity = { x: 0, y: 0 };
    this.acceleration = 0.05;
    this.direction = { x: 0, y: 0 };
    this.friction = 0.02;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillText(this.name, this.pos.x, this.pos.y);
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = this.color;
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.stroke();
    this.ctx.closePath();
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

    // console.log(this.velocity.x, this.velocity.y);

    //update position
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;

    console.log(this.pos);
  }
}
