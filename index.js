const gameBoard = document.querySelector(".gameBoard");
let cardElementsArray = [];
let cardObjArray = [];
const simpleTheme = {
  themeName: "simple",
  themeImgArray: [1, 2, 3, 4, 5, 6],
};
startGame();

function startGame() {
  state();
  cardObjArray = createCardObjArray(state.numOfCards);
  cardElementsArray = createCardElementsArray(state.numOfCards);
}

function state() {
  state.playerName = localStorage["playerName"];
  state.gameLevel = localStorage["chosenLevel"];
  state.numOfCards = getNumOfCards(state.gameLevel);
  state.cardsValuesArray = randomizeCardsArray(state.numOfCards);
  state.theme = simpleTheme;
  state.gameStarted = true;
  state.numOfError = 0;
  state.flippedCards = [];
  // state.bestPlayer= "";
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
      break;
    case "medium":
      numOfCards = 18;
      break;
    case "hard":
      numOfCards = 24;
      break;
    default:
      numOfCards = 12;
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
  return cardsArray;
}

// functions on the card:

function createCardElementsArray(numOfCards) {
  let cardElementsArray = [];
  for (let i = 0; i < numOfCards; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-index", i);
    card.innerHTML = state.cardsValuesArray[i];
    card.setAttribute("data-flipped", false);
    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
    cardElementsArray.push(card);
  }
  return cardElementsArray;
}
function createCardObjArray(numOfCards) {
  let cardObjArray = [];
  for (let i = 0; i < numOfCards; i++) {
    const card = {
      cardValue: state.cardsValuesArray[i],
      cardImg: state.theme.themeImgArray[state.cardsValuesArray[i] - 1],
      cardBack: state.theme.themeName,
      flipped: false,
    };

    cardObjArray.push(card);
  }
  return cardObjArray;
}
function handleCardClick(event) {
  const clickedCard = event.currentTarget;
  console.log(state.flippedCards);
  flipCard(clickedCard);
  state.flippedCards.push(clickedCard);
  if (state.flippedCards.length === 2) {
    if (!checkMatch(state.flippedCards)) {
      cardElementsArray.forEach((cardElement) =>
        cardElement.removeEventListener("click", handleCardClick),
      );
      setTimeout(wrongGuess, 1000);
    }
  }
}
function flipCard(clickedCard) {
  clickedCard.setAttribute("data-flipped", true);
}
function wrongGuess() {
  activateCards();
  emptyFlippedArray();
}
function activateCards() {
  cardElementsArray.forEach((cardElement) => {
    cardElement.addEventListener("click", handleCardClick);
    flipBack(cardElement);
  });
}
function flipBack(cardElement) {
  cardElement.setAttribute("data-flipped", false);
}
function emptyFlippedArray() {
  state.flippedCards = [];
}
function checkMatch(flippedCards) {
  const card1Index = Number(flippedCards[0].getAttribute("data-index"));
  const card2Index = Number(flippedCards[1].getAttribute("data-index"));
  if (
    state.cardsValuesArray[card1Index] === state.cardsValuesArray[card2Index]
  ) {
    return true;
  } else return false;
}
// display the stack
// when clicked flip a card
// allow 2 cards to flip
// compare cards
// if match leave flipped or hide from display
// if no match leave a second for display and flip back
// count if wrong guess
