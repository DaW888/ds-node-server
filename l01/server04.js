var http = require("http");
var server = http.createServer(function(req,res){        
        console.log(JSON.stringify(req.headers, null,4))
		a = String(req.rawHeaders)
		browser = a.search('Chrome')
		if(browser > 0){
			output = 'Twoja przegladarka to Chrome'
		} else{
			browser = a.search('Firefox')
			if(browser > 0){
				output = 'Twoja przegladarka to Firefox'
			} else{
				output = 'Posiadasz inną przeglądarkę'
			}
		}
		
		
		res.writeHead(200,{"content-type":"text/html;charset=utf-8"})
        res.end(output)
})

server.listen(3000, function(){
   console.log("serwer startuje na porcie 3000")
});
