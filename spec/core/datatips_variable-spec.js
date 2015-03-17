/*global describe, it, beforeEach, expect, xit, jasmine */

describe("DatatipsVariable", function () {
    "use strict";

    var Variable = require('../../src/core/datatips_variable.js'),
        variable;

    beforeEach(function () {
        variable = new Variable();
    });

    it("should be able to create a Variable", function () {
        expect(variable instanceof Variable).toBe(true);
    });

    describe("format attribute", function () {
        it("should be able to set/get the format attribute", function () {
            variable.formatString("large");
            expect(variable.formatString()).toBe("large");
        });

    });

});
