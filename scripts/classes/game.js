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
    this.players = [];
    this.playerOneName = playerOneName;
    this.playerOneMass = playerOneMass;
    this.playerTwoName = playerTwoName;
    this.playerTwoMass = playerTwoMass;
    this.requestId = null;
  }

  enableMovement() {
    this.players.forEach((player) => (player.canMove = true));
  }

  disableMovement(player) {
    this.players.forEach((player) => (player.canMove = false));
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

  drawPlayers() {
    this.players.forEach((player) => {
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
    });
  }

  getPlayerDistance(playerOne, playerTwo) {
    return Math.hypot(playerTwo.x - playerOne.x, playerTwo.y - playerOne.y);
  }

  checkCollision(distance, radiusOne, radiusTwo) {
    if (distance <= radiusOne + radiusTwo) {
      this.collision(this.playerOne, this.playerTwo, distance);
    }
  }

  collision(playerOne, playerTwo, distance) {
    const vCollision = {
      x: playerTwo.x - playerOne.x,
      y: playerTwo.y - playerOne.y,
    };

    const vCollisionNorm = {
      x: vCollision.x / distance,
      y: vCollision.y / distance,
    };

    const vRelativeVelocity = {
      x: playerOne.vx - playerTwo.vx,
      y: playerOne.vy - playerTwo.vy,
    };
    const speed =
      vRelativeVelocity.x * vCollisionNorm.x +
      vRelativeVelocity.y * vCollisionNorm.y;

    const impulse = (2 * speed) / (playerOne.mass + playerTwo.mass);
    playerOne.vx -= impulse * playerTwo.mass * vCollisionNorm.x;
    playerOne.vy -= impulse * playerTwo.mass * vCollisionNorm.y;
    playerTwo.vx += impulse * playerOne.mass * vCollisionNorm.x;
    playerTwo.vy += impulse * playerOne.mass * vCollisionNorm.y;
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
    this.players.forEach((player) => player.resetPos());
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

  showFightMsg() {
    const fightMsg = document.createElement("h1");
    fightMsg.classList.add("text-center");
    fightMsg.classList.add("countdown");
    fightMsg.innerText = "FIGHT!";
    gameBoard.appendChild(fightMsg);
    setTimeout(() => fightMsg.remove(), 1 * 1000);
  }

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

    this.players.push(this.playerOne, this.playerTwo);

    this.playerOne.easterEgg();
    this.playerTwo.easterEgg();

    // add eventListeners to control players
    document.body.addEventListener("keydown", this.playerOne.handleKeyDown);
    document.body.addEventListener("keyup", this.playerOne.handleKeyUp);
    document.body.addEventListener("keydown", this.playerTwo.handleKeyDown);
    document.body.addEventListener("keyup", this.playerTwo.handleKeyUp);

    // Start the canvas requestAnimationFrame loop
    this.startLoop();
  }
  startLoop() {
    this.countdown();

    const loop = () => {
      // update state of players
      this.players.forEach((player) => player.updatePos());

      // check for collission
      this.checkCollision(
        this.getPlayerDistance(this.playerOne, this.playerTwo),
        this.playerOne.radius,
        this.playerTwo.radius
      );

      // update the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.switchSprites(this.playerOne, this.playerTwo);
      this.drawPlayers();

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
