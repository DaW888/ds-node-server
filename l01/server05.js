var http = require("http");
var server = http.createServer(function(req,res){        
        res.writeHead(200,{"content-type":"text/plain;charset=utf-8"})
        res.end("<h2>"+JSON.stringify(req.headers, null,5)+"</h2>")
})

server.listen(3000, function(){
   console.log("serwer startuje na porcie 3000")
});