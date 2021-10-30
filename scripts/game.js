class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.playerOne = null;
    this.playerWins = false;
  }

  start() {
    // Append canvas to the DOM, create a Player and start the Canvas loop
    // Save reference to canvas and Create ctx
    this.canvas = document.querySelector("canvas");
    this.ctx = canvas.getContext("2d");

    // Create a new player for the current game
    this.playerOne = new PlayerOne(this.canvas);
    this.playerTwo = new PlayerTwo(this.canvas);

    // Add event listener for moving the player
    this.handleKeyDown = (event) => {
      console.log(event.code);
      switch (event.code) {
        case "ArrowRight":
          this.playerTwo.isMovingRight = true;
          break;
        case "ArrowLeft":
          this.playerTwo.isMovingLeft = true;
          break;
        case "ArrowUp":
          this.playerTwo.isMovingUp = true;
          break;
        case "ArrowDown":
          this.playerTwo.isMovingDown = true;
          break;
        case "KeyD":
          this.playerOne.isMovingRight = true;
          break;
        case "KeyA":
          this.playerOne.isMovingLeft = true;
          break;
        case "KeyW":
          this.playerOne.isMovingUp = true;
          break;
        case "KeyS":
          this.playerOne.isMovingDown = true;
          break;
      }
    };

    this.handleKeyUp = (event) => {
      switch (event.code) {
        case "ArrowRight":
          this.playerTwo.isMovingRight = false;
          break;
        case "ArrowLeft":
          this.playerTwo.isMovingLeft = false;
          break;
        case "ArrowUp":
          this.playerTwo.isMovingUp = false;
          break;
        case "ArrowDown":
          this.playerTwo.isMovingDown = false;
          break;
        case "KeyD":
          this.playerOne.isMovingRight = false;
          break;
        case "KeyA":
          this.playerOne.isMovingLeft = false;
          break;
        case "KeyW":
          this.playerOne.isMovingUp = false;
          break;
        case "KeyS":
          this.playerOne.isMovingDown = false;
          break;
      }
    };
    // Any function provided to eventListener
    document.body.addEventListener("keydown", this.handleKeyDown);
    document.body.addEventListener("keyup", this.handleKeyUp);

    // Start the canvas requestAnimationFrame loop
    this.startLoop();
  }

  drawPlayers() {
    this.ctx.fillStyle = "#66D3FA";
    this.ctx.fillRect(
      this.playerOne.x,
      this.playerOne.y,
      this.playerOne.size,
      this.playerOne.size
    );

    this.ctx.fillStyle = "#FFA500";
    this.ctx.fillRect(
      this.playerTwo.x,
      this.playerTwo.y,
      this.playerTwo.size,
      this.playerTwo.size
    );
  }

  startLoop() {
    const loop = () => {
      // 1. UPDATE THE STATE OF PLAYERS
      this.playerOne.calculateSpeed();
      this.playerOne.update();
      this.playerTwo.calculateSpeed();
      this.playerTwo.update();

      // 2. CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 3. UPDATE THE CANVAS
      // Draw the players
      this.drawPlayers();

      // 4. TERMINATE LOOP IF GAME IS OVER
      if (!this.playerWins) {
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
