let p1n = null;
let p1w = null;
let p2n = null;
let p2w = null;

const buildCharactersScreen = () => {
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
  playButton.addEventListener("click", () => {
    p1n = playerOneName.value;
    p1w = playerOneWeight.valueAsNumber;
    p2n = playerTwoName.value;
    p2w = playerTwoWeight.valueAsNumber;
    console.log(p1n, p1w, p2n, p2w);
    switchScreens();
  });
  gameBoard.appendChild(playButton);

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

  // event listener on button to update names & weights
  /*  loadScreenBtn.addEventListener("mouseover", () => {
    
  }); */

  /* animation loop */
  const ctxOne = playerOneCanvas.getContext("2d");
  const ctxTwo = playerTwoCanvas.getContext("2d");

  const drawSumoOne = () => {
    ctxOne.clearRect(0, 0, 250, 250);
    sumoOne.x -= sumoSize;
    ctxOne.drawImage(
      sumoOne.img,
      sumoOne.x,
      sumoOne.y,
      sumoSize,
      sumoSize,
      0,
      0,
      250,
      250
    );
  };

  const resetSumoOne = () => {
    sumoOne.x = sumoSize * 13;
    sumoOne.y = sumoSize * 2;
  };

  const drawSumoTwo = () => {
    ctxTwo.clearRect(0, 0, 250, 250);
    sumoTwo.x += sumoSize;
    ctxTwo.drawImage(
      sumoTwo.img,
      sumoTwo.x,
      sumoTwo.y,
      sumoSize,
      sumoSize,
      0,
      0,
      250,
      250
    );
  };

  const resetSumoTwo = () => {
    sumoTwo.x = 0;
    sumoTwo.y = sumoSize * 3;
  };

  let frameCount = 0;
  let currentFrame = 1;
  const totalFrames = 25;

  const animateSumos = () => {
    if (frameCount === 4) {
      frameCount = 0;

      if (currentFrame === totalFrames) {
        resetSumoOne();
        resetSumoTwo();
        currentFrame = 1;
      } else if (currentFrame === 13) {
        sumoOne.x = sumoSize * 13;
        sumoOne.y = sumoSize * 3;
        sumoTwo.x = 0;
        sumoTwo.y = sumoSize * 2;
      }
      drawSumoOne();
      drawSumoTwo();

      currentFrame++;
    }
    requestId = window.requestAnimationFrame(animateSumos);
    frameCount++;
  };
  resetSumoOne();
  resetSumoTwo();
  requestId = window.requestAnimationFrame(animateSumos);
  frameCount++;
};
