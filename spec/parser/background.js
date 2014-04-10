/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Background parsing", function () {
    "use strict";

    var Background = window.multigraph.core.Background,
        Img = window.multigraph.core.Img,
        Point = window.multigraph.math.Point,
        RGBColor = window.multigraph.math.RGBColor,
        xmlString,
        $xml,
        background,
        colorString = "0x123456";

    beforeEach(function () {
        window.multigraph.parser.mixin.apply(window.multigraph, "parseXML");
        xmlString = '<background color="' + colorString + '"/>',
        $xml = window.multigraph.parser.stringToJQueryXMLObj(xmlString);
        background = Background.parseXML($xml);
    });

    it("should be able to parse a background from XML", function () {
        expect(background).not.toBeUndefined();
        expect(background instanceof Background).toBe(true);
    });

    it("should be able to parse a background from XML and read its 'color' attribute", function () {
        expect(background.color().getHexString("0x")).toEqual((RGBColor.parse(colorString)).getHexString("0x"));
    });

    describe("Img parsing", function () {
        var colorString = "0x123456",
            srcString = "http://www.example.com/background_img.gif",
            frameString = "plot",
            anchorString = "1,1",
            baseString = "0,0",
            positionString = "-1,1";

        beforeEach(function () {
            xmlString = ''
                + '<background'
                +    ' color="' + colorString + '"'
                +    '>'
                +   '<img'
                +      ' src="' + srcString + '"'
                +      ' frame="' + frameString + '"'
                +      ' anchor="' + anchorString + '"'
                +      ' base="' + baseString + '"'
                +      ' position="' + positionString + '"'
                +      '/>'
                + '</background>';
            $xml = window.multigraph.parser.stringToJQueryXMLObj(xmlString);
            background = Background.parseXML($xml);
        });

        it("should be able to parse a background tag with a img tag from XML", function () {
            expect(background).not.toBeUndefined();
            expect(background instanceof Background).toBe(true);
            expect(background.img()).not.toBeUndefined();
            expect(background.img() instanceof Img).toBe(true);
        });

        it("should properly parse a background model with a img submodel from XML", function () {
            expect(background.img().src()).toEqual(srcString);
            expect(background.img().frame()).toEqual(frameString.toLowerCase());
            expect(background.img().anchor().x()).toEqual((Point.parse(anchorString)).x());
            expect(background.img().anchor().y()).toEqual((Point.parse(anchorString)).y());
            expect(background.img().base().x()).toEqual((Point.parse(baseString)).x());
            expect(background.img().base().y()).toEqual((Point.parse(baseString)).y());
            expect(background.img().position().x()).toEqual((Point.parse(positionString)).x());
            expect(background.img().position().y()).toEqual((Point.parse(positionString)).y());
        });

    });

});
