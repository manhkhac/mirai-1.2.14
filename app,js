const {
	spawn
} = require("child_process");
const {
	readFileSync
} = require("fs-extra");
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log")
var express  = require("express");
var app     = express();

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

/////////////////////////////////////////////////////////
//========= Create start bot and make it loop =========//
/////////////////////////////////////////////////////////

function startBot(message) {
	(message) ? logger(message, "[ Starting ]"): "";
	const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "mirai.js"], {
		cwd: __dirname,
		stdio: "inherit",
		shell: !0
	});
	child.on("close", (codeExit) => {
		if (codeExit != 0 || global.countRestart && global.countRestart < 5) {
			startBot("Restarting...");
			global.countRestart += 1;
			return
		} else return
	});
	child.on("error", function(error) {
		logger("An error occurred: " + JSON.stringify(error), "[ Starting ]")
	})
}
