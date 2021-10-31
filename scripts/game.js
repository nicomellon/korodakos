class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.playerDies = false;
  }

  start() {
    // Append canvas to the DOM, create a Player and start the Canvas loop
    // Save reference to canvas and Create ctx
    this.canvas = document.querySelector("canvas");
    this.ctx = canvas.getContext("2d");

    // player start positions
    this.startPosOne = this.canvas.width / 4;
    this.startPosTwo = (this.canvas.width * 3) / 4;

    // create players
    this.playerOne = new Player(
      this.canvas,
      this.startPosOne,
      25,
      "#66D3FA",
      "p1"
    );
    this.playerTwo = new Player(
      this.canvas,
      this.startPosTwo,
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
    this.ctx.fillText(`mass: ${this.playerOne.mass.toFixed(2)}`, 10, 40);
    this.ctx.fillText(
      `acceleration: ${this.playerOne.acceleration.toFixed(2)}`,
      10,
      50
    );
    this.ctx.fillText(`lives: ${this.playerOne.lives}`, 10, 690);
    // player two
    this.ctx.textAlign = "right";
    this.ctx.fillText(`${this.playerTwo.name}`, 690, 10);
    this.ctx.fillText(`speed: ${this.playerTwo.speed.toFixed(2)}`, 690, 20);
    this.ctx.fillText(
      `distance: ${this.playerTwo.distanceFromCenter().toFixed(0)}`,
      690,
      30
    );
    this.ctx.fillText(`mass: ${this.playerTwo.mass.toFixed(2)}`, 690, 40);
    this.ctx.fillText(
      `acceleration: ${this.playerTwo.acceleration.toFixed(2)}`,
      690,
      50
    );
    this.ctx.fillText(`lives: ${this.playerTwo.lives}`, 690, 690);
  }

  collision(obj1, obj2, distance) {
    const vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };

    const vCollisionNorm = {
      x: vCollision.x / distance,
      y: vCollision.y / distance,
    };

    const vRelativeVelocity = { x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy };
    const speed =
      vRelativeVelocity.x * vCollisionNorm.x +
      vRelativeVelocity.y * vCollisionNorm.y;

    /* if (speed < 0){
      break;
    } */

    const impulse = (2 * speed) / (obj1.mass + obj2.mass);
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

  checkWin() {
    if (this.playerOne.lives <= 0) this.playerDies = true;
  }

  resetPlayers() {
    this.playerOne.x = this.startPosOne;
    this.playerOne.y = this.canvas.height / 2;
    this.playerOne.vx = 0;
    this.playerOne.vy = 0;

    this.playerTwo.x = this.startPosTwo;
    this.playerTwo.y = this.canvas.height / 2;
    this.playerTwo.vx = 0;
    this.playerTwo.vy = 0;
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

      // check falls
      if (this.playerOne.checkFall()) {
        this.playerOne.lives--;
        this.resetPlayers();
      } else if (this.playerTwo.checkFall()) {
        this.playerTwo.lives--;
        this.resetPlayers();
      }

      // check for win
      this.checkWin();
      if (!this.playerDies) {
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
