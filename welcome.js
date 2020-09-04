const startBtn = document.querySelector(".startBtn");

startBtn.addEventListener("click", function () {
  localStorage["chosenLevel"] = getGameLevel();
  localStorage["playerName"] = document.querySelector("#playerName").value;
  location.href = "./index.html";
});

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
