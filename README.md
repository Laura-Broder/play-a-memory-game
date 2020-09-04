## welcome page:

1. get name from the user
2. get game level from the user
3. press start button to revile the game board

## game display:

1. cards board
2. name of the player
3. number of errors display
4. restart button
5. optional: best players name and number of errors

### 1. get name from the user:

- input field - press on the start game button will trigger a function that saves the name to display on the game board.

### 2. get game level from the user

- radio: easy(12) / medium(18) / hard(24)

### 3. press start button to revile the game board

- save the input of name to the state object
- save the game level to the state object
- move to the game page - a main function of start game

## main function of start game:

### 1. create the cards board (with the game level number of cards):

1. randomize numbers in an array
2. create a card. each card holds only index in the array and add event listener that sends to an external functions:
   1. flip card.
   2. check if other cards were flipped.
   3. compare 2 cards.
   4. freeze display if wrong (plus other animations?) and add 1 to number of errors.
   5. flip the cards back (add class flipped?)
   6. if compare correct check if game end.
   7. if game end display massage.

### display the cards:

1. create card display function. a div with:
   - data-index = the index in the array.
     - the pic will be acordind to the number in the array on the index saved in the data-index attribute.
   - card class.
   - flipped: true/false
   - active: true/false
     - not active means the player found a match and the card is transparent/flipped permanently and not clickable = disconnect event listener.
