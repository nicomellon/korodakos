const buildHomeScreen = () => {
  gameBoard.dataset.screen = "splash-screen";

  const startContainer = document.createElement("div");
  startContainer.classList.add("start-container");
  gameBoard.appendChild(startContainer);

  const startTitle = document.createElement("h1");
  startTitle.innerText = "Start Screen";
  startContainer.appendChild(startTitle);

  const startButton = document.createElement("button");
  startButton.classList.add("start-btn");
  startButton.classList.add("btn");
  startButton.innerText = "START";
  startContainer.appendChild(startButton);
  startButton.addEventListener("click", switchScreens);
};
