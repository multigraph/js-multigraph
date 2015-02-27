/*global describe, xdescribe, it, beforeEach, expect, xit, jasmine, Binding */

describe("Axis", function () {
    "use strict";

    var Point = require('../../src/math/point.js'),
        Displacement = require('../../src/math/displacement.js'),
        RGBColor = require('../../src/math/rgb_color.js'),
        Graph = require('../../src/core/graph.js'),
        Insets = require('../../src/math/insets.js'),
        Legend = require('../../src/core/legend.js'),
        Axis = require('../../src/core/axis.js'),
        AxisTitle = require('../../src/core/axis_title.js'),
        Labeler = require('../../src/core/labeler.js'),
        Grid = require('../../src/core/grid.js'),
        Pan = require('../../src/core/pan.js'),
        Zoom = require('../../src/core/zoom.js'),
        DataValue = require('../../src/core/data_value.js'),
        DataMeasure = require('../../src/core/data_measure.js'),
        NumberValue = require('../../src/core/number_value.js'),
        Text = require('../../src/core/text.js'),
        a;

    beforeEach(function () {
        a = new Axis(Axis.HORIZONTAL);
    });

    it("should be able to create an Axis", function () {
        expect(a instanceof Axis).toBe(true);
    });

    describe("id attribute", function () {
        it("should be able to set/get the id attribute", function () {
            a.id("the-id");
            expect(a.id()).toBe("the-id");
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                a.id(5);
            }).toThrow(new Error("5 should be a string"));
        });
    });

    describe("type attribute", function () {
        it("should be able to set/get the type attribute", function () {
            a.type("number");
            expect(a.type()).toBe("number");
            a.type("datetime");
            expect(a.type()).toBe("datetime");
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
            a.length(Displacement.parse(".5+2"));
            expect(a.length().a()).toEqual(0.5);
            expect(a.length().b()).toEqual(2);
            a.length(Displacement.parse(".7"));
            expect(a.length().a()).toEqual(0.7);
            expect(a.length().b()).toEqual(0);
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
            }).toThrow(new Error("validator failed with parameter true"));
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
                a.anchor("foo");
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
            }).toThrow(new Error("validator failed with parameter true"));
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
            a.minposition(new Displacement(-1,1));
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
                a.max("the-max");
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
            a.maxposition(new Displacement(-1,1));
            expect(a.maxposition().a()).toEqual(-1);
            expect(a.maxposition().b()).toEqual(1);
        });
    });

    describe("color attribute", function () {
        it("should be able to set/get the color attribute", function () {
            a.color(RGBColor.parse("0x757431"));
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
            a.highlightstyle("bold");
            expect(a.highlightstyle()).toBe("bold");
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
            a.orientation(Axis.HORIZONTAL);
            expect(a.orientation()).toBe(Axis.HORIZONTAL);
            a.orientation(Axis.VERTICAL);
            expect(a.orientation()).toBe(Axis.VERTICAL);
        });

        it("should throw an error if the setter parameter is not 'horizontal' or 'vertical'", function () {
            expect(function () {
                a.orientation(true);
            }).toThrow(new Error("validator failed with parameter true"));
            expect(function () {
                a.orientation("blahblahblah");
            }).toThrow(new Error("validator failed with parameter blahblahblah"));
        });

    });

    describe("AxisTitle", function () {
        var title;

        beforeEach(function () {
            title = new AxisTitle(a);
        });

        it("should be able to add a AxisTitle to a Axis", function () {
            a.title(title);
            expect(a.title()).toBe(title);
        });

        it("should be able to add a AxisTitle with attributes to a Axis", function () {
            title.position(new Point(0, 0));
            title.content(new Text("time"));
            a.title(title);
            expect(a.title()).toBe(title);
        });

        it("should be able to set/get attributes from a title added to a Axis", function () {
            a.title(title);
            a.title().content(new Text("Time"));
            expect(a.title().content().string()).toEqual("Time");
            a.title().content(new Text("money"));
            expect(a.title().content().string()).toEqual("money");
        });

    });

    describe("Grid", function () {
        var grid;

        beforeEach(function () {
            grid = new Grid();
        });

        it("should be able to add a Grid to a Axis", function () {
            a.grid(grid);
            expect(a.grid()).toBe(grid);
        });

        it("should be able to add a Grid with attributes to a Axis", function () {
            grid.visible(false);
            a.grid(grid);
            expect(a.grid()).toBe(grid);
        });

        it("should be able to set/get attributes from a grid added to a Axis", function () {
            a.grid(grid);
            a.grid().visible(true).color(RGBColor.parse("0x345345"));
            expect(a.grid().visible()).toBe(true);
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
            expect(a.pan()).toBe(pan);
        });

        it("should be able to add a Pan with attributes to a Axis", function () {
            pan.allowed(true).max(DataValue.parse("number", "45"));
            a.pan(pan);
            expect(a.pan()).toBe(pan);
        });

        it("should be able to set/get attributes from a pan added to a Axis", function () {
            a.pan(pan);
            a.pan().allowed(false)
                .min(DataValue.parse("number", "30"))
                .max(DataValue.parse("number", "45"));
            expect(a.pan().allowed()).toBe(false);
            expect(a.pan().min().getRealValue()).toBe(30);
            expect(a.pan().max().getRealValue()).toBe(45);
        });

    });

    describe("Zoom", function () {
        var zoom;

        beforeEach(function () {
            zoom = new Zoom();
        });

        it("should be able to add a Zoom to a Axis", function () {
            a.zoom(zoom);
            expect(a.zoom()).toBe(zoom);
        });

        it("should be able to add a Zoom with attributes to a Axis", function () {
            zoom.allowed(false);
            a.zoom(zoom);
            expect(a.zoom()).toBe(zoom);
        });

        it("should be able to set/get attributes from a zoom added to a Axis", function () {
            a.zoom(zoom);
            a.zoom().allowed(true);
            a.zoom().min(DataMeasure.parse("number", "13"));
            expect(a.zoom().allowed()).toBe(true);
            expect(a.zoom().min().getRealValue()).toBe(13);
        });

    });

    xdescribe("Binding", function () {
        var binding;

        beforeEach(function () {
            binding = new Binding("x", "0", "12");
        });

        it("should be able to add a Binding to a Axis", function () {
            a.binding(binding);
            expect(a.binding()).toBe(binding);
        });

        it("should be able to add a Binding with attributes to a Axis", function () {
            binding.id("y");
            a.binding(binding);
            expect(a.binding()).toBe(binding);
        });

        it("should be able to set/get attributes from a binding added to a Axis", function () {
            a.binding(binding);
            expect(a.binding().id()).toBe("x");
            expect(a.binding().max()).toBe("12");
        });

    });

    describe("dataMin/dataMax attributes", function () {
        it("dataMin should initially be undefined", function () {
            expect(a.dataMin()).toBeUndefined();
        });
        it("dataMax should initially be undefined", function () {
            expect(a.dataMax()).toBeUndefined();
        });
        it("dataMin should not be undefined after being set", function () {
            a.dataMin(new NumberValue(0.0));
            expect(a.dataMin()).not.toBeUndefined();
        });
    });

    describe("initializeGeometry", function () {

        var a,
            g;

        beforeEach(function () {
            g = new Graph();
            a = new Axis(Axis.HORIZONTAL);
            g.axes().add(a);
            g.legend(new Legend());
        });

        it("should do something good", function () {

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
