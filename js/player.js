// https://javascript.info/class

class Dice {
  constructor() {

  }

  roll(dice, bonus) {
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
}

class Player {

  constructor(name) {
    var randomDice = new Dice();
    this.name = name;
    this.race = '';
    this.stats = {
      WS: randomDice.roll('D6', 4),
      BS: randomDice.roll('D6', 4),
      S: randomDice.roll('D4', 4),
      T: randomDice.roll('D4', 3),
      S: randomDice.roll('D6', 4),
      B: randomDice.roll('D8', 3),
      I: randomDice.roll('D8', 3),
      W: randomDice.roll('D4', 1),
      FP: 2,
    };
    this.attackCombatSkill = [];
    this.rangedCombatSkill = [];
    this.weapons = [];
    this.armour = [];
    this.treasure = [];
  }

  applyEquipment(player) {
    return player;
  }

  getAttackCombatSkill(WS) {
    var attackCombatSkill = [];
    switch (WS) {
      case 1:
        attackCombatSkill = [];
        break;
    }
  }

  getRangedCombatSkill(BS) {
    var rangedCombatSkill = [];
    switch (BS) {
      case 1:
        rangedCombatSkill = [];
        break;
    }
  }

}

class Treasure {
  constructor() {
    
  }

  getRandomTreasure() {
    // magic armour
    return {
      type: 'weapon',
      name: 'Sword',
      ranged: 0,
      damageDice: 4,
      fumble: 1,
      critical: 12
    };
  }
}

class Combat {

  fight(player, target) {
    var randomDice = new Dice();
    var fightReport = {
      attackRoll: randomDice.roll('D12'),
      freeAttack: {
        attackRoll: 0,
        woundDamage: 0
      },
      woundDamage: 0
    };
    switch (fightReport.attackRoll) {
      case 1:
        console.log('Fumble');
        break;
      case 12:
        fightReport.freeAttack.attackRoll = randomDice.roll('D12');
        console.log('Critical Hit');
        break;
      default:
        console.log('Hit');
        break;
    }

    fightReport.woundDamage = randomDice.roll('D12') - target.T;

  }

}

class Simulate {
  constructor() {
    this.player = new Player('Player');
    this.enemy = new Player('Enemy');
    this.combat = new Combat();
    this.combatRounds = [];
  }
  attackRound() {
    var result = this.combat.fight(this.player, this.enemy);
    this.combatRounds.push(result);
  }
}