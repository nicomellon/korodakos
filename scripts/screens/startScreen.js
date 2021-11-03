const buildHomeScreen = () => {
  gameBoard.dataset.screen = "splash-screen";

  const startContainer = document.createElement("div");
  startContainer.classList.add("start-container");
  gameBoard.appendChild(startContainer);

  const startTitle = document.createElement("h1");
  startTitle.innerText = "Start Screen";
  startContainer.appendChild(startTitle);

  const canvas = document.createElement("canvas");
  canvas.width = sumoFight.width * 2;
  canvas.height = sumoFight.height * 2;
  startContainer.appendChild(canvas);

  const startButton = document.createElement("button");
  startButton.classList.add("start-btn");
  startButton.classList.add("btn");
  startButton.innerText = "START";
  startButton.addEventListener("click", switchScreens);
  startContainer.appendChild(startButton);

  const startLoop = (canvas) => {
    const ctx = canvas.getContext("2d");
    let currentFrame = 1;
    const totalFrames = 10;
    let loopCount = 1;

    const loop = () => {
      if (loopCount === 10) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        loopCount = 0;
        currentFrame++;

        if (currentFrame === totalFrames) {
          currentFrame = 0;
          resetSprite(sumoFight, 0, 0);
        } else if (currentFrame === 5) {
          resetSprite(sumoFight, 0, sumoFight.height);
        }

        ctx.drawImage(
          sumoFight.img,
          sumoFight.x,
          sumoFight.y,
          sumoFight.width,
          sumoFight.height,
          0,
          0,
          sumoFight.width * 2,
          sumoFight.height * 2
        );

        sumoFight.x += sumoFight.width;
      }

      loopCount++;
      requestId = window.requestAnimationFrame(loop);
    };
    // initialize loop
    requestId = window.requestAnimationFrame(loop);
  };

  startLoop(canvas);
};
