/**
 *
 *
 *
 */

'use strict';

let Dice = {
    roll: function (dice, bonus) {
        var diceRoll = 0;
        if (!bonus) { bonus = 0; }
        switch (dice) {
          case 'D4':
            diceRoll = Math.floor(Math.random() * 4) + 1 + bonus;
            break;
          case 'D6':
            diceRoll = Math.floor(Math.random() * 6) + 1 + bonus;
            break;
          case 'D8':
            diceRoll = Math.floor(Math.random() * 8) + 1 + bonus;
            break;
        case 'D12':
            diceRoll = Math.floor(Math.random() * 12) + 1 + bonus;
            break;
        case 'D100':
            diceRoll = Math.floor(Math.random() * 100) + 1 + bonus;
            break;
          case '2D4':
            diceRoll = (Math.floor(Math.random() * 4) + 1 + Math.floor(Math.random() * 4) + 1) + bonus;
            break;
          case '2D6':
            diceRoll = (Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1) + bonus;
            break;
          case '2D8':
            diceRoll = (Math.floor(Math.random() * 8) + 1 + Math.floor(Math.random() * 8) + 1) + bonus;
            break;
          case '2D12':
            diceRoll = (Math.floor(Math.random() * 12) + 1 + Math.floor(Math.random() * 12) + 1) + bonus;
            break;
        }
        return diceRoll;
    }
};

var exports = module.exports = {
    roll: Dice.roll
};
