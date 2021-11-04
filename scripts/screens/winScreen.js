const buildWinScreenHtml = (winner) => {
  const winnerDiv = document.createElement("div");
  winnerDiv.classList.add("winner-div");
  gameBoard.appendChild(winnerDiv);

  const winnerDivUp = document.createElement("div");
  winnerDivUp.classList.add("winner-div-up");
  winnerDivUp.classList.add("flex");
  winnerDiv.appendChild(winnerDivUp);

  const winnerTitle = document.createElement("h1");
  winnerTitle.classList.add("winner");
  winnerTitle.innerText = `${winner} wins!`;
  winnerDivUp.appendChild(winnerTitle);

  const canvas = document.createElement("canvas");
  canvas.width = 700;
  canvas.height = 250;
  winnerDiv.appendChild(canvas);

  // div bottom
  const winnerDivBot = document.createElement("div");
  winnerDivBot.classList.add("winner-div-bot");
  winnerDivBot.classList.add("flex");
  winnerDiv.appendChild(winnerDivBot);

  const rematchBtn = document.createElement("button");
  rematchBtn.classList.add("btn");
  rematchBtn.classList.add("rematch-btn");
  rematchBtn.classList.add("hidden");
  rematchBtn.innerText = "Rematch";
  rematchBtn.addEventListener("click", () => {
    window.cancelAnimationFrame(requestId);
    gameBoard.dataset.screen = "characters-screen";

    switchScreens();
  });
  winnerDivBot.appendChild(rematchBtn);

  const restartBtn = document.createElement("button");
  restartBtn.classList.add("btn");
  restartBtn.classList.add("restart-btn");
  restartBtn.classList.add("hidden");
  restartBtn.innerText = "Character Select";
  restartBtn.addEventListener("click", () => {
    window.cancelAnimationFrame(requestId);
    switchScreens();
  });
  winnerDivBot.appendChild(restartBtn);

  setTimeout(() => {
    rematchBtn.classList.remove("hidden");
    restartBtn.classList.remove("hidden");
  }, 3 * 1000);
};

const buildWinScreen = (winner) => {
  gameBoard.dataset.screen = "win-screen";

  buildWinScreenHtml(winner);

  // canvas animation
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

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
      resetSprite(sumoOne, sumoSize * 12, sumoSize * 8);

      resetSprite(sumoTwo, 0, sumoSize * 10);

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
      resetSprite(sumoOne, sumoSize * 12, sumoSize * 10);
      resetSprite(sumoTwo, 0, sumoSize * 8);
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
    resetSprite(sumoOne, sumoSize * 12, sumoSize * 8);
    resetSprite(sumoTwo, 0, sumoSize * 10);
    requestId = window.requestAnimationFrame(animateWinnerOne);
  } else {
    resetSprite(sumoOne, sumoSize * 12, sumoSize * 10);
    resetSprite(sumoTwo, 0, sumoSize * 8);
    requestId = window.requestAnimationFrame(animateWinnerTwo);
  }
};
