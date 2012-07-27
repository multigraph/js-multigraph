/*global describe, it, beforeEach, expect, xit, jasmine */

describe("UI", function () {
    "use strict";

    var UI = window.multigraph.core.UI,
        ui;

    beforeEach(function () {
        ui = new UI();
    });

    it("should be able to create a UI", function () {
        expect(ui instanceof UI).toBe(true);
    });

    describe("eventhandler attribute", function () {
        it("should be able to set/get the eventhandler attribute", function () {
            ui.eventhandler('error');
            expect(ui.eventhandler() === 'error').toBe(true);
        });

    });

});
