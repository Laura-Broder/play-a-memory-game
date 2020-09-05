const startBtn = document.querySelector(".startBtn");
const welcomeContainer = document.querySelector(".welcome-container");
// localStorage["continue"] === "no";

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

function addMsgToPrevPlayer(lastPlayerName, lastPlayerNumOfErrors) {
  const MsgToPrevPlayerContainer = document.createElement("div");
  MsgToPrevPlayerContainer.classList.add("MsgToPrevPlayerContainer");
  const playerName = document.createElement("h2");
  const playerNumOfErrors = document.createElement("h2");
  const playAgain = document.createElement("h2");

  playerName.textContent = `GREAT JOB ${lastPlayerName}!!!`;
  playerNumOfErrors.textContent = `You won the game with only ${lastPlayerNumOfErrors} errors!`;
  playAgain.textContent = `Do you want to play again???`;
  welcomeContainer.insertAdjacentElement(
    "afterbegin",
    MsgToPrevPlayerContainer,
  );
  MsgToPrevPlayerContainer.insertAdjacentElement("afterbegin", playAgain);
  MsgToPrevPlayerContainer.insertAdjacentElement(
    "afterbegin",
    playerNumOfErrors,
  );
  MsgToPrevPlayerContainer.insertAdjacentElement("afterbegin", playerName);
}

startBtn.addEventListener("click", function () {
  localStorage["chosenLevel"] = getGameLevel();
  localStorage["playerName"] = document.querySelector("#playerName").value;
  location.href = "./index.html";
});

if (localStorage["continue"] === "yes") {
  const lastPlayerNumOfErrors = localStorage["lastPlayerNumOfErrors"];
  const lastPlayerName = localStorage["lastPlayerName"];

  addMsgToPrevPlayer(lastPlayerName, lastPlayerNumOfErrors);
  localStorage["continue"] = "no";
}
