class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.player = null;
    this.playerWins = false;
  }

  start() {
    // Append canvas to the DOM, create a Player and start the Canvas loop
    // Save reference to canvas and Create ctx
    this.canvas = document.querySelector("canvas");
    this.ctx = canvas.getContext("2d");

    // Create a new player for the current game
    this.player = new Sumo(this.canvas);

    //! MOMVEMENT Add event listener for moving the player
    this.handleKeyDown = (event) => {
      if (event.code === "ArrowRight") {
        this.player.isMoving = true;
        this.player.setDirection("right");
      } else if (event.code === "ArrowLeft") {
        this.player.isMoving = true;
        this.player.setDirection("left");
      } else console.log(event.code);
    };

    this.handleKeyUp = (event) => {
      if (event.code === "ArrowRight") {
        this.player.isMoving = false;
      } else if (event.code === "ArrowLeft") {
        this.player.isMoving = false;
      } else console.log(event.code);
    };
    // Any function provided to eventListener
    document.body.addEventListener("keydown", this.handleKeyDown);
    document.body.addEventListener("keyup", this.handleKeyUp);

    // Start the canvas requestAnimationFrame loop
    this.startLoop();
  }

  startLoop() {
    const loop = () => {
      // 1. UPDATE THE STATE OF PLAYER AND WE MOVE THE OBSTACLES
      this.player.update();

      // 2. CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 3. UPDATE THE CANVAS
      // Draw the player
      this.player.draw();

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
