const FLIP_STRING_MAX = 20;
const TARGET_1 = 'TTH';
const TARGET_2 = 'HTT';

const headsImg = 'img/244px_Quarter_Heads.png';
const tailsImg = '../img/240_257_Quarter_Tails.png';

let coinImage = document.getElementById("coin-image");
let flipListArchive = document.getElementById("flipList-archive");
let currentFlipElement = document.getElementById("current-flip");
let playerOneSet = document.getElementById("player-1-set");
let playerTwoSet = document.getElementById("player-2-set");

let count = 0;
let flipList = '';
let currentFlip = '';

function flip() {
  currentFlip = getFlip();
  addFlipToList(currentFlip);
  if (currentFlip === 'H'){
    coinImage.src = headsImg;
  } else {
    coinImage.src = tailsImg;
  }
  updateHTML();
  count++;
}

function addFlipToList(flip) {
  let newCoin = document.createElement("span");
  newCoin.textContent = flip;
  flipListArchive.appendChild(newCoin);
  newCoin.classList.add("coin");
  let classToAdd = flip === 'H' ? 'heads' : 'tails';
  newCoin.classList.add(classToAdd);

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
  flipListArchive.replaceChildren(); //with no parameter removes all child elements
  updateHTML();
}

function updateHTML(){

  
}