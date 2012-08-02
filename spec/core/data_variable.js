/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data DataVariable", function () {
    "use strict";

    var DataVariable = window.multigraph.core.DataVariable,
        NumberValue = window.multigraph.core.NumberValue,
        variable;

    beforeEach(function () {
        variable = new DataVariable("x");
    });

    it("should be able to create a DataVariable", function () {
        expect(variable instanceof DataVariable).toBe(true);
    });

    describe("id attribute", function () {
        it("should be able to set/get the id attribute", function () {
            variable.id("x");
            expect(variable.id()).toBe("x");
        });

    });

    describe("column attribute", function () {
        it("should be able to set/get the column attribute", function () {
            expect(variable.column()).toBe(undefined);
            variable.column(7);
            expect(variable.column()).toEqual(7);
        });

    });

    describe("type attribute", function () {
        it("should be able to set/get the type attribute", function () {
            variable.type("number");
            expect(variable.type()).toBe("number");
            variable.type("datetime");
            expect(variable.type()).toBe("datetime");
        });

    });

    describe("missingvalue attribute", function () {
        it("should be able to set/get the missingvalue attribute", function () {
            expect(variable.missingvalue()).toBe(undefined);
            variable.missingvalue(new NumberValue(-9000));
            expect(variable.missingvalue().getRealValue()).toEqual(-9000);
        });

    });

    describe("missingop attribute", function () {
        it("should be able to set/get the missingop attribute", function () {
            expect(variable.missingop()).toBe(undefined);
            variable.missingop("eq");
            expect(variable.missingop()).toBe("eq");
        });

    });

});
