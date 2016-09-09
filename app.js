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



var io = require('socket.io')(server,{});
io.sockets.on('connection', function(socket) {
	console.log("connection established.");

	socket.on('init',function(data) {
		console.log( "INIT FROM CLIENT : " + data.message );
	});

	socket.emit('responseMsg',{
		message: 'Server says hi.'
	});

});