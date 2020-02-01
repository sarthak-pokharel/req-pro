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
			jsn.headers = jsn.headers || {};
			jsn.headers = {
				req.headers,
				...jsn.headers
			}
			request(jsn, function(err, stat,body){
				res.writeHead(200,{
					"Content-type":"application/json",
					"Access-Control-Allow-Origin":"*"
				});
				res.write(JSON.stringify({
					error: err,
					response: stat
				}));
				res.end();
			});
		}catch(err){
			log("err");
			try{
				res.writeHead(401,{
				"Access-Control-Allow-Origin":"*"
                                });
			}catch{}
			res.end("{\"Error\":\"true\"}");
		}
	});
});
setInterval(_=>{
	request("https://req-pro.herokuapp.com", ()=>{
	});
}, 1000*5);
server.listen(port, e=>log("Server at "+port));
