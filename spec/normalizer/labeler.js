/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Labeler Normalizer", function () {
    "use strict";

    var Axis = window.multigraph.core.Axis,
        Labeler = window.multigraph.core.Labeler,
        DataValue = window.multigraph.core.DataValue,
        NumberValue = window.multigraph.core.NumberValue,
        DatetimeValue = window.multigraph.core.DatetimeValue,
        DataFormatter = window.multigraph.core.DataFormatter,
        DatetimeFormatter = window.multigraph.core.DatetimeFormatter,
        NumberFormatter = window.multigraph.core.NumberFormatter,
        numberlabel,
        datetimelabel,
        numberaxis,
        datetimeaxis;
    
    beforeEach(function () {
        window.multigraph.normalizer.mixin.apply(window.multigraph.core);        
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
            var formatter = DataFormatter.create(DataValue.NUMBER, "%f");
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
