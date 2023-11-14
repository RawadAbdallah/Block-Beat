//importing elements from the DOM
const blueBlock = document.getElementById("blue-block");
const greenBlock = document.getElementById("green-block");
const pinkBlock = document.getElementById("pink-block");
const orangeBlock = document.getElementById("orange-block");
const blocks = [blueBlock, greenBlock, pinkBlock, orangeBlock]
const startGameText = document.getElementById("start-game");
const levelCounterText = document.getElementById("level-counter");
const bestScoreElem = document.getElementById('best-score');
const gameOverScreen = document.getElementById("game-over-screen");
const gameOverScreenScore = document.getElementById("game-over-screen-score");
const gameOverNewBestScore = document.getElementById('game-over-new-best-score');
const loadingScreen = document.getElementById('loading-screen');
const muteButton = document.getElementById("mute-button");
const successOverlay = document.getElementById("success-overlay");
const playAgainBtn = document.getElementById("play-again-btn");

//Audio Files
const gameMusic = new Audio("./assets/audio/gamemusic.mp3");
const blueBlockSound = new Audio("./assets/audio/blue.mp3");
const greenBlockSound = new Audio("./assets/audio/green.mp3");
const orangeBlockSound = new Audio("./assets/audio/orange.mp3");
const pinkBlockSound = new Audio("./assets/audio/pink.mp3");
const gameOverSound = document.getElementById("game-over-sound");

blueBlockSound.volume = 0.1;
greenBlockSound.volume = 0.1;
orangeBlockSound.volume = 0.1;
pinkBlockSound.volume = 0.1;
gameOverSound.volume = 0.02;
gameMusic.volume = 0.05;

let isGameLoading = true
let isGameStarted = false;
let isShowingSeq = false;
let isBestScoreBeaten = false;
const gameSeq = [];
const playerSeq = [];
let levelCounter = 1;
let bestScore = parseInt(sessionStorage.getItem('best-score')) || 0

window.addEventListener('load', () => {
  bestScoreElem.innerText = `Best score: ${bestScore}`
  setTimeout(() => {
    blocks.forEach((block, index) => {
      setTimeout(() => { 
        block.classList.toggle('greyed-out')
      }, index * 150)
    })
  }, 2000) 
  setTimeout(() => {
    isGameLoading = false
    loadingScreen.classList.toggle('small')
  }, 4000)
})

const gameOver = () => {
  gameOverSound.play();
  if(isBestScoreBeaten){
    gameOverNewBestScore.classList.toggle('hidden')
  }
  //reset
  gameOverScreen.classList.toggle("small");
  gameOverScreenScore.innerText = levelCounter;
  isGameStarted = false;
  isBestScoreBeaten = false;
  gameSeq.length = 0;
  playerSeq.length = 0;
  levelCounter = 1;
  levelCounterText.innerText = "Level: 1";
};

const checkUserInput = () => {
  for (let i = 0; i < playerSeq.length; i++) {
    if (playerSeq[i] !== gameSeq[i]) {
      gameOver();
      return;
    }
  }
  //Player passed the level
  if (playerSeq.length === gameSeq.length) {
    playerSeq.length = 0;
    if(levelCounter > bestScore){
      isBestScoreBeaten = true
      bestScore++ ;
      bestScoreElem.innerText = `Best score: ${bestScore}`;
      sessionStorage.setItem('best-score', bestScore);
    } 
    levelCounter++;
    successOverlay.classList.toggle("invisible");
    setTimeout(() => {
      successOverlay.classList.toggle("invisible");
    }, 200);
    levelCounterText.innerText = `Level: ${levelCounter}`;

    setTimeout(() => startLevel(), 800);
  }
};

//Adding click events for the blocks
const addClickEventListener = (block, number, blockSound) => {
  block.addEventListener("click", () => {
    if (!isShowingSeq) { //for stopping the player from interfering the animation and cheating.
      if (isGameStarted) {
        showBlock(block, blockSound)
        playerSeq.push(number);
        checkUserInput();
      }
    }
  });
};

addClickEventListener(blueBlock, 1, blueBlockSound);
addClickEventListener(greenBlock, 2, greenBlockSound);
addClickEventListener(pinkBlock, 3, pinkBlockSound);
addClickEventListener(orangeBlock, 4, orangeBlockSound);

//To show a specific block
const showBlock = (block, blockSound) => {
  blockSound.play();
  block.classList.toggle("lighten");
  setTimeout(() => {
    block.classList.toggle("lighten");
  }, 100);
};

//To show all the random chosen blocks
// it will call showBlock() and pass blocks one by one.

const showSeq = (gameSeq) => {
  let index = 0;
  isShowingSeq = true
  const showNextBlock = () => {
    if (index < gameSeq.length) {
      const block = gameSeq[index];
      if (block == 1) {
        showBlock(blueBlock, blueBlockSound);
      } else if (block == 2) {
        showBlock(greenBlock, greenBlockSound);
      } else if (block == 3) {
        showBlock(pinkBlock, pinkBlockSound);
      } else {
        showBlock(orangeBlock, orangeBlockSound);
      }
      index++;
      setTimeout(showNextBlock, 1000);
    }
  };
  showNextBlock();

  setTimeout(() => {
    isShowingSeq = false
  }, gameSeq.length * 1000);
};

//Start new level
const startLevel = () => {
  let randomBlockNumber = Math.floor(Math.random() * 4) + 1;
  gameSeq.push(randomBlockNumber);
  showSeq(gameSeq);
};

//Start Game main function
const startGame = () => {
  isGameStarted = true;
  if (levelCounterText.classList.contains("hidden")) {
    levelCounterText.classList.remove("hidden");
    startGameText.classList.add("hidden");
  }
  setTimeout(() => {
    startLevel();
  }, 1000)
};

//Play Again button

playAgainBtn.addEventListener("click", () => {
  gameOverScreen.classList.toggle("small");
  gameOverNewBestScore.classList.toggle("hidden")
  gameSeq.length = 0;
  playerSeq.length = 0;
  isGameStarted = true;
  setTimeout(() => {
    startLevel();
  }, 1000)
});

window.addEventListener("keydown", () => {
  if (!isGameStarted && !isGameLoading) startGame();
});

window.addEventListener('click', () => {
  if(!isGameStarted && !isGameLoading) startGame();
})

// Mute button
muteButton.addEventListener("click", (e) => {
  e.stopPropagation()
  if (!gameMusic.paused) {
    gameMusic.pause();
    document.getElementById("muted-icon").classList.toggle("hidden");
    document.getElementById("unmuted-icon").classList.toggle("hidden");
  } else {
    gameMusic.play();
    document.getElementById("muted-icon").classList.toggle("hidden");
    document.getElementById("unmuted-icon").classList.toggle("hidden");
  }
});
