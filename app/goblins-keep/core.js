/**
 *
 *
 *
 */

'use strict';

let MongoDB = require('mongodb');
let MongoClient = require('mongodb').MongoClient;
let request = require('request');

let debug = require('debug')('goblins-keep-app');

const Player = require('./core-player');

let GoblinsKeepLibrary = {
    Client: null,
    Database: null,
    Collection: null,
    Dice: {
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
    },
    Player: null,
    Treasure: {

    },
    Combat: {
        fight: function (player, target) {
            var fightReport = {
                status: '',
                attackRoll: 0
            };

            fightReport = GoblinsKeepLibrary.Combat.attackHitCheck(player, target);

            switch (fightReport.status) {
                case 'Fumble':
                    break;
                case 'Critical Hit':
                    //fightReport.woundDamage = GoblinsKeepLibrary.Dice.roll('D12') - target.stats.T;
                    //fightReport.freeAttack.attackRoll = GoblinsKeepLibrary.Dice.roll('D12');
                    break;
                default:
                    //fightReport.woundDamage = GoblinsKeepLibrary.Dice.roll('D12') - target.stats.T;
                    // attack loop (see weapon); anything over Tough -1 HP from target
                    break;
            }
            return fightReport;
        },
        attackHitCheck: function (player, target) {
            var hitRoll = GoblinsKeepLibrary.Dice.roll('D12');
            var hitTable = [
                [  7,  8,  9, 10, 10, 10, 10, 10, 10, 10, 10, 10], // 1
                [  6,  7,  8,  9, 10, 10, 10, 10, 10, 10, 10, 10], // 2
                [  5,  6,  7,  8,  9, 10, 10, 10, 10, 10, 10, 10], // 3
                [  4,  5,  6,  7,  8,  9, 10, 10, 10, 10, 10, 10], // 4
                [  3,  4,  5,  6,  7,  8,  9, 10, 10, 10, 10, 10], // 5
                [  2,  3,  4,  5,  6,  7,  8,  9, 10, 10, 10, 10], // 6
                [  2,  2,  3,  4,  5,  6,  7,  8,  9, 10, 10, 10], // 7
                [  2,  2,  2,  3,  4,  5,  6,  7,  8,  9, 10, 10], // 8
                [  2,  2,  2,  2,  3,  4,  5,  6,  7,  8,  9, 10], // 9
                [  2,  2,  2,  2,  2,  3,  4,  5,  6,  7,  8,  9], // 10
                [  2,  2,  2,  2,  2,  2,  3,  4,  5,  6,  7,  8], // 11
                [  2,  2,  2,  2,  2,  2,  2,  3,  4,  5,  6,  7], // 12
            ];
            var hitTargetValue = hitTable[player.stats.WS-1][target.stats.WS-1];
            var hitSuccess = {
                attackRoll: hitRoll,
                status: 'Hit'
            };
            switch (hitRoll) {
                case 1:
                    hitSuccess.status = 'Fumble';
                    break;
                case 12:
                    hitSuccess.status = 'Critical Hit';
                    break;
                default:
                    hitSuccess.status = (hitRoll >= hitTargetValue ? 'Hit' : 'Miss');
                    break;
            }
            return hitSuccess;
        }
    },
    Simulate: {
        attackSimulate: function () {
            this.player = GoblinsKeepLibrary.Player.createPlayer({name: 'Player'});
            this.enemy = GoblinsKeepLibrary.Player.createPlayer({name: 'Enemy'});
            this.combatRounds = [];

            var combatRoundResult;

            combatRoundResult = GoblinsKeepLibrary.Simulate.attackRound(this.player, this.enemy);
            this.combatRounds.push(combatRoundResult);
            combatRoundResult = GoblinsKeepLibrary.Simulate.attackRound(this.player, this.enemy);
            this.combatRounds.push(combatRoundResult);
            combatRoundResult = GoblinsKeepLibrary.Simulate.attackRound(this.player, this.enemy);
            this.combatRounds.push(combatRoundResult);
            combatRoundResult = GoblinsKeepLibrary.Simulate.attackRound(this.player, this.enemy);
            this.combatRounds.push(combatRoundResult);

            return this;
        },
        attackRound: function (player, enemy) {
            return GoblinsKeepLibrary.Combat.fight(player, enemy);
        }
    }
};

function GoblinsKeep ( applicationConfig ) {
    let self = this;

    //this.Client = null;
    //this.Database = null;
    //this.Collection = null;

    if (process.env.DATABASE_URL !== '') {
        MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, function (err, client) {
            if (err) {
                debug("Error connecting: " + err.message);
            } else {
                self.Client = client;
            }
        });
    }

}

/**
 * Expose `GoblinsKeep()`.
 */

var exports = module.exports = {
    Treasure: null,
    Player: Player,
    attackSimulate: GoblinsKeepLibrary.Simulate.attackSimulate
};
