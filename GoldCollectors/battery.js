exports.Battery = function(id, x, y) {
	this.id = "Battery" + id;
	this.power = 20;
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
}

exports.generateBatteries = function(bases, stones, golds)
 {
    var batteries = [];
    var battery_counter = 0;
    var battery_count = 20;
	
    while (battery_counter < battery_count) {
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

		if(!isCollide)
		{
			for (var i in golds) {
				if ((x >= golds[i].x) && (y >= golds[i].y) &&
					(x <= golds[i].x + 32) && (y <= golds[i].y + 32)) {
					isCollide = true;
					break;
				}
			}
		}
		
		if(!isCollide)
		{
			for (var i in batteries) {
				if ((x >= batteries[i].x) && (y >= batteries[i].y) &&
					(x <= batteries[i].x + 32) && (y <= batteries[i].y + 32)) {
					isCollide = true;
					break;
				}
			}
		}
		
		if (!isCollide) {
            ++battery_counter;
            batteries.push(new exports.Battery(battery_counter, x, y));
        }
    }

    return batteries;
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