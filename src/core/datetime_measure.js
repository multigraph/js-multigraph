var DatetimeValue = require('./datetime_value.js'),
    Enum = require('../math/enum.js');

var DatetimeUnit = new Enum("DatetimeUnit");

var DatetimeMeasure = function (measure, unit) {
    if (typeof(measure) !== "number" || DatetimeMeasure.isUnit(unit) !== true) {
        throw new Error("Improper input for Datetime Measure's constructor");
    } else if (arguments.length !== 2) {
        throw new Error("Datetime Measure's contructor requires exactly two arguments");
    }
    this.measure = measure;
    this.unit    = unit;
};

DatetimeMeasure.isUnit = function (unit) {
    return DatetimeUnit.isInstance(unit);
};

DatetimeMeasure.prototype.negative = function () {
    return new DatetimeMeasure(-this.measure, this.unit);
};

DatetimeMeasure.prototype.getRealValue = function () {
    var factor;
    switch (this.unit) {
    case DatetimeMeasure.MILLISECOND:
        factor = 1;
        break;
    case DatetimeMeasure.SECOND:
        factor = 1000;
        break;
    case DatetimeMeasure.MINUTE:
        factor = 60000;
        break;
    case DatetimeMeasure.HOUR:
        factor = 3600000;
        break;
    case DatetimeMeasure.DAY:
        factor = 86400000;
        break;
    case DatetimeMeasure.WEEK:
        factor = 604800000;
        break;
    case DatetimeMeasure.MONTH:
        factor = 2592000000;
        break;
    case DatetimeMeasure.YEAR:
        factor = 31536000000;
        break;
    }
    return this.measure * factor;
};

DatetimeMeasure.parse = function (s) {
    var re, measure, unit;

    if (typeof(s) !== "string" || s.match(/\s*-?(([0-9]+\.?[0-9]*)|([0-9]*\.?[0-9]+))\s*(ms|s|m|H|D|W|M|Y){1}\s*$/) === null) {
        throw new Error("Improper input for Datetime Measure's parse method");
    }

    re      = /ms|s|m|H|D|W|M|Y/;
    measure = parseFloat(s.replace(re, ""));
    unit    = s.match(re); // returns an array

    unit = DatetimeUnit.parse(unit[0]);

    return new DatetimeMeasure(measure, unit);
};

DatetimeMeasure.findTickmarkWithMillisecondSpacing = function (/*number(milliseconds)*/value, /*number(milliseconds)*/alignment, /*number(milliseconds)*/spacing) {
    var offset = value - alignment,
        d      = Math.floor( offset / spacing );
    if (offset % spacing !== 0) {
        ++d;
    }
    return new DatetimeValue(alignment + d * spacing);
};

DatetimeMeasure.findTickmarkWithMonthSpacing = function (/*DatetimeValue*/value, /*DatetimeValue*/alignment, /*number(months)*/monthSpacing) {
    var valueD = value.value,       //NOTE: ".value" property of DatetimeValue is a javascript Date object
        alignD = alignment.value,   //NOTE: ".value" property of DatetimeValue is a javascript Date object
        monthOffset = 12 * (valueD.getUTCFullYear() - alignD.getUTCFullYear()) + (valueD.getUTCMonth() - alignD.getUTCMonth()),
        d = Math.floor( monthOffset / monthSpacing );

    if (monthOffset % monthSpacing !== 0) { ++d; }
    else if (valueD.getUTCDate() > alignD.getUTCDate()) { ++d; }
    else if (valueD.getUTCDate() === alignD.getUTCDate() && valueD.getUTCHours() > alignD.getUTCHours()) { ++d; }
    else if (valueD.getUTCDate() === alignD.getUTCDate() && valueD.getUTCHours() === alignD.getUTCHours() && valueD.getUTCMinutes() > alignD.getUTCMinutes()) { ++d; }
    else if (valueD.getUTCDate() === alignD.getUTCDate() && valueD.getUTCHours() === alignD.getUTCHours() && valueD.getUTCMinutes() === alignD.getUTCMinutes() && valueD.getUTCSeconds() > alignD.getUTCSeconds()) { ++d; }
    else if (valueD.getUTCDate() === alignD.getUTCDate() && valueD.getUTCHours() === alignD.getUTCHours() && valueD.getUTCMinutes() === alignD.getUTCMinutes() && valueD.getUTCSeconds() === alignD.getUTCSeconds() && valueD.getUTCMilliseconds() > alignD.getUTCMilliseconds()) { ++d; }

    return alignment.add( DatetimeMeasure.parse((d * monthSpacing) + "M") );
};


/**
 * Consider the regular lattice of points on the Datetime line separated from each other
 * by `this` DatetimeMeasure, and aligned at the DatetimeValue `alignment`.  This function
 * return the smallest DatetimeValue in that lattice which is greater than or equal to
 * `value`.
 * 
 * return: a DatetimeValue
 */
DatetimeMeasure.prototype.firstSpacingLocationAtOrAfter = function (/*DatetimeValue*/value, /*DatetimeValue*/alignment)  {
    switch (this.unit) {
    case DatetimeMeasure.MONTH:
        return DatetimeMeasure.findTickmarkWithMonthSpacing(value, alignment, this.measure);
    case DatetimeMeasure.YEAR:
        return DatetimeMeasure.findTickmarkWithMonthSpacing(value, alignment, this.measure * 12);
        //case DatetimeMeasure.MILLISECOND:
        //case DatetimeMeasure.SECOND:
        //case DatetimeMeasure.MINUTE:
        //case DatetimeMeasure.HOUR:
        //case DatetimeMeasure.DAY:
        //case DatetimeMeasure.WEEK:
    default:
        return DatetimeMeasure.findTickmarkWithMillisecondSpacing(value.getRealValue(), alignment.getRealValue(), this.getRealValue());
    }
};

/**
 * This function is just like `firstSpacingLocationAtOrAfter` above, but returns the
 * greatest DatetimeValue in the lattice that is less than or equal to `value`.
 * 
 * return: a DatetimeValue
 */
DatetimeMeasure.prototype.lastSpacingLocationAtOrBefore = function (/*DatetimeValue*/value, /*DatetimeValue*/alignment)  {
    var x = this.firstSpacingLocationAtOrAfter(value, alignment);
    if (x.eq(value)) {
        return x;
    }
    var y = x.add(this.negative());
    return y;
};

DatetimeMeasure.prototype.toString = function () {
    return this.measure.toString() + this.unit.toString();
};

DatetimeMeasure.MILLISECOND = new DatetimeUnit("ms");
DatetimeMeasure.SECOND      = new DatetimeUnit("s");
DatetimeMeasure.MINUTE      = new DatetimeUnit("m");
DatetimeMeasure.HOUR        = new DatetimeUnit("H");
DatetimeMeasure.DAY         = new DatetimeUnit("D");
DatetimeMeasure.WEEK        = new DatetimeUnit("W");
DatetimeMeasure.MONTH       = new DatetimeUnit("M");
DatetimeMeasure.YEAR        = new DatetimeUnit("Y");

module.exports = DatetimeMeasure;
