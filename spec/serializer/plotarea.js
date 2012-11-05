/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plotarea serialization", function () {
    "use strict";

    var Plotarea = window.multigraph.core.Plotarea,
        RGBColor = window.multigraph.math.RGBColor,
        xmlString,
        p;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should be able to properly serialize plotarea models", function () {
        xmlString = '<plotarea margintop="5" marginleft="10" marginbottom="19" marginright="5" bordercolor="0x111223" border="0"/>';
        p = new Plotarea();
        p.margin().bottom(19);
        p.margin().left(10);
        p.margin().top(5);
        p.margin().right(5);
        p.border(0);
        p.bordercolor(RGBColor.parse("0x111223"));
        expect(p.serialize()).toEqual(xmlString);
        
        xmlString = '<plotarea margintop="5" marginleft="10" marginbottom="19" marginright="5" bordercolor="0xeeeeee" border="0"/>';
        p = new Plotarea();
        p.margin().bottom(19);
        p.margin().left(10);
        p.margin().top(5);
        p.margin().right(5);
        p.border(0);
        p.bordercolor(RGBColor.parse("0xeeeeee"));
        expect(p.serialize()).toEqual(xmlString);
    });

});
