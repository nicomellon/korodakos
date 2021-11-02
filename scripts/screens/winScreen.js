const buildWinScreen = (winner) => {
  gameBoard.dataset.screen = "win-screen";

  const winnerDiv = document.createElement("div");
  winnerDiv.classList.add("winner-div");
  gameBoard.appendChild(winnerDiv);

  const winnerTitle = document.createElement("h1");
  winnerTitle.classList.add("winner");
  winnerTitle.innerText = `${winner} wins!`;
  winnerDiv.appendChild(winnerTitle);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 700;
  canvas.height = 250;
  winnerDiv.appendChild(canvas);

  const restartBtn = document.createElement("button");
  restartBtn.classList.add("btn");
  restartBtn.classList.add("restart-btn");
  restartBtn.classList.add("hidden");
  restartBtn.innerText = "Play Again";
  restartBtn.addEventListener("click", () => {
    window.cancelAnimationFrame(requestId);
    switchScreens();
  });
  winnerDiv.appendChild(restartBtn);

  setTimeout(() => restartBtn.classList.remove("hidden"), 3 * 1000);

  // canvas animation
  let frameCount = 0;
  let currentFrame = 1;
  const totalFrames = 8;

  // if player one wins
  const animateWinnerOne = () => {
    if (frameCount === 6) {
      ctx.clearRect(0, 0, 700, 250);
      drawSumo(ctx, sumoOne, 150, 0, 250, 250);
      drawSumo(ctx, sumoTwo, 475, 0, 150, 150);

      frameCount = 0;
    }

    // reset sprite
    if (currentFrame > totalFrames) {
      resetSumo(sumoOne, sumoSize * 12, sumoSize * 8);

      resetSumo(sumoTwo, 0, sumoSize * 10);

      currentFrame = 1;
    }

    // update values for next frame
    sumoOne.x -= sumoSize;
    sumoTwo.x += sumoSize;
    currentFrame++;
    frameCount++;
    requestId = window.requestAnimationFrame(animateWinnerOne);
  };

  // if player two wins
  const animateWinnerTwo = () => {
    if (frameCount === 6) {
      ctx.clearRect(0, 0, 700, 250);
      drawSumo(ctx, sumoOne, 75, 0, 150, 150);
      drawSumo(ctx, sumoTwo, 300, 0, 250, 250);

      frameCount = 0;
    }

    // reset sprite
    if (currentFrame > totalFrames) {
      resetSumo(sumoOne, sumoSize * 12, sumoSize * 10);
      resetSumo(sumoTwo, 0, sumoSize * 8);
      currentFrame = 1;
    }

    // update values for next frame
    sumoOne.x -= sumoSize;
    sumoTwo.x += sumoSize;
    currentFrame++;
    frameCount++;
    requestId = window.requestAnimationFrame(animateWinnerTwo);
  };

  if (winner === playerInfo.playerOneName) {
    resetSumo(sumoOne, sumoSize * 12, sumoSize * 8);
    resetSumo(sumoTwo, 0, sumoSize * 10);
    requestId = window.requestAnimationFrame(animateWinnerOne);
  } else {
    resetSumo(sumoOne, sumoSize * 12, sumoSize * 10);
    resetSumo(sumoTwo, 0, sumoSize * 8);
    requestId = window.requestAnimationFrame(animateWinnerTwo);
  }
};
