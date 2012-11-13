/*global describe, it, beforeEach, expect, xit, jasmine */

describe("EventEmitter", function () {
    "use strict";

    var EventEmitter = window.multigraph.core.EventEmitter,
        ee;

    beforeEach(function () {
        ee = new EventEmitter();
    }); 

    it("should be able to create an EventEmitter instance", function () {
        expect(ee instanceof EventEmitter).toBe(true);
    });

    it("should be able to register a listener", function () {
        expect(function() {
            ee.addListener("bark", function() {
                console.log("Woof woof!");
            });
        }).not.toThrow();
    });

    it("should be able to register a listener, emit an event, and the listener should be called", function () {
        var barkListener = jasmine.createSpy();

        ee.addListener("bark", barkListener);
        ee.emit("bark");
        expect(barkListener).toHaveBeenCalled();

    });

    it("should be able to register a listener, emit an event, and the listener should be called with the correct arguments", function () {
        var barkListener = jasmine.createSpy();

        ee.addListener("bark", barkListener);
        ee.emit("bark", 1, 2);
        expect(barkListener).toHaveBeenCalledWith(1,2);

    });

    it("should be able to register listeners for two events and keep them separate", function() {
        var barkListener = jasmine.createSpy(),
            biteListener = jasmine.createSpy();

        ee.addListener("bark", barkListener);
        ee.addListener("bite", biteListener);
        ee.emit("bark");
        expect(barkListener).toHaveBeenCalled();
        expect(biteListener).not.toHaveBeenCalled();

        ee.emit("bark", 1,2);
        ee.emit("bite", 3,4);
        expect(barkListener).toHaveBeenCalledWith(1,2);
        expect(biteListener).toHaveBeenCalledWith(3,4);

    });

});
