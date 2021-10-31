class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.players = [];
    this.playerFalls = false;
  }

  start() {
    // Append canvas to the DOM, create a Player and start the Canvas loop
    // Save reference to canvas and Create ctx
    this.canvas = document.querySelector("canvas");
    this.ctx = canvas.getContext("2d");

    // create players
    this.playerOne = new Player(
      this.canvas,
      this.canvas.width / 4,
      25,
      "#66D3FA",
      "p1"
    );
    this.playerTwo = new Player(
      this.canvas,
      (this.canvas.width * 3) / 4,
      25,
      "#FFA500",
      "p2"
    );

    // Add event listener for moving the player
    this.handleKeyDown = (event) => {
      switch (event.code) {
        // player one controls
        case "KeyD":
          this.playerOne.direction.x = 1;
          break;
        case "KeyA":
          this.playerOne.direction.x = -1;
          break;
        case "KeyW":
          this.playerOne.direction.y = -1;
          break;
        case "KeyS":
          this.playerOne.direction.y = 1;
          break;
        // player two controls
        case "ArrowRight":
          this.playerTwo.direction.x = 1;
          break;
        case "ArrowLeft":
          this.playerTwo.direction.x = -1;
          break;
        case "ArrowUp":
          this.playerTwo.direction.y = -1;
          break;
        case "ArrowDown":
          this.playerTwo.direction.y = 1;
          break;
      }
    };

    this.handleKeyUp = (event) => {
      switch (event.code) {
        // player one controls
        case "KeyD":
          this.playerOne.direction.x = 0;
          break;
        case "KeyA":
          this.playerOne.direction.x = 0;
          break;
        case "KeyW":
          this.playerOne.direction.y = 0;
          break;
        case "KeyS":
          this.playerOne.direction.y = 0;
          break;
        // player two controls
        case "ArrowRight":
          this.playerTwo.direction.x = 0;
          break;
        case "ArrowLeft":
          this.playerTwo.direction.x = 0;
          break;
        case "ArrowUp":
          this.playerTwo.direction.y = 0;
          break;
        case "ArrowDown":
          this.playerTwo.direction.y = 0;
          break;
      }
    };
    // Any function provided to eventListener
    document.body.addEventListener("keydown", this.handleKeyDown);
    document.body.addEventListener("keyup", this.handleKeyUp);

    // Start the canvas requestAnimationFrame loop
    this.startLoop();
  }

  drawRing(width) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "black";
    //! HARD CODED RADIUS
    this.ctx.arc(width / 2, width / 2, width / 2 - 50, 0, Math.PI * 2, false);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawPlayers() {
    this.playerOne.draw();
    this.playerTwo.draw();
  }

  drawPlayerInfo() {
    // player one
    this.ctx.textAlign = "left";
    this.ctx.fillText(`${this.playerOne.name}`, 10, 10);
    this.ctx.fillText(`speed: ${this.playerOne.speed.toFixed(2)}`, 10, 20);
    this.ctx.fillText(
      `distance: ${this.playerOne.distanceFromCenter().toFixed(0)}`,
      10,
      30
    );
    this.ctx.fillText(`mass: ${this.playerOne.mass}`, 10, 40);
    this.ctx.fillText(`acceleration: ${this.playerOne.acceleration}`, 10, 50);
    // player two
    this.ctx.textAlign = "right";
    this.ctx.fillText(`${this.playerTwo.name}`, 690, 10);
    this.ctx.fillText(`speed: ${this.playerTwo.speed.toFixed(2)}`, 690, 20);
    this.ctx.fillText(
      `distance: ${this.playerTwo.distanceFromCenter().toFixed(0)}`,
      690,
      30
    );
    this.ctx.fillText(`mass: ${this.playerTwo.mass}`, 690, 40);
    this.ctx.fillText(`acceleration: ${this.playerTwo.acceleration}`, 690, 50);
    // player distance
    this.ctx.textAlign = "left";
    this.ctx.fillText(
      `player distance : ${this.getPlayerDistance(
        this.playerOne,
        this.playerTwo
      ).toFixed(0)}`,
      10,
      80
    );
  }

  collision(obj1, obj2, distance) {
    let vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };

    let vCollisionNorm = {
      x: vCollision.x / distance,
      y: vCollision.y / distance,
    };

    let vRelativeVelocity = { x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy };
    let speed =
      vRelativeVelocity.x * vCollisionNorm.x +
      vRelativeVelocity.y * vCollisionNorm.y;

    /* if (speed < 0){
      break;
    } */

    let impulse = (2 * speed) / (obj1.mass + obj2.mass);
    obj1.vx -= impulse * obj2.mass * vCollisionNorm.x;
    obj1.vy -= impulse * obj2.mass * vCollisionNorm.y;
    obj2.vx += impulse * obj1.mass * vCollisionNorm.x;
    obj2.vy += impulse * obj1.mass * vCollisionNorm.y;
  }

  checkCollision(distance, radiusOne, radiusTwo) {
    if (distance <= radiusOne + radiusTwo) {
      console.log("collission");
      this.collision(this.playerOne, this.playerTwo, distance);
    }
  }

  // TODO refactor and make general calcDistance function
  getPlayerDistance(obj1, obj2) {
    return Math.hypot(obj2.x - obj1.x, obj2.y - obj1.y);
  }

  checkFall() {
    //! HARD CODED DISTANCE
    if (
      this.playerOne.distanceFromCenter() > 300 ||
      this.playerTwo.distanceFromCenter() > 300
    )
      this.playerFalls = true;
  }

  startLoop() {
    const loop = () => {
      // update state of players
      this.playerOne.update();
      this.playerTwo.update();

      // check for collission
      this.checkCollision(
        this.getPlayerDistance(this.playerOne, this.playerTwo),
        this.playerOne.radius,
        this.playerTwo.radius
      );
      // if (this.checkCollission(this.playerOne, this.playerTwo))
      //   this.collission(this.playerOne, this.playerTwo);

      // update the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawRing(this.canvas.width);
      this.drawPlayers();
      this.drawPlayerInfo();

      // check for win
      this.checkFall();
      if (!this.playerFalls) {
        window.requestAnimationFrame(loop);
      } else {
        buildGameOver();
      }
    };

    // As loop function will be continuously invoked by
    // the `window` object- `window.requestAnimationFrame(loop)`
    // we need to `start an infinitive loop` till the game is over
    window.requestAnimationFrame(loop);
  }
}
