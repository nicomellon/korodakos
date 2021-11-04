class Player {
  constructor(canvas, name, mass) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.name = name;
    this.radius = 25;
    this.y = canvas.height / 2;
    this.vx = 0;
    this.vy = 0;
    this.mass = mass;
    this.acceleration = 0.15 / this.mass;
    this.direction = { x: 0, y: 0 };
    this.speed = 0;
    this.angle = 0;
    this.friction = 0.05;
    this.lives = 3;
    this.canMove = false;
    this.sprite = {
      img: new Image(),
      x: 0,
      y: 0,
      size: 41.76,
    };
  }

  // controls
  handleKeyDown = (event) => {
    if (this.canMove === true) {
      switch (event.code) {
        case this.controls.up:
          this.direction.y = -1;
          break;
        case this.controls.right:
          this.direction.x = 1;
          break;
        case this.controls.down:
          this.direction.y = 1;
          break;
        case this.controls.left:
          this.direction.x = -1;
          break;
      }
    }
  };

  handleKeyUp = (event) => {
    if (this.canMove === true) {
      switch (event.code) {
        case this.controls.up:
        case this.controls.down:
          this.direction.y = 0;
          break;
        case this.controls.right:
        case this.controls.left:
          this.direction.x = 0;
          break;
      }
    }
  };

  resetPos() {
    this.x = this.xStart;
    this.y = this.canvas.height / 2;
    this.vx = 0;
    this.vy = 0;
    this.direction.x = 0;
    this.direction.y = 0;
  }

  checkFall() {
    //! hard coded distance
    if (this.distanceFromCenter() >= 265) {
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

  updatePos() {
    //update velocity
    this.vx += this.acceleration * this.direction.x;
    this.vy += this.acceleration * this.direction.y;
    this.speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);

    // Calculate the angle for adding images later
    this.angle = Math.atan2(this.vy, this.vx);

    // apply friction
    if (this.speed > this.friction) {
      this.speed -= this.friction;
    }
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;

    //update position
    this.x += this.vx;
    this.y += this.vy;
  }
}

/* player one */
class PlayerOne extends Player {
  constructor(canvas, name, mass) {
    super(canvas, name, mass);
    this.xStart = (this.canvas.width * 3) / 8;
    this.x = this.xStart;
    this.controls = { up: "KeyW", right: "KeyD", down: "KeyS", left: "KeyA" };
    this.sprite.img.src = "assets/sumoOne.png";
    this.sprite.x = this.sprite.size * 12;
  }
}

/* player two */
class PlayerTwo extends Player {
  constructor(canvas, name, mass) {
    super(canvas, name, mass);
    this.xStart = (this.canvas.width * 5) / 8;
    this.x = this.xStart;
    this.controls = {
      up: "ArrowUp",
      right: "ArrowRight",
      down: "ArrowDown",
      left: "ArrowLeft",
    };
    this.sprite.img.src = "assets/sumoTwo.png";
  }
}
