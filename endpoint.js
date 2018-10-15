const express = require('express');
const app = express();
const url = require('url');
const ipfilter = require('express-ipfilter').IpFilter;
var http = require('http');
var req = require('request');
var cheerio = require('cheerio');


const TNTpar = 'TNT-ITA';
const UPSpar = 'UPS';
const DHLpar = 'DHL';
const GLSpar = 'GLS-ITA';
const SDApar = 'SDA';
const BRTpar = 'BRT';
const PTIpar = 'PTI';



var ips = ['127.0.0.1'];

 
/* Blacklisting */
//app.use(ipfilter(ips));

/* Whitelisting */
app.use(ipfilter(ips, {mode: 'allow'}));


var general = express.Router();
general.get('/:trackingCode', function(request, res) {

	var url = []; 
	url = request.originalUrl.split("/");
	var partnerUrl = url[1];
	var partner = '';
	
	switch (partnerUrl) {
		case 'TNT':
			partner = TNTpar;
			break;
		case 'UPS':
			partner = UPSpar;
			break;
		case 'DHL':
			partner = DHLpar;
			break;
		case 'GLS':
			partner = GLSpar;
			break;
		case 'SDA':
			partner = SDApar;
			break;
		case 'BRT':
			partner = BRTpar;
			break;
	}



    var trackingCode = request.params.trackingCode;
    const urlRequest = 'http://www.rintraccialamiaspedizione.it/track?t=' +trackingCode+ '&c='+partner+'';
    console.log('HTTP get request...\n-->' +urlRequest);

    var lastUpdateVar = '';
    var cityVar = '';
    var statoVar = '';
    var jsonRes = {};

    req( urlRequest, function (error, response, html) {
        if (error) {
            console.log("Error. Response " + response);
        } else if (!error && response.statusCode == 200) {
          var $ = cheerio.load(html);

          $('tbody>:nth-child(1)> :nth-child(2)').each(function(i, element){
            lastUpdateVar = $(this).text();
          });
          $('tbody>:nth-child(1)> :nth-child(3)').each(function(i, element){
            statoVar = $(this).text();
          });
          $('tbody>:nth-child(1)> :nth-child(4)').each(function(i, element){
            cityVar = $(this).text();
          });
    }

    jsonRes = {lastUpdate: lastUpdateVar, city: cityVar, state: statoVar };
    console.log("JSON " + JSON.stringify(jsonRes));

    res.contentType('application/json');
    res.send(JSON.stringify(jsonRes));
    });

});



var PTI = express.Router();
PTI.get('/:trackingCode', function(request, res) {
    var trackingCode = request.params.trackingCode;
    const urlRequest = 'http://www.rintraccialamiaspedizione.it/track?t=' +trackingCode+ '&c=PTI';
    
    console.log('HTTP get request...\n-->' +urlRequest);

    var lastUpdateVar = "";
    var cityVar = "";
    var statoVar ="";
    var json = {};

    req( urlRequest, function (error, response, html) {
        if (error) {
            console.log("Error. Response " + response);
      } else if (!error && response.statusCode == 200) {
          var $ = cheerio.load(html);

          $('tbody> tr:last-child> :nth-child(2)').each(function(i, element){
            lastUpdateVar = $(this).text();
          });
          $('tbody> tr:last-child> :nth-child(3)').each(function(i, element){
            statoVar = $(this).text();
          });
          $('tbody> tr:last-child> :nth-child(4)').each(function(i, element){
            cityVar = $(this).text();
          });
    }
  
    jsonRes = {lastUpdate: lastUpdateVar, city: cityVar, state: statoVar };
    console.log("JSON " + JSON.stringify(jsonRes));

    res.contentType('application/json');
    res.send(JSON.stringify(jsonRes));
    });

});


app.use('/GLS', general);
app.use('/UPS', general);
app.use('/TNT', general);
app.use('/SDA', general);
app.use('/DHL', general);
app.use('/BRT', general);
app.use('/PTI', PTI);

app.listen(3000, ()  => {
 	console.log('Tracking server - Port: 3000');
});


app.get('/', function(req, res) {
    res.send('Insert partner and tracking code in the URL.\nEs: <domain>/GLS/MDEY7HD');
});
