/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data Service", function () {
    "use strict";

    var Service = window.multigraph.core.Service,
        service;

    beforeEach(function () {
        service = new Service();
    });

    it("should be able to create a Service", function () {
        expect(service instanceof Service).toBe(true);
    });

    describe("location attribute", function () {
        it("should be able to set/get the location attribute", function () {
            expect(service.location() === undefined).toBe(true);
            service.location('http://example.com/CoolnessOfCats/1990/1995/');
            expect(service.location() === 'http://example.com/CoolnessOfCats/1990/1995/').toBe(true);
        });

    });

});
