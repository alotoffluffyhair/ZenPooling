var colors = require("color");
var dateFormat = require('dateformat');

var loggingLevels = {
	"all": 1,
	"special": 2,
	"warning": 3,
	"error": 4
};

//Provides colour coding of the text based on the logging level of the message.
var colorText = function(logLevel, text) {
	switch(logLevel) {
		case "log":
			return text.green;
		case "special":
			return text.cyan;
		case "warning":
			return text.yellow;
		case "error":
			return text.red;
		default:
			console.log("Unknown logging level: " + logLevel);
			return text;
	}	
};

var Logger = function (loglvl) {
	
	var loggingLevelInt = loggingLevels[loglvl];
	
	var log = function(severity, system, component, text) {
		if (loggingLevels[severity] < loggingLevelInt) return;
		var entryDesc = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss') + ' [' + system + ']\t';
		enteryDesc = colorText(severity, entryDesc);
		var logString = entryDesc + (' [' + component + ']\t') + text;
		
		console.log(logString);

	};
	
	var _this = this;
    Object.keys(loggingLevels).forEach(function(logType){
        _this[logType] = function(){
            var args = Array.prototype.slice.call(arguments, 0);
            args.unshift(logType);
            log.apply(this, args);
        };
    });
	
};
module.exports = Logger;