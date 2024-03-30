exports.Stone = function(id, x, y) {
	this.id = "stone" + id;
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
}

exports.generateStones = function(bases)
 {
    var stones = [];
    var stone_counter = 0;
    var stone_count = 24;
	
    while (stone_counter < stone_count) {
        var x = getRandom32Int(0, 640 - 32);
        var y = getRandom32Int(0, 640 - 32);
		var isCollide = false;
		
		
		if ((x >= bases[0].x) && (y >= bases[0].y) &&
			(x <= bases[0].x + 96) && (y <= bases[0].y + 96)) {
			isCollide = true;
		}
		
		if (!isCollide && (x >= bases[1].x) && (y >= bases[1].y - 64) &&
			(x <= 96) && (y <= 640)) {
			isCollide = true;
		}
		
		if (!isCollide && (x >= bases[2].x - 64) && (y >= bases[2].y) &&
			(x <= 640) && (y <= bases[2].y + 96)) {
			isCollide = true;
		}

		if (!isCollide && (x >= bases[3].x - 64) && (y >= bases[3].y - 64) &&
			(x <= 640) && (y <= 640)) {
			isCollide = true;
		}

		if(!isCollide)
		{
			for (var i in stones) {
				if ((x >= stones[i].x) && (y >= stones[i].y) &&
					(x <= stones[i].x + 32) && (y <= stones[i].y + 32)) {
					isCollide = true;
					break;
				}
			}
		}
		
		if (!isCollide) {
            ++stone_counter;
            stones.push(new exports.Stone(stone_counter, x, y));
        }
    }

    return stones;
}

function getRandom32Int(min, max)
{
    var r = getRandomInt(min, max);
    while ((r % 32) != 0) {
        r = getRandomInt(min, max);
    }
    return r;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
