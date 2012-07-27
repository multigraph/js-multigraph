/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data Values parsing", function () {
    "use strict";

    var Values = window.multigraph.core.Values,
        xmlString = '<values>1,2,3</values>',
        $xml,
        values;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, 'parseXML', 'serialize');
        $xml = $(xmlString);
        values = Values.parseXML($xml);
    });

    it("should be able to parse a Values from XML", function () {
        expect(values).not.toBeUndefined();
        expect(values instanceof Values).toBe(true);
    });

    it("should be able to parse a values from XML and read its 'content'", function () {
        expect(values.content() === '1,2,3').toBe(true);
    });

    it("should be able to parse a values from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<values/>';
        expect(values.serialize() === xmlString).toBe(true);
        values = Values.parseXML($(xmlString2));
        expect(values.serialize() === xmlString2).toBe(true);
    });

});
