/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Filter Option parsing", function () {
    "use strict";

    var FilterOption = window.multigraph.core.FilterOption,
        xmlString = '<option name="dotsize" value="12"/>',
        $xml,
        option;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
	$xml = $(xmlString);
        option = FilterOption.parseXML($xml);
    });

    it("should be able to parse an option from XML", function () {
        expect(option).not.toBeUndefined();
    });

    it("should be able to parse a option from XML and read its 'name' attribute", function () {
        expect(option.name()).toBe("dotsize");
    });

    it("should be able to parse a option from XML and read its 'value' attribute", function () {
        expect(option.value()).toBe("12");
    });

    it("should be able to parse a option from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<option name="linewidth"/>';
        expect(option.serialize()).toBe(xmlString);
	option = FilterOption.parseXML($(xmlString2));
        expect(option.serialize()).toBe(xmlString2);
    });

});
