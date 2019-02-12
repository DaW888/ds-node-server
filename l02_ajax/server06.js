var http = require("http");
var fs = require('fs');
var qs = require('querystring');
var server = http.createServer(function (req, res) {
	console.log("adres url: " + req.url);
	console.log(req.method);

	switch (req.method) {
		case "GET":

			if (req.url === "/") {
				fs.readFile("zad2/strona06.html", function (_error, data) {
					res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
					res.write(data);
					res.end();
				})
			}

			else if (req.url === "/strona06.js") {
				fs.readFile("zad2/strona06.js", function (_error, data) {
					res.writeHead(200, { 'Content-Type': 'application/javascript' });
					res.write(data);
					res.end();
				})
			}

			else if (req.url === "/strona06.css") {
				fs.readFile("zad2/strona06.css", function (_error, data) {
					res.writeHead(200, { 'Content-Type': 'text/css' });
					res.write(data);
					res.end();
				})
			}

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
		console.log(finish)
		res.end(JSON.stringify(finish, null, 2));
	});
}
