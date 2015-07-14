/*
FANCY ASCII MADNESS :D
*/

var colors = require('colors');

console.log("                                                              ");
console.log("                      NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN7    ");
console.log("                      NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNDN7    ");
console.log("                      DD                               DN7    ");
console.log("                      DD                      W        DN7    ");
console.log("                      DD                     [ ]       DN7    ");
console.log("                      ND                      3        DN7    ");
console.log("                      NN:                    /|        DN7    ");
console.log("                                         \\|// /        DN7    ");
console.log("                    DNNN$               -( )-|         DN7    ");
console.log("                    .?MDNNN:             J V |         DN7    ");
console.log("                    +   .NNDM      ___  '    /         DN7    ");
console.log("                    DNDN   MDN.    \\  \\/    |          DN7    ");
console.log("                      MNNN  MDN                        DD7    ");
console.log("                    D  .NDM..DD$ ~NNNNNNNNNNNNNNNNNNNDDDN7    ");
console.log("                    DDM:.NDN IND. ..................          ");
console.log("                    ZZZ$ $ZZ  OZ.                             ");
console.log("                                   (c) tkon99                 ");

console.log(" ");
console.log(colors.green("Starting freeCast server..."));

/*
SERIOUS STUFF
*/

var express = require("express");
var app = express();
var http = require("http").Server(app);
var open = require('open');
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

process.stdout.write('\033c');

console.log(colors.green("freeCast by tkon99"));
console.log(" ");
console.log("Opened a receiver for you!");
console.log(" ");