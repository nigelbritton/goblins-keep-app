/**
 *
 *
 * https://developer.tizen.org/community/tip-tech/creating-isometric-world-phaser.js-using-isometric-plugin
 */

var KeeperGame = {
    game: null,
    width: window.innerWidth,
    height: window.innerHeight,

    txt: '',
    finalTxt: '',

    currentItemCount: 0, // starting number of collected items
    totalItemCount: 4, // total number of items to be collected

    Ndown: false,
    Sdown: false,
    Edown: false,
    Wdown: false,
    SEdown: false,
    NEdown: false,
    SWdown: false,
    NWdown: false,

    isEven: function (someNumber) {
        return (someNumber % 2 == 0) ? true : false;
    },

    rndNum: function (num) {
        return Math.round(Math.random() * num);
    },

    addItem: function () {
        KeeperGame.currentItemCount++;
        KeeperGame.updateText();
    },

    updateText: function () {
        KeeperGame.txt = "ITEMS: " + KeeperGame.currentItemCount + "/" + KeeperGame.totalItemCount;
        itemsTxt.setText(KeeperGame.txt);
    },

    updateEndText: function (_t) {
        switch (_t) {
            case 0:
                KeeperGame.finalTxt = "";
                break;

            case 1:
                KeeperGame.finalTxt = "YOU MUST FIND ALL THE ITEMS!!!";
                break;

            case 2:
                KeeperGame.finalTxt = "YOU FOUND ALL THE ITEMS!!! :)";
                break;
        }
        endTxt.setText(KeeperGame.finalTxt);
    },

    init: function () {
        KeeperGame.game = new Phaser.Game(KeeperGame.width, KeeperGame.height, Phaser.AUTO, 'test', null, false, true);

        KeeperGame.game.state.add('Boot', KeeperGame.boot);
        KeeperGame.game.state.start('Boot');
    },

    boot: function (game) {
        this.preload = function () {
            game.load.image('cactus1', 'images/tiles/obstacle1.png');
            game.load.image('cactus2', 'images/tiles/obstacle2.png');
            game.load.image('rock', 'images/tiles/obstacle3.png');

            game.load.image('gold', 'images/tiles/find1_gold.png');
            game.load.image('revolver', 'images/tiles/find2_revolver.png');
            game.load.image('badge', 'images/tiles/find3_badge.png');
            game.load.image('skull', 'images/tiles/find4_skull.png');

            game.load.image('exit', 'images/tiles/exit.png');
            game.load.image('tile', 'images/tiles/ground_tile.png');

            game.load.image('grass1', 'images/tiles/ground_tile_grass1.png');
            game.load.image('grass2', 'images/tiles/ground_tile_grass2.png');
            game.load.image('grass3', 'images/tiles/ground_tile_grass3.png');

            game.load.image('mine', 'images/tiles/mine.png');

            game.load.image('E', 'images/controls/E.png');
            game.load.image('N', 'images/controls/N.png');
            game.load.image('NE', 'images/controls/NE.png');
            game.load.image('NW', 'images/controls/NW.png');
            game.load.image('S', 'images/controls/S.png');
            game.load.image('SE', 'images/controls/SE.png');
            game.load.image('SW', 'images/controls/SW.png');
            game.load.image('W', 'images/controls/W.png');

            game.load.spritesheet('characterAnim', 'images/tiles/characterAnim.png', 70, 74);

            game.load.atlasJSONHash('tileset', 'assets/tileset.png', 'assets/tileset.json');

            game.time.advancedTiming = true;

            // Add the Isometric plug-in to Phaser
            game.plugins.add(new Phaser.Plugin.Isometric(game));

            // Set the world size
            game.world.setBounds(0, 0, 2048, 1024);

            // Start the physical system
            game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

            // set the middle of the world in the middle of the screen
            game.iso.anchor.setTo(0.5, 0);
        };
        this.create = function () {

            // set the Background color of our game
            game.stage.backgroundColor = "0xde6712";

            // create groups for different tiles
            floorGroup = game.add.group();
            itemGroup = game.add.group();
            grassGroup = game.add.group();
            obstacleGroup = game.add.group();

            // set the gravity in our game
            game.physics.isoArcade.gravity.setTo(0, 0, -500);

            // create the floor tiles
            var floorTile;
            /*for (var xt = 1024; xt > 0; xt -= 35) {
                for (var yt = 1024; yt > 0; yt -= 35) {
                    floorTile = game.add.isoSprite(xt, yt, 0, 'tileset', 'grass', floorGroup);
                            //  game.add.isoSprite(x, y, 0, 'tileset', tileArray[tiles[i]], isoGroup);
                    floorTile.anchor.set(0.5);
                }
            }*/
            for (var xt = 0; xt < 1024; xt += 35) {
                for (var yt = 0; yt < 1024; yt += 35) {
                    var tileId = 'grass';
                    switch (KeeperGame.rndNum(5)) {
                        case 1:
                            tileId = 'sandstone';
                            break;
                        case 2:
                            tileId = 'stone';
                            break;
                        case 3:
                            tileId = 'water';
                            break;
                        case 5:
                            tileId = 'wall';
                            break;
                    }
                    if (tileId == 'wall') {
                        floorTile = game.add.isoSprite(xt, yt, 0, 'tileset', tileId, obstacleGroup);
                        // floorTile.isoZ += 32;
                        floorTile.anchor.set(0.5, 1);
                        KeeperGame.game.physics.isoArcade.enable(floorTile);
                        floorTile.body.collideWorldBounds = true;
                        floorTile.body.immovable = true;
                    } else {
                        floorTile = game.add.isoSprite(xt, yt, 0, 'tileset', tileId, floorGroup);
                    }
                    //  game.add.isoSprite(x, y, 0, 'tileset', tileArray[tiles[i]], isoGroup);
                    floorTile.anchor.set(0.5);
                }
            }

            // create the grass tiles randomly
            var grassTile;
            for (var xt = 1024; xt > 0; xt -= 35) {
                for (var yt = 1024; yt > 0; yt -= 35) {

                    var rnd = KeeperGame.rndNum(20);

                    if (rnd == 0) {
                        grassTile = game.add.isoSprite(xt, yt, 0, 'grass1', 0, grassGroup);
                        grassTile.anchor.set(0.5);
                    }
                    else if (rnd == 1) {
                        grassTile = game.add.isoSprite(xt, yt, 0, 'grass2', 0, grassGroup);
                        grassTile.anchor.set(0.5);
                    }
                    else if (rnd == 2) {
                        grassTile = game.add.isoSprite(xt, yt, 0, 'grass3', 0, grassGroup);
                        grassTile.anchor.set(0.5);
                    }



                }
            }

            // create an immovable cactus tile and randomly choose one of two graphical cactus representations
            /*var cactus1;
            for (var xt = 1024; xt > 0; xt -= 400) {
                for (var yt = 1024; yt > 0; yt -= 400) {

                    var rnd = KeeperGame.rndNum(1);

                    if (rnd == 0) {
                        cactus1 = game.add.isoSprite(xt, yt, 0, 'cactus1', 0, obstacleGroup);
                    }
                    else {
                        cactus1 = game.add.isoSprite(xt, yt, 0, 'cactus2', 0, obstacleGroup);
                    }

                    cactus1.anchor.set(0.5);

                    // Let the physics engine do its job on this tile type
                    game.physics.isoArcade.enable(cactus1);

                    // This will prevent our physic bodies from going out of the screen
                    cactus1.body.collideWorldBounds = true;

                    // Make the cactus body immovable
                    cactus1.body.immovable = true;

                }
            }*/


            /*var rock;
            for (var xt = 1024; xt > 0; xt -= 400) {
                for (var yt = 1024; yt > 0; yt -= 400) {

                    rock = game.add.isoSprite(xt + 80, yt + 80, 0, 'rock', 0, obstacleGroup);
                    rock.anchor.set(0.5);

                    // Let the physics engine do its job on this tile type
                    game.physics.isoArcade.enable(rock);

                    // This will prevent our physic bodies from going out of the screen
                    rock.body.collideWorldBounds = true;

                    // set the physics bounce amount on each axis  (X, Y, Z)
                    rock.body.bounce.set(0.2, 0.2, 0);

                    // set the slow down rate on each axis (X, Y, Z)
                    rock.body.drag.set(100, 100, 0);
                }
            }*/

            // create a mine object which will be our ending point in the game
            var mine = game.add.isoSprite(800, 100, 0, 'mine', 0, obstacleGroup);
            mine.anchor.set(0.5);

            game.physics.isoArcade.enable(mine);
            mine.body.collideWorldBounds = true;
            mine.body.immovable = true;

            // create collectible items
            marker = game.add.isoSprite(KeeperGame.rndNum(800), KeeperGame.rndNum(800), 0, 'gold', 0, itemGroup);
            game.physics.isoArcade.enable(marker);
            marker.body.collideWorldBounds = true;
            marker.anchor.set(0.5);

            marker2 = game.add.isoSprite(KeeperGame.rndNum(800), KeeperGame.rndNum(800), 0, 'revolver', 0, itemGroup);
            game.physics.isoArcade.enable(marker2);
            marker2.body.collideWorldBounds = true;
            marker2.anchor.set(0.5);

            marker3 = game.add.isoSprite(KeeperGame.rndNum(800), KeeperGame.rndNum(800), 0, 'badge', 0, itemGroup);
            game.physics.isoArcade.enable(marker3);
            marker3.body.collideWorldBounds = true;
            marker3.anchor.set(0.5);

            marker4 = game.add.isoSprite(KeeperGame.rndNum(800), KeeperGame.rndNum(800), 0, 'skull', 0, itemGroup);
            game.physics.isoArcade.enable(marker4);
            marker4.body.collideWorldBounds = true;
            marker4.anchor.set(0.5);

            // create the exit marker next to the mine object
            exitMarker = game.add.isoSprite(830, 194, 0, 'exit', 0, itemGroup);
            game.physics.isoArcade.enable(exitMarker);
            exitMarker.body.collideWorldBounds = true;
            exitMarker.anchor.set(0.5);
            exitMarker.alpha = 0.5;


            // create the collected item text
            itemsTxt = game.add.text(100, 8, KeeperGame.txt, {
                font: "16px Arial",
                fill: "#FFFFFF",
                align: "center"
            });

            itemsTxt.fixedToCamera = true;

            // create the information text field about the status of the game
            endTxt = game.add.text(0, 8, KeeperGame.finalTxt, {
                font: "18px Arial",
                fill: "#FFFF00",
                align: "center"
            });

            endTxt.fixedToCamera = true;
            endTxt.anchor.x = Math.round(endTxt.width * 0.5) / endTxt.width;
            endTxt.cameraOffset.x = (KeeperGame.width / 3) * 2;

            // update both text fields
            KeeperGame.updateText();
            KeeperGame.updateEndText();

            // create control button sprites on the screen
            cNW = game.add.sprite(0, 100, 'NW');
            cNW.fixedToCamera = true;
            cNW.inputEnabled = true;
            cNW.events.onInputDown.add(onDown, this);
            cNW.events.onInputOver.add(onDown, this);
            cNW.events.onInputUp.add(onUp, this);
            cNW.events.onInputOut.add(onUp, this);

            cW = game.add.sprite(0, 176, 'W');
            cW.fixedToCamera = true;
            cW.inputEnabled = true;
            cW.events.onInputDown.add(onDown, this);
            cW.events.onInputOver.add(onDown, this);
            cW.events.onInputUp.add(onUp, this);
            cW.events.onInputOut.add(onUp, this);

            cSW = game.add.sprite(0, 252, 'SW');
            cSW.fixedToCamera = true;
            cSW.inputEnabled = true;
            cSW.events.onInputDown.add(onDown, this);
            cSW.events.onInputOver.add(onDown, this);
            cSW.events.onInputUp.add(onUp, this);
            cSW.events.onInputOut.add(onUp, this);

            cN = game.add.sprite(76, 100, 'N');
            cN.fixedToCamera = true;
            cN.inputEnabled = true;
            cN.events.onInputDown.add(onDown, this);
            cN.events.onInputOver.add(onDown, this);
            cN.events.onInputUp.add(onUp, this);
            cN.events.onInputOut.add(onUp, this);

            cS = game.add.sprite(76, 252, 'S');
            cS.fixedToCamera = true;
            cS.inputEnabled = true;
            cS.events.onInputDown.add(onDown, this);
            cS.events.onInputOver.add(onDown, this);
            cS.events.onInputUp.add(onUp, this);
            cS.events.onInputOut.add(onUp, this);

            cNE = game.add.sprite(152, 100, 'NE');
            cNE.fixedToCamera = true;
            cNE.inputEnabled = true;
            cNE.events.onInputDown.add(onDown, this);
            cNE.events.onInputOver.add(onDown, this);
            cNE.events.onInputUp.add(onUp, this);
            cNE.events.onInputOut.add(onUp, this);

            cE = game.add.sprite(152, 176, 'E');
            cE.fixedToCamera = true;
            cE.inputEnabled = true;
            cE.events.onInputDown.add(onDown, this);
            cE.events.onInputOver.add(onDown, this);
            cE.events.onInputUp.add(onUp, this);
            cE.events.onInputOut.add(onUp, this);

            cSE = game.add.sprite(152, 252, 'SE');
            cSE.fixedToCamera = true;
            cSE.inputEnabled = true;
            cSE.events.onInputDown.add(onDown, this);
            cSE.events.onInputOver.add(onDown, this);
            cSE.events.onInputUp.add(onUp, this);
            cSE.events.onInputOut.add(onUp, this);

            // create control functions for the control buttons
            function onDown(sprite, pointer) {

                if (sprite.key == "N") {

                    KeeperGame.Ndown = true;

                }

                if (sprite.key == "S") {

                    KeeperGame.Sdown = true;

                }

                if (sprite.key == "SE") {

                    KeeperGame.SEdown = true;

                }

                if (sprite.key == "SW") {

                    KeeperGame.SWdown = true;

                }

                if (sprite.key == "NW") {

                    KeeperGame.NWdown = true;

                }

                if (sprite.key == "NE") {

                    KeeperGame.NEdown = true;

                }

                if (sprite.key == "E") {

                    KeeperGame.Edown = true;

                }

                if (sprite.key == "W") {

                    KeeperGame.Wdown = true;

                }


            }


            function onUp(sprite, pointer) {

                KeeperGame.Ndown = false;
                KeeperGame.Sdown = false;
                KeeperGame.SEdown = false;
                KeeperGame.SWdown = false;
                KeeperGame.NEdown = false;
                KeeperGame.NWdown = false;
                KeeperGame.Edown = false;
                KeeperGame.Wdown = false;

            }

            controls = game.add.group();
            controls.add(cN);
            controls.add(cS);
            controls.add(cW);
            controls.add(cE);
            controls.add(cNE);
            controls.add(cNW);
            controls.add(cSE);
            controls.add(cSW);

            controls.alpha = 0.6;

            // Creste the player
            player = game.add.isoSprite(350, 280, 0, 'characterAnim', 0, obstacleGroup);

            player.alpha = 0.6;

            // add the animations from the spritesheet
            player.animations.add('S', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
            player.animations.add('SW', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
            player.animations.add('W', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
            player.animations.add('NW', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
            player.animations.add('N', [32, 33, 34, 35, 36, 37, 38, 39], 10, true);
            player.animations.add('NE', [40, 41, 42, 43, 44, 45, 46, 47], 10, true);
            player.animations.add('E', [48, 49, 50, 51, 52, 53, 54, 55], 10, true);
            player.animations.add('SE', [56, 57, 58, 59, 60, 61, 62, 63], 10, true);

            player.anchor.set(0.5);

            // enable physics on the player
            game.physics.isoArcade.enable(player);
            player.body.collideWorldBounds = true;

            game.camera.follow(player);
        };
        this.update = function () {

            // Move the player
            var speed = 100;

            if (KeeperGame.Ndown == true) {
                player.body.velocity.y = -speed;
                player.body.velocity.x = -speed;
            }
            else if (KeeperGame.Sdown == true) {
                player.body.velocity.y = speed;
                player.body.velocity.x = speed;
            }
            else if (KeeperGame.Edown == true) {
                player.body.velocity.x = speed;
                player.body.velocity.y = -speed;
            }
            else if (KeeperGame.Wdown == true) {
                player.body.velocity.x = -speed;
                player.body.velocity.y = speed;
            }
            else if (KeeperGame.SEdown == true) {
                player.body.velocity.x = speed;
                player.body.velocity.y = 0;
            }
            else if (KeeperGame.SWdown == true) {
                player.body.velocity.y = speed;
                player.body.velocity.x = 0;
            }
            else if (KeeperGame.NWdown == true) {
                player.body.velocity.x = -speed;
                player.body.velocity.y = 0;

            }
            else if (KeeperGame.NEdown == true) {
                player.body.velocity.y = -speed;
                player.body.velocity.x = 0;

            }
            else {
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
            }


            if (KeeperGame.Ndown == true) {
                player.animations.play('N');
            }
            else if (KeeperGame.Sdown == true) {
                player.animations.play('S');
            }
            else if (KeeperGame.Edown == true) {
                player.animations.play('E');
            }
            else if (KeeperGame.Wdown == true) {
                player.animations.play('W');
            }
            else if (KeeperGame.SEdown == true) {
                player.animations.play('SE');
            }
            else if (KeeperGame.SWdown == true) {
                player.animations.play('SW');
            }
            else if (KeeperGame.NWdown == true) {
                player.animations.play('NW');

            }
            else if (KeeperGame.NEdown == true) {
                player.animations.play('NE');

            }
            else {
                player.animations.stop();
            }

            game.physics.isoArcade.collide(obstacleGroup);

            game.physics.isoArcade.overlap(marker, player, function (e) {
                e.destroy();
                KeeperGame.addItem();
            });

            game.physics.isoArcade.overlap(marker2, player, function (e) {
                e.destroy();
                KeeperGame.addItem();
            });

            game.physics.isoArcade.overlap(marker3, player, function (e) {
                e.destroy();
                KeeperGame.addItem();
            });

            game.physics.isoArcade.overlap(marker4, player, function (e) {
                e.destroy();
                KeeperGame.addItem();
            });

            check = game.physics.isoArcade.overlap(exitMarker, player, function (e) {
                if (KeeperGame.currentItemCount >= KeeperGame.totalItemCount) {
                    console.log("END GAME GOOD! :)");
                    KeeperGame.updateEndText(2);
                }
                else {
                    KeeperGame.updateEndText(1);
                }

            });

            endTxt.visible = check;
            game.iso.topologicalSort(obstacleGroup);
        };

        this.render = function () {

        };
    }

};
window.addEventListener('load', function () {
    KeeperGame.init();
}, false);
