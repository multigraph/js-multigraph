var Model = require('../../lib/jermaine/src/core/model.js');

NumberValue = require('./number_value.js');

// Fudge factor for floating point comparisons:
var epsilon = 1E-12;

var NumberMeasure = function (measure) {
    this.measure = measure;
};

NumberMeasure.prototype.getRealValue = function () {
    return this.measure;
};

NumberMeasure.prototype.toString = function () {
    return this.measure.toString();
};

NumberMeasure.prototype.firstSpacingLocationAtOrAfter = function (value, alignment)  {
    var f,
        n,
        m,
        a = alignment.value,
        v = value.value,
        s = Math.abs(this.measure);
    f = (v - a) / s;
    n = Math.floor(f);
    m = n + 1;
    //if ((Math.abs(n - f) < epsilon) || (Math.abs(m - f) < epsilon)) {
    //NOTE: by definition of n=floor(f), we know f >= n, so Math.abs(n - f) is the same as (f - n)
    //Also by definition, floor(f)+1 >= f, so Math.abs(m - f) is the same as (m - f)
    if ((f - n < epsilon) || (m - f < epsilon)) {
        return new NumberValue(v);
    }
    return new NumberValue(a + s * m);

};

NumberMeasure.parse = function (s) {
    return new NumberMeasure(parseFloat(s));
};

module.exports = NumberMeasure;
