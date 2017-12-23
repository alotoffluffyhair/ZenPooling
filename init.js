var fs = require('fs');
var cluster = require('cluster');

var Logger = require('./src/logger.js');

JSON.minify = require('node-json-minify');


if (!fs.existsSync('config.json')){
    console.log('config.json file is missing please create. Program quitting.');
    return;
}

var serverConfig = JSON.parse(JSON.minify(fs.readFileSync("config.json", {encoding: 'utf8'})));
var logger = new Logger(serverConfig.logLevel);
  	
if (cluster.isWorker) {
	console.log(`I am worker ${cluster.worker.id}`);
	logger.all('Worker', '${cluster.worker.id}', 'test');
	return;
}

(function init() {
	logger.special("Master", "Init setup", "Setting up");
	cluster.fork();
	cluster.fork();
	cluster.fork();
	cluster.fork();
	
})();