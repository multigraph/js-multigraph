/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Network Monitor", function () {
    "use strict";

    var NetworkMonitor = window.multigraph.core.NetworkMonitor,
        nm;

    beforeEach(function () {
        nm = new NetworkMonitor();
    });

    it("should be able to create a Network Monitor", function () {
        expect(nm instanceof NetworkMonitor).toBe(true);
    });

    describe("visible attribute", function () {
        it("should be able to set/get the visible attribute", function () {
            nm.visible("yes");
            expect(nm.visible()).toBe("yes");
        });

    });

    describe("fixed attribute", function () {
        it("should be able to set/get the fixed attribute", function () {
            nm.fixed("no");
            expect(nm.fixed()).toBe("no");
        });

    });

});
