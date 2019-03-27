/**
 * Created on 29/05/2018.
 */

'use strict';

module.exports = function ( applicationConfig ) {

    let express = require('express');
    let router = express.Router();
    let debug = require('debug')('goblins-keep-app:routing-api');

    // let GoblinsKeepCore = require('../goblins-keep/core')(applicationConfig);

    router.get('/', function(req, res, next) {
        // GoblinsKeepCore.Dice.roll('D6');
        // var Player = new GoblinsKeepCore.Player;
        // GoblinsKeepCore.request()
        // var coretest = GoblinsKeepCore.Dice.roll('D6', 1);
        
        // Buffer.from('username:password').toString('base64');
        res.send({
            //player: Player.createPlayer({name:'Bob'}),
            auth: Buffer.from('username:password').toString('base64'),
            version: applicationConfig.version
        });
    });

    router.post('/login', function(req, res, next) {
        res.send({
            version: applicationConfig.version
        });
    });

    router.post('/register', function(req, res, next) {
        res.send({
            version: applicationConfig.version
        });
    });

    return router;

};