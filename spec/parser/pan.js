/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Pan parsing", function () {
    "use strict";

    var Pan = window.multigraph.core.Pan,
        DataValue = window.multigraph.core.DataValue,
        xmlString,
        $xml,
        pan,
        allowedString = "yes",
        allowedBool = true,
        minString = "0",
        maxString = "5",
        type = "number";

    beforeEach(function () {
        window.multigraph.parser.mixin.apply(window.multigraph, "parseXML");
        xmlString = ''
            + '<pan'
            +    ' allowed="' + allowedString + '"'
            +    ' min="' + minString + '"'
            +    ' max="' + maxString + '"'
            +    '/>';
        $xml = window.multigraph.parser.stringToJQueryXMLObj(xmlString);
        pan = Pan.parseXML($xml, type);
    });

    it("should be able to parse a Pan from XML", function () {
        expect(pan).not.toBeUndefined();
        expect(pan instanceof Pan).toBe(true);
    });

    it("should be able to parse a pan from XML and read its 'allowed' attribute", function () {
        expect(pan.allowed()).toEqual(allowedBool);
    });

    it("should be able to parse a pan from XML and read its 'min' attribute", function () {
        expect(pan.min().getRealValue()).toEqual((DataValue.parse(type, minString)).getRealValue());
    });

    it("should be able to parse a pan from XML and read its 'max' attribute", function () {
        expect(pan.max().getRealValue()).toEqual((DataValue.parse(type, maxString)).getRealValue());
    });

});
