let exp = require("express");
let request = require("request");
let server = exp ();
let {log} = console;
let port = process.env.PORT || 3000;
server.use (exp.json ());

server.post("/", function(req,res){
	let body = "";
	req.on("data", e=>body+=e.toString());
	req.on("end", function(){
		try {
			jsn = JSON.parse(body);
			request(jsn, function(er,stat,body){
				res.writeHead(200);
				log(JSON.parse(stat));
				res.end();
			});
		}catch(err){
			res.writeHead(401);
			res.end("Error");
		}
		res.end();
	});
});
server.listen(port, e=>log("Server at "+port));
