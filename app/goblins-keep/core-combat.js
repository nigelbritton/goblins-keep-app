/**
 *
 *
 *
 */

'use strict';

const Dice = require('./core-dice');

let Combat = {
    fight: function (player, target) {
        var fightReport = {
            status: '',
            attackRoll: 0
        };

        fightReport = this.attackHitCheck(player, target);

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
        var hitRoll = Dice.roll('D12');
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
            status: 'Hit',
            attackDamageRolls: []
        };
        switch (hitRoll) {
            case 1:
                hitSuccess.status = 'Fumble';
                break;
            case 12:
                hitSuccess.status = 'Critical Hit';
                for (let attackRounds = 0; attackRounds < player.weapons[0].damage; attackRounds++) {
                    let attackDamageRoll = {
                        damageRoll: Dice.roll('D12'),
                        wounded:  false
                    };
                    if (attackDamageRoll.damageRoll >= target.stats.T) {
                        attackDamageRoll.wounded = true;
                    }
                    hitSuccess.attackDamageRolls.push(attackDamageRoll);
                }
                // Bonus Attack
                for (let attackRounds = 0; attackRounds < player.weapons[0].damage; attackRounds++) {
                    let attackDamageRoll = {
                        damageRoll: Dice.roll('D12'),
                        wounded:  false
                    };
                    if (attackDamageRoll.damageRoll >= target.stats.T) {
                        attackDamageRoll.wounded = true;
                    }
                    hitSuccess.attackDamageRolls.push(attackDamageRoll);
                }
                break;
            default:
                hitSuccess.status = (hitRoll >= hitTargetValue ? 'Hit' : 'Miss');
                if (hitSuccess.status === 'Hit') {
                    for (let attackRounds = 0; attackRounds < player.weapons[0].damage; attackRounds++) {
                        let attackDamageRoll = {
                            damageRoll: Dice.roll('D12'),
                            wounded:  false
                        };
                        if (attackDamageRoll.damageRoll >= target.stats.T) {
                            attackDamageRoll.wounded = true;
                        }
                        hitSuccess.attackDamageRolls.push(attackDamageRoll);
                    }
                }
                break;
        }
        return hitSuccess;
    }
};

var exports = module.exports = {
    fight: Combat.fight,
    attackHitCheck: Combat.attackHitCheck
};
