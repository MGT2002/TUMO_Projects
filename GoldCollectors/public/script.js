$(function()
{
	window.g_socket = io.connect();
	///*
	var messageForm = $("#send-message");
	var messageBox = $("#message");

	var chat = $("#chat");

	messageForm.submit(function(e)
	{
		e.preventDefault();

		window.g_socket.emit('send message', messageBox.val());

		messageBox.val('');
	});

	window.g_socket.on("new message", function(data)
	{
		console.log("The recieved data is - " + data);
		var p = getPlayer(data.socketId);
		var color = p.base.substring(p.base.indexOf('_') + 1, p.base.length);
		
		chat.append("<span style='color:" + color + "'><b>" + 
			p.name + "</b>&gt;&nbsp;" + data.message + "</span><br/>");
	}); ///*
	
    window.g_queue = new createjs.LoadQueue(false);
	window.g_queue.installPlugin(createjs.Sound);
	window.g_queue.addEventListener('complete', handleComplete);

	window.g_socket.on('resources', function(data)
	{
		window.g_queue.loadManifest(data);
	});
	
	window.g_socket.on('send data', function(data)
	{
		//console.log('socket id =' + window.g_socket.id);
		window.g_data = data;
		drawMap();
		var interval = setInterval(onInterval, 1000); 
	});
	
	window.g_socket.on('update player', function(data)
	{
		if (data.batteryId && data.batteryId != '')
		{
			for (var b in window.g_data.batteries)
			{
				if (window.g_data.batteries[b].id == data.batteryId)
				{
					window.g_stage.removeChild(window.g_data.batteries[b].bitmap);
					window.g_data.batteries.splice(b, 1);
					break;
				}
			}
		}
		if (data.goldId && data.goldId != '')
		{
			for (var b in window.g_data.golds)
			{
				if (window.g_data.golds[b].id == data.goldId)
				{
					window.g_stage.removeChild(window.g_data.golds[b].bitmap);
					window.g_data.golds.splice(b, 1);
					break;
				}
			}
		}
		
		var p = getCurrentPlayer();
		if(p && p.socketId == data.socketId)
		{	
			p.energy = data.energy;
			$('#energy').text('Energy is ' + p.energy.toFixed(1) + '%');
			p.score = data.score;
			$('#score').text('Your score is - ' + p.score);
			p.x = data.x;
			p.y = data.y;
			p.direction = data.direction;
			p.hasGold = data.hasGold;
			p.img = data.img;
			p.imgGold = data.imgGold;

			p.bitmap.image = window.g_queue.getResult(data.img);
			p.bitmap.x = data.x;
			p.bitmap.y = data.y;

			if (data.goldId && data.goldId != '' && p.hasGold)
			{
				var bitmap = new createjs.Bitmap(window.g_queue.getResult(p.imgGold));
				p.goldBitmap = bitmap;
				window.g_stage.addChild(bitmap);
			}
			if (p.goldBitmap && p.goldBitmap != null)
			{
				p.goldBitmap.image = window.g_queue.getResult(p.imgGold);
				p.goldBitmap.x = p.x;
				p.goldBitmap.y = p.y;
			}
			if(data.goldArrived)
			{
				p.goldArrivedSend = false;
				window.g_stage.removeChild(p.goldBitmap);
				p.goldBitmap = null;
			}
			
			p.mask.graphics.beginFill('black').drawCircle(data.x + 16, data.y + 16, 96);
		}
		else
		{
			p = getPlayer(data.socketId);
			p.energy = data.energy;
			p.x = data.x;
			p.y = data.y;
			p.direction = data.direction;
			p.hasGold = data.hasGold;
			p.img = data.img;
			p.imgGold = data.imgGold;
			
			p.bitmap.image = window.g_queue.getResult(data.img);
			p.bitmap.x = data.x;
			p.bitmap.y = data.y;

			if (data.goldId && data.goldId != '' && p.hasGold)
			{
				var bitmap = new createjs.Bitmap(window.g_queue.getResult(p.imgGold));
				p.goldBitmap = bitmap;
				window.g_stage.addChild(bitmap);
			}
			if (p.goldBitmap && p.goldBitmap != null)
			{
				p.goldBitmap.image = window.g_queue.getResult(p.imgGold);
				p.goldBitmap.x = p.x;
				p.goldBitmap.y = p.y;
			}
			if(data.goldArrived)
			{
				window.g_stage.removeChild(p.goldBitmap);
				p.goldBitmap = null;
			}
		}
		
		window.g_stage.update();
	});
	
	window.g_socket.on('game over', function(data)
	{
		window.g_stage.mask = null;
		window.g_stage.update();
		alert('GAME OVER!!!\n' + 
			data.playerName1 + ' score is ' + data.playerScore1 + '\n' + 
			data.playerName2 + ' score is ' + data.playerScore2 + '\n' +
			data.playerName3 + ' score is ' + data.playerScore3 + '\n' +
			data.playerName4 + ' score is ' + data.playerScore4);
	});
	
	
	window.g_stage = new createjs.Stage('my_canvas');
	
	getAndSendPlayerName();
	
	$('html').keydown(charMovement);
});

function onInterval()
{
	var p = getCurrentPlayer();
	p.energy += 0.5;
	if(p.energy > 100.0)
	{
		p.energy = 100.0;
	}
	window.g_socket.emit('update energy', p.energy);
}

function charMovement(e) {
	var p = getCurrentPlayer();
	if (p.energy <= 0.0) return;
	
	var key_press = String.fromCharCode(e.which);//console.log(key_press);
	
	if((key_press == 'A' || key_press == 'S' || key_press == 'D' ||
		key_press == 'W' || key_press == ' ') && !checkCollision(key_press))
	{	
		//console.log(key_press);
		window.g_socket.emit('key pressed', key_press);
	}	
}

function drawMap()
{
	window.g_stage.clear();

	var bgImage = window.g_queue.getResult(window.g_data.bgImg);
	
	var shape = new createjs.Shape();
	shape.graphics.beginBitmapFill(bgImage).drawRect(0, 0, 640, 640);

	window.g_stage.addChild(shape);
	
	for(var i in window.g_data.bases)
	{
		var bi = window.g_data.bases[i].img;
		var bitmap = new createjs.Bitmap(window.g_queue.getResult(bi));
		bitmap.x = window.g_data.bases[i].x;
		bitmap.y = window.g_data.bases[i].y;
		window.g_stage.addChild(bitmap);
	}
	
	for(var i in window.g_data.stones)
	{
		var bitmap = new createjs.Bitmap(window.g_queue.getResult('obstacle_1'));
		bitmap.x = window.g_data.stones[i].x;
		bitmap.y = window.g_data.stones[i].y;
		window.g_stage.addChild(bitmap);
	}
	
	for(var i in window.g_data.golds)
	{
		var bitmap = new createjs.Bitmap(window.g_queue.getResult('gold'));
		bitmap.x = window.g_data.golds[i].x;
		bitmap.y = window.g_data.golds[i].y;
		window.g_data.golds[i].bitmap = bitmap;
		window.g_stage.addChild(bitmap);
	}
	
	for(var i in window.g_data.batteries)
	{
		var bitmap = new createjs.Bitmap(window.g_queue.getResult('power'));
		bitmap.x = window.g_data.batteries[i].x;
		bitmap.y = window.g_data.batteries[i].y;
		window.g_data.batteries[i].bitmap = bitmap;
		window.g_stage.addChild(bitmap);
	}
	
	for(var i in window.g_data.players)
	{
		var name = window.g_data.players[i].img;
		var bitmap = new createjs.Bitmap(window.g_queue.getResult(name));
		bitmap.x = window.g_data.players[i].x;
		bitmap.y = window.g_data.players[i].y;
		window.g_data.players[i].bitmap = bitmap;
		window.g_stage.addChild(bitmap);
	}
	
	var p = getCurrentPlayer();
	p.goldArrivedSend = false;
	$('#energy').text('Energy is ' + p.energy + '%');
	$('#score').text('Your score is - ' + p.score);
	
	var circle = new createjs.Shape();
	circle.graphics.beginFill('blue').drawCircle(p.x + 16, p.y + 16, 96);
	p.mask = circle;

	window.g_stage.mask = circle;  //MARAXUX:
	
	window.g_stage.update();
}

function getAndSendPlayerName()
{
	var name = prompt('Enter Your name');
	window.g_socket.emit('send name', name);
}

function drawBackground(bgName)
{
	var bgImage = window.g_queue.getResult(bgName);
	
	var shape = new createjs.Shape();
	shape.graphics.beginBitmapFill(bgImage).drawRect(0, 0, 640, 640);

	window.g_stage.addChild(shape);
	
	var text1 = new createjs.Text("Waiting for players to join...", "50px Arial", "white");
	text1.x = 20;
	text1.y = 300;

	window.g_stage.addChild(text1);

	window.g_stage.update();
}

function handleComplete()
{
	drawBackground('grass');
}

function getCurrentPlayer()
{
	for(var i in window.g_data.players)
	{
		if(window.g_data.players[i].socketId == window.g_socket.id)
		{
			//console.log('current player socket id =' + window.g_socket.id);
			return window.g_data.players[i];
		}
	}
	return null;
}

function getPlayer(socketId)
{
	for(var i in window.g_data.players)
	{
		if(window.g_data.players[i].socketId == socketId)
		{
			return window.g_data.players[i];
		}
	}
	return null;
}

function checkCollision(key) {	
	var player = getCurrentPlayer();
	var data = window.g_data;
	var isFound = false;
	var px = player.x;
	var py = player.y;
    switch (key) {
		case 'A':
			px -= 2;
			break;
		case 'D':
			px += 2;
			break;
		case 'W':
			py -= 2;
			break;
		case 'S':
			py += 2;
			break;
	}	
	var hc = px + 16;
	var vc = py + 16;

	if(px < 0)
	{
		return true;
	}
	else if(px > (640 - 32))
	{
		return true;
	}
	else if(py < 0)
	{
		return true;
	}
	else if(py > (640 - 32))
	{
		return true;
	}
	
	for (var i in data.bases) {
		if (Math.abs(hc - (data.bases[i].x + 32)) < 48 &&
			Math.abs(vc - (data.bases[i].y + 32)) < 48) {
			if(!player.goldArrivedSend && player.hasGold && data.bases[i].img == player.base)
			{
				player.goldArrivedSend = true;
				window.g_socket.emit('gold arrived', null);
			}
			isFound = true;
			break;
		}
	}
	if (!isFound)
	{
		for (var i in data.stones) {
			if (Math.abs(hc - (data.stones[i].x + 16)) < 32 &&
				Math.abs(vc - (data.stones[i].y + 16)) < 32) {
				isFound = true;
				break;
			}
		}
	}
	
	return isFound;
}
