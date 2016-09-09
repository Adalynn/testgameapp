var express=require('express');
var app=express();
var path=require('path');
var server = require('http').Server(app);

// app.get('/', function(req, res){
// 	res.sendFile(__dirname + '/client/index.html');
// });

app.use(express.static(path.join(__dirname+'/client')));

app.route('/*').get(function(req, res) { 
    return res.sendFile(path.join(__dirname+'/client/index.html')); 
});

server.listen(2000);

var SOCKET_LIST = {};

var io = require('socket.io')(server,{});
io.sockets.on('connection', function(socket) {
	console.log("connection established.");
	socket.id = Math.random();
	socket.x = 0;
	socket.y = 0;
	SOCKET_LIST[socket.id] = socket;	


	socket.on('init',function(data) {
		console.log( "INIT FROM CLIENT : " + data.message );
	});

	socket.emit('responseMsg',{
		message: 'Server says hi.'
	});

});


setInterval(function(){
	for(var i in SOCKET_LIST) {
		var socket = SOCKET_LIST[i];
		socket.x++;
		socket.y++; 
		socket.emit('newPosition',{
			x: socket.x,
			y: socket.y
		});
	}
},1000/25);


