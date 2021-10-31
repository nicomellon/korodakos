class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.playerOne = null;
    this.playerTwo = null;
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

  drawPlayers() {
    // draw player one
    this.ctx.fillStyle = "#66D3FA";
    this.ctx.fillRect(
      this.playerOne.x,
      this.playerOne.y,
      this.playerOne.size,
      this.playerOne.size
    );

    // draw player two
    this.ctx.fillStyle = "#FFA500";
    this.ctx.fillRect(
      this.playerTwo.x,
      this.playerTwo.y,
      this.playerTwo.size,
      this.playerTwo.size
    );
  }

  collission(p1, p2) {
    console.log("collission");
  }

  checkCollission(p1, p2) {
    if (
      p1.x + p1.size >= p2.x &&
      p1.y + p1.size > p2.y &&
      p1.y < p2.y + p2.size &&
      p1.x <= p2.x + p2.size &&
      p1.y + p1.size > p2.y &&
      p1.y < p2.y + p2.size
    ) {
      this.collission();
    } else {
      return false;
    }
  }

  startLoop() {
    const loop = () => {
      // update state of players
      this.playerOne.update();
      this.playerTwo.update();

      // check for collission
      if (this.checkCollission(this.playerOne, this.playerTwo))
        this.collission(this.playerOne, this.playerTwo);

      // update the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawPlayers();

      // check for win
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
