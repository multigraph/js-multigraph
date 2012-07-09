/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Grid parsing", function () {
    "use strict";

    var Grid = window.multigraph.Axis.Grid,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<grid color="0x984545" visible="false"/>',
        $xml,
        grid;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
        $xml = $(xmlString);
        grid = Grid.parseXML($xml);
    });

    it("should be able to parse a grid from XML", function () {
        expect(grid).not.toBeUndefined();
        expect(grid instanceof Grid).toBe(true);
    });

    it("should be able to parse a grid from XML and read its 'color' attribute", function () {
        expect(grid.color().getHexString()).toBe("0x984545");
    });

    it("should be able to parse a grid from XML and read its 'visible' attribute", function () {
        expect(grid.visible() === 'false').toBe(true);
    });

    it("should be able to parse a grid from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<grid visible="true"/>';
        expect(grid.serialize() === xmlString).toBe(true);
        grid = Grid.parseXML($(xmlString2));
//        expect(grid.serialize() === xmlString2).toBe(true);
    });

});
