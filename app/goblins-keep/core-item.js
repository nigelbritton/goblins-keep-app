/**
 *
 *
 *
 */

'use strict';

const Dice = require('./core-dice');

const ItemDatabase = [{
    'type': Item.ITEM_TYPE.WEAPON_HAND2HAND,
    'name': 'Rusty Sword',
    'range': 0,
    'damage': 1,
    'fumble': 1,
    'critical': 12
},{
    'type': Item.ITEM_TYPE.WEAPON_HAND2HAND,
    'name': 'Sword',
    'range': 0,
    'damage': 2,
    'fumble': 1,
    'critical': 12
},{
    'type': Item.ITEM_TYPE.WEAPON_HAND2HAND,
    'name': 'Sword',
    'range': 0,
    'damage': 3,
    'fumble': 1,
    'critical': 12
},{
    'type': Item.ITEM_TYPE.WEAPON_HAND2HAND,
    'name': 'Double Handed Sword',
    'range': 0,
    'damage': 6,
    'fumble': 2,
    'critical': 11
},{
    'type': Item.ITEM_TYPE.WEAPON_HAND2HAND,
    'name': 'Double Handed Axe',
    'range': 0,
    'damage': 5,
    'fumble': 2,
    'critical': 11
},{
    'type': Item.ITEM_TYPE.WEAPON_HAND2HAND,
    'name': 'Dagger',
    'range': 0,
    'damage': 1,
    'fumble': 1,
    'critical': 12
},{
    'type': Item.ITEM_TYPE.WEAPON_RANGED,
    'name': 'Long Bow',
    'range': 1,
    'damage': 4,
    'fumble': 1,
    'critical': 12
}];

let Item = {
    ITEM_TYPE: {
        WEAPON_HAND2HAND: 'Weapon Hand 2 Hand',
        WEAPON_RANGED: 'Weapon Ranged',
        ARMOUR: 'Armour'
    },
    getItem: function (itemId) {
        let itemData = false;
        ItemDatabase.forEach(function(item, index){
            itemData = item;
        });

        return itemData;
    }
};

var exports = module.exports = {
    getItem: Item.getItem
};
