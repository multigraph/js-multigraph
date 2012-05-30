/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Filter Option parsing", function () {
    "use strict";

    var Option = window.multigraph.Plot.Filter.Option,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<option name="dotsize" value="12"/>',
        $xml,
        option;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
        option = Option.parseXML($xml);
    });

    it("should be able to parse an option from XML", function () {
        expect(option).not.toBeUndefined();
    });

    it("should be able to parse a option from XML and read its 'name' attribute", function () {
        expect(option.name() === 'dotsize').toBe(true);
    });

    it("should be able to parse a option from XML and read its 'value' attribute", function () {
        expect(option.value() === '12').toBe(true);
    });

    it("should be able to parse a option from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<option name="linewidth"/>';
        expect(option.serialize() === xmlString).toBe(true);
	option = Option.parseXML($(xmlString2));
        expect(option.serialize() === xmlString2).toBe(true);
    });

});
