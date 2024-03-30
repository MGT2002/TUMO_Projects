exports.Player = function()
{
	this.socket = null;
	this.name = '';
	this.base = '';
	this.energy = 50.0;
	this.score = 0;
	this.hasGold = false;
	this.x = 0;
	this.y = 0;
	this.width = 32;
	this.height = 32;
	this.direction = 0;
	this.img = '';
	this.imgGold = '';
	
	this.getImgName = function()
	{
		var name = this.base.substring(this.base.indexOf('_') + 1, this.base.length);
		return (name + '_' + this.direction);
	}
	
	this.getImgGold = function()
	{
		return ('cargo_gold_' + this.direction);
	}
	
	this.moveRight = function()
	{
		this.x += 2;
		this.direction = 3;
		this.img = this.getImgName();
		this.imgGold = this.getImgGold();
		this.energy -= 0.1;
	}
	this.moveLeft = function()
	{
		this.x -= 2;
		this.direction = 1;
		this.img = this.getImgName();
		this.imgGold = this.getImgGold();
		this.energy -= 0.1;
	}
	this.moveUp = function()
	{
		this.y -= 2;
		this.direction = 2;
		this.img = this.getImgName();
		this.imgGold = this.getImgGold();
		this.energy -= 0.1;
	}
	this.moveDown = function()
	{
		this.y += 2;
		this.direction = 4;
		this.img = this.getImgName();
		this.imgGold = this.getImgGold();
		this.energy -= 0.1;
	}
	this.fire = function()
	{
		console.log(this.name + ' BOOM!');
		this.energy -= 20.0;
	}
	
	this.getData = function()
	{
		return {
			socketId: this.socket.id,
			name: this.name,
			base: this.base,
			energy: this.energy,
			score: this.score,
			hasGold: this.hasGold,
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			direction: this.direction,
			img: this.img,
			imgGold: this.imgGold
		}
	}
}

exports.getPlayers = function(players)
{
	var ps = [];
	for(var i in players)
	{
		ps.push({
			socketId: players[i].socket.id,
			name: players[i].name,
			base: players[i].base,
			energy: players[i].energy,
			score: players[i].score,
			hasGold: players[i].hasGold,
			x: players[i].x,
			y: players[i].y,
			width: players[i].width,
			height: players[i].height,
			direction: players[i].direction,
			img: players[i].img,
			imgGold: players[i].imgGold
		});
	}
	
	return ps;
}

exports.initPlayers = function(players, bases)
{
	var b1 = bases[0];
	for (var i in players)
	{
		if(players[i].base == b1.img)
		{
			players[i].x = b1.width;
			players[i].y = 0;
			players[i].direction = 4;
			players[i].img = players[i].getImgName();
			players[i].imgGold = players[i].getImgGold();
			break;
		}
	}
	
	var b2 = bases[1];
	for (var i in players)
	{
		if(players[i].base == b2.img)
		{
			players[i].x = b2.width;
			players[i].y = 640 - players[i].height;
			players[i].direction = 2;
			players[i].img = players[i].getImgName();
			players[i].imgGold = players[i].getImgGold();
			break;
		}
	}
	
	var b3 = bases[2];
	for (var i in players)
	{
		if(players[i].base == b3.img)
		{
			players[i].x = 640 - b3.width - players[i].width;
			players[i].y = 0;
			players[i].direction = 4;
			players[i].img = players[i].getImgName();
			players[i].imgGold = players[i].getImgGold();
			break;
		}
	}
	
	var b4 = bases[3];
	for (var i in players)
	{
		if(players[i].base == b4.img)
		{
			players[i].x = 640 - b3.width - players[i].width;;
			players[i].y = 640 - players[i].height;
			players[i].direction = 2;
			players[i].img = players[i].getImgName();
			players[i].imgGold = players[i].getImgGold();
			break;
		}
	}
}