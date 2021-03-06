/**
 *
 *
 *
 */

'use strict';

const Dice = require('./core-dice');

let Player = {
    createPlayer: function (options) {
        if (!options) { options = {}; }
        return {
            name: options.name || '',
            race: '',
            stats: {
                WS: Dice.roll('D6', 4),
                BS: Dice.roll('D6', 4),
                S: Dice.roll('D4', 4),
                T: Dice.roll('D4', 3),
                S: Dice.roll('D6', 4),
                B: Dice.roll('D8', 3),
                I: Dice.roll('D8', 3),
                W: Dice.roll('D4', 1),
                FP: 2,
            },
            weapons: [{
                'type': 'Weapon Hand 2 Hand',
                'name': 'Sword',
                'range': 0,
                'damage': 3,
                'fumble': 1,
                'critical': 12
            }],
            armour: [],
            treasure: []
        };
    }
};

// var exports = module.exports = {};

var exports = module.exports = {
    createPlayer: Player.createPlayer
};
