class Game {
  constructor(
    canvas,
    playerOneName = "player one",
    playerOneMass = 1,
    playerTwoName = "player two",
    playerTwoMass = 1
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.playerDies = false;
    this.controls = false;
    this.winner = "";
    this.playerOneName = playerOneName;
    this.playerOneMass = playerOneMass;
    this.playerTwoName = playerTwoName;
    this.playerTwoMass = playerTwoMass;
    this.requestId = null;
    this.startPosOne = (this.canvas.width * 3) / 8;
    this.startPosTwo = (this.canvas.width * 5) / 8;
  }

  start() {
    // player start positions

    // create players
    this.playerOne = new Player(
      this.canvas,
      this.startPosOne,
      25,
      "#66D3FA",
      this.playerOneName,
      this.playerOneMass
    );
    this.playerTwo = new Player(
      this.canvas,
      this.startPosTwo,
      25,
      "#FFA500",
      this.playerTwoName,
      this.playerTwoMass
    );

    // Add event listener for moving the player
    const handleKeyDown = (event) => {
      if (this.controls === true) {
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
      }
    };

    const handleKeyUp = (event) => {
      if (this.controls === true) {
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
      }
    };
    // Any function provided to eventListener
    document.body.addEventListener("keydown", handleKeyDown);
    document.body.addEventListener("keyup", handleKeyUp);

    // Start the canvas requestAnimationFrame loop
    this.startLoop();
  }

  enableControls() {
    this.controls = true;
  }

  disableControls() {
    this.controls = false;
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
    this.ctx.fillText(`controls: ${this.controls}`, 10, 80);
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

  checkLives() {
    if (this.playerOne.lives <= 0) {
      this.winner = this.playerTwo.name;
      return true;
    } else if (this.playerTwo.lives <= 0) {
      this.winner = this.playerOne.name;
      return true;
    }
    return false;
  }

  resetPlayers() {
    // reset player one
    this.playerOne.x = this.startPosOne;
    this.playerOne.y = this.canvas.height / 2;
    this.playerOne.vx = 0;
    this.playerOne.vy = 0;
    this.playerOne.direction.x = 0;
    this.playerOne.direction.y = 0;

    // reset player two
    this.playerTwo.x = this.startPosTwo;
    this.playerTwo.y = this.canvas.height / 2;
    this.playerTwo.vx = 0;
    this.playerTwo.vy = 0;
    this.playerTwo.direction.x = 0;
    this.playerTwo.direction.y = 0;
  }

  showFightMsg() {
    const fightMsg = document.createElement("h1");
    fightMsg.classList.add("text-center");
    fightMsg.classList.add("countdown");

    fightMsg.innerText = "FIGHT!";
    gameBoard.appendChild(fightMsg);

    setTimeout(() => fightMsg.remove(), 1 * 1000);
  }

  countdown() {
    let secsLeft = 3;

    const countdown = document.createElement("h1");
    countdown.classList.add("text-center");
    countdown.classList.add("countdown");
    countdown.innerText = "";
    gameBoard.appendChild(countdown);

    const intervalID = setInterval(() => {
      if (secsLeft === 0) {
        countdown.remove();
        clearInterval(intervalID);
        this.showFightMsg();
        this.enableControls();
      }
      countdown.innerText = secsLeft;
      secsLeft--;
    }, 1 * 1000);
  }

  startLoop() {
    this.countdown();

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

      // update the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawPlayers();
      this.drawPlayerInfo();

      // check falls
      if (this.playerOne.checkFall() || this.playerTwo.checkFall()) {
        this.resetPlayers();
        this.disableControls();
        setTimeout(() => {
          this.enableControls();
        }, 0.25 * 1000);
      }

      // check for win
      if (this.checkLives() === true) {
        window.cancelAnimationFrame(this.requestId);
        clearBoard();
        buildWinScreen(this.winner);
      } else this.requestId = window.requestAnimationFrame(loop);
    };

    this.requestId = window.requestAnimationFrame(loop);
  }
}
