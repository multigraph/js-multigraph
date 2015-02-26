/*global sprintf */

var NumberFormatter = function (format) {
    var testString;
    if (typeof(format) !== "string") {
        throw new Error("format must be a string");
    }
    this.formatString = format;
    testString = sprintf(format, 0);
    this.length = testString.length;
};

NumberFormatter.prototype.format = function (value) {
    return sprintf(this.formatString, value.getRealValue());
};

NumberFormatter.prototype.getMaxLength = function () {
    return this.length;
};

NumberFormatter.prototype.getFormatString = function () {
    return this.formatString;
};

module.exports = NumberFormatter;
