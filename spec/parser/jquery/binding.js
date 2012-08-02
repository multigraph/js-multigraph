/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Binding parsing", function () {
    "use strict";

    var Binding = window.multigraph.core.Binding,
        xmlString = '<binding id="y" min="-10" max="50"/>',
        $xml,
        binding;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        $xml = $(xmlString);
        binding = Binding.parseXML($xml);
    });

    it("should be able to parse a Binding from XML", function () {
        expect(binding).not.toBeUndefined();
        expect(binding instanceof Binding).toBe(true);
    });

    it("should be able to parse a binding from XML and read its 'id' attribute", function () {
        expect(binding.id()).toBe("y");
    });

    it("should be able to parse a binding from XML and read its 'min' attribute", function () {
        expect(binding.min()).toBe("-10");
    });

    it("should be able to parse a binding from XML and read its 'max' attribute", function () {
        expect(binding.max()).toBe("50");
    });

    it("should be able to parse a binding from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<binding id="x" min="60" max="70"/>';
        expect(binding.serialize()).toBe(xmlString);
        binding = Binding.parseXML($(xmlString2));
        expect(binding.serialize()).toBe(xmlString2);
    });

});
