/*global xdescribe, describe, xit, beforeEach, expect, it, jasmine */
/*jshint laxbreak:true */

describe("Axis Serialization", function () {
    "use strict";

    var Axis = window.multigraph.core.Axis,
        AxisTitle = window.multigraph.core.AxisTitle,
        Binding = window.multigraph.core.Binding,
        Grid = window.multigraph.core.Grid,
        Labeler = window.multigraph.core.Labeler,
        Pan = window.multigraph.core.Pan,
        Zoom = window.multigraph.core.Zoom,
        DataFormatter = window.multigraph.core.DataFormatter,
        DataMeasure = window.multigraph.core.DataMeasure,
        DataValue = window.multigraph.core.DataValue,
        Displacement = window.multigraph.math.Displacement,
        Point = window.multigraph.math.Point,
        RGBColor = window.multigraph.math.RGBColor,
        xmlString,
        axis;

    var addLabeler = function (axis, start, angle, format, anchor, position, spacing, densityfactor, color) {
        var labeler = new Labeler(axis);
        if (start !== undefined) {
            labeler.start(DataValue.parse(axis.type(), start));
        }
        if (angle !== undefined) {
            labeler.angle(parseFloat(angle));
        }
        if (format !== undefined) {
            labeler.formatter(DataFormatter.create(axis.type(), format));
        }
        if (spacing !== undefined) {
            labeler.spacing(DataMeasure.parse(axis.type(), spacing));
        }
        if (anchor !== undefined) {
            labeler.anchor(Point.parse(anchor));
        }
        if (position !== undefined) {
            labeler.position(Point.parse(position));
        }
        if (densityfactor !== undefined) {
            labeler.densityfactor(parseFloat(densityfactor));
        }
        if (color !== undefined) {
            labeler.color(RGBColor.parse(color));
        }
        return labeler;
    };

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize axis models", function () {
        xmlString = ''
            + '<horizontalaxis'
            +     ' color="0x123456"'
            +     ' id="x"'
            +     ' type="number"'
            +     ' pregap="2"'
            +     ' postgap="4"'
            +     ' anchor="1"'
            +     ' min="auto"'
            +     ' minoffset="19"'
            +     ' max="10"'
            +     ' maxoffset="2"'
            +     ' tickmin="-3"'
            +     ' tickmax="3"'
            +     ' highlightstyle="bold"'
            +     ' linewidth="1"'
            +     ' length="1"'
            +     ' position="1,1"'
            +     ' base="1,-1"'
            +     ' minposition="-1"'
            +     ' maxposition="1"'
            +     '>'
            +   '<grid color="0xeeeeee" visible="false"/>' // axes initialize a default grid
            + '</horizontalaxis>';
        axis = new Axis(Axis.HORIZONTAL);

        axis.id("x");
        axis.type("number");
        axis.length(Displacement.parse("1"));
        axis.position(Point.parse("1,1"));
        axis.pregap(2);
        axis.postgap(4);
        axis.anchor(1);
        axis.base(Point.parse("1,-1"));
        axis.min("auto");
        axis.minoffset(19);
        axis.minposition(Displacement.parse("-1"));
        axis.max("10");
        axis.maxoffset(2);
        axis.maxposition(Displacement.parse("1"));
        axis.color(RGBColor.parse("0x123456"));
        axis.tickmin(-3);
        axis.tickmax(3);
        axis.highlightstyle("bold");
        axis.linewidth(1);

        expect(axis.serialize()).toBe(xmlString);
    });

    describe("with Axis Title child tags", function () {

        it("should properly serialize axis models with Axis Title submodels", function () {
            xmlString = '<verticalaxis'
                +    ' color="0x000000"'
                +    ' id="y2"'
                +    ' type="number"'
                +    ' pregap="0"'
                +    ' postgap="0"'
                +    ' anchor="-1"'
                +    ' min="auto"'
                +    ' minoffset="0"'
                +    ' max="auto"'
                +    ' maxoffset="0"'
                +    ' tickmin="-3"'
                +    ' tickmax="3"'
                +    ' highlightstyle="axis"'
                +    ' linewidth="1"'
                +    ' length="0.9"'
                +    ' position="0,0"'
                +    ' base="-1,1"'
                +    ' minposition="-1"'
                +    ' maxposition="1"'
                +    '>'
                +   '<title'
                +      ' angle="70"'
                +      ' anchor="1,1"'
                +      ' position="-1,1"'
                +       '>'
                +     'A Title'
                +   '</title>'
                +   '<grid color="0xeeeeee" visible="false"/>' // axes initialize a default grid
                + '</verticalaxis>';

            axis = new Axis(Axis.VERTICAL);

            axis.color(RGBColor.parse("0x000000"));
            axis.id("y2");
            axis.type("number");
            axis.pregap(0);
            axis.postgap(0);
            axis.anchor(-1);
            axis.min("auto");
            axis.minoffset(0);
            axis.max("auto");
            axis.maxoffset(0);
            axis.tickmin(-3);
            axis.tickmax(3);
            axis.highlightstyle("axis");
            axis.linewidth(1);
            axis.length(Displacement.parse("0.9"));
            axis.position(Point.parse("0,0"));
            axis.base(Point.parse("-1,1"));
            axis.minposition(Displacement.parse("-1"));
            axis.maxposition(Displacement.parse("1"));

            axis.title(new AxisTitle());
            axis.title().angle(70);
            axis.title().anchor(Point.parse("1,1"));
            axis.title().position(Point.parse("-1,1"));
            axis.title().content("A Title");

            expect(axis.serialize()).toBe(xmlString);
        });

    });

    describe("with Label child tags ", function () {

        var spacingStrings,
            i;

        it("should properly serialize axis models with a Labels submodel", function () {
            xmlString = '<verticalaxis'
                +   ' color="0x000000"'
                +   ' id="y1"'
                +   ' type="number"'
                +   ' pregap="0"'
                +   ' postgap="0"'
                +   ' anchor="-1"'
                +   ' min="auto"'
                +   ' minoffset="0"'
                +   ' max="auto"'
                +   ' maxoffset="0"'
                +   ' tickmin="-3"'
                +   ' tickmax="3"'
                +   ' highlightstyle="axis"'
                +   ' linewidth="1"'
                +   ' length="0.9"'
                +   ' position="0,0"'
                +   ' base="-1,1"'
                +   ' minposition="-1"'
                +   ' maxposition="1"'
                +    '>'
                +  '<labels'
                +     ' start="10"'
                +     ' angle="9"'
                +     ' format="%1d"'
                +     ' anchor="0,0"'
                +     ' position="1,1"'
                +     ' spacing="100 75 50 25 10 5 2 1 0.5 0.1"'
                +     ' densityfactor="0.5"'
                +      '/>'
                +  '<grid color="0xeeeeee" visible="false"/>' // axes initialize a default grid
                + '</verticalaxis>';

            axis = new Axis(Axis.VERTICAL);

            axis.color(RGBColor.parse("0x000000"));
            axis.id("y1");
            axis.type("number");
            axis.pregap(0);
            axis.postgap(0);
            axis.anchor(-1);
            axis.min("auto");
            axis.minoffset(0);
            axis.max("auto");
            axis.maxoffset(0);
            axis.tickmin(-3);
            axis.tickmax(3);
            axis.highlightstyle("axis");
            axis.linewidth(1);
            axis.length(Displacement.parse("0.9"));
            axis.position(Point.parse("0,0"));
            axis.base(Point.parse("-1,1"));
            axis.minposition(Displacement.parse("-1"));
            axis.maxposition(Displacement.parse("1"));

            spacingStrings = "100 75 50 25 10 5 2 1 0.5 0.1".split(/\s+/);
            for (i = 0; i < spacingStrings.length; i++) {
                axis.labelers().add(addLabeler(axis, "10", "9", "%1d", "0,0", "1,1", spacingStrings[i], "0.5"));
            }

            expect(axis.serialize()).toEqual(xmlString);
        });
        
        it("should properly serialize axis models with Label submodels", function () {
            xmlString = '<verticalaxis'
                +   ' color="0x000000"'
                +   ' id="y3"'
                +   ' type="number"'
                +   ' pregap="0"'
                +   ' postgap="0"'
                +   ' anchor="-1"'
                +   ' min="auto"'
                +   ' minoffset="0"'
                +   ' max="auto"'
                +   ' maxoffset="0"'
                +   ' tickmin="-3"'
                +   ' tickmax="3"'
                +   ' highlightstyle="axis"'
                +   ' linewidth="1"'
                +   ' length="0.9"'
                +   ' position="0,0"'
                +   ' base="-1,1"'
                +   ' minposition="-1"'
                +   ' maxposition="1"'
                +    '>'
                +  '<labels'
                +      '>'
                +    '<label'
                +       ' start="10"'
                +       ' angle="9"'
                +       ' format="%1d"'
                +       ' anchor="0,0"'
                +       ' position="1,1"'
                +       ' spacing="200 100 50 10"'
                +       ' densityfactor="0.5"'
                +        '/>'
                +    '<label'
                +       ' start="10"'
                +       ' angle="9"'
                +       ' format="%2d"'
                +       ' anchor="0,0"'
                +       ' position="1,1"'
                +       ' spacing="5 2 1 0.5"'
                +       ' densityfactor="0.5"'
                +        '/>'
                +  '</labels>'
                +  '<grid color="0xeeeeee" visible="false"/>' // axes initialize a default grid
                + '</verticalaxis>';

            axis = new Axis(Axis.VERTICAL);

            axis.color(RGBColor.parse("0x000000"));
            axis.id("y3");
            axis.type("number");
            axis.pregap(0);
            axis.postgap(0);
            axis.anchor(-1);
            axis.min("auto");
            axis.minoffset(0);
            axis.max("auto");
            axis.maxoffset(0);
            axis.tickmin(-3);
            axis.tickmax(3);
            axis.highlightstyle("axis");
            axis.linewidth(1);
            axis.length(Displacement.parse("0.9"));
            axis.position(Point.parse("0,0"));
            axis.base(Point.parse("-1,1"));
            axis.minposition(Displacement.parse("-1"));
            axis.maxposition(Displacement.parse("1"));

            spacingStrings = "200 100 50 10".split(/\s+/);
            for (i = 0; i < spacingStrings.length; i++) {
                axis.labelers().add(addLabeler(axis, "10", "9", "%1d", "0,0", "1,1", spacingStrings[i], "0.5"));
            }

            spacingStrings = "5 2 1 .5".split(/\s+/);
            for (i = 0; i < spacingStrings.length; i++) {
                axis.labelers().add(addLabeler(axis, "10", "9", "%2d", "0,0", "1,1", spacingStrings[i], "0.5"));
            }

            expect(axis.serialize()).toEqual(xmlString);
        });

    });

    describe("with Grid child tags", function () {

        it("should properly serialize axis models with Grid submodels", function () {
            xmlString = ''
                + '<verticalaxis'
                +    ' color="0x000000"'
                +    ' id="y2"'
                +    ' type="number"'
                +    ' pregap="0"'
                +    ' postgap="0"'
                +    ' anchor="-1"'
                +    ' min="auto"'
                +    ' minoffset="0"'
                +    ' max="auto"'
                +    ' maxoffset="0"'
                +    ' tickmin="-3"'
                +    ' tickmax="3"'
                +    ' highlightstyle="axis"'
                +    ' linewidth="1"'
                +    ' length="0.9"'
                +    ' position="0,0"'
                +    ' base="-1,1"'
                +    ' minposition="1"'
                +    ' maxposition="1">'
                +   '<grid'
                +      ' color="0x984545"'
                +      ' visible="false"'
                +      '/>'
                + '</verticalaxis>';

            axis = new Axis(Axis.VERTICAL);

            axis.color(RGBColor.parse("0x000000"));
            axis.id("y2");
            axis.type("number");
            axis.pregap(0);
            axis.postgap(0);
            axis.anchor(-1);
            axis.min("auto");
            axis.minoffset(0);
            axis.max("auto");
            axis.maxoffset(0);
            axis.tickmin(-3);
            axis.tickmax(3);
            axis.highlightstyle("axis");
            axis.linewidth(1);
            axis.length(Displacement.parse("0.9"));
            axis.position(Point.parse("0,0"));
            axis.base(Point.parse("-1,1"));
            axis.minposition(Displacement.parse("1"));
            axis.maxposition(Displacement.parse("1"));

            axis.grid(new Grid());
            axis.grid().color(RGBColor.parse("0x984545"));
            axis.grid().visible(false);

            expect(axis.serialize()).toEqual(xmlString);
        });

    });

    describe("with Pan child tags", function () {

        it("should properly serialize axis models with Pan submodels", function () {
            xmlString = ''
                + '<verticalaxis'
                +    ' color="0x000000"'
                +    ' id="y2"'
                +    ' type="number"'
                +    ' pregap="0"'
                +    ' postgap="0"'
                +    ' anchor="-1"'
                +    ' min="auto"'
                +    ' minoffset="0"'
                +    ' max="auto"'
                +    ' maxoffset="0"'
                +    ' tickmin="-3"'
                +    ' tickmax="3"'
                +    ' highlightstyle="axis"'
                +    ' linewidth="1"'
                +    ' length="0.9"'
                +    ' position="0,0"'
                +    ' base="-1,1"'
                +    ' minposition="1"'
                +    ' maxposition="1"'
                +    '>'
                +   '<grid color="0xeeeeee" visible="false"/>' // axes initialize a default grid
                +   '<pan'
                +      ' allowed="yes"'
                +      ' min="0"'
                +      ' max="5"'
                +      '/>'
                + '</verticalaxis>';

            axis = new Axis(Axis.VERTICAL);

            axis.color(RGBColor.parse("0x000000"));
            axis.id("y2");
            axis.type("number");
            axis.pregap(0);
            axis.postgap(0);
            axis.anchor(-1);
            axis.min("auto");
            axis.minoffset(0);
            axis.max("auto");
            axis.maxoffset(0);
            axis.tickmin(-3);
            axis.tickmax(3);
            axis.highlightstyle("axis");
            axis.linewidth(1);
            axis.length(Displacement.parse("0.9"));
            axis.position(Point.parse("0,0"));
            axis.base(Point.parse("-1,1"));
            axis.minposition(Displacement.parse("1"));
            axis.maxposition(Displacement.parse("1"));

            axis.pan(new Pan());
            axis.pan().allowed(true);
            axis.pan().min(DataValue.parse(axis.type(), 0));
            axis.pan().max(DataValue.parse(axis.type(), 5));

            expect(axis.serialize()).toEqual(xmlString);
        });

    });

    describe("with Zoom child tags", function () {

        it("should properly serialize axis models with Zoom submodels", function () {
            xmlString = ''
                + '<verticalaxis'
                +    ' color="0x000000"'
                +    ' id="y2"'
                +    ' type="number"'
                +    ' pregap="0"'
                +    ' postgap="0"'
                +    ' anchor="-1"'
                +    ' min="auto"'
                +    ' minoffset="0"'
                +    ' max="auto"'
                +    ' maxoffset="0"'
                +    ' tickmin="-3"'
                +    ' tickmax="3"'
                +    ' highlightstyle="axis"'
                +    ' linewidth="1"'
                +    ' length="0.9"'
                +    ' position="0,0"'
                +    ' base="-1,1"'
                +    ' minposition="1"'
                +    ' maxposition="1"'
                +    '>'
                +   '<grid color="0xeeeeee" visible="false"/>' // axes initialize a default grid
                +   '<zoom'
                +      ' allowed="yes"'
                +      ' min="0"'
                +      ' max="80"'
                +      ' anchor="none"'
                +      '/>'
                + '</verticalaxis>';

            axis = new Axis(Axis.VERTICAL);

            axis.color(RGBColor.parse("0x000000"));
            axis.id("y2");
            axis.type("number");
            axis.pregap(0);
            axis.postgap(0);
            axis.anchor(-1);
            axis.min("auto");
            axis.minoffset(0);
            axis.max("auto");
            axis.maxoffset(0);
            axis.tickmin(-3);
            axis.tickmax(3);
            axis.highlightstyle("axis");
            axis.linewidth(1);
            axis.length(Displacement.parse("0.9"));
            axis.position(Point.parse("0,0"));
            axis.base(Point.parse("-1,1"));
            axis.minposition(Displacement.parse("1"));
            axis.maxposition(Displacement.parse("1"));

            axis.zoom(new Zoom());
            axis.zoom().allowed(true);
            axis.zoom().min(DataMeasure.parse(axis.type(), "0"));
            axis.zoom().max(DataMeasure.parse(axis.type(), "80"));
            axis.zoom().anchor(null);

            expect(axis.serialize()).toEqual(xmlString);
        });

    });

    describe("with Binding child tags", function () {

        it("should properly serialize axis models with Binding submodels", function () {
            xmlString = ''
                + '<verticalaxis'
                +    ' color="0x000000"'
                +    ' id="y2"'
                +    ' type="number"'
                +    ' pregap="0"'
                +    ' postgap="0"'
                +    ' anchor="-1"'
                +    ' min="auto"'
                +    ' minoffset="0"'
                +    ' max="auto"'
                +    ' maxoffset="0"'
                +    ' tickmin="-3"'
                +    ' tickmax="3"'
                +    ' highlightstyle="axis"'
                +    ' linewidth="1"'
                +    ' length="0.9"'
                +    ' position="0,0"'
                +    ' base="-1,1"'
                +    ' minposition="1"'
                +    ' maxposition="1"'
                + '>'
                +   '<grid color="0xeeeeee" visible="false"/>' // axes initialize a default grid
                +   '<binding'
                +      ' id="y"'
                +      ' min="-10"'
                +      ' max="50"'
                +      '/>'
                + '</verticalaxis>';

            axis = new Axis(Axis.VERTICAL);

            axis.color(RGBColor.parse("0x000000"));
            axis.id("y2");
            axis.type("number");
            axis.pregap(0);
            axis.postgap(0);
            axis.anchor(-1);
            axis.min("auto");
            axis.minoffset(0);
            axis.max("auto");
            axis.maxoffset(0);
            axis.tickmin(-3);
            axis.tickmax(3);
            axis.highlightstyle("axis");
            axis.linewidth(1);
            axis.length(Displacement.parse("0.9"));
            axis.position(Point.parse("0,0"));
            axis.base(Point.parse("-1,1"));
            axis.minposition(Displacement.parse("1"));
            axis.maxposition(Displacement.parse("1"));

            axis.binding(new Binding("y", "-10", "50"));

            expect(axis.serialize()).toEqual(xmlString);
        });

    });

    describe("with all possible child tags", function () {

        var spacingStrings,
            i;

        it("should properly serialize axis models with all possible submodels", function () {
            xmlString = ''
                + '<verticalaxis'
                +    ' color="0x000000"'
                +    ' id="y2"'
                +    ' type="number"'
                +    ' pregap="0"'
                +    ' postgap="0"'
                +    ' anchor="-1"'
                +    ' min="auto"'
                +    ' minoffset="0"'
                +    ' max="auto"'
                +    ' maxoffset="0"'
                +    ' tickmin="-3"'
                +    ' tickmax="3"'
                +    ' highlightstyle="axis"'
                +    ' linewidth="1"'
                +    ' length="0.9"'
                +    ' position="0,0"'
                +    ' base="-1,1"'
                +    ' minposition="1"'
                +    ' maxposition="1"'
                +    '>'
                +    '<title'
                +       ' angle="70"'
                +       ' anchor="1,1"'
                +       ' position="-1,1"'
                +       '>'
                +         'A Title'
                +    '</title>'
                +    '<labels>'
                +      '<label'
                +         ' start="10"'
                +         ' angle="9"'
                +         ' format="%1d"'
                +         ' anchor="0,0"'
                +         ' position="1,1"'
                +         ' spacing="200 100 50 10"'
                +         ' densityfactor="0.5"'
                +         '/>'
                +      '<label'
                +         ' start="10"'
                +         ' angle="9"'
                +         ' format="%2d"'
                +         ' anchor="0,0"'
                +         ' position="1,1"'
                +         ' spacing="5 2 1 0.5"'
                +         ' densityfactor="0.5"'
                +         '/>'
                +    '</labels>'
                +    '<grid'
                +       ' color="0x984545"'
                +       ' visible="false"/>'
                +    '<pan'
                +       ' allowed="yes"'
                +       ' min="0"'
                +       ' max="5"/>'
                +    '<zoom'
                +       ' allowed="yes"'
                +       ' min="0"'
                +       ' max="80"'
                +       ' anchor="1"/>'
                +    '<binding'
                +       ' id="y"'
                +       ' min="-10"'
                +       ' max="50"/>'
                + '</verticalaxis>';

            axis = new Axis(Axis.VERTICAL);

            axis.color(RGBColor.parse("0x000000"));
            axis.id("y2");
            axis.type("number");
            axis.pregap(0);
            axis.postgap(0);
            axis.anchor(-1);
            axis.min("auto");
            axis.minoffset(0);
            axis.max("auto");
            axis.maxoffset(0);
            axis.tickmin(-3);
            axis.tickmax(3);
            axis.highlightstyle("axis");
            axis.linewidth(1);
            axis.length(Displacement.parse("0.9"));
            axis.position(Point.parse("0,0"));
            axis.base(Point.parse("-1,1"));
            axis.minposition(Displacement.parse("1"));
            axis.maxposition(Displacement.parse("1"));

            axis.title(new AxisTitle());
            axis.title().angle(70);
            axis.title().anchor(Point.parse("1,1"));
            axis.title().position(Point.parse("-1,1"));
            axis.title().content("A Title");

            spacingStrings = "200 100 50 10".split(/\s+/);
            for (i = 0; i < spacingStrings.length; i++) {
                axis.labelers().add(addLabeler(axis, "10", "9", "%1d", "0,0", "1,1", spacingStrings[i], "0.5"));
            }

            spacingStrings = "5 2 1 0.5".split(/\s+/);
            for (i = 0; i < spacingStrings.length; i++) {
                axis.labelers().add(addLabeler(axis, "10", "9", "%2d", "0,0", "1,1", spacingStrings[i], "0.5"));
            }

            axis.grid(new Grid());
            axis.grid().color(RGBColor.parse("0x984545"));
            axis.grid().visible(false);

            axis.pan(new Pan());
            axis.pan().allowed(true);
            axis.pan().min(DataValue.parse(axis.type(), 0));
            axis.pan().max(DataValue.parse(axis.type(), 5));

            axis.zoom(new Zoom());
            axis.zoom().allowed(true);
            axis.zoom().min(DataMeasure.parse(axis.type(), "0"));
            axis.zoom().max(DataMeasure.parse(axis.type(), "80"));
            axis.zoom().anchor(DataValue.parse(axis.type(), "1"));

            axis.binding(new Binding("y", "-10", "50"));

            expect(axis.serialize()).toEqual(xmlString);
        });

    });

});
