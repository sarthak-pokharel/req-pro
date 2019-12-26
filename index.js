let exp = require("express");
let server = exp ();
let {log} = console;

server.use (exp.json ());

server.post("/", function(req,res){
    let body = request.body;
    log (body)
});
server.listen();
