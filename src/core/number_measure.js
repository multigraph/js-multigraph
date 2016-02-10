var jermaine = require('../../lib/jermaine/src/jermaine.js');

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

// Consider a lattice of values spaced `s` apart, aligned with `a`
//    i.e. all values a + z*s, where z is any integer
// Return the largest value in this lattice that is <= `v`
function lastSpacingLocationAtOrBefore(s, v, a) {
    var n, n, f;
    v = v - a;
    if (v >= 0) {
        f = v / s;
        n = Math.floor(f);
        if (f - n < epsilon) { return v; }
        return a + n*s;
    } else {
        f = -v / s;
        n = Math.ceil(f);
        if (n - f < epsilon) { return v; }
        return a - n*s;
    }
}

/**
 * This function is just like `firstSpacingLocationAtOrAfter` above, but returns the
 * greatest NumberValue in the lattice that is less than or equal to `value`.
 * 
 * return: a NumberValue
 */
NumberMeasure.prototype.lastSpacingLocationAtOrBefore = function (/*NumberValue*/value, /*NumberValue*/alignment)  {
    return new NumberValue(lastSpacingLocationAtOrBefore(this.measure, value.value, alignment.value));
};

//    var f,
//        n,
//        m,
//        a = alignment.value,
//        v = value.value,
//        s = Math.abs(this.measure);
//    f = (v - a) / s;
//    if (f > 0) {
//        n = Math.floor(f);
//    } else {
//        n = Math.ceil(f);
//    }
//    m = n + 1;
//    if ((f - n < epsilon) || (m - f < epsilon)) {
//        console.log('at 1');
//        console.log(f);
//        console.log(f-n);
//        console.log(m-f);
//        console.log(epsilon);
//        return new NumberValue(v);
//    }
//    console.log('at 2');
//    return new NumberValue(a + s * n);
//};

NumberMeasure.parse = function (s) {
    return new NumberMeasure(parseFloat(s));
};

module.exports = NumberMeasure;
