// game-board div
const gameBoard = document.querySelector("#game-board");
const loadScreenBtn = document.querySelector("#load-screen");

const loadScreen = () => {
  clearBoard();
  const gameState = gameBoard.dataset.screen;

  switch (gameState) {
    case "splash-screen":
      buildGameScreen();
      break;
    case "game-screen":
      buildSplashScreen();
      break;
    case "win-screen":
      console.log(gameState);
      buildSplashScreen();
      break;
  }
};

const clearBoard = () =>
  gameBoard.childNodes.forEach((child) => gameBoard.removeChild(child));

// First Screen => Splash Screen
const buildSplashScreen = () => {
  gameBoard.dataset.screen = "splash-screen";

  const startTitle = document.createElement("h1");
  startTitle.innerText = "Start Screen";
  gameBoard.appendChild(startTitle);
};

// Second Screen => Game Screen
const buildGameScreen = () => {
  gameBoard.dataset.screen = "game-screen";
  const canvas = document.createElement("canvas");
  canvas.width = 700;
  canvas.height = 700;
  gameBoard.appendChild(canvas);

  const game = new Game(canvas);
  window.game = game;
  game.start();
};

// Third Screen => Game Over
const buildWinScreen = (winner) => {
  clearBoard();
  gameBoard.dataset.screen = "win-screen";

  const winnerTitle = document.createElement("h1");
  winnerTitle.innerText = `${winner} wins!`;
  gameBoard.appendChild(winnerTitle);
};

/* on script load*/
buildSplashScreen();

/* event listeners */
loadScreenBtn.addEventListener("click", loadScreen);
