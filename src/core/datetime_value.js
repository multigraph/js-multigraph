window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var DatetimeValue = function (value) {
        if (typeof(value) !== "number") {
            throw new Error("DatetimeValue requires its parameter to be a number");
        }
        this.value = new Date(value);
    };

    DatetimeValue.prototype.getRealValue = function () {
        return this.value.getTime();
    };

    DatetimeValue.parse = function (string) {
        var Y = 0,
            M = 0,
            D = 1,
            H = 0,
            m = 0,
            s = 0,
            ms = 0;
        if (typeof(string) === "string") {
            string = string.replace(/[\.\-\:\s]/g, "");
            if (string.length === 4) {
                Y = parseInt(string, 10);
            } else if (string.length === 6) {
                Y = parseInt(string.substring(0,4), 10);
                M = parseInt(string.substring(4,6), 10) - 1;
            } else if (string.length === 8) {
                Y = parseInt(string.substring(0,4), 10);
                M = parseInt(string.substring(4,6), 10) - 1;
                D = parseInt(string.substring(6,8), 10);
            } else if (string.length === 10) {
                Y = parseInt(string.substring(0,4), 10);
                M = parseInt(string.substring(4,6), 10) - 1;
                D = parseInt(string.substring(6,8), 10);
                H = parseInt(string.substring(8,10), 10);
            } else if (string.length === 12) {
                Y = parseInt(string.substring(0,4), 10);
                M = parseInt(string.substring(4,6), 10) - 1;
                D = parseInt(string.substring(6,8), 10);
                H = parseInt(string.substring(8,10), 10);
                m = parseInt(string.substring(10,12), 10);
            } else if (string.length === 14) {
                Y = parseInt(string.substring(0,4), 10);
                M = parseInt(string.substring(4,6), 10) - 1;
                D = parseInt(string.substring(6,8), 10);
                H = parseInt(string.substring(8,10), 10);
                m = parseInt(string.substring(10,12), 10);
                s = parseInt(string.substring(12,14), 10);
            } else if (string.length === 15 || string.length === 16 || string.length === 17) {
                Y  = parseInt(string.substring(0,4), 10);
                M  = parseInt(string.substring(4,6), 10) - 1;
                D  = parseInt(string.substring(6,8), 10);
                H  = parseInt(string.substring(8,10), 10);
                m  = parseInt(string.substring(10,12), 10);
                s  = parseInt(string.substring(12,14), 10);
                ms = parseInt(string.substring(14,17), 10);
            } else {
                throw new Error("Incorrect input format for Datetime Value's parse method");
            }
        } else {
            throw new Error("Datetime Value's parse method requires its parameter to be a string");
        }
        return new DatetimeValue(Date.UTC(Y, M, D, H, m, s, ms));
    };


    DatetimeValue.prototype.toString = function () {
        var Y, M, D, H, m, s, ms;

        Y = this.value.getUTCFullYear().toString();
        if (Y.length === 1) {
            Y = "000" + Y;
        } else if (Y.length === 2) {
            Y = "00" + Y;
        } else if (Y.length === 3) {
            Y = "0" + Y;
        }

        M = (this.value.getUTCMonth() + 1).toString();
        if (M.length === 1) {
            M = "0" + M;
        }

        D = this.value.getUTCDate().toString();
        if (D.length === 1) {
            D = "0" + D;
        }

        H = this.value.getUTCHours().toString();
        if (H.length === 1) {
            H = "0" + H;
        }

        m = this.value.getUTCMinutes().toString();
        if (m.length === 1) {
            m = "0" + m;
        }

        s = this.value.getUTCSeconds().toString();
        if (s.length === 1) {
            s = "0" + s;
        }

        ms = this.value.getUTCMilliseconds().toString();
        if (ms === "0") {
            ms = "";
        } else if (ms.length === 1) {
            ms = ".00" + ms;
        } else if (ms.length === 2) {
            ms = ".0" + ms;
        } else if (ms.length === 3) {
            ms = "." + ms;
        }
        
        return Y + M + D + H + m + s + ms;
    };


    DatetimeValue.prototype.compareTo = function (x) {
        if (this.getRealValue() < x.getRealValue()) {
            return -1;
        } else if (this.getRealValue() > x.getRealValue()) {
            return 1;
        }
        return 0;
    };

    DatetimeValue.prototype.add = function ( /*DataMeasure*/ measure) {
        var date = new DatetimeValue(this.getRealValue());
        switch (measure.unit) {
            case ns.DatetimeMeasure.MILLISECOND:
                date.value.setUTCMilliseconds(date.value.getUTCMilliseconds() + measure.measure);
                break;
            case ns.DatetimeMeasure.SECOND:
                date.value.setUTCSeconds(date.value.getUTCSeconds() + measure.measure);
                break;
            case ns.DatetimeMeasure.MINUTE:
                date.value.setUTCMinutes(date.value.getUTCMinutes() + measure.measure);
                break;
            case ns.DatetimeMeasure.HOUR:
                date.value.setUTCHours(date.value.getUTCHours() + measure.measure);
                break;
            case ns.DatetimeMeasure.DAY:
                date.value.setUTCDate(date.value.getUTCDate() + measure.measure);
                break;
            case ns.DatetimeMeasure.WEEK:
                date.value.setUTCDate(date.value.getUTCDate() + measure.measure * 7);
                break;
            case ns.DatetimeMeasure.MONTH:
                date.value.setUTCMonth(date.value.getUTCMonth() + measure.measure);
                break;
            case ns.DatetimeMeasure.YEAR:
                date.value.setUTCFullYear(date.value.getUTCFullYear() + measure.measure);
                break;
        }
        return date;
    };

    ns.DataValue.mixinComparators(DatetimeValue.prototype);

    ns.DatetimeValue = DatetimeValue;

});
