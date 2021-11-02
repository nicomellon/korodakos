const buildGameScreen = () => {
  gameBoard.dataset.screen = "game-screen";

  const ring = document.createElement("div");
  ring.classList.add("ring");
  gameBoard.appendChild(ring);

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

  const game = new Game(
    canvas,
    playerInfo.playerOneName,
    playerInfo.playerOneWeight,
    playerInfo.playerTwoName,
    playerInfo.playerTwoWeight
  );
  game.start();
};
