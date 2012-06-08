/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data Variable", function () {
    "use strict";

    var Variable = window.multigraph.Data.Variables.Variable,
        variable;

    beforeEach(function () {
        variable = new Variable('x');
    });

    it("should be able to create a Variable", function () {
        expect(variable instanceof Variable).toBe(true);
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
            variable.column('7');
            expect(variable.column() === '7').toBe(true);
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
            variable.missingvalue('-9000');
            expect(variable.missingvalue() === '-9000').toBe(true);
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
