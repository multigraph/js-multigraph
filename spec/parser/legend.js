/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Legend parsing", function () {
    "use strict";

    var Legend = window.multigraph.core.Legend,
        Icon = window.multigraph.core.Icon,
        Point = window.multigraph.math.Point,
        RGBColor = window.multigraph.math.RGBColor,
        xmlString,
        colorString = "0x56839c",
        bordercolorString = "0x941394",
        baseString = "-1,-1",
        anchorString = "0,0",
        positionString = "0.5,1",
        visibleBool = true,
        frameString = "padding",
        opacityString = "1",
        borderString = "10",
        rowsString = "4",
        columnsString = "3",
        cornerradiusString = "5",
        paddingString = "4",
        $xml,
        legend;

    beforeEach(function () {
        window.multigraph.parser.mixin.apply(window.multigraph, "parseXML");
        xmlString = ''
            + '<legend'
            +     ' color="' + colorString + '"'
            +     ' bordercolor="' + bordercolorString + '"'
            +     ' base="' + baseString + '"'
            +     ' anchor="' + anchorString + '"'
            +     ' position="' + positionString + '"'
            +     ' visible="' + visibleBool + '"'
            +     ' frame="' + frameString + '"'
            +     ' opacity="' + opacityString + '"'
            +     ' border="' + borderString + '"'
            +     ' rows="' + rowsString + '"'
            +     ' columns="' + columnsString + '"'
            +     ' cornerradius="' + cornerradiusString + '"'
            +     ' padding="' + paddingString + '"'
            +     '/>';
        $xml = window.multigraph.parser.stringToJQueryXMLObj(xmlString);
        legend = Legend.parseXML($xml);
    });

    it("should be able to parse a legend from XML", function () {
        expect(legend).not.toBeUndefined();
        expect(legend instanceof Legend).toBe(true);
    });

    it("should be able to parse a legend from XML and read its 'base' attribute", function () {
        expect(legend.base().x()).toEqual((Point.parse(baseString)).x());
        expect(legend.base().y()).toEqual((Point.parse(baseString)).y());
    });

    it("should be able to parse a legend from XML and read its 'anchor' attribute", function () {
        expect(legend.anchor().x()).toEqual((Point.parse(anchorString)).x());
        expect(legend.anchor().y()).toEqual((Point.parse(anchorString)).y());
    });

    it("should be able to parse a legend from XML and read its 'position' attribute", function () {
        expect(legend.position().x()).toEqual((Point.parse(positionString)).x());
        expect(legend.position().y()).toEqual((Point.parse(positionString)).y());
    });

    it("should be able to parse a legend from XML and read its 'frame' attribute", function () {
        expect(legend.frame()).toEqual(frameString.toLowerCase());
    });

    it("should be able to parse a legend from XML and read its 'color' attribute", function () {
        expect(legend.color().getHexString("0x")).toEqual((RGBColor.parse(colorString)).getHexString("0x"));
    });

    it("should be able to parse a legend from XML and read its 'bordercolor' attribute", function () {
        expect(legend.bordercolor().getHexString("0x")).toEqual((RGBColor.parse(bordercolorString)).getHexString("0x"));
    });

    it("should be able to parse a legend from XML and read its 'opacity' attribute", function () {
        expect(legend.opacity()).toEqual(parseFloat(opacityString));
    });

    it("should be able to parse a legend from XML and read its 'border' attribute", function () {
        expect(legend.border()).toEqual(parseInt(borderString, 10));
    });

    it("should be able to parse a legend from XML and read its 'rows' attribute", function () {
        expect(legend.rows()).toEqual(parseInt(rowsString, 10));
    });

    it("should be able to parse a legend from XML and read its 'columns' attribute", function () {
        expect(legend.columns()).toEqual(parseInt(columnsString, 10));
    });

    it("should be able to parse a legend from XML and read its 'cornerradius' attribute", function () {
        expect(legend.cornerradius()).toEqual(parseInt(cornerradiusString, 10));
    });

    it("should be able to parse a legend from XML and read its 'padding' attribute", function () {
        expect(legend.padding()).toEqual(parseInt(paddingString, 10));
    });

    describe("Icon parsing", function () {
        var heightString = "35",
            widthString = "50",
            borderString = "2";

        beforeEach(function () {
            xmlString = ''
                + '<legend'
                +     ' color="0x56839c"'
                +     ' bordercolor="0x941394"'
                +     ' base="-1,-1"'
                +     ' anchor="0,0"'
                +     ' position="0.3,0.2"'
                +     ' visible="true"'
                +     ' frame="padding"'
                +     ' opacity="1"'
                +     ' border="10"'
                +     ' rows="4"'
                +     ' columns="3"'
                +     ' cornerradius="5"'
                +     ' padding="2"'
                +     '>'
                +     '<icon'
                +         ' height="' + heightString + '"'
                +         ' width="' + widthString + '"'
                +         ' border="' + borderString + '"'
                +     '/>'
                + '</legend>';
            $xml = window.multigraph.parser.stringToJQueryXMLObj(xmlString);
            legend = Legend.parseXML($xml);
        });

        it("should be able to parse a legend with children from XML", function () {
            expect(legend).not.toBeUndefined();
            expect(legend instanceof Legend).toBe(true);
            expect(legend.icon()).not.toBeUndefined();
            expect(legend.icon() instanceof Icon).toBe(true);
        });

        it("should properly parse a legend tag with an icon child tag from XML", function () {
            expect(legend.icon().height()).toEqual(parseInt(heightString, 10));
            expect(legend.icon().width()).toEqual(parseInt(widthString, 10));
            expect(legend.icon().border()).toEqual(parseInt(borderString, 10));
        });

    });

});
