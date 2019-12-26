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
			request(jsn, function(err, stat,body){
				res.writeHead(200);
				res.write(JSON.stringify({
					error: err,
					response: stat
				}));
				res.end();
			});
		}catch(err){
			log("err");
			try{res.writeHead(401)}catch{}
			res.end("Error\n");
		}
	});
});
setInterval(_=>{
	request("https://req-pro.herokuapp.com", ()=>{
	});
}, 1000*5);
server.listen(port, e=>log("Server at "+port));
