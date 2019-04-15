/**
 *
 *
 *
 */

'use strict';

const Dice = require('./core-dice');

const MonsterDatabase = [{
    race: 'Goblin',
    type: 'Lesser Monster',
    name: 'Goblin',
    stats: {
        WS: 5,
        BS: 5,
        S: 4,
        T: 5,
        S: 6,
        B: 5,
        I: 5,
        W: 2,
        FP: 2,
    },
    weapons: [{
        'type': 'Weapon Hand 2 Hand',
        'name': 'Sword',
        'range': 0,
        'damage': 2,
        'fumble': 1,
        'critical': 12
    }],
    armour: [],
    treasure: []
}];

let Monster = {
    RACE_TYPE: {
        GOBLIN: 'Goblin',
    },
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
        let spawnSeed = Math.floor(Math.random() * MonsterDatabase.length);
        return MonsterDatabase[spawnSeed];
    },
    getMonsterData: function () {

        return false;
    }
};

var exports = module.exports = {
    spawnMonster: Monster.spawnMonster
};
