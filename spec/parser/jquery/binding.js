/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Binding parsing", function () {
    "use strict";

    var Binding = window.multigraph.core.Binding,
        xmlString = '<binding id="y" min="-10" max="50"/>',
        $xml,
        binding,
        idString = "y",
        minString = "-10",
        maxString = "50";

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML");
        xmlString = ''
            + '<binding'
            +    ' id="' + idString + '"'
            +    ' min="' + minString + '"'
            +    ' max="' + maxString + '"'
            + '/>';
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        binding = Binding.parseXML($xml);
    });

    it("should be able to parse a Binding from XML", function () {
        expect(binding).not.toBeUndefined();
        expect(binding instanceof Binding).toBe(true);
    });

    it("should be able to parse a binding from XML and read its 'id' attribute", function () {
        expect(binding.id()).toBe(idString);
    });

    it("should be able to parse a binding from XML and read its 'min' attribute", function () {
        expect(binding.min()).toBe(minString);
    });

    it("should be able to parse a binding from XML and read its 'max' attribute", function () {
        expect(binding.max()).toBe(maxString);
    });

});
