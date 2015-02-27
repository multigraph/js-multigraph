/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Enum", function () {
    "use strict";

    var Enum = require('../../src/math/enum.js');

    describe("CalendarUnit Enum", function () {
        var CalendarUnit;
        beforeEach(function () {
            CalendarUnit = new Enum("CalendarUnit");
        });
        describe("constructor", function () {
            it("should be able to create a MONTH value", function () {
                expect(function () {
                    new CalendarUnit("month");
                }).not.toThrow();
            });
            it("should throw an error if we try to define another MONTH value", function () {
                var MONTH = new CalendarUnit("month");
                expect(function () {
                    new CalendarUnit("month");
                }).toThrow();
            });
            it("should be able to create distinct MONTH and DAY values", function () {
                var MONTH = new CalendarUnit("month");
                var DAY   = new CalendarUnit("day");
                expect(MONTH).not.toEqual(DAY);
            });
        });
        describe("isInstance() method", function () {
            it("should exist", function () {
                expect(typeof(CalendarUnit.isInstance)).toEqual("function");
            });
            it("should return true for a CalendarUnit instance", function () {
                var MONTH = new CalendarUnit("month");
                expect(CalendarUnit.isInstance(MONTH)).toBe(true);
            });
            it("should return false for something that is not a CalendarUnit instance", function () {
                var MONTH = new CalendarUnit("month");
                expect(CalendarUnit.isInstance("month")).toBe(false);
            });
        });
        describe("toString() method", function () {
            var MONTH, DAY;
            beforeEach(function () {
                MONTH = new CalendarUnit("month");
                DAY   = new CalendarUnit("day");
            });
            it("MONTH should convert to the string 'month'", function () {
                expect(MONTH.toString()).toEqual("month");
            });
            it("DAY should convert to the string 'day'", function () {
                expect(DAY.toString()).toEqual("day");
            });
        });
        describe("parse() method", function () {
            var MONTH, DAY;
            beforeEach(function () {
                MONTH = new CalendarUnit("month");
                DAY   = new CalendarUnit("day");
            });
            it("string 'month' should parse to MONTH", function () {
                expect(CalendarUnit.parse("month")).toEqual(MONTH);
            });
            it("string 'day' should parse to DAY", function () {
                expect(CalendarUnit.parse("day")).toEqual(DAY);
            });
        });

    });

});
