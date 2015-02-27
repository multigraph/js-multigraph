var Model = require('../../lib/jermaine/src/core/model.js');

var Box = new Model("Box", function () {
    this.hasA("width").which.isA("number");
    this.hasA("height").which.isA("number");
    this.isBuiltWith("width", "height");
});
    
module.exports = Box;
