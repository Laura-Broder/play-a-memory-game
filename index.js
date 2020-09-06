// select elements
const gameBoard = document.querySelector(".gameBoard");
const playerName = document.querySelector(".playerName");
const numOfErrors = document.querySelector(".numOfErrors");
const bestPlayer = document.querySelector(".bestPlayer");
const newGameBtn = document.querySelector(".startBtn");
const restartGameBtn = document.querySelector(".restartBtn");
const currentTimerValue = document.querySelector(".timer");
// ---------------------------------------------
// create global variables for the timer
let secCounter = 0;
let sec = 0;
let min = 0;
let hr = 0;
let secTimer;
// ---------------------------------------------
// declare global arrays for the cards arrays
let cardElementsArray = [];
let cardObjArray = [];
// ---------------------------------------------
// defining themes
const animalTheme = {
  themeName: "animal",
  // themeImgArray: [
  //   "url(./animal-theme/ashwini-chaudhary-dxZfz8VHA4Q-unsplash.jpg)",
  //   "url(./animal-theme/birger-strahl-JqUUYJ8oUmo-unsplash.jpg)",
  //   "url(./animal-theme/brittney-weng-YXq9lDyszBQ-unsplash.jpg)",
  //   "url(./animal-theme/dusan-smetana-lwaaikBkiP8-unsplash.jpg)",
  //   "url(./animal-theme/dustin-humes-qMuOXvGGIX8-unsplash.jpg)",
  //   "url(./animal-theme/erda-estremera-CsLRfajosgA-unsplash.jpg)",
  //   "url(./animal-theme/fabian-keller-2Bust437YkE-unsplash.jpg)",
  //   "url(./animal-theme/julia-craice-o0S-0Pa4F2M-unsplash.jpg)",
  //   "url(./animal-theme/karsten-winegeart-88lDyjdIDGw-unsplash.jpg)",
  //   "url(./animal-theme/leon-bublitz-HetKVEbe9lM-unsplash.jpg)",
  //   "url(./animal-theme/wolfgang-hasselmann-s-vNm9H3mRg-unsplash.jpg)",
  //   "url(./animal-theme/66-north-PqDR1-8jv1c-unsplash.jpg)",
  // ],
};
// ---------------------------------------------
// add event listener to the start game button
newGameBtn.addEventListener("click", startGame);
// add event listener to the restart game button
restartGameBtn.addEventListener("click", () => {
  resetTimer();
  localStorage["continue"] === "no";
  location.href = "./welcome.html";
});

// ---------------------------------------------
// start the game as the page loads
startGame();
// ---------------------------------------------

// ---------------------------------------------
// timer functions

function startTimer() {
  clearInterval(secTimer);
  secTimer = setInterval(updateSec, 1000);
}
function updateSec() {
  secCounter++;
  let strSec;
  let strMin;
  sec = secCounter;
  min = Math.floor(secCounter / 60);
  hr = Math.floor(secCounter / 3600);
  sec > 59 && (sec = secCounter % 60);
  sec < 10 ? (strSec = `0${sec}`) : (strSec = `${sec}`);
  min > 59 && (min = min % 60);
  min < 10 ? (strMin = `0${min}`) : (strMin = `${min}`);

  currentTimerValue.textContent = `${hr}:${strMin}:${strSec}`;
}
// reset when the game restarts
function resetTimer() {
  secCounter = 0;
  sec = 0;
  min = 0;
  hr = 0;
  currentTimerValue.textContent = "0:00:00";
}
function resetBoard() {
  resetTimer();
  cardElementsArray = [];
  cardObjArray = [];
  gameBoard.innerHTML = "";
}
// ---------------------------------------------
// start game functions
function startGame() {
  resetBoard();
  state();
  cardObjArray = createCardObjArray(state.numOfCards);
  cardElementsArray = createCardElementsArray(state.numOfCards);
  displayPlayerDetails();
  startTimer();
}
function displayPlayerDetails() {
  playerName.innerText = `Player: ${state.playerName}`;
  numOfErrors.innerText = `#Errors: ${state.numOfError}`;
  if (localStorage["bestPlayerName"]) {
    bestPlayer.innerText = `Best Player:
     ${state.bestPlayer.bestPlayerName}
     ${state.bestPlayer.bestPlayerNumOfErrors} Errors`;
  } else {
    bestPlayer.innerText = `No wins on this level. 
    Be the first!`;
  }
}
// define the state of the game object
function state() {
  state.playerName = localStorage["playerName"];
  state.gameLevel = localStorage["chosenLevel"];
  state.numOfCards = getNumOfCards(state.gameLevel);
  state.cardsValuesArray = randomizeCardsArray(state.numOfCards);
  state.theme = animalTheme;
  state.numOfError = 0;
  state.flippedCards = [];
  state.activeBoard = true;
  state.bestPlayer = {
    bestPlayerName: localStorage["bestPlayerName"],
    bestPlayerNumOfErrors: localStorage["bestPlayerNumOfErrors"],
  };
}
// calculate the number of cards to display from the level selected
function getNumOfCards(gameLevel) {
  let numOfCards;
  switch (gameLevel) {
    case "easy":
      numOfCards = 12;
      gameBoard.classList.add("easy");
      break;
    case "medium":
      numOfCards = 18;
      gameBoard.classList.add("medium");
      break;
    case "hard":
      numOfCards = 24;
      gameBoard.classList.add("hard");
      break;
    default:
      numOfCards = 12;
      gameBoard.classList.add("easy");
      break;
  }
  return numOfCards;
}
// randomize the array values to randomize the cards.
function randomizeCardsArray(arraySize) {
  let cardsArray = [];
  // make an array of random numbers from 1 to num of cards needed
  while (cardsArray.length < arraySize) {
    let randomNum = Math.floor(Math.random() * arraySize);
    if (!cardsArray.includes(randomNum + 1)) {
      cardsArray.push(randomNum + 1);
    }
  }
  // reduce number of different values by half
  for (let i = 0; i < cardsArray.length; i++) {
    if (cardsArray[i] > arraySize / 2)
      cardsArray[i] = cardsArray[i] - arraySize / 2;
  }
  return cardsArray;
}
// create array of objects that represent the cards
function createCardObjArray(numOfCards) {
  let cardObjArray = [];
  for (let i = 0; i < numOfCards; i++) {
    const card = {
      cardValue: state.cardsValuesArray[i],
      // cardImg: state.theme.themeImgArray[state.cardsValuesArray[i] - 1],
      cardBack: state.theme.themeName,
      flipped: false,
      active: true,
    };
    cardObjArray.push(card);
  }
  return cardObjArray;
}
// create an array of elements and display them on page
function createCardElementsArray(numOfCards) {
  let cardElementsArray = [];
  for (let i = 0; i < numOfCards; i++) {
    const card = document.createElement("div");
    // card.innerText = cardObjArray[i].cardValue;
    card.classList.add("card");
    card.setAttribute("data-index", i);
    card.setAttribute("data-value", cardObjArray[i].cardValue);
    card.setAttribute("data-flipped", false);
    card.setAttribute("data-active", true);
    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
    cardElementsArray.push(card);
    const innerCard = document.createElement("span");
    innerCard.innerText = `${cardObjArray[i].cardValue}`;
    card.appendChild(innerCard);
  }
  return cardElementsArray;
}
// ---------------------------------------------
// functions of the game:
function handleCardClick(event) {
  const clickedCard = event.currentTarget;
  if (
    clickedCard.getAttribute("data-active") === "true" &&
    state.activeBoard === true
  ) {
    flipCard(clickedCard);
    // updateCardObj(index, prop, newValue);
    deactivateFlippedCard(clickedCard);
    state.flippedCards.push(clickedCard);
    checkFlippedArray(state.flippedCards);
  }
}
function flipCard(clickedCard) {
  clickedCard.setAttribute("data-flipped", true);
}
function deactivateFlippedCard(clickedCard) {
  clickedCard.setAttribute("data-active", false);
}
function checkFlippedArray(flippedCards) {
  if (flippedCards.length === 2) {
    const card1Index = Number(flippedCards[0].getAttribute("data-index"));
    const card2Index = Number(flippedCards[1].getAttribute("data-index"));
    checkMatch(card1Index, card2Index)
      ? goodGuess(card1Index, card2Index)
      : wrongGuess(card1Index, card2Index);
  }
}
function checkMatch(card1Index, card2Index) {
  return (
    state.cardsValuesArray[card1Index] === state.cardsValuesArray[card2Index]
  );
}
function emptyFlippedArray() {
  state.flippedCards = [];
}
// update card object function (not used):
function updateCardObj(index, prop, newValue) {
  cardObjArray[index][prop] = newValue;
}
// good guess
function goodGuess(card1Index, card2Index) {
  emptyFlippedArray();
  if (document.querySelectorAll('[data-flipped="false"]').length === 0) {
    localStorage["continue"] = "yes";
    winRestart();
  }
}
function winRestart() {
  storeWinnerDetails();
  checkIfBest();
  location.href = "./welcome.html";
}
function storeWinnerDetails() {
  localStorage["lastPlayerNumOfErrors"] = state.numOfError;
  localStorage["lastPlayerName"] = state.playerName;
  localStorage["continue"] = "yes";
}
function checkIfBest() {
  if (
    Number(localStorage["bestPlayerNumOfErrors"]) > Number(state.numOfError) ||
    !localStorage["bestPlayerName"]
  ) {
    localStorage["bestPlayerName"] = state.playerName;
    localStorage["bestPlayerNumOfErrors"] = state.numOfError;
  }
}
// wrong guess
function wrongGuess(card1Index, card2Index) {
  state.numOfError++;
  numOfErrors.innerHTML = `Number of Errors: ${state.numOfError}`;
  state.activeBoard = false;
  setTimeout(activateCards, 2000, card1Index, card2Index);
}
function activateCards(card1Index, card2Index) {
  state.activeBoard = true;
  activateWrongMatch(card1Index, card2Index);
  flipBack(card1Index);
  flipBack(card2Index);
  emptyFlippedArray();
}
function activateWrongMatch(card1Index, card2Index) {
  cardElementsArray[card1Index].setAttribute("data-active", true);
  cardElementsArray[card2Index].setAttribute("data-active", true);
}
function flipBack(cardIndex) {
  cardElementsArray[cardIndex].setAttribute("data-flipped", false);
}
