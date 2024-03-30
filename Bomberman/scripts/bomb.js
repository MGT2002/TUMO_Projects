var bombAnim = [166, 200, 237];

function Bomb(html_div, plat, walls, bricks) {
    this.htmlObject = html_div;

    this.isPlayerOn = true;

    this.setPosition = function(px, py) {
        if ((px % 32) > 16) {
            this.htmlObject.css("left", px - (px % 32) + 32);
        } else {
            this.htmlObject.css("left", px - (px % 32));
        }
        if ((py % 32) > 16) {
            this.htmlObject.css("top", py - (py % 32) + 32);
        } else {
            this.htmlObject.css("top", py - (py % 32));
        }
    }

    this.getHorCenter = function() {
        return this.htmlObject.position().left + 16;
    }

    this.getVerCenter = function() {
        return this.htmlObject.position().top + 16;
    }

    this.setBoomTimer = function() {
        setTimeout(function(bomb) {
            var boom = new Boom(plat, walls, bricks);
            boom.boom(bomb.position().left, bomb.position().top);
        }, 3000, this.htmlObject);
    }

    this.setAnim = function(spriteNumber) {
        this.htmlObject.css("background-position", -bombAnim[spriteNumber] + "px -42px");
    }
}

var boomAnimX = [34, 142, 250, 358];
var boomAnimY = [410, 408, 410, 410];
var upBoomAnimX = [34, 142, 250, 358];
var upBoomAnimY = [374, 372, 374, 374];
var rightBoomAnimX = [70, 178, 286, 394];
var rightBoomAnimY = [410, 408, 410, 410];
var bottomBoomAnimX = [34, 142, 250, 358];
var bottomBoomAnimY = [446, 444, 446, 446];
var leftBoomAnimX = [0, 106, 214, 322];
var leftBoomAnimY = [410, 408, 410, 410];
var brickBoomAnim = [70, 106, 142, 178, 214, 250];

function Boom(plat, walls, bricks) {

    this.state = [-1, -1, -1, -1];
    this.stateDivs = [null, null, null, null];

    this.boom = function(x, y) {
        $("#bomb").remove();
        var bc = $("<div/>").attr("id", "boom_center").appendTo(plat);
        bc.css("left", x);
        bc.css("top", y);
        this.checkPoints(x, y);
        var boomCounter = 0;
        var boomIntervalId = setInterval(function(state, stateDivs) {
            bc.css("background-position", -boomAnimX[boomCounter] + "px " + -boomAnimY[boomCounter] + "px");
            if (state[0] === -3) {
                stateDivs[0].css("background-position", -upBoomAnimX[boomCounter] + "px " + -upBoomAnimY[boomCounter] + "px");
            }
            if (state[1] === -3) {
                stateDivs[1].css("background-position", -rightBoomAnimX[boomCounter] + "px " + -rightBoomAnimY[boomCounter] + "px");
            }
            if (state[2] === -3) {
                stateDivs[2].css("background-position", -bottomBoomAnimX[boomCounter] + "px " + -bottomBoomAnimY[boomCounter] + "px");
            }
            if (state[3] === -3) {
                stateDivs[3].css("background-position", -leftBoomAnimX[boomCounter] + "px " + -leftBoomAnimY[boomCounter] + "px");
            }
            ++boomCounter;
            if(boomCounter === 4) {
                clearInterval(boomIntervalId);
                $("#boom_center").remove();
                $("#upBoom").remove();
                $("#rightBoom").remove();
                $("#bottomBoom").remove();
                $("#leftBoom").remove();
            }
        }, 250, this.state, this.stateDivs);

        var brickBoomCounter = 0;
        var brickBoomIntervalId = setInterval(function(state, stateDivs) {
            if (state[0] >= 0) {
                stateDivs[0].css("background-position", -brickBoomAnim[brickBoomCounter] + "px -482px");
            }
            if (state[1] >= 0) {
                stateDivs[1].css("background-position", -brickBoomAnim[brickBoomCounter] + "px -482px");
            }
            if (state[2] >= 0) {
                stateDivs[2].css("background-position", -brickBoomAnim[brickBoomCounter] + "px -482px");
            }
            if (state[3] >= 0) {
                stateDivs[3].css("background-position", -brickBoomAnim[brickBoomCounter] + "px -482px");
            }
            ++brickBoomCounter;
            if(brickBoomCounter === 7) {
                clearInterval(brickBoomIntervalId);
                if (state[0] >= 0) {
                    removeBrick(stateDivs[0].attr("id"));
                }
                if (state[1] >= 0) {
                    removeBrick(stateDivs[1].attr("id"));
                }
                if (state[2] >= 0) {
                    removeBrick(stateDivs[2].attr("id"));
                }
                if (state[3] >= 0) {
                    removeBrick(stateDivs[3].attr("id"));
                }
            }
        }, 167, this.state, this.stateDivs);
    }

    this.checkPoints = function(bx, by) {
        // 1. bx, by - 32
        var upBox = whereIsPoint(bx, by - 32);
        this.state[0] = upBox;
        if (upBox >= 0) {
            this.stateDivs[0] = $("#" + bricks[upBox].id);
        } else if (upBox === -3) {
            // datarka
            var upBoom = $("<div/>").appendTo(plat).attr("id", "upBoom");
            upBoom.css("left", bx);
            upBoom.css("top", by - 32);
            this.stateDivs[0] = upBoom;
        }

        // 2. bx + 32, by
        var rightBox = whereIsPoint(bx + 32, by);
        this.state[1] = rightBox;
        if (rightBox >= 0) {
            this.stateDivs[1] = $("#" + bricks[rightBox].id);
        } else if (rightBox === -3) {
            // datarka
            var rightBoom = $("<div/>").appendTo(plat).attr("id", "rightBoom");
            rightBoom.css("left", bx + 32);
            rightBoom.css("top", by);
            this.stateDivs[1] = rightBoom;
        }

        // 3. bx, by + 32
        var bottomBox = whereIsPoint(bx, by + 32);
        this.state[2] = bottomBox;
        if (bottomBox >= 0) {
            this.stateDivs[2] = $("#" + bricks[bottomBox].id);
        } else if (bottomBox === -3) {
            // datarka
            var bottomBoom = $("<div/>").appendTo(plat).attr("id", "bottomBoom");
            bottomBoom.css("left", bx);
            bottomBoom.css("top", by + 32);
            this.stateDivs[2] = bottomBoom;
        }

        // 4. bx - 32, by
        var leftBox = whereIsPoint(bx - 32, by);
        this.state[3] = leftBox;
        if (leftBox >= 0) {
            this.stateDivs[3] = $("#" + bricks[leftBox].id);
        } else if (leftBox === -3) {
            // datarka
            var leftBoom = $("<div/>").appendTo(plat).attr("id", "leftBoom");
            leftBoom.css("left", bx - 30);
            leftBoom.css("top", by);
            this.stateDivs[3] = leftBoom;
        }
    }

    function removeBrick(id) {
        $("#" + id).remove();
        for (var i in bricks) {
            if (bricks[i].id === id) {
                bricks.splice(i, 1);
                break;
            }
        }
    }

    function whereIsPoint(x, y) {
        if (x < 0 || x >= 992) {
            return -1;
        }
        if (y < 0 || y >= 608) {
            return -1;
        }
        for (var i in walls) {
            if (x === walls[i].x && y === walls[i].y) {
                return -2;
            }
        }
        for (var i in bricks) {
            if (x === bricks[i].x && y === bricks[i].y) {
                return i;
            }
        }

        return -3;
    }
}
