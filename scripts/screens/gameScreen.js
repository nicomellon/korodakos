const buildGameScreen = () => {
  gameBoard.dataset.screen = "game-screen";

  const ringDiv = document.createElement("div");
  ringDiv.classList.add("ring-div");
  ringDiv.width = 700;
  ringDiv.height = 700;
  gameBoard.appendChild(ringDiv);

  const scoreDiv = document.createElement("div");
  scoreDiv.classList.add("score-div");
  ringDiv.appendChild(scoreDiv);

  const playerOneTitle = document.createElement("h2");
  playerOneTitle.classList.add("score-info");
  playerOneTitle.classList.add("text-center");
  playerOneTitle.innerText = `${playerInfo.playerOneName}`;
  scoreDiv.appendChild(playerOneTitle);

  const score = document.createElement("h2");
  score.classList.add("text-center");
  score.classList.add("score");
  score.innerText = "0 - 0";
  scoreDiv.appendChild(score);

  const playerTwoTitle = document.createElement("h2");
  playerTwoTitle.classList.add("score-info");
  playerTwoTitle.classList.add("text-center");
  playerTwoTitle.innerText = `${playerInfo.playerTwoName}`;
  scoreDiv.appendChild(playerTwoTitle);

  const canvas = document.createElement("canvas");
  canvas.id = "game-canvas";
  canvas.width = 700;
  canvas.height = 700;
  gameBoard.appendChild(canvas);

  const homeButton = document.createElement("button");
  homeButton.classList.add("home-btn");
  homeButton.classList.add("btn");
  homeButton.innerText = "Home";
  homeButton.addEventListener("click", switchScreens);
  gameBoard.appendChild(homeButton);

  if (window.game) console.error("BEFORE");
  if (window.game) delete window.game;
  if (window.game) console.error("AFTER");

  window.game = new Game(
    canvas,
    playerInfo.playerOneName,
    playerInfo.playerOneWeight,
    playerInfo.playerTwoName,
    playerInfo.playerTwoWeight
  );
  game.start();
};
