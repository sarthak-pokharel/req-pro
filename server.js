

const express = require('express');
const server = express();
server.use("/js/",express.static("./frontend-api", {
	root: "./frontend-api",
}));
server.use("/",express.static("./public", {
	root: "./public",
	index: ["index.html", "home.html"]
}));
let apiWorker = require('./fetch-works');
let request = require('request');
const confidiental = require('./confidential');
//let {log} = console ;
let log = () => 0;
let port = process.env.PORT || 9876;
const sec_data = {
	"ASP.NET_SessionId": "bivk0cg5plcvv1pl32twvkjv",
	"M31542": confidiental.M31542
};
const defHeads = {
	'Content-type': 'application/json',
	'Access-control-allow-origin': '*'
}
refreshAuth(init());
setInterval(refreshAuth, 3*60*1000);
function refreshAuth(callback) {
	apiWorker.getSession(sec_data['M31542'], function(auth) {
		if(!auth.accessToken)return console.error("Can't get Authorization ", auth) || refreshAuth(callback);
		sec_data['authorization'] = auth.accessToken;
		log(sec_data);
		callback && callback();
	});
  ((async)=> {
    request(`https://${process.env.PROJECT_HOST}/`,function(){});
  })()
}
function isJSON(json) {
	try {
		return [true,JSON.parse(json)];
	}catch(err) {
		return [false];
	}
}

function init () {
	server.post('/', async function(req,res){
		let data = await collectPostData(req);
		let json = isJSON(data);
		if(!json[0]) {
			res.writeHead(500,{
				...defHeads
			});
			return res.end(`{"err": "invalid-data-sent"}\n`);
		};
		if(isNaN(+json[1].id)) {
			res.writeHead(500, {
				...defHeads
			});
			return res.end(`{"err": "no-user-id-sent"}\n`)
		}
		apiWorker.getProfile(+json[1].id,sec_data['authorization'], sec_data['M31542'], function(prof) {
			res.writeHead(200, {
				...defHeads
			})
			if(prof.error) {
				prof = {error: "Invalid User detected"};
			}
			res.write(JSON.stringify(prof));
			res.end("\n");
		});
	})
	server.listen(port, function(err) {
		if(err)throw err;
		console.log("Listening to port "+ port);
	});
};
async function collectPostData(req) {
	return await new Promise(resolve=>{
		let body = "";
		req.on('data', dat=>body += dat.toString());
		req.on('end', ()=>resolve(body));
	});
}