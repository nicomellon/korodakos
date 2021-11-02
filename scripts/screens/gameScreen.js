const buildGameScreen = () => {
  gameBoard.dataset.screen = "game-screen";
  const canvas = document.createElement("canvas");
  canvas.id = "game-canvas";
  canvas.width = 700;
  canvas.height = 700;
  gameBoard.appendChild(canvas);

  const game = new Game(canvas);
  game.start();
};
