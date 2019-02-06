var http = require("http");
var fs = require('fs');
var qs = require('querystring');
var server = http.createServer(function(req, res) {
    console.log("adres url: " + req.url);
    console.log(req.method);

    switch (req.method) {
		case "GET":
			fs.readFile("strona02.html", function (_error, data) {        
				res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
				res.write(data);
				res.end();
			})
			break;
			
        case "POST":
            servResponse(req, res);
            break;
	}
	
});

server.listen(3000, function() {
    console.log("server on port: 3000");
});


function servResponse(req, res) {
	var allData = "";

	req.on("data", function(data) {
		console.log("data: " + data);
		allData += data;
	});


	req.on("end", function(data) {
		var finish = qs.parse(allData);
		finish.dodawanie = parseInt(finish.txt1) + parseInt(finish.txt2)
		finish.iloczyn = parseInt(finish.txt1) * parseInt(finish.txt2)
		res.writeHead(200, { "content-type": "application/json;charset=utf-8" });
		res.end("odsyłam do przeglądarki: " + JSON.stringify(finish, null, 2));
	});
}
