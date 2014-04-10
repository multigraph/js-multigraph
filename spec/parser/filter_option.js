/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Plot Filter Option parsing", function () {
    "use strict";

    var FilterOption = window.multigraph.core.FilterOption,
        xmlString,
        $xml,
        option,
        nameString = "dotsize",
        valueString = "12";

    beforeEach(function () {
        window.multigraph.parser.mixin.apply(window.multigraph, "parseXML");
        xmlString = ''
            + '<option'
            +     ' name="' + nameString + '"'
            +     ' value="' + valueString + '"'
            +     '/>';
        $xml = window.multigraph.parser.stringToJQueryXMLObj(xmlString);
        option = FilterOption.parseXML($xml);
    });

    it("should be able to parse an option from XML", function () {
        expect(option).not.toBeUndefined();
        expect(option instanceof FilterOption).toBe(true);
    });

    it("should be able to parse a option from XML and read its 'name' attribute", function () {
        expect(option.name()).toEqual(nameString);
    });

    it("should be able to parse a option from XML and read its 'value' attribute", function () {
        expect(option.value()).toEqual(valueString);
    });

});
