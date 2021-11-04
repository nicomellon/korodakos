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
    this.winner = "";
    this.playerOneName = playerOneName;
    this.playerOneMass = playerOneMass;
    this.playerTwoName = playerTwoName;
    this.playerTwoMass = playerTwoMass;
    this.requestId = null;
  }

  // create player objects
  start() {
    this.playerOne = new PlayerOne(
      this.canvas,
      this.playerOneName,
      this.playerOneMass
    );
    this.playerTwo = new PlayerTwo(
      this.canvas,
      this.playerTwoName,
      this.playerTwoMass
    );

    // Any function provided to eventListener
    document.body.addEventListener("keydown", this.playerOne.handleKeyDown);
    document.body.addEventListener("keyup", this.playerOne.handleKeyUp);
    document.body.addEventListener("keydown", this.playerTwo.handleKeyDown);
    document.body.addEventListener("keyup", this.playerTwo.handleKeyUp);

    // Start the canvas requestAnimationFrame loop
    this.startLoop();
  }

  enableMovement() {
    this.playerOne.canMove = true;
    this.playerTwo.canMove = true;
  }

  disableMovement() {
    this.playerOne.canMove = false;
    this.playerTwo.canMove = false;
  }

  switchSprites(playerOne, playerTwo) {
    // player one state
    if (playerOne.speed < 0.15) {
      playerOne.sprite.y = 0;
    } else {
      playerOne.sprite.y = playerOne.sprite.size * 6;
    }
    // player two state
    if (playerTwo.speed < 0.15) {
      playerTwo.sprite.y = 0;
    } else {
      playerTwo.sprite.y = playerTwo.sprite.size * 6;
    }
  }

  drawPlayers(player) {
    this.ctx.drawImage(
      player.sprite.img,
      player.sprite.x,
      player.sprite.y,
      player.sprite.size,
      player.sprite.size,
      player.x - 35,
      player.y - 35,
      70,
      70
    );
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

  updateScore() {
    const score = document.querySelector(".score");
    score.innerText = `${3 - this.playerTwo.lives} - ${
      3 - this.playerOne.lives
    }`;
  }

  resetPlayers() {
    this.playerOne.resetPos();
    this.playerTwo.resetPos();
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
        this.enableMovement();
      }
      countdown.innerText = secsLeft;
      secsLeft--;
    }, 1 * 1000);
  }

  startLoop() {
    this.countdown();

    const loop = () => {
      // update state of players
      this.playerOne.updatePos();
      this.playerTwo.updatePos();

      // check for collission
      this.checkCollision(
        this.getPlayerDistance(this.playerOne, this.playerTwo),
        this.playerOne.radius,
        this.playerTwo.radius
      );

      // update the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.switchSprites(this.playerOne, this.playerTwo);
      this.drawPlayers(this.playerOne);
      this.drawPlayers(this.playerTwo);

      // check falls
      if (this.playerOne.checkFall() || this.playerTwo.checkFall()) {
        this.resetPlayers();
        this.updateScore();
        this.disableMovement();
        setTimeout(() => {
          this.enableMovement();
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
