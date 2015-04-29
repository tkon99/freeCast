var express = require("express");
var app = express();
var http = require("http").Server(app);
var open = require('open');
var colors = require('colors');
require('shelljs/global');

var io = require('socket.io')(http);

var pairingcodes = [];

function getWlan(){
	var version = exec('NETSH WLAN SHOW INTERFACE | findstr /r "^....SSID"', {silent:true}).output;
	var ssid = version.split(":");
	ssid = ssid[1].trim();
	return ssid;
}

io.on('connection', function(socket){
  socket.emit('wlan', getWlan());
  socket.on('type', function(data){
  	console.log(colors.green(socket.id) + ' connected as a ' + colors.red(data));
  });
  socket.on('disconnect', function(){
  	console.log(colors.red(socket.id + " disconnected"));
  	removePairingCode(socket.id);
  });

  socket.on('pairingcode', function(code){
  	pairingcodes.push({"code": code, "id": socket.id});
  	console.log(pairingcodes);
  })

  // socket.on('pair', function(code){
  // 	var receiverId = getSocketIdByPairingCode(code);
  // 	if(receiverId !== false){
  // 		io.sockets.socket(receiverId).emit('connectedWith', socket.id);
  // 	}else{
  // 		socket.emit('error', 'code invalid');
  // 	}
  // });
});

function getSocketIdByPairingCode(code){
	for(i = 0; i < pairingcodes.length; i++){
		if(pairingcodes[i].code == code){
			return pairingcodes[i].id;
			break;
		}
	}
	return false;
}

function removePairingCode(id){
	for(i = 0; i < pairingcodes.length; i++){
		if(pairingcodes[i].id == id){
			pairingcodes.splice(i,1);
			break;
		}
	}
	console.log(pairingcodes);
	return true;
}

app.use('/receiver', express.static(__dirname + '/receiver'));

http.listen(3000, function(){
	open("http://localhost:3000/receiver");
});

console.log("Starting freeCast server");