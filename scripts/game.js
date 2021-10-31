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
    this.ctx.arc(width / 2, width / 2, width / 2, 0, Math.PI * 2, false);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawPlayers() {
    this.playerOne.draw();
    this.playerTwo.draw();
  }

  // collission(p1, p2) {console.log("collission");}

  // checkCollission(p1, p2) {}

  startLoop() {
    const loop = () => {
      // update state of players
      this.playerOne.update();
      this.playerTwo.update();

      // check for collission
      // if (this.checkCollission(this.playerOne, this.playerTwo))
      //   this.collission(this.playerOne, this.playerTwo);

      // update the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawRing(this.canvas.width);
      this.drawPlayers();

      // check for win
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
