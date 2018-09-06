var express = require('express');
var bodyParser = require('body-parser');
var requestIp = require('request-ip');
var jsonfile = require('jsonfile');
var cors = require('cors');

var app = express();

// use it before all route definitions
app.use(cors({origin: 'https://howell-info.azurewebsites.net/'}));
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

var port = process.env.PORT || 1337;
app.listen(port, function () {
	console.log('Listening on port ' + port);
});

