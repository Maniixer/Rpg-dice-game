import characterData from "./data.js";
import Character from "./Character.js";
let loseSound = document.getElementById("loseSound");
let winSound = document.getElementById("winSound");

let monsterArray = ["orc", "demon", "goblin"];

function getNewMonster() {
  const nextMonsterData = characterData[monsterArray.shift()];
  return nextMonsterData ? new Character(nextMonsterData) : {};
}

function attack() {
  wizard.getDiceHtml();
  monster.getDiceHtml();
  wizard.takeDamage(monster.currentDiceScore);
  monster.takeDamage(wizard.currentDiceScore);
  render();

  if (wizard.dead) {
    endGame();
  } else if (monster.dead) {
    if (monsterArray.length) {
      monster = getNewMonster();
      render();
    } else {
      endGame();
    }
  }
}

function endGame() {
  wizard.health === 0 && monster.health === 0 ? loseSound.play() : wizard.health > 0 ? winSound.play() : loseSound.play();
  const endEmoji = wizard.health === 0 && monster.health === 0 ? "😭" : wizard.health > 0 ? "🔮" : "☠️";
  const endMessage =
    wizard.health === 0 && monster.health === 0
      ? "No victors - all creatures are dead"
      : wizard.health === 0
      ? `The ${monster.name} is Victorious`
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
  document.getElementById("monster").innerHTML = monster.getCharacterHtml();
}

document.getElementById("attack-button").addEventListener("click", attack);

const wizard = new Character(characterData.hero);
let monster = getNewMonster();
render();

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
