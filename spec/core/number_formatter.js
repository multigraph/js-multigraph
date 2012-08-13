/*global describe, it, beforeEach, expect, xit, jasmine */

describe("NumberFormatter", function () {
    "use strict";

    var NumberFormatter = window.multigraph.core.NumberFormatter,
        NumberValue = window.multigraph.core.NumberValue,
        NumberMeasure = window.multigraph.core.NumberMeasure;

    it("should be able to create a NumberFormatter", function () {
        var nf = new NumberFormatter("%2.1d");
        expect(nf instanceof NumberFormatter).toBe(true);
    });

    it("should throw an error if the format string is not valid", function () {
        expect(function () {
            var nf = new NumberFormatter(1.234);
        }).toThrow("format must be a string");
        expect(function () {
            var nf = new NumberFormatter("%2.3");
        }).toThrow("[sprintf] invalid format string");
        expect(function () {
            var nf = new NumberFormatter();
        }).toThrow("format must be a string");
    });

    it("format method should return the correct value", function () {
        var nf = new NumberFormatter("%2.1d");
        expect(nf.format(new NumberValue(0))).toBe(" 0");
        expect(nf.format(new NumberValue(3.5))).toBe(" 3");
        expect(nf.format(new NumberValue(123.5))).toBe("123");

        nf = new NumberFormatter("%2.1f");
        expect(nf.format(new NumberValue(0))).toBe("0.0");
        expect(nf.format(new NumberValue(3.5))).toBe("3.5");
        expect(nf.format(new NumberValue(123.5))).toBe("123.5");

        nf = new NumberFormatter("%2.1f%%");
        expect(nf.format(new NumberValue(0))).toBe("0.0%");
        expect(nf.format(new NumberValue(3.5))).toBe("3.5%");
        expect(nf.format(new NumberValue(123.5))).toBe("123.5%");

        nf = new NumberFormatter("foo %2.1f bar");
        expect(nf.format(new NumberValue(0))).toBe("foo 0.0 bar");
        expect(nf.format(new NumberValue(3.5))).toBe("foo 3.5 bar");
        expect(nf.format(new NumberValue(123.5))).toBe("foo 123.5 bar");
    });

    it("getMaxLength method should return the correct value", function () {
        var nf = new NumberFormatter("%2.1d");
        expect(nf.getMaxLength()).toBe(2);

        nf = new NumberFormatter("%2.1f");
        expect(nf.getMaxLength()).toBe(3);

        nf = new NumberFormatter("%2.1f%%");
        expect(nf.getMaxLength()).toBe(4);

        nf = new NumberFormatter("foo %2.1f bar");
        expect(nf.getMaxLength()).toBe(11);
    });

});
