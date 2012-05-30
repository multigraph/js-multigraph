/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Datatips parsing", function () {
    "use strict";

    var Datatips = window.multigraph.Plot.Datatips,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<datatips format="number" bgcolor="0x123456" bgalpha="1" border="2" bordercolor="0xFFFBBB" pad="1"/>',
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
        expect(d.bgcolor() === '0x123456').toBe(true);
    });

    it("should be able to parse a datatips from XML and read its 'bgalpha' attribute", function () {
        expect(d.bgalpha() === '1').toBe(true);
    });

    it("should be able to parse a datatips from XML and read its 'border' attribute", function () {
        expect(d.border() === '2').toBe(true);
    });

    it("should be able to parse a datatips from XML and read its 'bordercolor' attribute", function () {
        expect(d.bordercolor() === '0xFFFBBB').toBe(true);
    });

    it("should be able to parse a datatips from XML and read its 'pad' attribute", function () {
        expect(d.pad() === '1').toBe(true);
    });

    it("should be able to parse a datatips from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<datatips format="datetime" bgcolor="0x125621" border="5"/>';
        expect(d.serialize() === xmlString).toBe(true);
	d = Datatips.parseXML($(xmlString2));
        expect(d.serialize() === xmlString2).toBe(true);
    });

    describe("Variable parsing", function () {
        var Variable = window.multigraph.Plot.Datatips.Variable;

        beforeEach(function () {
            xmlString = '<datatips format="datetime" bgcolor="0x123456" bgalpha="5" border="7" bordercolor="0xBA789B" pad="2"><variable format="number"/></datatips>';
            jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
            $xml = $(xmlString);
            d = Datatips.parseXML($xml);
        });

        it("should be able to parse a datatips with a child from XML", function () {
            expect(d).not.toBeUndefined();
        });

        it("should be able to parse a datatips with multiple children from XML", function () {
            xmlString = '<datatips format="datetime" bgcolor="0x123456" bgalpha="5" border="7" bordercolor="0xBA789B" pad="2"><variable format="number"/><variable format="number"/><variable format="datetime"/></datatips>';
            $xml = $(xmlString);
            d = Datatips.parseXML($xml);
            expect(d).not.toBeUndefined();
        });

        it("should be able to parse a variable from XML and read its 'format' attribute", function () {
            expect(d.variables().at(0).format() === 'number').toBe(true);
        });

        it("should be able to parse a datatips with children from XML, serialize it and get the same XML as the original", function () {
            var xmlString2 = '<datatips format="datetime" bgcolor="0x123456" bgalpha="5" border="7" bordercolor="0xBA789B" pad="2"><variable format="number"/><variable format="number"/><variable format="datetime"/></datatips>';
            expect(d.serialize() === xmlString).toBe(true);
            d = Datatips.parseXML($(xmlString2));
            expect(d.serialize() === xmlString2).toBe(true);
        });

    });
});
