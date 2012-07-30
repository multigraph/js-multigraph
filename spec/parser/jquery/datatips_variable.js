/*global describe, it, beforeEach, expect, xit, jasmine */

describe("DatatipsVariable parsing", function () {
    "use strict";

    var Variable = window.multigraph.core.DatatipsVariable,
        xmlString = '<variable format="number"/>',
        $xml,
        variable;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
        variable = Variable.parseXML($xml);
    });

    it("should be able to parse a variable from XML", function () {
        expect(variable).not.toBeUndefined();
    });

    it("should be able to parse a variable from XML and read its 'format' attribute", function () {
        expect(variable.format() === 'number').toBe(true);
    });

    it("should be able to parse a variable from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<variable format="datetime"/>';
        expect(variable.serialize() === xmlString).toBe(true);
	variable = Variable.parseXML($(xmlString2));
        expect(variable.serialize() === xmlString2).toBe(true);
    });

});
