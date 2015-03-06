var jermaine = require('../../lib/jermaine/src/jermaine.js');

var Warning = function(message) {
    this.message = message;
};

Warning.prototype = new Error();

module.exports  = Warning;
