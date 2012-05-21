/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis", function () {
    "use strict";

    var Axis = window.multigraph.Axis;

    it("should be able to create an Axis", function () {
        var a  = new Axis();
	expect(a instanceof Axis).toBe(true);
    });

    it("should be able to set/get the id attribute", function () {
        var a  = new Axis();
	a.id('the-id');
	var id = a.id();
	expect(id === 'the-id').toBe(true);
    });

});
