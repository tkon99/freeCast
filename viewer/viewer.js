//(c) tkon99 - tkon99.me

(function(e,t,n,r,i){var s={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(e){for(var t=0;t<e.length;t++){var n=e[t].string;var r=e[t].prop;this.versionSearchString=e[t].versionSearch||e[t].identity;if(n){if(n.indexOf(e[t].subString)!=-1)return e[t].identity}else if(r)return e[t].identity}},searchVersion:function(e){var t=e.indexOf(this.versionSearchString);if(t==-1)return;return parseFloat(e.substring(t+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:t.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};s.init();var o={MSIE:{Windows:{ctrlKey:false,altKey:false,metaKey:false,shiftKey:false,which:122,string:"F11",alt:"F11"}},Firefox:{Windows:{ctrlKey:false,altKey:false,metaKey:false,shiftKey:false,which:122,string:"F11",alt:"F11"},Linux:{ctrlKey:false,altKey:false,metaKey:false,shiftKey:false,which:122,string:"F11",alt:"F11"},Mac:{ctrlKey:false,altKey:false,metaKey:true,shiftKey:true,which:70,string:"&#x21E7;&#x2318;F",alt:"Shift+Command+F"}},Chrome:{Windows:{ctrlKey:false,altKey:false,metaKey:false,shiftKey:false,which:122,string:"F11",alt:"F11"},Linux:{ctrlKey:false,altKey:false,metaKey:false,shiftKey:false,which:122,string:"F11",alt:"F11"},Mac:{ctrlKey:false,altKey:false,metaKey:true,shiftKey:true,which:70,string:"&#x21E7;&#x2318;F",alt:"Shift+Command+F"}},Safari:{Mac:{ctrlKey:true,altKey:false,metaKey:false,shiftKey:true,which:70,string:"^&#x2318;F",alt:"Control+Command+F"}},Opera:{Windows:{ctrlKey:false,altKey:false,metaKey:false,shiftKey:false,which:122,string:"F11",alt:"F11"},Linux:{ctrlKey:false,altKey:false,metaKey:false,shiftKey:false,which:122,string:"F11",alt:"F11"},Mac:{ctrlKey:false,altKey:false,metaKey:true,shiftKey:true,which:70,string:"&#x21E7;&#x2318;F",alt:"Shift+Command+F"}}};var u=function(){return n.clientHeight==r&&n.clientWidth==i||t.fullScreen||t.outerHeight==r&&t.outerWidth==i||s.browser=="Safari"&&t.outerHeight==r-40&&t.outerWidth==i},a=e(t);var f=o[s.browser][s.OS];var l={shortcut:f.string,longform:f.alt};a.data("fullscreen-state",u()).data("fullscreen-key",l).resize(function(){var e=u();if(a.data("fullscreen-state")&&!e){a.data("fullscreen-state",e).trigger("fullscreen-toggle",[false]).trigger("fullscreen-off")}else if(!a.data("fullscreen-state")&&e){a.data("fullscreen-state",e).trigger("fullscreen-toggle",[true]).trigger("fullscreen-on")}}).keydown(function(e){if(f&&e.ctrlKey==f.ctrlKey&&e.altKey==f.altKey&&e.metaKey==f.metaKey&&e.shiftKey==f.shiftKey&&e.which==f.which)a.trigger("fullscreen-key",[f.string,f.alt])})})(jQuery,this,document.documentElement,screen.height,screen.width)

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var pairingcode = getRandomInt(10000, 99999);

var socket = io();

$(document).ready(function(){

	getBackground();

	setVisible();

	registerHandlers();

	socket.emit("type", "receiver");

	socket.emit("pairingcode", pairingcode);
	
	socket.on("*", console.log(data));
});

$(window).bind('fullscreen-off', function(e){
    $("#homescreen").hide();
    $("#app").hide();
    $("#gofull").show();
});

function registerHandlers(){
	$("#goFullscreen").click(function(){
		goFullScreen();
		$("#gofull").hide();
		$("#homescreen").show();
	});
}

function setVisible(){
	$("#app").hide();
	$("#gofull").hide();

	if(!window.fullScreen){
		$("#homescreen").hide();
		$("#gofull").show();
	}
}

function goFullScreen() {
  var
      el = document.documentElement
    , rfs =
           el.requestFullScreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullscreen

;
rfs.call(el);
}

function getBackground(){
	$.get("http://www.corsproxy.com/www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US", function( data ) {
  		var image = "http://www.corsproxy.com/www.bing.com" + data.images[0].url;
  		console.log(image);
  		$("#background").attr('src', image);
	});
}