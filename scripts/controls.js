//! Does not work currently
const handleKeyDown = (event) => {
  console.log(event.code);
  switch (event.code) {
    // player one controls
    case "KeyD":
      this.game.playerOne.direction.x = 1;
      break;
    case "KeyA":
      this.game.playerOne.direction.x = -1;
      break;
    case "KeyW":
      this.game.playerOne.direction.y = -1;
      break;
    case "KeyS":
      this.game.playerOne.direction.y = 1;
      break;
    // player two controls
    case "ArrowRight":
      this.game.playerTwo.direction.x = 1;
      break;
    case "ArrowLeft":
      this.game.playerTwo.direction.x = -1;
      break;
    case "ArrowUp":
      this.game.playerTwo.direction.y = -1;
      break;
    case "ArrowDown":
      this.game.playerTwo.direction.y = 1;
      break;
  }
};

const handleKeyUp = (event) => {
  switch (event.code) {
    // player one controls
    case "KeyD":
      this.game.playerOne.direction.x = 0;
      break;
    case "KeyA":
      this.game.playerOne.direction.x = 0;
      break;
    case "KeyW":
      this.game.playerOne.direction.y = 0;
      break;
    case "KeyS":
      this.game.playerOne.direction.y = 0;
      break;
    // player two controls
    case "ArrowRight":
      this.game.playerTwo.direction.x = 0;
      break;
    case "ArrowLeft":
      this.game.playerTwo.direction.x = 0;
      break;
    case "ArrowUp":
      this.game.playerTwo.direction.y = 0;
      break;
    case "ArrowDown":
      this.game.playerTwo.direction.y = 0;
      break;
  }
};
