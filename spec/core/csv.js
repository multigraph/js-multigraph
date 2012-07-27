/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data CSV", function () {
    "use strict";

    var CSV = window.multigraph.core.CSV,
        csv;

    beforeEach(function () {
        csv = new CSV();
    });

    it("should be able to create a CSV", function () {
        expect(csv instanceof CSV).toBe(true);
    });

    describe("location attribute", function () {
        it("should be able to set/get the location attribute", function () {
            csv.location('http://example.com/CoolnessOfCats.csv');
            expect(csv.location() === 'http://example.com/CoolnessOfCats.csv').toBe(true);
        });

    });

});
