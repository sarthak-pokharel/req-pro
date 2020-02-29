
let request = require("request");
const confidential = require('./confidential');
function isJSON (data) {
	try {
		return [true, JSONparse(data)];
	}catch(err) {
		return [false]
	}
}
function getProfile(id,authorization,M31542, callback) {
	request({
		url: confidential.beta_link+"/api/Profile/GetProfile",
		method: "POST",
		headers: {
			'authorization': "Bearer " + authorization,
			'origin': confidential.beta_link,
			'authority': confidential.beta_host,
			"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
			"referer": confidential.beta_link+"/profile/8843885/activity",
			"content-type": "application/json",
			"accept": "*/*",
			"accept-encoding": "gzip, deflate, br",
			"accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
			"cookie": "M31542="+M31542
		},
		body: '{"id":"'+id+'"}',
		gzip: true
	},function (err,stat,body) {
		if(err && (stat.statusCode != 200)) throw new Error("Error: Couldn't get profile \n"+(err||stat));
		try {
			let data = JSON.parse(body);
			callback && callback(data);
		}catch(err) {
			console.log(err);
		}
	});
}
function getSession(M31542,callback) {
	request({
		url: "https://beta.sololearn.com/Ajax/GetSession?locale=en",
		method: "POST",
		headers: {
			"authority": confidential.beta_host,
			"content-length": "0",
			"origin": confidential.beta_link,
			"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
			"accept": "*/*",
			"referer": confidential.beta_host+"/profile/5529752/activity",
			"accept-encoding": "gzip, deflate, br",
			"accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
			"cookie": "M31542="+M31542
		},
		gzip:true
	}, function(err,response,body ) {
		if(err) throw err;
		let dat = JSON.parse(body);
		callback(dat);
	});
}

module.exports = {getSession,getProfile }