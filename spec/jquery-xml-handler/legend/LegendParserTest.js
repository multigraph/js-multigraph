/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Legend parsing", function () {
    "use strict";

    var Legend = window.multigraph.Legend,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<legend visible="true" base="-1 -1" anchor="0 0" frame="padding" color="0x56839c" bordercolor="0x941394" opacity="1" border="10" rows="4" columns="3" cornerradius="5" padding="4"/>',
        $xml,
        l,
        b;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
        $xml = $(xmlString);
        l = Legend.parseXML($xml);
    });

    it("should be able to parse a legend from XML", function () {
        expect(l).not.toBeUndefined();
        expect(l instanceof Legend).toBe(true);
    });

    it("should be able to parse a legend from XML and read its 'base' attribute", function () {
        expect(l.base() === '-1 -1').toBe(true);
    });

    it("should be able to parse a legend from XML and read its 'anchor' attribute", function () {
        expect(l.anchor() === '0 0').toBe(true);
    });

    it("should be able to parse a legend from XML and read its 'frame' attribute", function () {
        expect(l.frame() === 'padding').toBe(true);
    });

    it("should be able to parse a legend from XML and read its 'color' attribute", function () {
        expect(l.color() === '0x56839c').toBe(true);
    });

    it("should be able to parse a legend from XML and read its 'bordercolor' attribute", function () {
        expect(l.bordercolor() === '0x941394').toBe(true);
    });

    it("should be able to parse a legend from XML and read its 'opacity' attribute", function () {
        expect(l.opacity() === '1').toBe(true);
    });

    it("should be able to parse a legend from XML and read its 'border' attribute", function () {
        expect(l.border() === 10).toBe(true);
    });

    it("should be able to parse a legend from XML and read its 'rows' attribute", function () {
        expect(l.rows() === 4).toBe(true);
    });

    it("should be able to parse a legend from XML and read its 'columns' attribute", function () {
        expect(l.columns() === 3).toBe(true);
    });

    it("should be able to parse a legend from XML and read its 'cornerradius' attribute", function () {
        expect(l.cornerradius() === 5).toBe(true);
    });

    it("should be able to parse a legend from XML and read its 'padding' attribute", function () {
        expect(l.padding() === 4).toBe(true);
    });

    describe("Icon parsing", function () {
        var Icon = window.multigraph.Legend.Icon;

        beforeEach(function () {
            xmlString = '<legend visible="true" base="-1 -1" anchor="0 0" frame="padding" color="0x56839c" bordercolor="0x941394" opacity="1" border="10" rows="4" columns="3" cornerradius="5" padding="2"><icon height="35" width="50" border="2"/></legend>';
            jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
            $xml = $(xmlString);
            l = Legend.parseXML($xml);
        });

        it("should be able to parse a legend with children from XML", function () {
            expect(l).not.toBeUndefined();
            expect(l instanceof Legend).toBe(true);
        });

        it("should be able to parse a icon from XML and read its 'height' attribute", function () {
            expect(l.icon().height() === '35').toBe(true);
        });

        it("should be able to parse a icon from XML and read its 'width' attribute", function () {
            expect(l.icon().width() === '50').toBe(true);
        });

        it("should be able to parse a icon from XML and read its 'border' attribute", function () {
            expect(l.icon().border() === 2).toBe(true);
        });

        xit("should be able to parse a legend with children from XML, serialize it and get the same XML as the original", function () {
            var xmlString2 = '<legend visible="false" base="-1 -1" frame="plot" color="0x56839c" opacity="0" border="10" columns="3" cornerradius="10" padding="3"><icon height="45" border="5"/></legend>';
            expect(l.serialize() === xmlString).toBe(true);
            l = Legend.parseXML($(xmlString2));
            expect(l.serialize() === xmlString2).toBe(true);
        });

    });
});
