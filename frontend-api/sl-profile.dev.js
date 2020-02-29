
"use strict";
var getProfile = function(profile_id, callback) {
	let xhr = new XMLHttpRequest();
	if(!xhr) {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(!xhr) {
		throw new Error("XMLHttpRequest not supported by Browser");
	}
    xhr.open("POST", "https://sl-profile.herokuapp.com");
    xhr.onload = function(e) {
    	let raw_response = xhr.responseText;
    	let response;
    	try {
    		response = JSON.parse(raw_response);
    	}catch(err) {
    		response = {
    			error: "Invalid Data Sent By Server",
    			data: raw_response
    		}
    	}
    	callback && callback(response);
    }
    xhr.onerror = function(e) {
    	callback && callback({error: "Request Not Complete"});
    }
    xhr.send(JSON.stringify({
    	id: profile_id
    }));
    return xhr;
};
