// build the stack:
// if size=x the array will contain numbers from 1 to x/2.
let numOfCards = 12;
let cardsArray = randomizeCardsArray(numOfCards);
console.log(cardsArray);

// randomize the array values to randomize the cards.
function randomizeCardsArray(arraySize) {
  let cardsArray = [];
  while (cardsArray.length < arraySize) {
    let randomNum = Math.floor(Math.random() * arraySize);
    if (!cardsArray.includes(randomNum + 1)) cardsArray.push(randomNum + 1);
  }
  for (let i = 0; i < cardsArray.length; i++) {
    if (cardsArray[i] > 6) cardsArray[i] = cardsArray[i] - 6;
  }
  return cardsArray;
}

// every card is an instance of a class Card.
// cardObj holds info: number and location on the board (maybe the location is not needed?)
// maybe use array of numbers to represent the cards stack.
// functions on the card:
// event listener to a click - will flip the card -> push to the array of flipped cards.
// check if the aray has a card with same number.
// if not remove the cards from the array
// maybe use a proparty in the obj of the card to marked flipped or not.
// also proparty of onboard(still in the game) or not (match was found).

// display the stack
// when clicked flip a card
// allow 2 cards to flip
// compare cards
// if match leave flipped or hide from display
// if no match leave a second for display and flip back
// count if wrong guess
