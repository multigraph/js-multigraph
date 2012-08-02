/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Renderer.RendererOption parsing", function () {
    "use strict";

    var Option = window.multigraph.core.RendererOption,
        xmlString = '<option name="dotcolor" value="0x222222" min="10" max="15"/>',
        $xml,
        option;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
	$xml = $(xmlString);
        option = Option.parseXML($xml);
    });

    it("should be able to parse a renderer option from XML", function () {
        expect(option).not.toBeUndefined();
    });

    it("should be able to parse a option from XML and read its 'name' attribute", function () {
        expect(option.name()).toBe("dotcolor");
    });

    it("should be able to parse a option from XML and read its 'value' attribute", function () {
        expect(option.value()).toBe("0x222222");
    });

    it("should be able to parse a option from XML and read its 'min' attribute", function () {
        expect(option.min()).toBe("10");
    });

    it("should be able to parse a option from XML and read its 'max' attribute", function () {
        expect(option.max()).toBe("15");
    });

    it("should be able to parse a option from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<option name="linewidth" value="1" max="2"/>';
        expect(option.serialize()).toBe(xmlString);
	option = Option.parseXML($(xmlString2));
        expect(option.serialize()).toBe(xmlString2);
    });

});
