var Warning = function(message) {
    this.message = message;
};

Warning.prototype = new Error();

module.exports  = Warning;
