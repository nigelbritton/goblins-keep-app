/**
 *
 *
 *
 */

'use strict';

const Dice = require('./core-dice');

let Monster = {
    CLASS_TYPE: {
        VERMIN: 'Vermin',
        FERAL_ANIMAL: 'Feral Animal',
        HUMANOID: 'Humanoid',
        LESSER_MOB: 'Lesser Monster',
        NORMAL_MOB: 'Normal Monster',
        GREATER_MOB: 'Greater Monster',
        LEGENDARY_MOB: 'Legendary Monster',
    },
    spawnMonster: function (classType) {

        return false;
    },
    getMonsterData: function () {

        return false;
    }
};

var exports = module.exports = {
    spawnMonster: Monster.spawnMonster
};
