/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Datatips parsing", function () {
    "use strict";

    var Datatips = window.multigraph.Plot.Datatips,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<datatips bgcolor="0x123456" bordercolor="0xfffbbb" format="number" bgalpha="1" border="2" pad="1"/>',
        $xml,
        d;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
        d = Datatips.parseXML($xml);
    });

    it("should be able to parse a datatips from XML", function () {
        expect(d).not.toBeUndefined();
    });

    it("should be able to parse a datatips from XML and read its 'format' attribute", function () {
        expect(d.format() === 'number').toBe(true);
    });

    it("should be able to parse a datatips from XML and read its 'bgcolor' attribute", function () {
        expect(d.bgcolor().getHexString()).toBe("0x123456");
    });

    it("should be able to parse a datatips from XML and read its 'bgalpha' attribute", function () {
        expect(d.bgalpha() === '1').toBe(true);
    });

    it("should be able to parse a datatips from XML and read its 'border' attribute", function () {
        expect(d.border() === 2).toBe(true);
    });

    it("should be able to parse a datatips from XML and read its 'bordercolor' attribute", function () {
        expect(d.bordercolor().getHexString()).toBe("0xfffbbb");
    });

    it("should be able to parse a datatips from XML and read its 'pad' attribute", function () {
        expect(d.pad() === 1).toBe(true);
    });

    it("should be able to parse a datatips from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<datatips bgcolor="0x125621" format="datetime" border="5"/>';
        expect(d.serialize() === xmlString).toBe(true);
	d = Datatips.parseXML($(xmlString2));
        //removed due to defaults
        //expect(d.serialize() === xmlString2).toBe(true);
    });

    describe("Variable parsing", function () {
        var Variable = window.multigraph.Plot.Datatips.Variable;

        beforeEach(function () {
            xmlString = '<datatips bgcolor="0x123456" bordercolor="0xba789b" format="datetime" bgalpha="5" border="7" pad="2"><variable format="number"/></datatips>';
            jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
            $xml = $(xmlString);
            d = Datatips.parseXML($xml);
        });

        it("should be able to parse a datatips with a child from XML", function () {
            expect(d).not.toBeUndefined();
        });

        it("should be able to parse a datatips with multiple children from XML", function () {
            xmlString = '<datatips bgcolor="0x123456" bordercolor="0xba789b" format="datetime" bgalpha="5" border="7" pad="2"><variable format="number"/><variable format="number"/><variable format="datetime"/></datatips>';
            $xml = $(xmlString);
            d = Datatips.parseXML($xml);
            expect(d).not.toBeUndefined();
        });

        it("should be able to parse a variable from XML and read its 'format' attribute", function () {
            expect(d.variables().at(0).format() === 'number').toBe(true);
        });

        it("should be able to parse a datatips with children from XML, serialize it and get the same XML as the original", function () {
            var xmlString2 = '<datatips bgcolor="0x777456" bordercolor="0xba999b" format="datetime" bgalpha="5" border="7" pad="2"><variable format="number"/><variable format="number"/><variable format="datetime"/></datatips>';
            expect(d.serialize() === xmlString).toBe(true);
            d = Datatips.parseXML($(xmlString2));
            expect(d.serialize() === xmlString2).toBe(true);
        });

    });
});
