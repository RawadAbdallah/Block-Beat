//sneaky peaky code to add a new css file without touching html/css files
const style = document.createElement("style");
const greyedOutClass = ".greyed-out{background-color: grey}";

style.appendChild(document.createTextNode(greyedOutClass));
document.head.appendChild(style);

const bestScoreElem = document.createElement("p");
bestScoreElem.style.color = "white";
bestScoreElem.style.fontSize = "16px";
bestScoreElem.style.fontWeight = "bold";
bestScoreElem.style.fontFamily = "'Press Start 2P', cursive";
document.body.appendChild(bestScoreElem);

//Importing dom codes
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
const gameOverSound = new Audio("./sound/wrong.mp3");

const gameSeq = [];
const playerSeq = [];
let level = 0;
let btn_clicks = 0;
let isGameStarted = false;
let showingSeq = false;
let bestScore = parseInt(sessionStorage.getItem("best-score")) || 0;

bestScoreElem.innerText = `Best score: ${bestScore}`;


buttons.forEach((button, index) => {
    button.classList.toggle("greyed-out");
    button.style.cursor = "pointer";
    button.addEventListener("click", () => {
        if (showingSeq) {
            return;
        }

        if (isGameStarted) {
            showBlock(index + 1);
            playerSeq.push(index + 1);
            if (playerSeq[btn_clicks] === gameSeq[btn_clicks]) {
                btn_clicks++;
            } else {
                gameOver();
            }

            //checking if player passses the level
            if (playerSeq.length === gameSeq.length && checkUserSeq()) {
                setTimeout(() => {
                    playerSeq.length = 0;
                    //updating best score if surpassed
                    if (level > bestScore) {
                        sessionStorage.setItem("best-score", level);
                        bestScoreElem.innerText = `Best score: ${level}`;
                    }
                    level++;
                    btn_clicks = 0;
                    levelTitle.innerText = `Level ${level}`;
                    startLevel();
                }, 1000);
            }
        }
    });
});

window.addEventListener("keydown", () => {
    if (!isGameStarted) {
        isGameStarted = true;
        startGame();
    }
});

function startGame() {
    // resetting everything
    gameSeq.length = 0;
    playerSeq.length = 0;
    level = 1;
    btn_clicks = 0;
    buttons.forEach((btn) => btn.classList.toggle("greyed-out"));
    startLevel();
}

function startLevel() {
    let randomBlockNumber = Math.floor(Math.random() * 4) + 1;
    gameSeq.push(randomBlockNumber);
    levelTitle.innerText = `Level ${level}`;
    showSeq(gameSeq);
    console.log(`gameSeq: ${gameSeq}`);
}

function showSeq() {
    showingSeq = true;
    gameSeq.forEach((blockNumber, index) => {
        setTimeout(() => {
            if (!isGameStarted) return;
            showBlock(blockNumber);
        }, index * 1000);
    });
    setTimeout(() => (showingSeq = false), gameSeq.length * 1000);
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

function toggleBlock(block, sound) {
    block.classList.toggle("pressed");
    sound.play();
    setTimeout(() => {
        block.classList.toggle("pressed");
    }, 100);
}

function checkUserSeq() {
    console.log(`JSON.stringify(gameSeq) === JSON.stringify(playerSeq)`);
    console.log(JSON.stringify(gameSeq));
    console.log(JSON.stringify(playerSeq));
    return JSON.stringify(gameSeq) === JSON.stringify(playerSeq);
}

function gameOver() {
    levelTitle.innerText = "Game over, press to play";
    document.body.style.backgroundColor = "red";
    gameOverSound.play();
    buttons.forEach((btn) => btn.classList.toggle("greyed-out"));
    setTimeout(() => (document.body.style.backgroundColor = "#011F3F"), 100);

    setTimeout(() => {
        isGameStarted = false;
    }, 1000);
}
