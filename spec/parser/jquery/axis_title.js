/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Title parsing", function () {
    "use strict";

    var AxisTitle = window.multigraph.core.AxisTitle,
        Point = window.multigraph.math.Point,
        xmlString,
        $xml,
        title,
        angleString = "70",
        anchorString = "1,1",
        positionString = "-1,1",
        contentString = "A Title";

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML");
        xmlString = ''
            + '<title'
            +    ' angle="' + angleString + '"'
            +    ' anchor="' + anchorString + '"'
            +    ' position="' + positionString + '"'
            +    '>'
            +      contentString
            + '</title>';
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        title = AxisTitle.parseXML($xml);
    });

    it("should be able to parse a AxisTitle from XML", function () {
        expect(title).not.toBeUndefined();
        expect(title instanceof AxisTitle).toBe(true);
    });

    it("should be able to parse a title from XML and read its 'position' attribute", function () {
        expect(title.position().x()).toEqual((Point.parse(positionString)).x());
        expect(title.position().y()).toEqual((Point.parse(positionString)).y());
    });

    it("should be able to parse a title from XML and read its 'anchor' attribute", function () {
        expect(title.anchor().x()).toEqual((Point.parse(anchorString)).x());
        expect(title.anchor().y()).toEqual((Point.parse(anchorString)).y());
    });

    it("should be able to parse a title from XML and read its 'angle' attribute", function () {
        expect(title.angle()).toEqual(parseFloat(angleString));
    });

    it("should be able to parse a title from XML and read its 'content'", function () {
        expect(title.content()).toEqual(contentString);
    });

});
