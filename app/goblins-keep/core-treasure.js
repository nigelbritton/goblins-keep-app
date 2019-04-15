/**
 *
 *
 *
 */

'use strict';

const Dice = require('./core-dice');
const Monster = require('./core-monster');

let Treasure = {
    getTreasure: function (target) {
        this.treasure = {
            gold: 0
        };

        if (!target.class) {
            this.treasure.gold = Dice.roll('D6');
        } else {
            if (target.class == Monster.CLASS_TYPE.VERMIN) {

            } else if (target.class == Monster.CLASS_TYPE.FERAL_ANIMAL) {

            } else if (target.class == Monster.CLASS_TYPE.LESSER_MOB) {

            } else if (target.class == Monster.CLASS_TYPE.NORMAL_MOB) {

            } else if (target.class == Monster.CLASS_TYPE.GREATER_MOB) {

            } else if (target.class == Monster.CLASS_TYPE.LEGENDARY_MOB) {

            }
        }

        return this.treasure;
    },
    getTreasureMagic: function () {
        let treasureRoll = Dice.roll('D12'),
            treasureFound = false;

        switch (treasureRoll) {
            case 2:
                break;
            case 12:
                break;
        }

        return treasureFound;
    },
    getTreasureChest: function () {
        let treasureRoll = Dice.roll('D12'),
            treasureFound = false;

        switch (treasureRoll) {
            case 2:
                break;
            case 12:
                treasureFound = this.getTreasureMagic();
                break;
        }

        return treasureFound;
    }
};

var exports = module.exports = {
    getTreasure: Treasure.getTreasure
};
