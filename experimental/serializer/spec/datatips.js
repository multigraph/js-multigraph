/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Datatips serialization", function () {
    "use strict";

    var Datatips = window.multigraph.core.Datatips,
        xmlString,
        datatips;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize datatips models", function () {
        xmlString = '<datatips bgcolor="0x123456" bordercolor="0xfffbbb" format="number" bgalpha="1" border="2" pad="1"/>';
        datatips = new Datatips();
        datatips.format("number");
        datatips.bgcolor(window.multigraph.math.RGBColor.parse("0x123456"));
        datatips.bgalpha("1");
        datatips.border(2);
        datatips.bordercolor(window.multigraph.math.RGBColor.parse("0xfffbbb"));
        datatips.pad(1);
        expect(datatips.serialize()).toEqual(xmlString);
    });

    describe("with Variable child tags", function () {
        var Variable = window.multigraph.core.DatatipsVariable;

        it("should properly serialize datatips models with variable submodels", function () {
            xmlString = '<datatips bgcolor="0x123456" bordercolor="0xba789b" format="datetime" bgalpha="0.5" border="7" pad="2"><variable format="number"/><variable format="number"/><variable format="datetime"/></datatips>';
            datatips = new Datatips();
            datatips.format("datetime");
            datatips.bgcolor(window.multigraph.math.RGBColor.parse("0x123456"));
            datatips.bgalpha("0.5");
            datatips.border(7);
            datatips.bordercolor(window.multigraph.math.RGBColor.parse("0xba789b"));
            datatips.pad(2);
            datatips.variables().add(new Variable());
            datatips.variables().at(0).format("number");
            datatips.variables().add(new Variable());
            datatips.variables().at(1).format("number");
            datatips.variables().add(new Variable());
            datatips.variables().at(2).format("datetime");
            expect(datatips.serialize()).toEqual(xmlString);

            xmlString = '<datatips bgcolor="0x777456" bordercolor="0xba999b" format="datetime" bgalpha="0.5" border="7" pad="2"><variable format="datetime"/></datatips>';
            datatips = new Datatips();
            datatips.format("datetime");
            datatips.bgcolor(window.multigraph.math.RGBColor.parse("0x777456"));
            datatips.bgalpha("0.5");
            datatips.border(7);
            datatips.bordercolor(window.multigraph.math.RGBColor.parse("0xba999b"));
            datatips.pad(2);
            datatips.variables().add(new Variable());
            datatips.variables().at(0).format("datetime");
            expect(datatips.serialize()).toEqual(xmlString);
        });

    });
});
