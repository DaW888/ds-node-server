var http = require("http");
const color = require("colors");

var server = http.createServer(function(req, res) {
	
	req.url = req.url.toLocaleLowerCase();
	
	if (req.url === "/a") {
        var out = '<h2 style="color: hotpink">Strona A</h2>'
    } else if (req.url === "/b") {
		var out = '<h2 style="color: green">Strona B</h2>'
	} else if (req.url === "/c") {
		var out = '<h2 style="color: blue">Strona C</h2>'
	} else {
        var out = '<h2 style="color: red">jakas inna strona</h2>'
    }

    res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
    res.end("<h2>" + out + "</h2>");
});

server.listen(3000, function() {
    console.log("serwer startuje na porcie 3000");
});
