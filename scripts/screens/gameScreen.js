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

  const scoreBoardInfo = document.createElement("h2");
  scoreBoardInfo.classList.add("score-info");
  scoreBoardInfo.classList.add("text-center");
  scoreBoardInfo.innerText = `${playerInfo.playerOneName} 0 - 0 ${playerInfo.playerTwoName}`;
  scoreDiv.appendChild(scoreBoardInfo);

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
  ringDiv.appendChild(homeButton);

  const game = new Game(
    canvas,
    playerInfo.playerOneName,
    playerInfo.playerOneWeight,
    playerInfo.playerTwoName,
    playerInfo.playerTwoWeight
  );
  game.start();
};
