/*global describe, it, beforeEach, expect, xit, jasmine */

describe("AxisControls", function () {
    "use strict";

    var AxisControls = window.multigraph.core.AxisControls,
        axiscontrols;

    beforeEach(function () {
        axiscontrols = new AxisControls();
    });

    it("should be able to create a AxisControls", function () {
        expect(axiscontrols instanceof AxisControls).toBe(true);
    });

    describe("visible attribute", function () {
        it("should be able to set/get the visible attribute", function () {
            axiscontrols.visible("false");
            expect(axiscontrols.visible()).toBe("false");
        });

    });

});
