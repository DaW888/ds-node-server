var http = require("http");
var fs = require("fs");
var qs = require("querystring");

var allThings = {}
fs.readdir(__dirname+"/mp3", function (err, files) {
	if (err) {
		return console.log(err);
	}
	allThings.dirs = []
	files.forEach(function (fileName) {
		console.log(fileName);
		allThings.dirs.push(fileName)
		//tu dodaj foldery do wcześniej utworzonej tablicy
	});
	fs.readdir(__dirname+"/mp3/"+allThings.dirs[0], function (err, files) {
		if (err) {
			return console.log(err);
		}
		allThings.files = []
		files.forEach(function (fileName) {
			console.log(fileName);
			allThings.files.push(fileName)
			//tu dodaj foldery do wcześniej utworzonej tablicy
		});
		console.log(allThings)
		// tu można od razu wywołać taką samą funkcję, która przeczyta pliki z pierwszego katalogu w tablicy
	});
	console.log(allThings)
});

var server = http.createServer(function(req, res) {
    console.log("adres url: " + req.url);
    console.log(req.method);

    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                fs.readFile("static/index.html", function(_error, data) {
                    res.writeHead(200, {
                        "Content-Type": "text/html;charset=utf-8"
					});
                    res.write(data);
                    res.end();
                });
            } else if (req.url === "/libs/jquery-3.3.1.min.js") {
                fs.readFile("libs/jquery-3.3.1.min.js", function(_error, data) {
                    res.writeHead(200, {
                        "Content-Type": "application/javascript"
                    });
                    res.write(data);
                    res.end();
                });
            } else if (req.url === "/main.js") {
                fs.readFile("static/main.js", function(_error, data) {
                    res.writeHead(200, {
                        "Content-Type": "application/javascript"
                    });
                    res.write(data);
                    res.end();
                });
            } else if (req.url === "/net.js") {
                fs.readFile("static/net.js", function(_error, data) {
                    res.writeHead(200, {
                        "Content-Type": "application/javascript"
                    });
                    res.write(data);
                    res.end();
                });
            } else if (req.url === "/ui.js") {
                fs.readFile("static/ui.js", function(_error, data) {
                    res.writeHead(200, {
                        "Content-Type": "application/javascript"
                    });
                    res.write(data);
                    res.end();
                });
            } else if (req.url === "/style.css") {
                fs.readFile("static/style.css", function(_error, data) {
                    res.writeHead(200, { "Content-Type": "text/css" });
                    res.write(data);
                    res.end();
                });
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
		console.log(allThings)
		var finish = qs.parse(allData);
		console.log(finish);
		if(finish.action === "next"){
			fs.readdir(__dirname+"/mp3/"+allThings.dirs["CLICKED!!!"], function (err, files) {
				if (err) {
					return console.log(err);
				}
				allThings.files = []
				files.forEach(function (fileName) {
					console.log(fileName);
					allThings.files.push(fileName)
					//tu dodaj foldery do wcześniej utworzonej tablicy
				});
				console.log(allThings)
				// tu można od razu wywołać taką samą funkcję, która przeczyta pliki z pierwszego katalogu w tablicy
			});
		}
        res.end(JSON.stringify(allThings, null, 2));
    });
}
