var express = require('express');
var bodyParser = require('body-parser');
var requestIp = require('request-ip');
var jsonfile = require('jsonfile');

var app = express();

app.use(requestIp.mw())
app.use(bodyParser.json());

var ipData = {};
var file = 'data.json'

try {
    ipData = jsonfile.readFileSync(file)
} catch (error) {
    console.error(error)
    jsonfile.writeFile(file, ipData, function (err) {
        console.log("writing file", ipData)
        console.error(err)
    })
}


app.get('/', function(req,res){
    console.log("ipData before",ipData);

    var ip = req.clientIp;
    var jsonDate = new Date().toJSON();
    ipData[ip] = jsonDate;

    console.log("ipData after",ipData);

    var uniqueVisitors =  Object.keys(ipData).length;

    jsonfile.writeFile(file, ipData, function (err) {
        console.log("writing file", ipData)
        console.error(err)
    })

    res.json(ipData);
});

app.listen(9556, function () {
	console.log('Listening on port 9556');
});

