// clears content of gameboard
const clearBoard = () => {
  const childNodes = Array.from(gameBoard.childNodes);
  childNodes.forEach((child) => child.remove());
};

// loads different screens
const switchScreens = () => {
  clearBoard();
  const gameState = gameBoard.dataset.screen;

  switch (gameState) {
    case "splash-screen":
      buildCharactersScreen();
      break;
    case "characters-screen":
      buildGameScreen();
      break;
    case "game-screen":
      buildHomeScreen();
      break;
    case "win-screen":
      buildHomeScreen();
      break;
  }
};

// game-board div
const gameBoard = document.querySelector("#game-board");

/* on script load*/
buildHomeScreen();
// buildWinScreen("Nico");
