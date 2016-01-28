var jermaine = require('../../lib/jermaine/src/jermaine.js');
var vF = require('../util/validationFunctions.js');

var CategoryFormatter = function (formatValues) {
    if (vF.typeOf(formatValues) !== "array") {
        throw new Error("formatValues must be an array");
    }
    this.formatValues = formatValues;
    this.length = Math.max.apply(this, this.formatValues.map(function(s) { return s.length; }));
};

CategoryFormatter.prototype.format = function (value) {
    var i = Math.round(value.getRealValue());
    var k = this.formatValues.length;
    return this.formatValues[((i % k) + k) % k];
};

CategoryFormatter.prototype.getMaxLength = function () {
    return this.length;
};

CategoryFormatter.prototype.getFormatString = function () {
    return this.formatValues;
};

module.exports = CategoryFormatter;
