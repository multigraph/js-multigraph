/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Graph Title serialization", function () {
    "use strict";

    var Title = window.multigraph.core.Title,
        xmlString,
        title;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize graph title models", function () {
        xmlString = '<title color="0xfffaab" bordercolor="0x127752" border="2" opacity="0" padding="4" cornerradius="10" anchor="1,1" base="0,0" position="-1,1">Graph Title</title>';
        title = new Title();
        title.border("2");
        title.color(window.multigraph.math.RGBColor.parse("0xfffaab"));
        title.bordercolor(window.multigraph.math.RGBColor.parse("0x127752"));
        title.opacity(0);
        title.padding("4");
        title.cornerradius("10");
        title.anchor(window.multigraph.math.Point.parse("1,1"));
        title.base(window.multigraph.math.Point.parse("0,0"));
        title.position(window.multigraph.math.Point.parse("-1,1"));
        title.content("Graph Title");
        expect(title.serialize()).toEqual(xmlString);

        xmlString = '<title border="3" opacity="1" padding="4" cornerradius="10" anchor="1,0" base="0,1" position="0,0"/>';
        title = new Title();
        title.border("3");
        title.opacity(1);
        title.padding("4");
        title.cornerradius("10");
        title.anchor(window.multigraph.math.Point.parse("1,0"));
        title.base(window.multigraph.math.Point.parse("0,1"));
        title.position(window.multigraph.math.Point.parse("0,0"));
        expect(title.serialize()).toEqual(xmlString);
    });

});
