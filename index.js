import characterData from "./data.js";
import Character from "./Character.js";

// //NEW CODE
// const DIED_STATES = {
//   ORC: {
//     emoji: "☠️",
//     message: "The Orc is Victorious",
//   },
//   WIZARD: {
//     emoji: "🔮",
//     message: "The Wizard Wins",
//   },
//   BOTH: {
//     emoji: "😭",
//     message: "No victors - all creatures are dead",
//   },
// };
// //NEW CODE
// function whoDied() {
//   if (wizard.dead && orc.dead) return "BOTH";
//   if (wizard.dead) return "ORC";
//   return "WIZARD";
// }
// //NEW CODE
// function endMessageV2() {
//   const died = whoDied();
//   const { emoji, message } = DIED_STATES[died];

//   document.querySelector("body").innerHTML = `<div class="end-game">
//       <h2>Game Over</h2>
//       <h3>${message}</h3>
//       <p class="end-emoji">${emoji}</p>
//   </div>`;
// }

function attack() {
  wizard.getDiceHtml();
  orc.getDiceHtml();
  wizard.takeDamage(orc.currentDiceScore);
  orc.takeDamage(wizard.currentDiceScore);
  render();
  if (wizard.dead || orc.dead) {
    endGame();
  }
}

function endGame() {
  let loseSound = document.getElementById("loseSound");
  let winSound = document.getElementById("winSound");
  const endSound = wizard.dead && orc.dead ? loseSound.play() : orc.dead ? winSound.play() : loseSound.play();
  const endEmoji = wizard.dead && orc.dead ? "😭" : orc.dead ? "🔮" : "☠️";
  const endMessage =
    wizard.health === 0 && orc.health === 0
      ? "No victors - all creatures are dead"
      : wizard.health === 0
      ? "The Orc is Victorious"
      : "The Wizard Wins";

  setTimeout(function () {
    document.querySelector("body").innerHTML = `<div class="end-game">
        <h2>Game Over</h2>
        <h3>${endMessage}</h3>
        <p class="end-emoji">${endEmoji}</p>
    </div>`;
  }, 2700);
}

function render() {
  document.getElementById("hero").innerHTML = wizard.getCharacterHtml();
  document.getElementById("monster").innerHTML = orc.getCharacterHtml();
}

document.getElementById("attack-button").addEventListener("click", attack);

const wizard = new Character(characterData.hero);
const orc = new Character(characterData.monster);
render();
