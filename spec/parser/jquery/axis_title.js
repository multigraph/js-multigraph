/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Title parsing", function () {
    "use strict";

    var Axis = window.multigraph.core.Axis,
        AxisTitle = window.multigraph.core.AxisTitle,
        Text = window.multigraph.core.Text,
        Point = window.multigraph.math.Point,
        xmlString,
        $xml,
        axis = new Axis(Axis.HORIZONTAL),
        title,
        angleString = "70",
        anchorString = "1,1",
        baseString = "0",
        positionString = "-1,1",
        contentString = "A Title";

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML");
        xmlString = ''
            + '<title'
            +    ' angle="' + angleString + '"'
            +    ' anchor="' + anchorString + '"'
            +    ' base="' + baseString + '"'
            +    ' position="' + positionString + '"'
            +    '>'
            +      contentString
            + '</title>';
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        title = AxisTitle.parseXML($xml, axis);
    });

    it("should be able to parse a AxisTitle from XML", function () {
        expect(title).not.toBeUndefined();
        expect(title instanceof AxisTitle).toBe(true);
    });

    it("should be able to parse a title from XML and store an 'axis' pointer", function () {
        expect(title.axis() instanceof Axis).toBe(true);
        expect(title.axis()).toEqual(axis);
    });

    it("should be able to parse a title from XML and read its 'position' attribute", function () {
        expect(title.position().x()).toEqual((Point.parse(positionString)).x());
        expect(title.position().y()).toEqual((Point.parse(positionString)).y());
    });

    it("should be able to parse a title from XML and read its 'base' attribute", function () {
        expect(title.base()).toEqual(parseFloat(baseString));
    });

    it("should be able to parse a title from XML and read its 'anchor' attribute", function () {
        expect(title.anchor().x()).toEqual((Point.parse(anchorString)).x());
        expect(title.anchor().y()).toEqual((Point.parse(anchorString)).y());
    });

    it("should be able to parse a title from XML and read its 'angle' attribute", function () {
        expect(title.angle()).toEqual(parseFloat(angleString));
    });

    it("should be able to parse a title from XML and read its 'content'", function () {
        expect(title.content() instanceof Text).toBe(true);
        expect(title.content().string()).toEqual((new Text(contentString)).string());
    });

    it("should return `undefined` when parsing an empty title tag, ie `<title/>`", function () {
        xmlString = '<title/>';
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        title = AxisTitle.parseXML($xml, axis);
        expect(title).toBe(undefined);
    });
});
