/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Background parsing", function () {
    "use strict";

    var Background = window.multigraph.core.Background,
        xmlString = '<background color="0x123456"/>',
        $xml,
        b;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, 'parseXML', 'serialize');
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
        var Img = window.multigraph.core.Img;

        beforeEach(function () {
            xmlString = '<background color="0x123456"><img src="http://www.example.com/corgi_pool.gif"/></background>';
            window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
            $xml = $(xmlString);
            b = Background.parseXML($xml);
        });

        it("should be able to parse a background with children from XML", function () {
            expect(b).not.toBeUndefined();
        });

        it("should be able to parse a img from XML and read its 'src' attribute", function () {
            expect(b.img().src()).toBe("http://www.example.com/corgi_pool.gif");
        });

        xit("should be able to parse a background with children from XML, serialize it and get the same XML as the original", function () {
            var xmlString2 = '<background color="0x459996"><img src="http://www.example.com/flavor_explosion.png" anchor="0 1" frame="padding"/></background>';
            expect(b.serialize()).toBe(xmlString);
            b = Background.parseXML($(xmlString2));
            expect(b.serialize()).toBe(xmlString2);
        });

    });
});
