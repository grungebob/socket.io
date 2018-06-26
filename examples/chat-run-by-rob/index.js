var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  // res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log('a user connected');

	socket.on('chat message', function(msg){
		console.log('message: \n' + msg);
		io.emit('chat to client', msg);
	})

	socket.on('disconnect', () => {
		console.log(' YO A USER LEFT ');
	})

})

/*
//Example emit event:
io.emit('some event', {
	for: 'everyone'
})

// If you want to send a message to everyone 
// except for a certain socket, we have 
// the broadcast flag:

io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});
*/

http.listen(3000, function(){
  console.log('listening on *:3000');
});
    