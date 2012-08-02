/*global describe, it, beforeEach, expect, xit, jasmine */

describe("DatatipsVariable", function () {
    "use strict";

    var Variable = window.multigraph.core.DatatipsVariable,
        variable;

    beforeEach(function () {
        variable = new Variable();
    });

    it("should be able to create a Variable", function () {
        expect(variable instanceof Variable).toBe(true);
    });

    describe("format attribute", function () {
        it("should be able to set/get the format attribute", function () {
            variable.format("large");
            expect(variable.format()).toBe("large");
        });

    });

});
