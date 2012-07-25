/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis", function () {
    "use strict";

    var Axis = window.multigraph.Axis,
        Point = window.multigraph.math.Point,
        Title = window.multigraph.Axis.Title,
        Labels = window.multigraph.Axis.Labels,
        Labeler = window.multigraph.Axis.Labeler,
        Grid = window.multigraph.Axis.Grid,
        Pan = window.multigraph.Axis.Pan,
        Zoom = window.multigraph.Axis.Zoom,
        Binding = window.multigraph.Axis.Binding,
        AxisControls = window.multigraph.Axis.AxisControls,
        NumberValue = window.multigraph.NumberValue,
        a;

    beforeEach(function () {
        a = new Axis('horizontal');
    });

    it("should be able to create an Axis", function () {
        expect(a instanceof Axis).toBe(true);
    });

    describe("id attribute", function () {
        it("should be able to set/get the id attribute", function () {
            a.id('the-id');
            expect(a.id() === 'the-id').toBe(true);
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                a.id(5);
            }).toThrow(new Error("invalid setter call for id"));
        });

    });

    describe("type attribute", function () {
        it("should be able to set/get the type attribute", function () {
            a.type('number');
            expect(a.type() === 'number').toBe(true);
            a.type('datetime');
            expect(a.type() === 'datetime').toBe(true);
        });

        it("should throw an error if the parameter is not 'number' or 'datetime'", function () {
            expect(function () {
                a.type(5);
            }).toThrow(); // too hard to check for specific message here
            expect(function () {
                a.type("numbers");
            }).toThrow(); // too hard to check for specific message here
        });

    });

    describe("length attribute", function () {
        it("should be able to set/get the length attribute", function () {
            a.length(window.multigraph.math.Displacement.parse(".5+2"));
            expect(a.length().serialize()).toBe("0.5+2");
            a.length(window.multigraph.math.Displacement.parse(".7"));
            expect(a.length().serialize()).toBe("0.7");
        });

    });

    describe("position attribute", function () {
        it("should be able to set/get the position attribute", function () {
            a.position(new Point(1,1));
            expect(a.position().x()).toEqual(1);
            expect(a.position().y()).toEqual(1);
        });

        it("should throw an error if the parameter is not a point", function () {
            expect(function () {
                a.position(true);
            }).toThrow(new Error("invalid setter call for position"));
        });

    });

    describe("pregap attribute", function () {
        it("should be able to set/get the pregap attribute", function () {
            a.pregap(2);
            expect(a.pregap()).toBe(2);
        });

    });

    describe("postgap attribute", function () {
        it("should be able to set/get the postgap attribute", function () {
            a.postgap(7);
            expect(a.postgap()).toBe(7);
        });

    });

    describe("anchor attribute", function () {
        it("should be able to set/get the anchor attribute", function () {
            a.anchor(-0.8);
            expect(a.anchor()).toEqual(-0.8);
        });

        it("should throw an error if the parameter is not a number", function () {
            expect(function () {
                a.anchor('foo');
            }).toThrow(new Error("foo should be a number"));
        });

    });

    describe("base attribute", function () {
        it("should be able to set/get the base attribute", function () {
            a.base(new Point(-1,0));
            expect(a.base().x()).toEqual(-1);
            expect(a.base().y()).toEqual(0);
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                a.base(true);
            }).toThrow(new Error("invalid setter call for base"));
        });

    });

    describe("min attribute", function () {
        it("should be able to set/get the min attribute", function () {
            a.min("17");
            expect(a.min()).toBe("17");
        });

        xit("should throw an error if the parameter is not a number, datetime or 'auto'", function () {
            expect(function () {
                a.min(true);
            }).toThrow(new Error("true should be a number"));
        });

    });

    describe("minoffset attribute", function () {
        it("should be able to set/get the minoffset attribute", function () {
            a.minoffset(9);
            expect(a.minoffset()).toBe(9);
        });

    });

    describe("minposition attribute", function () {
        it("should be able to set/get the minposition attribute", function () {
            a.minposition(new window.multigraph.math.Displacement(-1,1));
            expect(a.minposition().a()).toEqual(-1);
            expect(a.minposition().b()).toEqual(1);
        });
    });

    describe("max attribute", function () {
        it("should be able to set/get the max attribute", function () {
            a.max("94");
            expect(a.max()).toBe("94");
        });

        xit("should throw an error if the parameter is not a number, datetime or 'auto'", function () {
            expect(function () {
                a.max('the-max');
            }).toThrow(new Error("the-max should be a number"));
        });

    });

    describe("maxoffset attribute", function () {
        it("should be able to set/get the maxoffset attribute", function () {
            a.maxoffset(8);
            expect(a.maxoffset()).toBe(8);
        });

    });

    describe("maxposition attribute", function () {
        it("should be able to set/get the maxposition attribute", function () {
            a.maxposition(new window.multigraph.math.Displacement(-1,1));
            expect(a.maxposition().a()).toEqual(-1);
            expect(a.maxposition().b()).toEqual(1);
        });
    });

    describe("color attribute", function () {
        it("should be able to set/get the color attribute", function () {
            a.color(window.multigraph.math.RGBColor.parse("0x757431"));
            expect(a.color().getHexString()).toBe("0x757431");
        });

    });

    describe("tickmin attribute", function () {
        it("should be able to set/get the tickmin attribute", function () {
            a.tickmin(7);
            expect(a.tickmin()).toBe(7);
        });

    });

    describe("tickmax attribute", function () {
        it("should be able to set/get the tickmax attribute", function () {
            a.tickmax(22);
            expect(a.tickmax()).toBe(22);
        });

    });

    describe("highlightstyle attribute", function () {
        it("should be able to set/get the highlightstyle attribute", function () {
            a.highlightstyle('bold');
            expect(a.highlightstyle() === 'bold').toBe(true);
        });

    });

    describe("linewidth attribute", function () {
        it("should be able to set/get the linewidth attribute", function () {
            a.linewidth(5);
            expect(a.linewidth()).toBe(5);
        });

    });

    describe("orientation attribute", function () {
        it("should be able to set/get the orientation attribute", function () {
            a.orientation('horizontal');
            expect(a.orientation() === 'horizontal').toBe(true);
            a.orientation('vertical');
            expect(a.orientation() === 'vertical').toBe(true);
        });

        it("should throw an error if the setter parameter is not 'horizontal' or 'vertical'", function () {
            expect(function () {
                a.orientation(true);
            }).toThrow(new Error("invalid setter call for orientation"));
            expect(function () {
                a.orientation('blahblahblah');
            }).toThrow(new Error("invalid setter call for orientation"));
        });

    });

    describe("Title", function () {
        var title;

        beforeEach(function () {
            title = new Title();
        });

        it("should be able to add a Title to a Axis", function () {
            a.title(title);
            expect(a.title() === title).toBe(true);
        });

        it("should be able to add a Title with attributes to a Axis", function () {
            title.position("0 0");
            title.content("time");
            a.title(title);
            expect(a.title() === title).toBe(true);
        });

        it("should be able to set/get attributes from a title added to a Axis", function () {
            a.title(title);
            a.title().content('Time');
            expect(a.title().content() === 'Time').toBe(true);
            a.title().content('money');
            expect(a.title().content() === 'money').toBe(true);
        });

    });

    describe("Labels", function () {
        var labels;

        beforeEach(function () {
            labels = new Labels();
        });

        it("should be able to add a labels to a Axis", function () {
            a.labels(labels);
            expect(a.labels() === labels).toBe(true);
        });

        it("should be able to add a Labels with attributes and children to a Axis", function () {
            var labeler = new Labeler(a),
                labeler2 = new Labeler(a);
            labels.position(new Point(1,1));
            labeler2.anchor(new Point(0,0));
            a.labelers().add(labeler);
            a.labelers().add(labeler2);
            a.labels(labels);
            expect(a.labels().position().x()).toEqual(1);
            expect(a.labels().position().y()).toEqual(1);
            expect(a.labelers().at(0)).toBe(labeler);
            expect(a.labelers().at(1)).toBe(labeler2);
        });

        it("should be able to set/get attributes of labels added to a Axis", function () {
            var labeler = new Labeler(a),
                labeler2 = new Labeler(a);
            labeler.spacing("20");
            labeler2.spacing("202");
            a.labelers().add(labeler);
            a.labelers().add(labeler2);
            a.labels(labels);
            a.labels().position(new Point(1,1)).angle(40);
            a.labelers().at(1).anchor(new Point(0,1)).angle(14);
            expect(a.labels().position().x()).toEqual(1);
            expect(a.labels().position().y()).toEqual(1);
            expect(a.labels().angle()).toBe(40);
            expect(a.labelers().at(0).spacing()).toBe("20");
            expect(a.labelers().at(1).spacing()).toBe("202");
            expect(a.labelers().at(1).anchor().serialize()).toEqual("0,1");
            expect(a.labelers().at(1).angle()).toBe(14);
        });

    });

    describe("Grid", function () {
        var grid;

        beforeEach(function () {
            grid = new Grid();
        });

        it("should be able to add a Grid to a Axis", function () {
            a.grid(grid);
            expect(a.grid() === grid).toBe(true);
        });

        it("should be able to add a Grid with attributes to a Axis", function () {
            grid.visible("false");
            a.grid(grid);
            expect(a.grid() === grid).toBe(true);
        });

        it("should be able to set/get attributes from a grid added to a Axis", function () {
            a.grid(grid);
            a.grid().visible('true').color(window.multigraph.math.RGBColor.parse("0x345345"));
            expect(a.grid().visible()).toBe("true");
            expect(a.grid().color().getHexString()).toBe("0x345345");
        });

    });

    describe("Pan", function () {
        var pan;

        beforeEach(function () {
            pan = new Pan();
        });

        it("should be able to add a Pan to a Axis", function () {
            a.pan(pan);
            expect(a.pan() === pan).toBe(true);
        });

        it("should be able to add a Pan with attributes to a Axis", function () {
            pan.allowed("yes").max("45");
            a.pan(pan);
            expect(a.pan() === pan).toBe(true);
        });

        it("should be able to set/get attributes from a pan added to a Axis", function () {
            a.pan(pan);
            a.pan().allowed('no').min('30').max('45');
            expect(a.pan().allowed() === 'no').toBe(true);
            expect(a.pan().min() === '30').toBe(true);
            expect(a.pan().max() === '45').toBe(true);
        });

    });

    describe("Zoom", function () {
        var zoom;

        beforeEach(function () {
            zoom = new Zoom();
        });

        it("should be able to add a Zoom to a Axis", function () {
            a.zoom(zoom);
            expect(a.zoom() === zoom).toBe(true);
        });

        it("should be able to add a Zoom with attributes to a Axis", function () {
            zoom.allowed("no");
            a.zoom(zoom);
            expect(a.zoom() === zoom).toBe(true);
        });

        it("should be able to set/get attributes from a zoom added to a Axis", function () {
            a.zoom(zoom);
            a.zoom().allowed('yes');
            a.zoom().min('13');
            expect(a.zoom().allowed() === 'yes').toBe(true);
            expect(a.zoom().min() === '13').toBe(true);
        });

    });

    describe("Binding", function () {
        var binding;

        beforeEach(function () {
            binding = new Binding('x', '0', '12');
        });

        it("should be able to add a Binding to a Axis", function () {
            a.binding(binding);
            expect(a.binding() === binding).toBe(true);
        });

        it("should be able to add a Binding with attributes to a Axis", function () {
            binding.id("y");
            a.binding(binding);
            expect(a.binding() === binding).toBe(true);
        });

        it("should be able to set/get attributes from a binding added to a Axis", function () {
            a.binding(binding);
            expect(a.binding().id() === 'x').toBe(true);
            expect(a.binding().max() === '12').toBe(true);
        });

    });

    describe("Axiscontrols", function () {
        var axiscontrols;

        beforeEach(function () {
            axiscontrols = new AxisControls();
        });

        it("should be able to add a Axiscontrols to a Axis", function () {
            a.axiscontrols(axiscontrols);
            expect(a.axiscontrols() === axiscontrols).toBe(true);
        });

        it("should be able to add a Axiscontrols with attributes to a Axis", function () {
            axiscontrols.visible("false");
            a.axiscontrols(axiscontrols);
            expect(a.axiscontrols() === axiscontrols).toBe(true);
        });

        it("should be able to set/get attributes from a axiscontrols added to a Axis", function () {
            a.axiscontrols(axiscontrols);
            a.axiscontrols().visible('true');
            expect(a.axiscontrols().visible() === 'true').toBe(true);
        });

    });

    describe("dataMin/dataMax attributes", function() {
        it("dataMin should initially be undefined", function() {
            expect(a.dataMin()).toBeUndefined();
        });
        it("dataMax should initially be undefined", function() {
            expect(a.dataMax()).toBeUndefined();
        });
        it("dataMin should not be undefined after being set", function() {
            a.dataMin(new NumberValue(0.0));
            expect(a.dataMin()).not.toBeUndefined();
        });
    });

    describe("initializeGeometry", function() {

        var Graph = window.multigraph.Graph,
            Insets = window.multigraph.math.Insets,
            a,
            g;

        beforeEach(function() {
            g = new Graph();
            a = new Axis('horizontal');
            g.axes().add(a);
        });

        it("should do something good", function() {

            g.window().margin(new Insets(5,5,5,5));
            g.window().border(3);
            g.window().padding(new Insets(7,7,7,7));

            g.plotarea().margin(new Insets(6,6,6,6));

            a.dataMin(new NumberValue(0));
            a.dataMax(new NumberValue(10));

            g.initializeGeometry(500,500);

            // with a window geom of 500x500, plotBox should now be a square whose side is length 500-2*(5+3+7+6) = 458
            expect(g.plotBox().width()).toEqual(458);

            // axis should have that same length, since default axis length is Displacement(1,0)
            expect(a.pixelLength()).toEqual(458);

            // "data" length of axis is 10, so axis-to-data ratio should be 458/10:
            expect(a.axisToDataRatio()).toEqual(458/10);

            // expect left endpoint of axis to convert to 0
            expect(a.dataValueToAxisValue(new NumberValue(0))).toEqual(0);

            // expect right endpoint of axis to convert to 458
            expect(a.dataValueToAxisValue(new NumberValue(10))).toEqual(458);
        });

    });


});
