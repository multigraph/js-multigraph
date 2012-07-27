/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Filter parsing", function () {
    "use strict";

    var Filter = window.multigraph.core.Filter,
        xmlString = '<filter type="number"/>',
        $xml,
        f;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
        f = Filter.parseXML($xml);
    });

    it("should be able to parse a filter from XML", function () {
        expect(f).not.toBeUndefined();
    });

    it("should be able to parse a filter from XML and read its 'type' attribute", function () {
        expect(f.type() === 'number').toBe(true);
    });

    it("should be able to parse a filter from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<filter type="datetime"/>';
        expect(f.serialize() === xmlString).toBe(true);
	f = Filter.parseXML($(xmlString2));
        expect(f.serialize() === xmlString2).toBe(true);
    });

    describe("Option parsing", function () {
        var FilterOption = window.multigraph.core.FilterOption;

        beforeEach(function () {
            xmlString = '<filter type="number"><option name="fred" value="jim"/></filter>';
            window.multigraph.parser.jquery.mixin.apply(window.multigraph, 'parseXML', 'serialize');
            $xml = $(xmlString);
            f = Filter.parseXML($xml);
        });

        it("should be able to parse a filter with a child from XML", function () {
            expect(f).not.toBeUndefined();
            expect(f instanceof Filter).toBe(true);
            expect(f.options().at(0) instanceof FilterOption).toBe(true);
        });

        it("should be able to parse a filter with multiple children from XML", function () {
            xmlString = '<filter type="datetime"><option name="fred"/><option name="larry" value="curly"/><option name="moe" value="jim"/></filter>';
            $xml = $(xmlString);
            f = Filter.parseXML($xml);
            expect(f).not.toBeUndefined();
        });

        it("should be able to parse a filter with children from XML, serialize it and get the same XML as the original", function () {
            var xmlString2 = '<filter type="datetime"><option name="fred"/><option name="larry" value="curly"/><option name="moe" value="jim"/></filter>';
            expect(f.serialize() === xmlString).toBe(true);
            f = Filter.parseXML($(xmlString2));
            expect(f.serialize() === xmlString2).toBe(true);
        });

    });
});
