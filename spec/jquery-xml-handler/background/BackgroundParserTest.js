/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Background parsing", function () {
    "use strict";

    var Background = window.multigraph.Background,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<background color="0x123456"/>',
        $xml,
        b;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
        $xml = $(xmlString);
        b = Background.parseXML($xml);
    });

    it("should be able to parse a background from XML", function () {
        expect(b).not.toBeUndefined();
    });

    it("should be able to parse a background from XML and read its 'color' attribute", function () {
        expect(b.color().getHexString()).toBe("0x123456");
    });

    describe("Img parsing", function () {
        var Img = window.multigraph.Background.Img;

        beforeEach(function () {
            xmlString = '<background color="0x123456"><img src="http://www.example.com/corgi_pool.gif"/></background>';
            jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
            $xml = $(xmlString);
            b = Background.parseXML($xml);
        });

        it("should be able to parse a background with children from XML", function () {
            expect(b).not.toBeUndefined();
        });

        it("should be able to parse a img from XML and read its 'src' attribute", function () {
            expect(b.img().src() === 'http://www.example.com/corgi_pool.gif').toBe(true);
        });

        xit("should be able to parse a background with children from XML, serialize it and get the same XML as the original", function () {
            var xmlString2 = '<background color="0x459996"><img src="http://www.example.com/flavor_explosion.png" anchor="0 1" frame="padding"/></background>';
            expect(b.serialize() === xmlString).toBe(true);
            b = Background.parseXML($(xmlString2));
            expect(b.serialize() === xmlString2).toBe(true);
        });

    });
});
