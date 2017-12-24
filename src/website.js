var express = require('express');

module.exports = function(logger) {

	var system = 'Website';
	var port = 3000;
	
	var app = express();
	
	app.listen(port, function () {
		logger.all(system, 'Init', 'Website now running on port: ' + port + '.');
	});
};