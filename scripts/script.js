//importing elements from the DOM
const blueBlock = document.getElementById("blue-block");
const greenBlock = document.getElementById("green-block");
const pinkBlock = document.getElementById("pink-block");
const orangeBlock = document.getElementById("orange-block");
const startGameText = document.getElementById("start-game");
const levelCounterText = document.getElementById("level-counter");
const gameOverScreen = document.getElementById('game-over-screen')
const gameOverScreenScore = document.getElementById('game-over-screen-score')
const muteButton = document.getElementById('mute-button');
const successOverlay = document.getElementById('success-overlay')
const playAgainBtn = document.getElementById('play-again-btn')

//Audio Files
const gameMusic = new Audio('./assets/audio/gamemusic.mp3');
const blueBlockSound = new Audio('./assets/audio/blue.mp3')
const greenBlockSound = new Audio('./assets/audio/green.mp3')
const orangeBlockSound =  new Audio('./assets/audio/orange.mp3')
const pinkBlockSound = new Audio('./assets/audio/pink.mp3')
const gameOverSound = document.getElementById('game-over-sound')

blueBlockSound.volume = 0.1;
greenBlockSound.volume = 0.1;
orangeBlockSound.volume = 0.1;
pinkBlockSound.volume = 0.1;
gameOverSound.volume = 0.02;
gameMusic.volume = 0.05;

let gameStarted = false;
let isShowingSeq = false;
const gameSeq = [];
const playerSeq = [];
let levelCounter = 1;

//Adding click events for the blocks
const addClickEventListener = (block, number, blockSound) => {
    block.addEventListener("click", () => {
        showBlock(block, blockSound)
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

// Mute button
muteButton.addEventListener("click", () => {
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
