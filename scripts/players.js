class Player {
  constructor(canvas, x, radius, color, name) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.name = name;
    this.radius = radius;
    this.color = color;
    this.x = x;
    this.y = canvas.height / 2;
    this.vx = 0;
    this.vy = 0;
    this.mass = Math.random() * (1.5 - 0.5) + 0.5;
    this.acceleration = 0.15 / this.mass;
    this.direction = { x: 0, y: 0 };
    this.speed = 0;
    this.angle = { radians: 0, degrees: 0 };
    this.friction = 0.05;
    this.lives = 3;
  }

  draw() {
    // draw player circle
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = this.color;
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.stroke();
    this.ctx.closePath();
    // draw player name
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(this.name, this.x, this.y);
    // Draw heading vector
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "black";
    // this.ctx.arc(this.x, this.y, Math.abs(this.vx * 10));
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + this.vx * 10, this.y + this.vy * 10);
    this.ctx.stroke();

    this.ctx.closePath();
  }

  checkFall() {
    //! hard coded distance
    if (this.distanceFromCenter() >= 300) {
      this.lives--;
      return true;
    } else return false;
  }

  // TODO refactor and make general calcDistance function
  distanceFromCenter() {
    return Math.hypot(
      this.canvas.width / 2 - this.x,
      this.canvas.width / 2 - this.y
    );
  }

  applyFriction(speed, angle, friction) {
    if (speed > friction) {
      speed -= friction;
    } /* else { 
      speed = 0;
    } */
    // code above was making collisions boring, completely stopping players
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
  }

  update() {
    //update velocity
    this.vx += this.acceleration * this.direction.x;
    this.vy += this.acceleration * this.direction.y;

    this.speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);

    // Calculate the angle for adding images later
    this.angle.radians = Math.atan2(this.vy, this.vx);
    this.angle.degrees = (180 * this.angle.radians) / Math.PI;

    // apply friction
    this.applyFriction(this.speed, this.angle.radians, this.friction);

    //update position
    this.x += this.vx;
    this.y += this.vy;
  }
}
