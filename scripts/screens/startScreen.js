const buildHomeScreen = () => {
  gameBoard.dataset.screen = "splash-screen";

  const startContainer = document.createElement("div");
  startContainer.classList.add("start-container");
  startContainer.classList.add("flex");
  startContainer.classList.add("columns");
  gameBoard.appendChild(startContainer);

  //topdiv
  const startDivUp = document.createElement("div");
  startContainer.appendChild(startDivUp);

  const startTitle = document.createElement("h1");
  startTitle.classList.add("main-title");
  startTitle.innerText = "SUMO";
  startDivUp.appendChild(startTitle);

  //middle canvas
  const canvas = document.createElement("canvas");
  canvas.width = 700;
  canvas.height = sumoFight.height * 2;
  startContainer.appendChild(canvas);

  //bottomdiv
  const startDivBot = document.createElement("div");
  startContainer.appendChild(startDivBot);

  const startButton = document.createElement("button");
  startButton.classList.add("start-btn");
  startButton.classList.add("btn");
  startButton.innerText = "START";
  startButton.addEventListener("click", switchScreens);
  startDivBot.appendChild(startButton);

  const startLoop = (canvas) => {
    const ctx = canvas.getContext("2d");
    let currentFrame = 1;
    const totalFrames = 10;
    let loopCount = 1;
    let xPos = 100;
    let acc = 1.05;

    const loop = () => {
      if (loopCount === 10) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        loopCount = 0;
        currentFrame++;

        if (currentFrame === totalFrames) {
          currentFrame = 0;
          resetSprite(sumoFight, 0, 0);
          acc *= -1;
        } else if (currentFrame === 5) {
          resetSprite(sumoFight, 0, sumoFight.height);
        }

        ctx.drawImage(
          sumoFight.img,
          sumoFight.x,
          sumoFight.y,
          sumoFight.width,
          sumoFight.height,
          xPos,
          0,
          sumoFight.width * 2,
          sumoFight.height * 2
        );

        sumoFight.x += sumoFight.width;
      }

      //sprite pos
      xPos += acc;
      loopCount++;
      requestId = window.requestAnimationFrame(loop);
    };
    // initialize loop
    requestId = window.requestAnimationFrame(loop);
  };

  startLoop(canvas);
};
