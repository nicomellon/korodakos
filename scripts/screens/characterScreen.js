const playerInfo = {
  playerOneName: "player one",
  playerOneWeight: 1,
  playerTwoName: "player two",
  playerTwoWeight: 1,
};

const buildCharactersScreen = () => {
  const getPlayerInfo = () => {
    playerInfo.playerOneName = playerOneName.value;
    playerInfo.playerOneWeight = playerOneWeight.valueAsNumber;
    playerInfo.playerTwoName = playerTwoName.value;
    playerInfo.playerTwoWeight = playerTwoWeight.valueAsNumber;
  };
  console.log("characterScreen loaded");

  /* HTML */
  gameBoard.dataset.screen = "characters-screen";

  const characterScreenDiv = document.createElement("div");
  characterScreenDiv.classList.add("character-screen-div");
  gameBoard.appendChild(characterScreenDiv);

  const title = document.createElement("h1");
  title.innerText = "Get ready";
  characterScreenDiv.appendChild(title);

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("characters");
  characterScreenDiv.appendChild(infoDiv);

  const playButton = document.createElement("button");
  playButton.innerText = "PLAY";
  playButton.classList.add("play-button");
  playButton.classList.add("btn");
  playButton.addEventListener("click", () => {
    getPlayerInfo();
    window.cancelAnimationFrame(requestId);
    switchScreens();
  });
  characterScreenDiv.appendChild(playButton);

  /* player one div */
  const playerOneDiv = document.createElement("div");
  playerOneDiv.classList.add("player-div");
  infoDiv.appendChild(playerOneDiv);

  const playerOneTitle = document.createElement("h2");
  playerOneTitle.innerText = "Player 1:";
  playerOneDiv.appendChild(playerOneTitle);

  // player one canvas
  const playerOneCanvas = document.createElement("canvas");
  playerOneCanvas.width = 250;
  playerOneCanvas.height = 250;
  playerOneCanvas.id = "player-one-canvas";
  playerOneDiv.appendChild(playerOneCanvas);

  // player one name
  const playerOneNameLabel = document.createElement("label");
  playerOneNameLabel.for = "player-one-name";
  playerOneNameLabel.innerText = "Name";
  playerOneDiv.appendChild(playerOneNameLabel);

  const playerOneName = document.createElement("input");
  playerOneName.type = "text";
  playerOneName.id = "player-one-name";
  playerOneName.placeholder = "player one";
  playerOneDiv.appendChild(playerOneName);

  // player one weight
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
  infoDiv.appendChild(playerTwoDiv);

  const playerTwoTitle = document.createElement("h2");
  playerTwoTitle.innerText = "Player 2:";
  playerTwoDiv.appendChild(playerTwoTitle);

  // player two player one canvas
  const playerTwoCanvas = document.createElement("canvas");
  playerTwoCanvas.width = 250;
  playerTwoCanvas.height = 250;
  playerTwoCanvas.id = "player-two-canvas";
  playerTwoDiv.appendChild(playerTwoCanvas);

  // player two player one name
  const playerTwoNameLabel = document.createElement("label");
  playerTwoNameLabel.for = "player-two-name";
  playerTwoNameLabel.innerText = "Name";
  playerTwoDiv.appendChild(playerTwoNameLabel);

  const playerTwoName = document.createElement("input");
  playerTwoName.type = "text";
  playerTwoName.id = "player-two-name";
  playerTwoName.placeholder = "player two";
  playerTwoDiv.appendChild(playerTwoName);

  // player two player one weight
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

  /* animation loop */
  const ctxOne = playerOneCanvas.getContext("2d");
  const ctxTwo = playerTwoCanvas.getContext("2d");

  let frameCount = 0;
  let currentFrame = 1;
  const totalFrames = 25;

  const animateCharacterScreen = () => {
    if (frameCount === 4) {
      frameCount = 0;

      if (currentFrame === totalFrames) {
        resetSprite(sumoOne, sumoSize * 12, sumoSize * 2);
        resetSprite(sumoTwo, 0, sumoSize * 3);
        currentFrame = 1;
      } else if (currentFrame === 13) {
        resetSprite(sumoOne, sumoSize * 12, sumoSize * 3);
        resetSprite(sumoTwo, 0, sumoSize * 2);
      }

      drawSumoOne(ctxOne);
      drawSumoTwo(ctxTwo);

      sumoOne.x -= sumoSize;
      sumoTwo.x += sumoSize;
      currentFrame++;
    }
    requestId = window.requestAnimationFrame(animateCharacterScreen);
    frameCount++;
  };
  resetSprite(sumoOne, sumoSize * 12, sumoSize * 2);
  resetSprite(sumoTwo, 0, sumoSize * 3);
  requestId = window.requestAnimationFrame(animateCharacterScreen);
  frameCount++;
};
