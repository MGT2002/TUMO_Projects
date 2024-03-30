function Wall(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.hor_center = x + (w / 2);
    this.ver_center = y + (h / 2);
}

function Brick(id, x, y, w, h) {
    this.id = "brick" + id;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.hor_center = x + (w / 2);
    this.ver_center = y + (h / 2);
}

// w - 1024 h - 640 ww - 32 wh - 32
function getWalls(platform_width, platform_height, wall_w, wall_h) {
    var walls = [];
    for (var x = wall_w; x < platform_width; x += (wall_w * 2)) {
        for (var y = wall_h; y < platform_height; y += (wall_h * 2)) {
            walls.push(new Wall(x, y, wall_w, wall_h));
        }
    }

    return walls;
}

function generateBricks(platform_width, platform_height, brick_w, brick_h,
    walls) {
    var bricks = [];
    var noBricks = [{x: 0, y: 0}, {x: 0, y: brick_h}, {x: brick_w, y: 0}];
    var correct_brick_counter = 0;
    var bricks_count = walls.length;

    while (correct_brick_counter < bricks_count) {
        var x = getRandom32Int(0, platform_width - brick_w);
        var y = getRandom32Int(0, platform_height - brick_h);
        var isCollide = false;
        for (var i in walls) {
            if ((x == walls[i].x) && (y == walls[i].y)) {
                isCollide = true;
                break;
            }
        }

        for (var i in noBricks) {
            if ((x == noBricks[i].x) && (y == noBricks[i].y)) {
                isCollide = true;
                break;
            }
        }

        for (var i in bricks) {
            if ((x == bricks[i].x) && (y == bricks[i].y)) {
                isCollide = true;
                break;
            }
        }


        if (!isCollide) {
            ++correct_brick_counter;
            bricks.push(new Brick(correct_brick_counter, x, y, brick_w, brick_h));
        }
    }

    return bricks;
}

function generateBalloons(plat, walls, bricks, count) {
    var balloons = [];
    var noBalloons = [{x: 0, y: 0}, {x: 0, y: 32}, {x: 32, y: 0}];
    var correct_balloon_counter = 0;

    while (correct_balloon_counter < count) {
        var x = getRandom32Int(0, plat.width() - 32);
        var y = getRandom32Int(0, plat.height() - 32);
        var isCollide = false;
        for (var i in walls) {
            if ((x == walls[i].x) && (y == walls[i].y)) {
                isCollide = true;
                break;
            }
        }

        for (var i in noBalloons) {
            if ((x == noBalloons[i].x) && (y == noBalloons[i].y)) {
                isCollide = true;
                break;
            }
        }

        for (var i in bricks) {
            if ((x == bricks[i].x) && (y == bricks[i].y)) {
                isCollide = true;
                break;
            }
        }


        if (!isCollide) {
            ++correct_balloon_counter;
            var b = $("<div/>").attr("id", "balloon" + correct_balloon_counter)
                .attr("class", "balloon")
                .css("left", x).css("top", y).appendTo(plat);
            balloons.push(new Balloon(plat, b));
        }
    }

    return balloons;
}

function getRandomInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandom32Int(min, max)
{
    var r = getRandomInt(min, max);
    while ((r % 32) != 0) {
        r = getRandomInt(min, max);
    }
    return r;
}
