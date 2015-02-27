/*global describe, it, beforeEach, expect, xit, jasmine */

describe("EventEmitter", function () {
    "use strict";

    var EventEmitter = require('../../src/core/event_emitter.js'),
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
        ee.emit({type : "bark"});
        expect(barkListener).toHaveBeenCalled();

    });

    it("should be able to register a listener, emit an event, and the listener should be called with the correct arguments", function () {
        var barkListener = jasmine.createSpy();
        var event = { type : "bark", mymessage : "foobar" };
        ee.addListener("bark", barkListener);
        ee.emit(event);
        expect(barkListener).toHaveBeenCalledWith(event);

    });

    it("should be able to register listeners for two events and keep them separate", function() {
        var barkListener = jasmine.createSpy(),
            biteListener = jasmine.createSpy();

        ee.addListener("bark", barkListener);
        ee.addListener("bite", biteListener);
        ee.emit("bark");
        expect(barkListener).toHaveBeenCalled();
        expect(biteListener).not.toHaveBeenCalled();

        var barkEvent = {type : "bark", min: 1, max : 2};
        var biteEvent = {type : "bite", min: 3, max : 4};
        ee.emit(barkEvent);
        ee.emit(biteEvent);
        expect(barkListener).toHaveBeenCalledWith(barkEvent);
        expect(biteListener).toHaveBeenCalledWith(biteEvent);

    });


});
