/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Renderer parsing", function () {
    "use strict";

    var Renderer = window.multigraph.core.Renderer,
        Option = window.multigraph.core.RendererOption,
        xmlString = '<renderer type="pointline"/>',
        $xml,
        r;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
	$xml = $(xmlString);
        r = Renderer.parseXML($xml);
    });

    it("should be able to parse a renderer from XML", function () {
        expect(r).not.toBeUndefined();
        expect(r instanceof Renderer).toBe(true);
    });

    it("should be able to parse a renderer from XML and read its 'type' attribute", function () {
        expect(r.type()).toBe("pointline");
    });

    it("should be able to parse a renderer from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<renderer type="pointline"/>';
        expect(r.serialize()).toBe(xmlString);
	r = Renderer.parseXML($(xmlString2));
        expect(r.serialize()).toBe(xmlString2);
    });

    describe("Option parsing", function () {

        beforeEach(function () {
            xmlString = '<renderer type="pointline"><option name="barwidth" value="3"/></renderer>';
            window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
            $xml = $(xmlString);
            r = Renderer.parseXML($xml);
        });

        it("should be able to parse a renderer with a child from XML", function () {
            expect(r).not.toBeUndefined();
        });

        it("should be able to parse a renderer with multiple children from XML", function () {
            xmlString = '<renderer type="pointline"><option name="size" value="3"/><option name="shape" value="circle"/><option name="linewidth" value="7"/></renderer>';
            $xml = $(xmlString);
            r = Renderer.parseXML($xml);
            expect(r).not.toBeUndefined();
        });

        it("should be able to parse a renderer with children from XML, serialize it and get the same XML as the original", function () {
            var xmlString2 = '<renderer type="pointline"><option name="size" value="3"/><option name="shape" value="circle"/><option name="linewidth" value="7"/></renderer>';
            expect(r.serialize()).toBe(xmlString);
            r = Renderer.parseXML($(xmlString2));
            expect(r.serialize()).toBe(xmlString2);
        });

    });
});
