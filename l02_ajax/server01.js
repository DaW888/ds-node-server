var http = require("http");
var qs = require("querystring");
var fs = require("fs")
var server = http.createServer(function(req, res) {
    console.log("adres url: " + req.url);
    console.log(req.method);

    switch (req.method) {
		case "GET":

			fs.readFile("strona01.html", function (_error, data) {        
				res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
				res.write(data);
				res.end();
			})

			break;
			
        case "POST":
            // tu wywołaj funkcję "servResponse", która pobierze dane przesłane
            // w formularzu i odpowie do przeglądarki
			// (uwaga - adres żądania się nie zmienia)
			res.writeHead(200, { "content-type": "aplication/json;charset=utf-8" });			
            servResponse(req, res);

            break;
	}
	
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" });


});

server.listen(3000, function() {
    console.log("server on port: 3000");
});



function servResponse(req, res) {
	var allData = "";

	//kiedy przychodzą dane POSTEM, w postaci pakietów,
	//łącza się po kolei do jednej zmiennej "allData"
	// w poniższej funkcji nic nie modyfikujemy

	req.on("data", function(data) {
		console.log("data: " + data);
		allData += data;
	});

	//kiedy przyjdą już wszystkie dane
	//parsujemy je do obiektu "finish"
	//i odsyłamy do przeglądarki

	req.on("end", function(data) {
		var finish = qs.parse(allData);
		console.log(finish.bt1);
		res.end("odsyłam do przeglądarki: " + JSON.stringify(finish));
	});
}
