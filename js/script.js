const FLIP_STRING_MAX = 8;
const PLAYER_SET_1 = 'TTT';
const PLAYER_SET_2 = 'HTT';

const headsImg = 'img/244px_Quarter_Heads.png';
const tailsImg = '../img/240_257_Quarter_Tails.png';

let coinImage = document.getElementById("coin-image");
let flipListArchive = document.getElementById("flipList-archive");
let lastThreeElement = document.getElementById("flipList-last-three");
let currentFlipElement = document.getElementById("current-flip");
let playerOneSet = document.getElementById("player-1-set");
let playerTwoSet = document.getElementById("player-2-set");

// Sounds
let clickSound = new sound("sounds/click.wav");

// Statistics
let currentGameHeadCountElement = document.getElementById("current-game-head-count");
let currentGameTailCountElement = document.getElementById("current-game-tail-count");

let count = 0;
let currentGameHeadCount = 0;
let currentGameTailCount = 0;
let flipString = '';
let currentFlip = '';

function flip() {
  clickSound.play();
  currentFlip = getFlip();
  flipString += currentFlip;
  updateStats(currentFlip);
  let lastThree = flipString.substring(flipString.length - 3);
 
  checkForWin(lastThree);
  updateHTML();
  
}

function displayCoinList(flipString) {
  let flipStringFront = '';
  let lastThree = flipString.slice(-3); // last three characters in the string
  displayLastThree(lastThree);
  if (flipString.length > 3) {
    flipStringFront = flipString.substring(0, flipString.length - 3);
    displayFlipArchive(flipStringFront);
  }
  
  console.log(flipString + '\t' + flipStringFront +  '\t' + lastThree);

  
  // const newCoin = getCoinElement(flipString.charAt(flipString.length - 1));
  // flipListArchive.appendChild(newCoin);
  
}

function displayFlipArchive(flipArchiveString){
  flipListArchive.replaceChildren(); // clear all existing coins
  
  let coinsThatFit = FLIP_STRING_MAX - 3;
  // number of coins to remove from the left-hand-side
  let numExcessCoins = Math.max (0, flipArchiveString.length - coinsThatFit);
  console.log ("numExcessCoins: " + numExcessCoins);
  // print '+num' to indicate number of coins off the screen
  if (numExcessCoins > 0){
    let additionalCoinCount = document.createElement("span");
    additionalCoinCount.textContent = "+" + numExcessCoins;
    additionalCoinCount.classList.add("additional-coin-count");
    additionalCoinCount.classList.add("current-flip-item");
    flipListArchive.appendChild(additionalCoinCount);
  }
  for (let i = numExcessCoins; i < flipArchiveString.length; i++){
    const newCoin = getCoinElement(flipString.charAt(i));
    flipListArchive.appendChild(newCoin);
  }
}

function displayLastThree(lastThree){
  console.log("call to displayLastThree with " + lastThree);
  lastThreeElement.replaceChildren();
  let newCoin;
  for (let i = 0; i < lastThree.length; i++){
    let flip = lastThree.charAt(i);
    newCoin = getCoinElement(flip);
    lastThreeElement.appendChild(newCoin);
  }
  
}

function getCoinElement(coinLabel){
  let newCoin = document.createElement("span");
  newCoin.textContent = coinLabel;
  newCoin.classList.add("current-flip-item");
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
  displayCoinList(flipString);
  displayStats();
  
}

function displayStats(){
  currentGameHeadCountElement.textContent = currentGameHeadCount;
  currentGameTailCountElement.textContent = currentGameTailCount;

}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";

  document.body.appendChild(this.sound);

  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}