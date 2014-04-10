/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Grid parsing", function () {
    "use strict";

    var Grid = window.multigraph.core.Grid,
        RGBColor = window.multigraph.math.RGBColor,
        xmlString,
        $xml,
        grid,
        colorString = "0x984545",
        visibleBool = false;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML");
        xmlString = ''
            + '<grid'
            +     ' color="' + colorString + '"'
            +     ' visible="' + visibleBool + '"'
            +     '/>';
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        grid = Grid.parseXML($xml);
    });

    it("should be able to parse a grid from XML", function () {
        expect(grid).not.toBeUndefined();
        expect(grid instanceof Grid).toBe(true);
    });

    it("should be able to parse a grid from XML and read its 'color' attribute", function () {
        expect(grid.color().getHexString("0x")).toEqual((RGBColor.parse(colorString)).getHexString("0x"));
    });

    it("should be able to parse a grid from XML and read its 'visible' attribute", function () {
        expect(grid.visible()).toEqual(visibleBool);
    });

});
