var pm = require('./player');
var bm = require('./base');
var sm = require('./stone');
var gm = require('./gold');
var btm = require('./battery');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GameEngine() 
{
	this.players = [];
	this.bgImages = ['grass', 'mars', 'ice', 'moon', 'sand'];
	this.baseImg = ['camp_blue', 'camp_green', 'camp_yellow', 'camp_red'];
	this.bgImg = '';
	this.bases = [];
	this.stones = [];
	this.golds = [];
	this.batteries = [];
	this.gameOver = false;
	
	this.startGame = function() 
	{
		this.bgImg = this.bgImages[getRandomInt(0, 4)];
		this.bases = bm.generateBases();
		this.stones = sm.generateStones(this.bases);
		this.golds = gm.generateGolds(this.bases, this.stones);
		this.batteries = btm.generateBatteries(this.bases, this.stones, this.golds);
 
		pm.initPlayers(this.players, this.bases);
		
		var objToSend = {
			bgImg: this.bgImg,
			bases: this.bases,
			stones: this.stones,
			golds: this.golds,
			batteries: this.batteries,
			players: pm.getPlayers(this.players)
		};
			
		for(var p in this.players)
		{
			this.players[p].socket.emit('send data', objToSend);
		}
		console.log('Game started');
	}
		
	this.addPlayer = function(socket)
	{
		var p = getPlayerBySocketId(this.players, socket.id);
		if (p)
		{
			// nothing to do
		}
		else
		{
			p = new pm.Player();
			p.socket = socket;
			p.base = this.baseImg[this.players.length];
			this.players.push(p);
		}
		for(var i in this.players)
		{
			console.log(this.players[i].name + ' : ' + this.players[i].socket.id);
		}
	}
	
	this.setPlayerName = function(socketId, name)
	{
		var p = getPlayerBySocketId(this.players, socketId);
		if (p)
		{
			p.name = name;
		}
	}
	
	this.keyPressed = function(socketId, data)
	{
		if(this.gameOver) return;
		
		var p = getPlayerBySocketId(this.players, socketId);		
		if (p)
		{
			if (p.energy <= 0.0) return;
			switch (data) {
				case 'D':
					p.moveRight();
					break;
				case 'S':
					p.moveDown();
					break;
				case 'A':
					p.moveLeft();
					break;
				case 'W':
					p.moveUp();
					break;
				case ' ':
					p.fire();
					break;
			}
			if (p.energy < 0.0) {p.energy = 0.0;}
			
			if(checkPlayerCollision(p, this.players))
			{
				switch (data) {
					case 'A':
						p.moveRight();
						break;
					case 'W':
						p.moveDown();
						break;
					case 'D':
						p.moveLeft();
						break;
					case 'S':
						p.moveUp();
						break;
				}
				return;
			}
			
			var batteryId = checkBatteryCollision(p, this.batteries);
			var goldId = checkGoldCollision(p, this.golds);

			var dataToSend = p.getData();
			dataToSend.batteryId = batteryId;
			dataToSend.goldId = goldId;
			
			for(var i in this.players)
			{
				this.players[i].socket.emit('update player', dataToSend);
			}
		}
	}
	
	this.goldArrived = function (socketId)
	{
		var p = getPlayerBySocketId(this.players, socketId);
		
		p.score++;
		p.hasGold = false;
		var dataToSend = p.getData();
		dataToSend.goldArrived = true;
		
		for(var i in this.players)
		{
			this.players[i].socket.emit('update player', dataToSend);		
		}
		
		if(this.golds.length == 0 && !p.hasGold)
		{
			this.gameOver = true;
			var nS = {
				playerName1: this.players[0].name,
				playerScore1: this.players[0].score,
				playerName2: this.players[1].name,
				playerScore2: this.players[1].score,
				playerName3: this.players[2].name,
				playerScore3:this.players[2].score,
				playerName4: this.players[3].name,
				playerScore4:this.players[3].score
			}
			console.log(nS);
			for (var i in this.players)
			{
				this.players[i].socket.emit('game over', nS);
			}
		}	
	}
	
	this.updateEnergy = function (socketId, energy)
	{
		var p = getPlayerBySocketId(this.players, socketId);
		
		p.energy = energy;

		var dataToSend = p.getData();

		p.socket.emit('update player', dataToSend);
	}
}

function getPlayerBySocketId(players, socketId)
{
	for (var i in players) {
		if (players[i].socket.id == socketId)
		{
			return players[i];
		}
	}
	
	return null;
}

function checkBatteryCollision(p, bts)
{
	var hc = p.x + 16;
	var vc = p.y + 16;
	
	for (var i in bts) {
		if (Math.abs(hc - (bts[i].x + 16)) < 32 &&
			Math.abs(vc - (bts[i].y + 16)) < 32) {
			p.energy += bts[i].power;
			if (p.energy > 100)
			{
				p.energy = 100;
			}
			
			var res = bts[i].id;
						
			bts.splice(i, 1);
			
			return res;
		}
	}
	
	return '';
}

function checkPlayerCollision(p, pls)
{
	var hc = p.x + 16;
	var vc = p.y + 16;
	
	for (var i in pls) {
		if (p.socket.id != pls[i].socket.id && Math.abs(hc - (pls[i].x + 16)) < 32 &&
			Math.abs(vc - (pls[i].y + 16)) < 32) {
			return true;
		}
	}
	
	return false;
}

function checkGoldCollision(p, gts)
{
	var hc = p.x + 16;
	var vc = p.y + 16;
	
	for (var i in gts) {
		if (!p.hasGold && Math.abs(hc - (gts[i].x + 16)) < 32 &&
			Math.abs(vc - (gts[i].y + 16)) < 32) {			
			var res = gts[i].id;
						
			gts.splice(i, 1);
			
			p.hasGold = true;
			
			return res;
		}
	}
	
	return '';
}

module.exports = GameEngine;