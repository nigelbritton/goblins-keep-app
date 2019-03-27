//let GoblinsKeepCore = require('./app/goblins-keep/core');
const Dice = require('./app/goblins-keep/core-dice');
const Player = require('./app/goblins-keep/core-player');
const Combat = require('./app/goblins-keep/core-combat');
const Simulate = require('./app/goblins-keep/core-simulate');

//console.log(GoblinsKeepCore.Player.createPlayer());
//console.log(GoblinsKeepCore.Simulate.attackSimulate());
//console.log(Dice.roll('D8'));

let player = Player.createPlayer({name: 'Bob'});
let enemy = Player.createPlayer({name: 'Bot'});

// console.log(player);
// console.log(enemy);

let result = Simulate.attackSimulate(player, enemy);

console.log(result);
