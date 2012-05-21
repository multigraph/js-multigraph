/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis", function () {
    "use strict";

    var Axis = window.multigraph.Axis;

    console.log('and Axis is:');
    console.log(Axis);

    it("should be able to create an Axis", function () {
        var a  = new Axis();
        //expect(typeof(a)).toBe('Axis');
	expect(a instanceof Axis).toBe(true);
    });

    it("should be able to set/get the id attribute", function () {
        var a  = new Axis();
	a.id('the-id');
	var id = a.id();
	expect(id === 'the-id').toBe(true);
    });

    it("should not be able to set a numeric id attribute", function () {
        var a  = new Axis();
	a.id(5+'');
	var id = a.id();
	expect(id === 5).toBe(false);
    });


});
