var Model = require('../../lib/jermaine/src/core/model.js');

/*global sprintf */

var DatetimeFormatter = function (format) {
    var testString;
    if (typeof(format) !== "string") {
        throw new Error("format must be a string");
    }
    this.formatString = format;
    testString = DatetimeFormatter.formatInternally(format, new Date(0));
    this.length = testString.length;
};

DatetimeFormatter.prototype.format = function (value) {
    return DatetimeFormatter.formatInternally(this.formatString, value.value);
};

DatetimeFormatter.prototype.getMaxLength = function () {
    return this.length;
};

DatetimeFormatter.prototype.getFormatString = function () {
    return this.formatString;
};

DatetimeFormatter.formatInternally = function (formatString, date) {
    var dayNames = {
        "shortNames": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        "longNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
        monthNames = {
            "shortNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "longNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        },
        state = 0,
        c,
        i,
        t,
        output = "";

    for (i = 0; i < formatString.length; i++) {
        c = formatString.charAt(i);
        switch (state) {
        case 0:
            if (c === "%") {
                state = 1;
            } else {
                output += c;
            }
            break;
        case 1:
            switch (c) {
            case "Y":
                // four digit year
                output += date.getUTCFullYear().toString();
                break;
            case "y":
                // two digit year
                output += date.getUTCFullYear().toString().substr(2, 2);
                break;
            case "M":
                // 2-digit month number with leading zero
                output += sprintf("%02s", (date.getUTCMonth() + 1).toString());
                break;
            case "m":
                // month number without leading zero
                output += (date.getUTCMonth() + 1).toString();
                break;
            case "N":
                // month name, spelled out
                output += monthNames.longNames[date.getUTCMonth()];
                break;
            case "n":
                // month name, 3 letter abbreviation
                output += monthNames.shortNames[date.getUTCMonth()];
                break;
            case "D":
                // two-digit day of month with leading zero
                output += sprintf("%02s", date.getUTCDate().toString());
                break;
            case "d":
                // day of month without leading zero
                output += date.getUTCDate().toString();
                break;
            case "W":
                // weekday name, spelled out
                output += dayNames.longNames[date.getUTCDay()];
                break;
            case "w":
                // weekday name, 3-letter abbreviation
                output += dayNames.shortNames[date.getUTCDay()];
                break;
            case "H":
                // hour of day, 24 hour clock
                output += sprintf("%02s", date.getUTCHours().toString());
                break;
            case "h":
                // hour of day, 12 hour clock
                t = date.getUTCHours() % 12;
                if (t === 0) {
                    output += "12";
                } else {
                    output += t.toString();
                }
                break;
            case "i":
                // minutes
                output += sprintf("%02s", date.getUTCMinutes().toString());
                break;
            case "s":
                // seconds
                output += sprintf("%02s", date.getUTCSeconds().toString());
                break;
            case "v":
                // deciseconds (10ths of a second)
                output += sprintf("%03s", date.getUTCMilliseconds().toString()).substr(0, 1);
                break;
            case "V":
                // centiseconds (100ths of a second)
                output += sprintf("%03s", date.getUTCMilliseconds().toString()).substr(0, 2);
                break;
            case "q":
                // milliseconds (1000ths of a second)
                output += sprintf("%03s", date.getUTCMilliseconds().toString());
                break;
            case "P":
                // AM or PM
                t = date.getUTCHours();
                if (t < 12) {
                    output += "AM";
                } else {
                    output += "PM";
                }
                break;
            case "p":
                // am or pm
                t = date.getUTCHours();
                if (t < 12) {
                    output += "am";
                } else {
                    output += "pm";
                }
                break;
            case "L":
                // newline
                output += "\n";
                break;
            case "%":
                // %
                output += "%";
                break;
            default:
                throw new Error("Invalid character code for datetime formatting string");
            }
            state = 0;
            break;
        }
    }
    return output;
};

module.exports = DatetimeFormatter;
