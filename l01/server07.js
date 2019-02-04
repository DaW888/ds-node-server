var http = require("http");
const color = require("colors");

var server = http.createServer(function(req, res) {

	if(req.url === '/a'){
		console.log('kolorwe'.blue)
	}else if(req.url === '/b'){
		console.log('kolorwe'.america)
	}else if(req.url === '/c'){
		console.log('kolorwe'.grey)
	}else{
		console.log('kolorwe'.rainbow)
	}
	
});

server.listen(3000, function() {
    console.log("serwer startuje na porcie 3000");
});
