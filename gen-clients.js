var fs = require('fs');
var http = require('http');
var async = require('async');

var reg_host = '127.0.0.1';
var reg_port = 8300;
var appkey = '552373e558b39a005257c081';
var clients_file = 'clients.json';

// generate 5 users 
async.times(5, function(n, next) {
	http_get_userinfo(appkey, function(err, user) {
		if (err) {
			next(err);
		} else {
			var obj = JSON.parse(user);
			next(null, {clientId: obj.c, username: obj.u, password: obj.p});
		}
    })
}, function(err, users) {
	if (err) {
		console.log('error:', err);
		return;
	}

	fs.writeFile(clients_file, JSON.stringify(users), function(err) {
		if(err) {
			console.log('error:', err);
		} else {
			console.log("client info saved to " + clients_file);
		}
	}); 
});

function http_get_userinfo(appkey, cb) {
    var post_data = JSON.stringify({'a': appkey, 'p': 2});

    var post_options = {
        host: reg_host,
        port: reg_port,
        path: '/device/reg/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };

    var post_req = http.request(post_options, function(res) {
        res.on('data', function (chunk) {
            cb(null, chunk);
        });
        res.on('error', function(e) {
            console.log('register failed:', e);
            cb(e);
        });
    });

    post_req.write(post_data);
    post_req.end();
}