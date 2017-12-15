var fs = require('fs');
var cluster = require('cluster');
var Logger = require('./logger.js');
JSON.minify = require('node-json-minify');

if (!fs.existsSync('config.json')){
    console.log('config.json file is missing please create. Program quitting.');
    return;
}

var serverConfig = JSON.parse(JSON.minify(fs.readFileSync("config.json", {encoding: 'utf8'})));
var logger = new Logger(serverConfig.logLevel);

if (cluster.isMaster) {
  logger.special('Master', 'Cluster setup', 'Main thread talking');
  cluster.fork();
  cluster.fork();
} else if (cluster.isWorker) {
  console.log(`I am worker #${cluster.worker.id}`);
}