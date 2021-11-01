// game-board div
const gameBoard = document.querySelector("#game-board");
const loadScreenBtn = document.querySelector("#load-screen");

let p1n = "Juan";
let p1w = 1;
let p2n = "Pedro";
let p2w = 1;

const loadScreen = () => {
  clearBoard();
  const gameState = gameBoard.dataset.screen;

  switch (gameState) {
    case "splash-screen":
      buildCharactersScreen();
      break;
    case "characters-screen":
      // loadScreenBtn.removeEventListener("mouseover");
      buildGameScreen(p1n, p1w, p2n, p2w);
      break;
    case "game-screen":
      buildHomeScreen();
      break;
    case "win-screen":
      console.log(gameState);
      buildHomeScreen();
      break;
  }
};

const clearBoard = () =>
  gameBoard.childNodes.forEach((child) => gameBoard.removeChild(child));

// First Screen => Splash Screen
const buildHomeScreen = () => {
  gameBoard.dataset.screen = "splash-screen";

  const startTitle = document.createElement("h1");
  startTitle.innerText = "Start Screen";
  gameBoard.appendChild(startTitle);
};

const buildCharactersScreen = () => {
  gameBoard.dataset.screen = "characters-screen";

  const characterDiv = document.createElement("div");
  characterDiv.classList.add("characters");
  gameBoard.appendChild(characterDiv);

  /* player one div */
  const playerOneDiv = document.createElement("div");
  playerOneDiv.classList.add("player-div");
  characterDiv.appendChild(playerOneDiv);

  const playerOneTitle = document.createElement("h2");
  playerOneTitle.innerText = "Player 1:";
  playerOneDiv.appendChild(playerOneTitle);

  // name
  const playerOneNameLabel = document.createElement("label");
  playerOneNameLabel.for = "player-one-name";
  playerOneNameLabel.innerText = "Name";
  playerOneDiv.appendChild(playerOneNameLabel);

  const playerOneName = document.createElement("input");
  playerOneName.type = "text";
  playerOneName.id = "player-one-name";
  playerOneName.placeholder = "player one";
  playerOneDiv.appendChild(playerOneName);

  // weight
  const playerOneWeightLabel = document.createElement("label");
  playerOneWeightLabel.for = "player-one-weight";
  playerOneWeightLabel.innerText = "Weight";
  playerOneDiv.appendChild(playerOneWeightLabel);

  const playerOneWeight = document.createElement("input");
  playerOneWeight.type = "range";
  playerOneWeight.id = "player-one-weight";
  playerOneWeight.name = "weight";
  playerOneWeight.min = 0.5;
  playerOneWeight.max = 1.5;
  playerOneWeight.step = 0.025;
  playerOneDiv.appendChild(playerOneWeight);

  /* player two div */
  const playerTwoDiv = document.createElement("div");
  playerTwoDiv.classList.add("player-div");
  characterDiv.appendChild(playerTwoDiv);

  const playerTwoTitle = document.createElement("h2");
  playerTwoTitle.innerText = "Player 2:";
  playerTwoDiv.appendChild(playerTwoTitle);

  // name
  const playerTwoNameLabel = document.createElement("label");
  playerTwoNameLabel.for = "player-two-name";
  playerTwoNameLabel.innerText = "Name";
  playerTwoDiv.appendChild(playerTwoNameLabel);

  const playerTwoName = document.createElement("input");
  playerTwoName.type = "text";
  playerTwoName.id = "player-two-name";
  playerTwoName.placeholder = "player two";
  playerTwoDiv.appendChild(playerTwoName);

  // weight
  const playerTwoWeightLabel = document.createElement("label");
  playerTwoWeightLabel.for = "player-two-weight";
  playerTwoWeightLabel.innerText = "Weight";
  playerTwoDiv.appendChild(playerTwoWeightLabel);

  const playerTwoWeight = document.createElement("input");
  playerTwoWeight.type = "range";
  playerTwoWeight.id = "player-two-weight";
  playerTwoWeight.name = "weight";
  playerTwoWeight.min = 0.5;
  playerTwoWeight.max = 1.5;
  playerTwoWeight.step = 0.025;
  playerTwoDiv.appendChild(playerTwoWeight);

  // event listener on button to update names & weights
  loadScreenBtn.addEventListener("mouseover", () => {
    p1n = playerOneName.value;
    p1w = playerOneWeight.valueAsNumber;
    p2n = playerTwoName.value;
    p2w = playerTwoWeight.valueAsNumber;
    console.log(p1n, p1w, p2n, p2w);
  });
};

// Second Screen => Game Screen
const buildGameScreen = (p1n, p1w, p2n, p2w) => {
  gameBoard.dataset.screen = "game-screen";
  const canvas = document.createElement("canvas");
  canvas.width = 700;
  canvas.height = 700;
  gameBoard.appendChild(canvas);

  const game = new Game(canvas, p1n, p1w, p2n, p2w);
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
buildHomeScreen();

/* event listeners */
loadScreenBtn.addEventListener("click", loadScreen);
