var http = require("http");
var fs = require("fs");
var server = http.createServer(function(req,response){        
	fs.readFile("static/index.html", function (error, data) {        
        if (error) {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.write("<h1>błąd 404 - nie ma pliku!<h1>");
            response.end();
        }
        else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        }
});
})

server.listen(3000, function(){
	console.log("serwer startuje na porcie 3000")
 });