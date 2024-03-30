var balloonMoveAnim = [-2, 32, 66, 98, 132, 166];
var balloonBoomAnim = [200, 228, 256, 276, 293];

function Balloon (plat, html_div) {
    this.plat = plat;
    this.htmlObject = html_div;
    this.halfWidth = 16;
    this.halfHeight = 16;
    this.lastMoveDir = getRandomInt(0, 3);;

    this.move = function(speed) {
        if (this.lastMoveDir === 0) {
            if (this.htmlObject.position().left > 0) {
                this.moveLeft(speed);
                return;
            }
        }
        if (this.lastMoveDir === 1) {
            if (this.htmlObject.position().left < (this.plat.width() - this.getWidth())) {
                this.moveRight(speed);
                return;
            }
        }
        if (this.lastMoveDir === 2) {
            if (this.htmlObject.position().top > 0) {
                this.moveUp(speed);
                return;
            }
        }
        if (this.lastMoveDir === 3) {
            if (this.htmlObject.position().top < (this.plat.height() - this.getHeight())) {
                this.moveDown(speed);
                return;
            }
        }
        this.setRandomDir();
        this.move(speed);
    }

    this.setRandomDir = function() {
        var dir = getRandomInt(0, 3);
        while (dir === this.lastMoveDir) {
            dir = getRandomInt(0, 3);
        }
        this.lastMoveDir = dir;
    }

    this.setReverseDir = function() {
        if (this.lastMoveDir === 0) {
            this.lastMoveDir = 1;
        } else if (this.lastMoveDir === 1) {
            this.lastMoveDir = 0;
        } else if (this.lastMoveDir === 2) {
            this.lastMoveDir = 3;
        } else if (this.lastMoveDir === 3) {
            this.lastMoveDir = 2;
        }
    }

    this.boom = function() {
        var boomCounter = 0;
        var intervalId = setInterval(function(balloon) {
            balloon.htmlObject.css("background-position", -balloonBoomAnim[boomCounter] + "px -78px");
            ++boomCounter;
            if(boomCounter === 5) {
                clearInterval(intervalId);
                balloon.htmlObject.remove();
            }
        }, 200, this);
    }

    this.getWidth = function() {
        return this.htmlObject.width();
    }

    this.getHeight = function() {
        return this.htmlObject.height();
    }

    this.moveLeft = function(moveSize) {
        this.htmlObject.css("left", this.htmlObject.position().left - moveSize);
    }

    this.moveRight = function(moveSize) {
        this.htmlObject.css("left", this.htmlObject.position().left + moveSize);
    }

    this.moveUp = function(moveSize) {
        this.htmlObject.css("top", this.htmlObject.position().top - moveSize);
    }

    this.moveDown = function(moveSize) {
        this.htmlObject.css("top", this.htmlObject.position().top + moveSize);
    }
    this.setAnim = function(spriteNumber) {
        this.htmlObject.css("background-position", -balloonMoveAnim[spriteNumber] + "px -78px");
    }

    this.getHorCenter = function() {
        return this.htmlObject.position().left + this.halfWidth;
    }

    this.getVerCenter = function() {
        return this.htmlObject.position().top + this.halfHeight;
    }
}
