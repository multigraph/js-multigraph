/*global describe, it, beforeEach, expect, xit, jasmine */

describe("DataVariable", function () {
    var DataVariable = window.multigraph.TEMP.DataVariable,
        dv;

    describe("constructor", function () {
        it("should create an object with the correct params", function () {
            dv = new DataVariable("column1", 1, "number");
            expect(dv.column()).toBe(1);
            expect(dv.id()).toBe("column1");
            expect(dv.type()).toBe("number");
        });

        it("should create an immutable object", function () {
            dv = new DataVariable("column1", 1, "number");

            expect(function () {
                dv.column(2);
            }).toThrow();

            expect(function () {
                dv.id("hello");
            }).toThrow();

            expect(function () {
                dv.type("DATETIME");
            }).toThrow();
        });
    });

    describe("type setter", function () {
        it("should not allow for any value other than INTEGER, DATETIME, UNKNOWN", function () {
            expect(function () {
                dv = new DataVariable();
                dv.type("INT");
            }).toThrow();

            expect(function () {
                dv = new DataVariable();
                dv.type("datetime");
            }).not.toThrow();

            expect(function () {
                dv = new DataVariable();
                dv.type("number");
            }).not.toThrow();

            expect(function () {
                dv = new DataVariable();
                dv.type("number");
            }).not.toThrow();
        });
    });
});