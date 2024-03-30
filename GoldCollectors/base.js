exports.Base = function(id, x, y)
{
	this.id = id;
	this.x = x;
	this.y = y;
	this.width = 64;
	this.height = 64;
	this.img = '';
}

exports.generateBases = function()
{
	var baseImg = ['camp_blue', 'camp_green', 'camp_yellow', 'camp_red'];
	var bases = [];
	var base_counter = 0;
    var base_count = 4;
	
	bases.push(new exports.Base('base_1', 0, 0));
	bases.push(new exports.Base('base_2', 0, 640 - 64));
	bases.push(new exports.Base('base_3', 640 - 64, 0));
	bases.push(new exports.Base('base_4', 640 - 64, 640 - 64));
	
    while (base_counter < base_count) {
        var index = getRandomInt(0, 3);
		var isCollide = false;
		
        for (var i in bases) {
            if (baseImg[index] == bases[i].img) {
				isCollide = true;
                break;
            }
        }
		
		if (!isCollide) {
            bases[base_counter].img = baseImg[index];
            ++base_counter;
        }
    }

    return bases;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

