/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Labeler Normalizer", function () {
    "use strict";

    var Axis = require('../../src/core/axis.js'),
        Labeler = require('../../src/core/labeler.js'),
        DataValue = require('../../src/core/data_value.js'),
        NumberValue = require('../../src/core/number_value.js'),
        DatetimeValue = require('../../src/core/datetime_value.js'),
        DataFormatter = require('../../src/core/data_formatter.js'),
        DatetimeFormatter = require('../../src/core/datetime_formatter.js'),
        NumberFormatter = require('../../src/core/number_formatter.js'),
        numberlabel,
        datetimelabel,
        numberaxis,
        datetimeaxis;
    
    beforeEach(function () {
        //var NormalizerMixin = require('../../src/normalizer/normalizer_mixin.js');
        //NormalizerMixin.apply();
        numberaxis = (new Axis(Axis.HORIZONTAL)).type(DataValue.NUMBER);
        datetimeaxis = (new Axis(Axis.VERTICAL)).type(DataValue.DATETIME);
        numberlabel = new Labeler(numberaxis);
        datetimelabel = new Labeler(datetimeaxis);
    });

    describe("handling the formatter", function () {
        it("should insert a formatter if one does not exist", function () {
            expect(numberlabel.formatter()).toBe(undefined);
            expect(datetimelabel.formatter()).toBe(undefined);

            numberlabel.normalize();
            datetimelabel.normalize();

            expect(numberlabel.formatter()).not.toBe(undefined);
            expect(datetimelabel.formatter()).not.toBe(undefined);
        });

        it("should not insert a formatter if one exists", function () {
            expect(numberlabel.formatter()).toBe(undefined);
            expect(datetimelabel.formatter()).toBe(undefined);
            var nf = DataFormatter.create(DataValue.NUMBER, "foo %1d");
            var df = DataFormatter.create(DataValue.DATETIME, "%Y-%M-%D");
            numberlabel.formatter(nf);
            datetimelabel.formatter(df);
            expect(numberlabel.formatter()).toBe(nf);
            expect(datetimelabel.formatter()).toBe(df);

            numberlabel.normalize();
            datetimelabel.normalize();

            expect(numberlabel.formatter()).toBe(nf);
            expect(datetimelabel.formatter()).toBe(df);
        });

        it("should insert a formatter of the correct type if one does not exist", function () {
            expect(numberlabel.formatter()).toBe(undefined);
            expect(datetimelabel.formatter()).toBe(undefined);

            numberlabel.normalize();
            datetimelabel.normalize();

            expect(numberlabel.formatter()).not.toBe(undefined);
            expect(datetimelabel.formatter()).not.toBe(undefined);
            expect(numberlabel.formatter() instanceof NumberFormatter).toBe(true);
            expect(datetimelabel.formatter() instanceof DatetimeFormatter).toBe(true);
        });

        it("should insert a number formatter with the correct default if one does not exist and the axis is of type 'number'", function () {
            var formatter = DataFormatter.create(DataValue.NUMBER, "%.1f");
            expect(numberlabel.formatter()).toBe(undefined);

            numberlabel.normalize();

            expect(numberlabel.formatter()).not.toBe(undefined);
            expect(numberlabel.formatter() instanceof NumberFormatter).toBe(true);
            expect(numberlabel.formatter().format(new NumberValue(0))).toEqual(formatter.format(new NumberValue(0)));
            expect(numberlabel.formatter().format(new NumberValue(3.567))).toEqual(formatter.format(new NumberValue(3.567)));
            expect(numberlabel.formatter().format(new NumberValue(4567))).toEqual(formatter.format(new NumberValue(4567)));
        });

        it("should insert a datetime formatter with the correct default if one does not exist and the axis is of type 'datetime'", function () {
            var formatter = DataFormatter.create(DataValue.DATETIME, "%Y-%M-%D %H:%i");
            expect(datetimelabel.formatter()).toBe(undefined);

            datetimelabel.normalize();

            expect(datetimelabel.formatter()).not.toBe(undefined);
            expect(datetimelabel.formatter() instanceof DatetimeFormatter).toBe(true);
            expect(datetimelabel.formatter().format(new DatetimeValue.parse("0"))).toEqual(formatter.format(new DatetimeValue.parse("0")));
            expect(datetimelabel.formatter().format(new DatetimeValue.parse("2012-10-01 15:23:15"))).toEqual(formatter.format(new DatetimeValue.parse("2012-10-01 15:23:15")));
            expect(datetimelabel.formatter().format(new DatetimeValue.parse("2012-08-04"))).toEqual(formatter.format(new DatetimeValue.parse("2012-08-04")));
        });

    });

});
