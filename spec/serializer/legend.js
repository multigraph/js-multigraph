/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Legend serialization", function () {
    "use strict";

    var Legend = window.multigraph.core.Legend,
        Point = window.multigraph.math.Point,
        RGBColor = window.multigraph.math.RGBColor,
        xmlString,
        legend;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize legend models", function () {
        xmlString = ''
            + '<legend'
            +     ' color="0x56839c"'
            +     ' bordercolor="0x941394"'
            +     ' base="-1,-1"'
            +     ' anchor="0,0"'
            +     ' position="0.5,1"'
            +     ' visible="true"'
            +     ' frame="padding"'
            +     ' opacity="1"'
            +     ' border="10"'
            +     ' rows="4"'
            +     ' columns="3"'
            +     ' cornerradius="5"'
            +     ' padding="4"'
            +     '/>';
        legend = new Legend();
        legend.color(RGBColor.parse("0x56839c"));
        legend.bordercolor(RGBColor.parse("0x941394"));
        legend.base(Point.parse("-1,-1"));
        legend.anchor(Point.parse("0,0"));
        legend.position(Point.parse("0.5,1"));
        legend.visible(true);
        legend.frame("padding");
        legend.opacity(1);
        legend.border(10);
        legend.rows(4);
        legend.columns(3);
        legend.cornerradius(5);
        legend.padding(4);
        expect(legend.serialize()).toEqual(xmlString);
    });

    describe("with a Icon child tag", function () {
        var Icon = window.multigraph.core.Icon;

        it("should properly serialize legend models with icon submodels", function () {
            xmlString = ''
                + '<legend'
                +     ' color="0x56839c"'
                +     ' bordercolor="0x941394"'
                +     ' base="-1,-1"'
                +     ' anchor="0,0"'
                +     ' position="0.3,0.2"'
                +     ' visible="true"'
                +     ' frame="padding"'
                +     ' opacity="1"'
                +     ' border="10"'
                +     ' rows="4"'
                +     ' columns="3"'
                +     ' cornerradius="5"'
                +     ' padding="2"'
                +     '>'
                +     '<icon'
                +         ' height="35"'
                +         ' width="50"'
                +         ' border="2"'
                +     '/>'
                + '</legend>';

            legend = new Legend();
            legend.color(RGBColor.parse("0x56839c"));
            legend.bordercolor(RGBColor.parse("0x941394"));
            legend.base(Point.parse("-1,-1"));
            legend.anchor(Point.parse("0,0"));
            legend.position(Point.parse("0.3,0.2"));
            legend.visible(true);
            legend.frame("padding");
            legend.opacity(1);
            legend.border(10);
            legend.rows(4);
            legend.columns(3);
            legend.cornerradius(5);
            legend.padding(2);
            legend.icon(new Icon());
            legend.icon().height(35);
            legend.icon().width(50);
            legend.icon().border(2);

            expect(legend.serialize()).toEqual(xmlString);

            xmlString = ''
                + '<legend'
                +     ' color="0x56839c"'
                +     ' bordercolor="0x000000"'
                +     ' base="0,-1"'
                +     ' anchor="-1,-1"'
                +     ' position="1,1"'
                +     ' visible="false"'
                +     ' frame="plot"'
                +     ' opacity="0"'
                +     ' border="10"'
                +     ' columns="3"'
                +     ' cornerradius="10"'
                +     ' padding="3"'
                +     '>'
                +     '<icon'
                +         ' height="45"'
                +         ' width="40"'
                +         ' border="5"'
                +     '/>'
                + '</legend>';

            legend = new Legend();
            legend.color(RGBColor.parse("0x56839c"));
            legend.bordercolor(RGBColor.parse("0x000000"));
            legend.base(Point.parse("0,-1"));
            legend.anchor(Point.parse("-1,-1"));
            legend.position(Point.parse("1,1"));
            legend.visible(false);
            legend.frame("plot");
            legend.opacity(0);
            legend.border(10);
            legend.columns(3);
            legend.cornerradius(10);
            legend.padding(3);
            legend.icon(new Icon());
            legend.icon().height(45);
            legend.icon().width(40);
            legend.icon().border(5);

            expect(legend.serialize()).toEqual(xmlString);

        });

    });
});
