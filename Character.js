import { getDiceRollArray, getDicePlaceholderHtml, getPercentage } from "./utils.js";

class Character {
  constructor(data) {
    Object.assign(this, data);
    this.diceHtml = getDicePlaceholderHtml(this.diceCount);
    //max health of each character
    this.maxHealth = this.health;
  }

  setDiceHtml = function (diceCount) {
    this.currentDiceScore = getDiceRollArray(this.diceCount);
    this.diceHtml = this.currentDiceScore.map((num) => `<div class="dice">${num}</div>`).join("");
  };

  takeDamage = function (attackScoreArray) {
    const totalAttackScore = attackScoreArray.reduce((total, num) => total + num);
    this.health -= totalAttackScore;
    if (this.health <= 0) {
      this.dead = true;
      this.health = 0;
    }
  };

  getHealthBarHtml = function () {
    const percent = getPercentage(this.health, this.maxHealth);

    return `<div class="health-bar-outer">
                <div class="health-bar-inner ${percent <= 25 ? "danger" : ""}" 
                    style="width: ${percent}%;">
                </div>
              </div>`;
  };

  getCharacterHtml = function () {
    const { name, avatar, health, diceHtml } = this;
    const healthBar = this.getHealthBarHtml();
    return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                ${healthBar}
                <div class="dice-container">
                    ${diceHtml}
                </div>
            </div>`;
  };
}

export default Character;
