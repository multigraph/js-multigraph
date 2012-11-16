/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Warning Object", function () {
    "use strict";

    var Warning = window.multigraph.core.Warning;

    it("should be able to create a Warning", function () {
        var w = new Warning("this is a warning");
        expect(w instanceof Warning).toBe(true);
    });

    it("a Warning instance should also be an Error instance", function () {
        var w = new Warning("this is a warning");
        expect(w instanceof Error).toBe(true);
    });

    it("Warning object's message should be properly set", function () {
        var m = "this is a warning message";
        var w = new Warning(m);
        expect(w.message).toEqual(m);
    });

});
