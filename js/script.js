const FLIP_STRING_MAX = 20;
const TARGET_1 = 'TTH';
const TARGET_2 = 'HTT';

const headsImg = 'img/244px_Quarter_Heads.png';
const tailsImg = '../img/240_257_Quarter_Tails.png';

let coinImage = document.getElementById("coin-image");
let flipListElement = document.getElementById("flipList");
let currentFlipElement = document.getElementById("current-flip");
let playerOneSet = document.getElementById("player-1-set");
let playerTwoSet = document.getElementById("player-2-set");

let count = 0;
let flipList = '';
let currentFlip = '';

function flip() {
  currentFlip = getFlip();
  flipList += currentFlip;
  if (currentFlip === 'H'){
    coinImage.src = headsImg;
  } else {
    coinImage.src = tailsImg;
  }
  updateHTML();
  count++;
}


function getFlip() {
  let coinFlip = Math.floor(Math.random() * 2);
  let headOrTail = coinFlip > 0 ? 'H' : 'T';
  return headOrTail;
}

function restart() {
  flipList = '';
  currentFlip = '';
  playerOneSet.innerHTML = TARGET_1;
  playerTwoSet.innerHTML = TARGET_2;
  updateHTML();
}

function updateHTML(){
  flipListElement.innerHTML = flipList;
  currentFlipElement.innerHTML = currentFlip;
  if (currentFlip === "H"){
    currentFlipElement.classList.remove("tails");
    currentFlipElement.classList.add("heads");
  }
  else{
    currentFlipElement.classList.remove("heads");
    currentFlipElement.classList.add("tails");
  }
  
  
  
  
}