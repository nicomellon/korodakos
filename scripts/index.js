// game-board div
const gameBoard = document.querySelector("#game-board");
const loadScreenBtn = document.querySelector("#load-screen");

let requestId = null;

const sumoSize = 42;
const sumoOne = {
  img: null,
  x: 0,
  y: 0,
};
sumoOne.img = new Image();
sumoOne.img.src = "/assets/sumoOne.png";

const sumoTwo = {
  img: null,
  x: 0,
  y: 0,
};
sumoTwo.img = new Image();
sumoTwo.img.src = "/assets/sumoTwo.png";

const switchScreens = () => {
  clearBoard();
  const gameState = gameBoard.dataset.screen;

  switch (gameState) {
    case "splash-screen":
      buildCharactersScreen();
      break;
    case "characters-screen":
      window.cancelAnimationFrame(requestId);
      buildGameScreen();
      break;
    case "game-screen":
      buildHomeScreen();
      break;
    case "win-screen":
      buildHomeScreen();
      break;
  }
};

const clearBoard = () => {
  const childNodes = Array.from(gameBoard.childNodes);
  console.log(childNodes);
  childNodes.forEach((child) => child.remove());
};

// Third Screen => Game Over
const buildWinScreen = (winner) => {
  clearBoard();
  gameBoard.dataset.screen = "win-screen";

  const winnerTitle = document.createElement("h1");
  winnerTitle.innerText = `${winner} wins!`;
  gameBoard.appendChild(winnerTitle);
};

const buttonTemplate = document.querySelector("#button-template");

/* on script load*/
buildHomeScreen();
