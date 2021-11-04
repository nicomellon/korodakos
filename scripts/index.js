// clears content of gameboard
const clearBoard = () => {
  const childNodes = Array.from(gameBoard.childNodes);
  childNodes.forEach((child) => child.remove());
};

// loads different screens
const switchScreens = () => {
  if (requestId) window.cancelAnimationFrame(requestId);
  clearBoard();

  const gameState = gameBoard.dataset.screen;

  switch (gameState) {
    case "splash-screen":
      buildCharactersScreen();
      loop1.play();
      break;
    case "characters-screen":
      buildGameScreen();
      loop1.pause();
      loop2.play();
      break;
    case "game-screen":
      buildHomeScreen();
      loop2.pause();
      break;
    case "win-screen":
      buildCharactersScreen();
      loop2.pause();
      loop1.play();
      break;
  }
};

const loop1 = new Audio("./assets/sumoMusic-2.ogg");
loop1.loop = true;
const loop2 = new Audio("./assets/sumoMusic-3.ogg");
loop1.loop = true;

// game-board div
const gameBoard = document.querySelector("#game-board");

/* on script load*/
buildHomeScreen();
