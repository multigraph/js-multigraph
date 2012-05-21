/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis parsing", function () {
    "use strict";

    var Axis = window.multigraph.Axis;

    it("should be able to call the mixin function", function () {
        console.log(Axis);
        console.log(Axis.parseXML);
        jQueryXMLHandler.mixin('parseXML', 'serialize');
        console.log(Axis);
        console.log(Axis.parseXML);

	var $xml = $('<horizontalaxis id="x" min="0" max="10"/>');

	var a = Axis.parseXML('horizontal', $xml);

	expect(a.id() === "x").toBe(true);
	expect(a.min() === "0").toBe(true);
	expect(a.max() === "10").toBe(true);
	expect(a.orientation() === "horizontal").toBe(true);
    });

    /*
    it("should be able to set/get the id attribute", function () {
        var a  = new Axis();
	a.id('the-id');
	var id = a.id();
	expect(id === 'the-id').toBe(true);
    });
    */

});
