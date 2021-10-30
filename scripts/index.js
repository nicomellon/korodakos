// General function that will update the HTML content dinamically
const buildDom = (html) => {
  const main = document.querySelector("main");
  main.innerHTML = html;
};

// First Screen => Splash Screen
const buildSplashScreen = () => {
  buildDom(`
    <img src="" alt="" />
    <br />
    <button id="start-button">StartGame</button>
    `);
  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", buildGameScreen);
};

// Second Screen => Game Screen
const buildGameScreen = () => {
  buildDom(`
    <div id="game-board">
    <canvas id="canvas" width="700" height="700"></canvas>
    </div>  
    <button id="end-button">End Game</button>
    `);

  const endButton = document.getElementById("end-button");
  endButton.addEventListener("click", buildGameOver);

  const game = new Game();
  game.start();
};

// Third Screen => Game Over
const buildGameOver = () => {
  buildDom(`
    <section class="game-over">
    <h1>Game Over</h1>
    <button id = "game"> TRY AGAIN</button>
    <div class= "pointer"> </div>
    </section>
    `);

  const restartButton = document.querySelector("button");
  restartButton.addEventListener("click", buildGameScreen);
};

// When the window loads, then we will run the "buildSplashScreen" function
// "load" waits for the html and JS
//! window.addEventListener("load", buildSplashScreen);
window.addEventListener("load", buildGameScreen);
