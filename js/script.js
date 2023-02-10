const FLIP_STRING_MAX = 20;
const PLAYER_SET_1 = 'TTH';
const PLAYER_SET_2 = 'HTT';

const headsImg = 'img/244px_Quarter_Heads.png';
const tailsImg = '../img/240_257_Quarter_Tails.png';

let coinImage = document.getElementById("coin-image");
let flipListArchive = document.getElementById("flipList-archive");
let currentFlipElement = document.getElementById("current-flip");
let playerOneSet = document.getElementById("player-1-set");
let playerTwoSet = document.getElementById("player-2-set");

// Statistics
let currentGameHeadCountElement = document.getElementById("current-game-head-count");
let currentGameTailCountElement = document.getElementById("current-game-tail-count");

let count = 0;
let currentGameHeadCount = 0;
let currentGameTailCount = 0;
let flipString = '';
let currentFlip = '';

function flip() {
  currentFlip = getFlip();
  flipString += currentFlip;
  updateStats(currentFlip);
  let lastThree = flipString.substring(flipString.length - 3);
  console.log(flipString + '\t' + lastThree);
  checkForWin(lastThree);
  updateHTML();
  
}

function displayCoinList(flip) {

  const newCoin = getCoinElement(flip);
  flipListArchive.appendChild(newCoin);
  
}

function getCoinElement(coinLabel){
  let newCoin = document.createElement("span");
  newCoin.textContent = coinLabel;
  newCoin.classList.add("coin");
  let classToAdd = coinLabel === 'H' ? 'heads' : 'tails';
  newCoin.classList.add(classToAdd);
  return newCoin;
}

function getFlip() {
  let coinFlip = Math.floor(Math.random() * 2);
  let headOrTail = coinFlip > 0 ? 'H' : 'T';
  return headOrTail;
}

function displayCurrentFlip(currentFlip){
  if (currentFlip === 'H'){
    coinImage.src = headsImg;
  } else {
    coinImage.src = tailsImg;
  }
}

function addPlayerSets(){
  playerOneSet.replaceChildren();
  playerTwoSet.replaceChildren();
  for (let i = 0; i < PLAYER_SET_1.length; i++){
    const coin = getCoinElement(PLAYER_SET_1.charAt(i));
    playerOneSet.appendChild(coin);
  }

  for (let i = 0; i < PLAYER_SET_2.length; i++){
    const coin = getCoinElement(PLAYER_SET_2.charAt(i));
    playerTwoSet.appendChild(coin);
  }
}

function checkForWin(lastThreeFlips){
  if (lastThreeFlips === PLAYER_SET_1){
    console.log("\nPlayer One Wins!")
  }else if (lastThreeFlips === PLAYER_SET_2){
    console.log("\Player Two Wins!");
  }
}

function restart() {
  flipString = '';
  currentFlip = '';
  currentGameHeadCount = 0;
  currentGameTailCount = 0;
  addPlayerSets();
  flipListArchive.replaceChildren(); //with no parameter removes all child elements
  updateHTML();
}

function updateStats(flip){
  if (flip === 'H'){
    currentGameHeadCount++;
  } else if (flip === 'T') {
    currentGameTailCount++;
  }
  else {
    console.log ("ERROR. Not H nor T");
  }
}

function updateHTML(){
  displayCurrentFlip(currentFlip);
  displayCoinList(currentFlip);
  displayStats();
  
}

function displayStats(){
  currentGameHeadCountElement.textContent = currentGameHeadCount;
  currentGameTailCountElement.textContent = currentGameTailCount;

}