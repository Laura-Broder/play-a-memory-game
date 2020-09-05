const gameBoard = document.querySelector(".gameBoard");
const playerName = document.querySelector(".playerName");
const numOfErrors = document.querySelector(".numOfErrors");
const bestPlayer = document.querySelector(".bestPlayer");
const newGameBtn = document.querySelector(".startBtn");
const restartGameBtn = document.querySelector(".restartBtn");

newGameBtn.addEventListener("click", startGame);
restartGameBtn.addEventListener("click", () => {
  localStorage["continue"] === "no";
  location.href = "./welcome.html";
});

let cardElementsArray = [];
let cardObjArray = [];
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
startGame();
function restartGame() {}
function startGame() {
  cardElementsArray = [];
  cardObjArray = [];
  gameBoard.innerHTML = "";
  state();
  cardObjArray = createCardObjArray(state.numOfCards);
  cardElementsArray = createCardElementsArray(state.numOfCards);
  playerName.innerText = `Player's name: ${state.playerName}`;
  numOfErrors.innerText = `Number of Errors: ${state.numOfError}`;
  if (localStorage["bestPlayerName"]) {
    bestPlayer.innerText = `Best Player: ${state.bestPlayer.bestPlayerName} with ${state.bestPlayer.bestPlayerNumOfErrors} Errors`;
  } else {
    bestPlayer.innerText = `No wins on this level. 
    Be the first!`;
  }
}

function state() {
  state.playerName = localStorage["playerName"];
  state.gameLevel = localStorage["chosenLevel"];
  state.numOfCards = getNumOfCards(state.gameLevel);
  state.cardsValuesArray = randomizeCardsArray(state.numOfCards);
  state.theme = animalTheme;
  state.gameStarted = true;
  state.numOfError = 0;
  state.flippedCards = [];
  state.bestPlayer = {
    bestPlayerName: localStorage["bestPlayerName"],
    bestPlayerNumOfErrors: localStorage["bestPlayerNumOfErrors"],
  };
}
// get players name
function getGameLevel() {
  const radioBtns = document.querySelectorAll('input[name="gameLevel"]');
  let chosenLevel;
  for (const rb of radioBtns) {
    if (rb.checked) {
      chosenLevel = rb.value;
      break;
    }
  }
  return chosenLevel;
}

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
  while (cardsArray.length < arraySize) {
    let randomNum = Math.floor(Math.random() * arraySize);
    if (!cardsArray.includes(randomNum + 1)) {
      cardsArray.push(randomNum + 1);
    }
  }
  for (let i = 0; i < cardsArray.length; i++) {
    if (cardsArray[i] > arraySize / 2)
      cardsArray[i] = cardsArray[i] - arraySize / 2;
  }
  console.log(cardsArray);
  return cardsArray;
}

// functions on the card:

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
  console.log(cardObjArray);
  return cardObjArray;
}
function updateCardObj(index, prop, newValue) {
  cardObjArray[index][prop] = newValue;
}
function createCardElementsArray(numOfCards) {
  let cardElementsArray = [];
  for (let i = 0; i < numOfCards; i++) {
    const card = document.createElement("div");
    card.innerText = cardObjArray[i].cardValue;
    card.classList.add("card");
    card.setAttribute("data-index", i);
    card.setAttribute("data-value", cardObjArray[i].cardValue);
    card.setAttribute("data-flipped", false);
    card.setAttribute("data-active", true);
    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
    cardElementsArray.push(card);
  }
  return cardElementsArray;
}
function handleCardClick(event) {
  const clickedCard = event.currentTarget;
  flipCard(clickedCard);
  // updateCardObj(index, prop, newValue);
  clickedCard.setAttribute("data-active", false);
  clickedCard.removeEventListener("click", handleCardClick);
  state.flippedCards.push(clickedCard);
  if (state.flippedCards.length === 2) {
    const card1Index = Number(state.flippedCards[0].getAttribute("data-index"));
    const card2Index = Number(state.flippedCards[1].getAttribute("data-index"));
    checkMatch(card1Index, card2Index)
      ? goodGuess(card1Index, card2Index)
      : wrongGuess(card1Index, card2Index);
  }
}
function flipCard(clickedCard) {
  clickedCard.setAttribute("data-flipped", true);
}
function goodGuess(card1Index, card2Index) {
  emptyFlippedArray();
  if (document.querySelectorAll('[data-flipped="false"]').length === 0) {
    localStorage["continue"] = "yes";
    winRestart();
  }
}
function winRestart() {
  localStorage["lastPlayerNumOfErrors"] = state.numOfError;
  localStorage["lastPlayerName"] = state.playerName;
  localStorage["continue"] = "yes";
  if (
    Number(localStorage["bestPlayerNumOfErrors"]) < Number(state.numOfError) ||
    !localStorage["bestPlayerName"]
  ) {
    localStorage["bestPlayerName"] = state.playerName;
    localStorage["bestPlayerNumOfErrors"] = state.numOfError;
  }
  location.href = "./welcome.html";
}
function wrongGuess(card1Index, card2Index) {
  state.numOfError++;
  numOfErrors.innerHTML = `Number of Errors: ${state.numOfError}`;
  cardElementsArray.forEach((cardElement) =>
    cardElement.removeEventListener("click", handleCardClick),
  );
  activateWrongMatch(card1Index, card2Index);
  setTimeout(activateCards, 1000);
}

function activateCards() {
  cardElementsArray.forEach((cardElement) => {
    if (cardElement.getAttribute("data-active") === "true") {
      cardElement.addEventListener("click", handleCardClick);
      flipBack(cardElement);
    }
  });
  emptyFlippedArray();
}
function flipBack(cardElement) {
  cardElement.setAttribute("data-flipped", false);
}
function emptyFlippedArray() {
  state.flippedCards = [];
}
function checkMatch(card1Index, card2Index) {
  return (
    state.cardsValuesArray[card1Index] === state.cardsValuesArray[card2Index]
  );
}

function activateWrongMatch(card1Index, card2Index) {
  cardElementsArray[card1Index].setAttribute("data-active", true);
  cardElementsArray[card2Index].setAttribute("data-active", true);
}
