var jermaine = require('../../lib/jermaine/src/jermaine.js');

var Box = new jermaine.Model("Box", function () {
    this.hasA("width").which.isA("number");
    this.hasA("height").which.isA("number");
    this.isBuiltWith("width", "height");
});
    
module.exports = Box;
