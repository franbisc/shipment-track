var request = require('request');

var myServerIp = "127.0.0.1";
var urls = [
	'http://'+myServerIp+':3000/UPS/1ZW13756836540191',
	'http://'+myServerIp+':3000/333/E520066971',   // 1
	'http://'+myServerIp+':3000/PTI/F22C90249138',
	'http://'+myServerIp+':3000/TNT/MY0244115',
	'http://'+myServerIp+':3000/BRT/009999999999',  //4
	'http://'+myServerIp+':3000/BRT/005L5076494',
	'http://'+myServerIp+':3000/DHL/1739L463482',
	'http://'+myServerIp+':3000/SDA/F2C90249138',
	'http://'+myServerIp+':3000/UPS/1Y36016c07499333',
	'http://'+myServerIp+':3000/GLS/M104943210L1',
	'http://'+myServerIp+':3000/PTI/F215C0964427',
	'http://'+myServerIp+':3000/UPS/99999999999999999',
	'http://'+myServerIp+':3000/UPS/1ZW1375068540191',
	'http://'+myServerIp+':3000/PTI/F2C90249138',
	'http://'+myServerIp+':3000/oooooooooooo/ooooooooooooo',
	'http://'+myServerIp+':3000/TNT/MY80244515',
	'http://'+myServerIp+':3000/BRT/00525076494',
	'http://'+myServerIp+':3000/DHL/1739463482',
	'http://'+myServerIp+':3000/TNT/9999999999',
	'http://'+myServerIp+':3000/SDA/F22L0249138',
	'http://'+myServerIp+':3000/UPS/1ZAY360107499333',
	'http://'+myServerIp+':3000/GLS/M104L432101',
	'http://'+myServerIp+':3000/PTI/F215C10964423'
];

callUrl();

function callUrl () {
	var rand;

	rand = Math.floor(Math.random() * 22);
	request(urls[rand], function (error, response, html) {
		if (error) {
			console.log("["+rand+"] - error");
		} else if (!error && response.statusCode == 200) {
			console.log("["+rand+"]" + response.body);
		}
	});

	setTimeout( function() {
        callUrl(); 
    }, 30 );
}
