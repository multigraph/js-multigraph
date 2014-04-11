/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Zoom parsing", function () {
    "use strict";

    var Zoom = window.multigraph.core.Zoom,
        DataMeasure = window.multigraph.core.DataMeasure,
        DataValue = window.multigraph.core.DataValue,
        xmlString,
        $xml,
        zoom,
        allowedString = "yes",
        allowedBool = true,
        minString = "0",
        maxString = "80",
        anchorString = "1",
        type = "number";

    beforeEach(function () {
        window.multigraph.parser.mixin.apply(window.multigraph, "parseXML");
        xmlString = ''
            + '<zoom'
            +     ' allowed="' + allowedString + '"'
            +     ' min="' + minString + '"'
            +     ' max="' + maxString + '"'
            +     ' anchor="' + anchorString + '"'
            +     '/>',
        $xml = window.multigraph.parser.stringToJQueryXMLObj(xmlString);
        zoom = Zoom.parseXML($xml, type);
    });

    it("should be able to parse a Zoom from XML", function () {
        expect(zoom).not.toBeUndefined();
        expect(zoom instanceof Zoom).toBe(true);
    });

    it("should be able to parse a zoom from XML and read its 'allowed' attribute", function () {
        expect(zoom.allowed()).toEqual(allowedBool);
    });

    it("should be able to parse a zoom from XML and read its 'min' attribute", function () {
        expect(zoom.min().getRealValue()).toEqual((DataMeasure.parse(type, minString)).getRealValue());
    });

    it("should be able to parse a zoom from XML and read its 'max' attribute", function () {
        expect(zoom.max().getRealValue()).toEqual((DataMeasure.parse(type, maxString)).getRealValue());
    });

    it("should be able to parse a zoom from XML and read its 'anchor' attribute", function () {
        expect(zoom.anchor().getRealValue()).toEqual((DataValue.parse(type, anchorString)).getRealValue());
    });

});
