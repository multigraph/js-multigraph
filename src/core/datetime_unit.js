var Enum = require('../math/enum.js');

var DatetimeUnit = new Enum("DatetimeUnit");

DatetimeUnit.MILLISECOND = new DatetimeUnit("ms");
DatetimeUnit.SECOND      = new DatetimeUnit("s");
DatetimeUnit.MINUTE      = new DatetimeUnit("m");
DatetimeUnit.HOUR        = new DatetimeUnit("H");
DatetimeUnit.DAY         = new DatetimeUnit("D");
DatetimeUnit.WEEK        = new DatetimeUnit("W");
DatetimeUnit.MONTH       = new DatetimeUnit("M");
DatetimeUnit.YEAR        = new DatetimeUnit("Y");

module.exports = DatetimeUnit;
