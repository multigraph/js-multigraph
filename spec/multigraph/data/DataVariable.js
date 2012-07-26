/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data DataVariable", function () {
    "use strict";

    var DataVariable = window.multigraph.Data.Variables.DataVariable,
        NumberValue = window.multigraph.NumberValue,
        variable;

    beforeEach(function () {
        variable = new DataVariable('x');
    });

    it("should be able to create a DataVariable", function () {
        expect(variable instanceof DataVariable).toBe(true);
    });

    describe("id attribute", function () {
        it("should be able to set/get the id attribute", function () {
            variable.id('x');
            expect(variable.id() === 'x').toBe(true);
        });

    });

    describe("column attribute", function () {
        it("should be able to set/get the column attribute", function () {
            expect(variable.column() === undefined).toBe(true);
            variable.column(7);
            expect(variable.column()).toEqual(7);
        });

    });

    describe("type attribute", function () {
        it("should be able to set/get the type attribute", function () {
            variable.type('number');
            expect(variable.type() === 'number').toBe(true);
            variable.type('datetime');
            expect(variable.type() === 'datetime').toBe(true);
        });

    });

    describe("missingvalue attribute", function () {
        it("should be able to set/get the missingvalue attribute", function () {
            expect(variable.missingvalue() === undefined).toBe(true);
            variable.missingvalue(new NumberValue(-9000));
            expect(variable.missingvalue().getRealValue()).toEqual(-9000);
        });

    });

    describe("missingop attribute", function () {
        it("should be able to set/get the missingop attribute", function () {
            expect(variable.missingop() === undefined).toBe(true);
            variable.missingop('eq');
            expect(variable.missingop() === 'eq').toBe(true);
        });

    });

});
