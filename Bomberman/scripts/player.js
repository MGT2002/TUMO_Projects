// Constants
var playerLeftMoveAnim = [86, 110, 138];
var playerRightMoveAnim = [86, 112, 138];
var playerUpMoveAnim = [4, 32, 60];
var playerDownMoveAnim = [4, 32, 60];

// Classes
function Player(html_div) {
    this.isDead = false;
    this.htmlObject = html_div;
    this.halfWidth = 12;
    this.halfHeight = 16;
    this.health = 5;

    this.resetPosition = function() {
        this.htmlObject.css("left", 0);
        this.htmlObject.css("top", 0);
    }

    this.decreaseHealth = function() {
        return (--this.health);
    }

    this.getHorCenter = function() {
        return this.htmlObject.position().left + this.halfWidth;
    }

    this.getVerCenter = function() {
        return this.htmlObject.position().top + this.halfHeight;
    }

    this.getX = function() {
        return this.htmlObject.position().left;
    }

    this.getY = function() {
        return this.htmlObject.position().top;
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

    this.setLeftAnim = function(spriteNumber) {
        this.htmlObject.css("background-position", -playerLeftMoveAnim[spriteNumber] + "px -42px");
    }

    this.setRightAnim = function(spriteNumber) {
        this.htmlObject.css("background-position", -playerRightMoveAnim[spriteNumber] + "px -6px");
    }

    this.setUpAnim = function(spriteNumber) {
        this.htmlObject.css("background-position", -playerUpMoveAnim[spriteNumber] + "px -42px");
    }

    this.setDownAnim = function(spriteNumber) {
        this.htmlObject.css("background-position", -playerDownMoveAnim[spriteNumber] + "px -6px");
    }
}
