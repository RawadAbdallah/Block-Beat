const levelTitle = document.getElementById("level-title");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const buttons = [green, red, yellow, blue];
const greenSound = new Audio("./sounds/green.mp3");
const redSound = new Audio("./sounds/red.mp3");
const yellowSound = new Audio("./sounds/yellow.mp3");
const blueSound = new Audio("./sounds/blue.mp3");
const gameOverSound = new Audio('./sound/wrong.mp3')

const gameSeq = [];
const playerSeq = [];
let level = 0;
let btn_clicks = 0;
let isGameStarted = false;

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    showBlock(index + 1);
    playerSeq.push(index + 1);
    if (playerSeq[btn_clicks] === gameSeq[btn_clicks]) {
      console.log(`${playerSeq[btn_clicks]} is equal to  ${gameSeq[btn_clicks]}`)
      btn_clicks++;
    } else {
      console.log(`${playerSeq[btn_clicks]} is NOT equal to  ${gameSeq[btn_clicks]}`);
      gameOver();
    }

    if (playerSeq.length !== 0 && playerSeq.length === gameSeq.length) {
      console.log('LEVEL COMPLETED')
      playerSeq.length = 0;
      btn_clicks = 0;
      level++;
      levelTitle.innerText = `Level ${level}`;
      setTimeout(() => {
        startLevel();
      }, 1000);
    }
  });
});

window.addEventListener("keydown", () => {
  if (!isGameStarted) {
    isGameStarted = true;
    startGame();
  }
});

window.addEventListener("click", () => {
  if (!isGameStarted) {
    isGameStarted = true;
    startGame();
  }
});

function startGame() {
  // reseting everything
  gameSeq.length = 0;
  playerSeq.length = 0;
  level = 1;
  btn_clicks = 0;
  startLevel();
}

function startLevel() {
  let randomBlockNumber = Math.floor(Math.random() * 4) + 1;
  gameSeq.push(randomBlockNumber);
  levelTitle.innerText = `Level ${level}`;
  showSeq(gameSeq);
  console.log(`gameSeq: ${gameSeq}`)
}

function showSeq() {
  gameSeq.forEach((blockNumber, index) => {
    setTimeout(() => {
      if(!isGameStarted) return
      showBlock(blockNumber);
    }, index * 1000);
  });
}

function toggleBlock(block, sound) {
  block.classList.toggle("pressed");
  sound.play();
  setTimeout(() => {
    block.classList.toggle("pressed");
  }, 100);
}

function showBlock(blockNumber) {
  if (blockNumber == 1) {
    toggleBlock(green, greenSound);
  } else if (blockNumber == 2) {
    toggleBlock(red, redSound);
  } else if (blockNumber == 3) {
    toggleBlock(yellow, yellowSound);
  } else {
    toggleBlock(blue, blueSound);
  }
}

function checkUserSeq() {
  return JSON.stringify(gameSeq) === JSON.stringify(playerSeq);
}

function gameOver() {
 
  levelTitle.innerText = 'Game over, press to play'
  setTimeout(()=> {
    isGameStarted = false
  }, 1000)
}
