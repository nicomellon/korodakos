// game-board div
const gameBoard = document.querySelector("#game-board");
const loadScreenBtn = document.querySelector("#load-screen");

let p1n = "Juan";
let p1w = 1;
let p2n = "Pedro";
let p2w = 1;

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

  // canvas animation
  const playerOneCanvas = document.createElement("canvas");
  playerOneCanvas.width = 250;
  playerOneCanvas.height = 250;
  playerOneCanvas.id = "player-one-canvas";
  playerOneDiv.appendChild(playerOneCanvas);

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

  // canvas animation
  const playerTwoCanvas = document.createElement("canvas");
  playerTwoCanvas.width = 250;
  playerTwoCanvas.height = 250;
  playerTwoCanvas.id = "player-two-canvas";
  playerTwoDiv.appendChild(playerTwoCanvas);

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

  // animation loop
  const ctxOne = playerOneCanvas.getContext("2d");
  // ctxOne.drawImage(sumoOne.img, 495, 0, 45, 45, 0, 0, 250, 250);
  const ctxTwo = playerTwoCanvas.getContext("2d");
  // ctxTwo.drawImage(sumoTwo, 0, 0, 45, 45, 0, 0, 250, 250);

  const drawSumoOne = () => {
    ctxOne.clearRect(0, 0, 250, 250);
    sumoOne.x -= sumoSize;
    ctxOne.drawImage(
      sumoOne.img,
      sumoOne.x,
      sumoOne.y,
      sumoSize,
      sumoSize,
      0,
      0,
      250,
      250
    );
  };

  const resetSumoOne = () => {
    sumoOne.x = sumoSize * 13;
    sumoOne.y = sumoSize * 2;
  };

  const drawSumoTwo = () => {
    ctxTwo.clearRect(0, 0, 250, 250);
    sumoTwo.x += sumoSize;
    ctxTwo.drawImage(
      sumoTwo.img,
      sumoTwo.x,
      sumoTwo.y,
      sumoSize,
      sumoSize,
      0,
      0,
      250,
      250
    );
  };

  const resetSumoTwo = () => {
    sumoTwo.x = 0;
    sumoTwo.y = sumoSize * 3;
    console.log("reset me!");
  };

  let frameCount = 0;
  let currentFrame = 1;
  const totalFrames = 25;

  const animateSumos = () => {
    if (frameCount === 4) {
      frameCount = 0;

      if (currentFrame === totalFrames) {
        resetSumoOne();
        resetSumoTwo();
        currentFrame = 1;
      } else if (currentFrame === 13) {
        sumoOne.x = sumoSize * 13;
        sumoOne.y = sumoSize * 3;
        sumoTwo.x = 0;
        sumoTwo.y = sumoSize * 2;
      }
      drawSumoOne();
      drawSumoTwo();

      console.log(currentFrame, sumoTwo.x, sumoTwo.y);
      currentFrame++;
    }
    window.requestAnimationFrame(animateSumos);
    frameCount++;
  };
  resetSumoOne();
  resetSumoTwo();
  window.requestAnimationFrame(animateSumos);
  frameCount++;
};

// Second Screen => Game Screen
const buildGameScreen = (p1n, p1w, p2n, p2w) => {
  gameBoard.dataset.screen = "game-screen";
  const canvas = document.createElement("canvas");
  canvas.id = "game-canvas";
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
