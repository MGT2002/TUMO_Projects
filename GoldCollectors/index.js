var express = require('express');
var app = express();

var http = require('http').createServer(app);

var io = require('socket.io').listen(http);

var GameEngine = require('./gameEngine');

var gameEngine = new GameEngine();

http.listen(8080);

app.get('/', function(req, res)
{
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/:file', function(req, res)
{
	res.sendFile(__dirname + '/public/' + req.params.file);
});

app.get('/images/:file', function(req, res)
{
	res.sendFile(__dirname + '/public/images/' + req.params.file);
});

app.get('/audio/:file', function(req, res)
{
	res.sendFile(__dirname + '/public/audio/' + req.params.file);
});

app.get('/*', function(req, res)
{
	res.sendStatus(404);
});

var playersCount = 4;

io.sockets.on('connection', function(socket)
{
	console.log("socket has - " + typeof socket + " type.");
	
	console.log("The id of connected socket - " + socket.id);
	
	/*for(var sckt in io.sockets.sockets)
	{
		console.log(io.sockets.sockets[sckt].id);
	}
	*/
	socket.on('send message', function(data)
	{	
		var dataToSend = {
			socketId: socket.id,
			message: data
		};
		
		io.sockets.emit("new message", dataToSend);
	});
	
	if (gameEngine.players.length > (playersCount - 1))
		return;
	
	socket.emit('resources', require('./resources.json'));
	
	gameEngine.addPlayer(socket);
	
	socket.on('send name', function(data)
	{
		gameEngine.setPlayerName(socket.id, data);
		if(gameEngine.players.length == playersCount)
		{
			gameEngine.startGame();
		}
	});
	
	socket.on('key pressed', function(data)
	{
		gameEngine.keyPressed(socket.id, data);
	});
	
	socket.on('gold arrived', function(data)
	{
		gameEngine.goldArrived(socket.id);
	});
	
	socket.on('update energy', function(data)
	{
		gameEngine.updateEnergy(socket.id, data);
	});
});