/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Legend parsing", function () {
    "use strict";

    var Legend = window.multigraph.Legend,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<background color="0x123456"/>',
        $xml,
        l,
        b;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
        $xml = $(xmlString);
        l = Legend.parseXML($xml);
    });

    it("should be able to parse a background from XML", function () {
        expect(l).not.toBeUndefined();
    });

    it("should be able to parse a background from XML and read its 'color' attribute", function () {
        expect(l.color() === '0x123456').toBe(true);
    });

    describe("Icon parsing", function () {
        var Icon = window.multigraph.Legend.Icon;

        beforeEach(function () {
            xmlString = '<background color="0x123456"><img src="http://www.example.com/corgi_pool.gif"/></background>';
            jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
            $xml = $(xmlString);
            b = Legend.parseXML($xml);
        });

        it("should be able to parse a background with children from XML", function () {
            expect(b).not.toBeUndefined();
        });

        it("should be able to parse a img from XML and read its 'src' attribute", function () {
            expect(l.img().src() === 'http://www.example.com/corgi_pool.gif').toBe(true);
        });

        it("should be able to parse a background with children from XML, serialize it and get the same XML as the original", function () {
            var xmlString2 = '<background color="0x459996"><img src="http://www.example.com/flavor_explosion.png" anchor="0 1" frame="padding"/></background>';
            expect(l.serialize() === xmlString).toBe(true);
            l = Legend.parseXML($(xmlString2));
            expect(l.serialize() === xmlString2).toBe(true);
        });

    });
});
