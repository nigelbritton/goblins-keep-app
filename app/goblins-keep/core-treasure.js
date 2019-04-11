/**
 *
 *
 *
 */

'use strict';

const Dice = require('./core-dice');

let Treasure = {
    CLASS_TYPE: {
        VERMIN: 'Vermin',
        FERAL_ANIMAL: 'Feral Animal',
        LESSER_MOB: 'Lesser Monster',
        NORMAL_MOB: 'Normal Monster',
        GREATER_MOB: 'Greater Monster',
        LEGENDARY_MOB: 'Legendary Monster',
    },
    getTreasure: function (target) {
        this.treasure = {
            gold: 0
        };

        if (!target.class) {
            this.treasure.gold = Dice.roll('D6');
        } else {
            if (target.class == this.CLASS_TYPE.VERMIN) {

            } else if (target.class == this.CLASS_TYPE.FERAL_ANIMAL) {

            } else if (target.class == this.CLASS_TYPE.LESSER_MOB) {

            } else if (target.class == this.CLASS_TYPE.NORMAL_MOB) {

            } else if (target.class == this.CLASS_TYPE.GREATER_MOB) {

            } else if (target.class == this.CLASS_TYPE.LEGENDARY_MOB) {

            }
        }

        return this.treasure;
    }
};

var exports = module.exports = {
    getTreasure: Treasure.getTreasure
};
