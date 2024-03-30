function gamePage()
{
    $("body").empty();

    var node_platform = $("<div/>").appendTo("body").attr("id", "platform");
    var wall = $("<div/>").attr("id", "wall").appendTo("body");
	var wall1 = $("<div/>").attr("id", "wall1").appendTo("body");
	var wall2 = $("<div/>").attr("id", "wall2").appendTo("body");
	var wall3 = $("<div/>").attr("id", "wall3").appendTo("body");

    var walls = getWalls(992, 608, 32, 32);
    var bricks = generateBricks(992, 608, 32, 32, walls);
    var bomb = null;

    function removeBricks(brks) {
        for (var i in brks) {
            $("#" + brks[i].id).remove();
        }
        brks.splice(0, brks.length);
    }

    function removeBallons(blns) {
        for (var i in blns) {
            $("#" + blns[i].htmlObject.attr("id")).remove();
        }
        blns.splice(0, blns.length);
    }

    for (var i in walls) {
        var div = $("<div/>").attr("class", "wall");
        div.css("left", walls[i].x).css("top", walls[i].y);
        div.appendTo(node_platform);
    }

    for (var i in bricks) {
        var div = $("<div/>").attr("class", "brick").attr("id", bricks[i].id);
        div.css("left", bricks[i].x).css("top", bricks[i].y);
        div.appendTo(node_platform);
    }

    var player = new Player($("<div/>").attr("id", "erik").appendTo(node_platform));
    var directions = {};
    var speed = 2;
    var balloonsNumber = 10;
    var balloons = generateBalloons(node_platform, walls, bricks, balloonsNumber);

    $('html').keyup(stop).keydown(charMovement);

    function charMovement(e) {
        directions[e.which] = true;
    }

    function stop(e) {
        delete directions[e.which];
    }

    const width_dif = 28;
    const height_dif = 32;

    function checkCollision(dir) {
        var isFound = false;
        var hc = player.getHorCenter();
        var vc = player.getVerCenter();

        // pater
        if (bomb !== null) {
            if (!(bomb.isPlayerOn && (Math.abs(hc - bomb.getHorCenter()) <= width_dif &&
                Math.abs(vc - bomb.getVerCenter()) <= height_dif))) {
                bomb.isPlayerOn = false;
                if (Math.abs(hc - bomb.getHorCenter()) < width_dif &&
                    Math.abs(vc - bomb.getVerCenter()) < height_dif) {
                    switch (dir) {
                        case "37":
                            player.moveRight(speed);
                            break;
                        case "38":
                            player.moveDown(speed);
                            break;
                        case "39":
                            player.moveLeft(speed);
                            break;
                        case "40":
                            player.moveUp(speed);
                            break;
                    }
                    return;
                }
            }
        }
        for (var i in bricks) {
            if (Math.abs(hc - bricks[i].hor_center) < width_dif &&
                Math.abs(vc - bricks[i].ver_center) < height_dif) {
                switch (dir) {
                    case "37":
                        player.moveRight(speed);
                        break;
                    case "38":
                        player.moveDown(speed);
                        break;
                    case "39":
                        player.moveLeft(speed);
                        break;
                    case "40":
                        player.moveUp(speed);
                        break;
                }
                isFound = true;
                break;
            }
        }
        if (!isFound)
        {
            for (var i in walls) {
                if (Math.abs(hc - walls[i].hor_center) < width_dif &&
                    Math.abs(vc - walls[i].ver_center) < height_dif) {
                    switch (dir) {
                        case "37":
                            player.moveRight(speed);
                            break;
                        case "38":
                            player.moveDown(speed);
                            break;
                        case "39":
                            player.moveLeft(speed);
                            break;
                        case "40":
                            player.moveUp(speed);
                            break;
                    }
                    break;
                }
            }
        }
    }

    //balloons
    const balloon_width_dif = 32;
    const balloon_height_dif = 32;
    function checkBalloonsCollision() {
        checkBalloonsBoom();
        var isFound = false;
        var hc, vc;
        for (var i in balloons) {
            isFound = false;
            hc = balloons[i].getHorCenter();
            vc = balloons[i].getVerCenter();

            if (bomb !== null) {
                if (Math.abs(hc - bomb.getHorCenter()) < balloon_width_dif &&
                    Math.abs(vc - bomb.getVerCenter()) < balloon_height_dif) {
                    balloons[i].setReverseDir();
                    balloons[i].move(speed);
                    continue;
                }
            }
            for (var j in bricks) {
                if (Math.abs(hc - bricks[j].hor_center) < balloon_width_dif &&
                    Math.abs(vc - bricks[j].ver_center) < balloon_height_dif) {
                    balloons[i].setReverseDir();
                    balloons[i].move(speed);
                    isFound = true;
                    break;
                }
            }
            if (isFound) {
                continue;
            }
            for (var k in walls) {
                if (Math.abs(hc - walls[k].hor_center) < balloon_width_dif &&
                    Math.abs(vc - walls[k].ver_center) < balloon_height_dif) {
                    balloons[i].setReverseDir();
                    balloons[i].move(speed);
                    break;
                }
            }

            if (Math.abs(hc - player.getHorCenter()) < width_dif &&
                Math.abs(vc - player.getVerCenter()) < height_dif) {
                player.isDead = true;
                return;
            }
        }
    }

    function checkBalloonsBoom() {
        var bc = $("#boom_center");
        var bu = $("#upBoom");
        var br = $("#rightBoom");
        var bb = $("#bottomBoom");
        var bl = $("#leftBoom");

        var hc, vc;
        var i = 0;
        if (bc.length > 0) {
            i = 0;
            while (i < balloons.length) {
                hc = balloons[i].getHorCenter();
                vc = balloons[i].getVerCenter();
                if (Math.abs(hc - (bc.position().left + 16)) < balloon_width_dif &&
                    Math.abs(vc - (bc.position().top + 16)) < balloon_height_dif) {
                    balloons[i].boom();
                    balloons.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
        if (bu.length > 0) {
            i = 0;
            while (i < balloons.length) {
                hc = balloons[i].getHorCenter();
                vc = balloons[i].getVerCenter();
                if (Math.abs(hc - (bu.position().left + 16)) < balloon_width_dif &&
                    Math.abs(vc - (bu.position().top + 16)) < balloon_height_dif) {
                    balloons[i].boom();
                    balloons.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
        if (br.length > 0) {
            i = 0;
            while (i < balloons.length) {
                hc = balloons[i].getHorCenter();
                vc = balloons[i].getVerCenter();
                if (Math.abs(hc - (br.position().left + 16)) < balloon_width_dif &&
                    Math.abs(vc - (br.position().top + 16)) < balloon_height_dif) {
                    balloons[i].boom();
                    balloons.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
        if (bb.length > 0) {
            i = 0;
            while (i < balloons.length) {
                hc = balloons[i].getHorCenter();
                vc = balloons[i].getVerCenter();
                if (Math.abs(hc - (bb.position().left + 16)) < balloon_width_dif &&
                    Math.abs(vc - (bb.position().top + 16)) < balloon_height_dif) {
                    balloons[i].boom();
                    balloons.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
        if (bl.length > 0) {
            i = 0;
            while (i < balloons.length) {
                hc = balloons[i].getHorCenter();
                vc = balloons[i].getVerCenter();
                if (Math.abs(hc - (bl.position().left + 16)) < balloon_width_dif &&
                    Math.abs(vc - (bl.position().top + 16)) < balloon_height_dif) {
                    balloons[i].boom();
                    balloons.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
    }
// player boom
    function checkPlayerBoom() {
        var bc = $("#boom_center");
        var bu = $("#upBoom");
        var br = $("#rightBoom");
        var bb = $("#bottomBoom");
        var bl = $("#leftBoom");

        if (bc.length > 0) {
            if (Math.abs(player.getHorCenter() - (bc.position().left + 16)) < width_dif &&
                Math.abs(player.getVerCenter() - (bc.position().top + 16)) < height_dif) {
                player.isDead = true;
                return;
            }
        }
        if (bu.length > 0) {
            if (Math.abs(player.getHorCenter() - (bu.position().left + 16)) < width_dif &&
                Math.abs(player.getVerCenter() - (bu.position().top + 16)) < height_dif) {
                player.isDead = true;
                return;
            }
        }
        if (br.length > 0) {
            if (Math.abs(player.getHorCenter() - (br.position().left + 16)) < width_dif &&
                Math.abs(player.getVerCenter() - (br.position().top + 16)) < height_dif) {
                player.isDead = true;
                return;
            }
        }
        if (bb.length > 0) {
            if (Math.abs(player.getHorCenter() - (bb.position().left + 16)) < width_dif &&
                Math.abs(player.getVerCenter() - (bb.position().top + 16)) < height_dif) {
                player.isDead = true;
                return;
            }
        }
        if (bl.length > 0) {
            if (Math.abs(player.getHorCenter() - (bl.position().left + 16)) < width_dif &&
                Math.abs(player.getVerCenter() - (bl.position().top + 16)) < height_dif) {
                player.isDead = true;
                return;
            }
        }
    }

    var count = 0;
    var imageCounter = 1;
    var balloonCounter = 0;

    function move(e) {
        //console.log("count = " + count + " " + player.isDead);
        if (player.isDead) {
            clearInterval(interval);
            var hlt = player.decreaseHealth()
            if (hlt == 0) {
                alert("GAME OVER!!!");
				menuPage();
            } else {
                alert("You have " + hlt + " health. Starting new game...");
                setTimeout(function() {
                    newGame();
                }, 4000);
            }

        }
        if (balloons.length === 0) {
            clearInterval(interval);
            alert("YOU WIN!!!");
        }

        count = count + 20;

        if (count % 100 == 0) {
            imageCounter = imageCounter == 2 ? 0 : (imageCounter + 1);
        }

        if (count % 300 == 0) {
            balloonCounter = balloonCounter == 5 ? 0 : (balloonCounter + 1);
        }
        if (count % 500 == 0) {
            balloons[getRandomInt(0, balloons.length - 1)].setRandomDir();
        }

        if (bomb) {
            bomb.setAnim(imageCounter);
        }
        for (var i in balloons) {
            balloons[i].move(speed);
            balloons[i].setAnim(balloonCounter);
        }
        checkBalloonsCollision();

        //playery platformi mej
        for (var i in directions) {
            if (player.getX() > 0 && i == 37) {
                player.moveLeft(speed);
                player.setLeftAnim(imageCounter);
            }
            if (player.getX() < ($("#platform").width() - player.getWidth()) && i == 39) {
                player.moveRight(speed);
                player.setRightAnim(imageCounter);
            }
            if (player.getY() > 0 && i == 38) {
                player.moveUp(speed);
                player.setUpAnim(imageCounter);
            }
            if (player.getY() < ($("#platform").height() - player.getHeight()) && i == 40) {
                player.moveDown(speed);
                player.setDownAnim(imageCounter);
            }
            if (i == 32 && bomb === null) {
                bomb = new Bomb($("<div/>").attr("id", "bomb").appendTo(node_platform),
                    node_platform, walls, bricks);
                bomb.setPosition(player.getX(), player.getY());
                bomb.setBoomTimer();
                setTimeout(function() {
                    bomb = null;
                }, 3000);
            }
            checkCollision(i + "");
        }
        checkPlayerBoom();
    }

    var interval = setInterval(move, 20);

    function newGame() {
        removeBricks(bricks);
        removeBallons(balloons);
        player.resetPosition();
        player.isDead = false;

        bricks = generateBricks(992, 608, 32, 32, walls);
        for (var i in bricks) {
            var div = $("<div/>").attr("class", "brick").attr("id", bricks[i].id);
            div.css("left", bricks[i].x).css("top", bricks[i].y);
            div.appendTo(node_platform);
        }

        directions = {};

        balloons = generateBalloons(node_platform, walls, bricks, balloonsNumber);

        count = 0;
        imageCounter = 1;
        balloonCounter = 0;

        interval = setInterval(move, 20);
    }
}
