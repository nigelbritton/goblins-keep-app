/**
 *
 *
 *
 */

'use strict';

const Combat = require('./core-combat');
const Treasure = require('./core-treasure');

let Simulate = {
    attackSimulate: function (player, target) {
        this.player = player;
        this.target = target;
        this.combatRounds = [];
        this.treasure = Treasure.getTreasure(target);

        var combatRoundResult,
            attackLoop = 0;

        while (this.player.stats.W > 0 && this.target.stats.W > 0 && attackLoop < 10) {
            combatRoundResult = Combat.fight(this.player, this.target);
            if (combatRoundResult.wounded === true) {
                this.target.stats.W--;
            }
            this.combatRounds.push(combatRoundResult);

            combatRoundResult = Combat.fight(this.target, this.player);
            if (combatRoundResult.wounded === true) {
                this.player.stats.W--;
            }
            this.combatRounds.push(combatRoundResult);

            attackLoop++;
        }

        return {
            player: this.player,
            target: this.target,
            combatRounds: this.combatRounds,
            treasure: this.treasure
        };
    }
};

var exports = module.exports = {
    attackSimulate: Simulate.attackSimulate
};
