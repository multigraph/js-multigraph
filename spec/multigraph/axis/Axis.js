/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis", function () {
    "use strict";

    var Axis = window.multigraph.Axis,
        Title = window.multigraph.Axis.Title,
        Labels = window.multigraph.Axis.Labels,
        Label = window.multigraph.Axis.Labels.Label,
        Grid = window.multigraph.Axis.Grid,
        Pan = window.multigraph.Axis.Pan,
        Zoom = window.multigraph.Axis.Zoom,
        Binding = window.multigraph.Axis.Binding,
        AxisControls = window.multigraph.Axis.AxisControls,
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
            }).toThrow(new Error("invalid setter call for type"));
            expect(function () {
                a.type("numbers");
            }).toThrow(new Error("invalid setter call for type"));
        });

    });

    describe("position attribute", function () {
        it("should be able to set/get the position attribute", function () {
            a.position('1 1');
            expect(a.position() === '1 1').toBe(true);
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                a.position(true);
            }).toThrow(new Error("invalid setter call for position"));
        });

    });

    describe("pregap attribute", function () {
        it("should be able to set/get the pregap attribute", function () {
            a.pregap('1 1');
            expect(a.pregap() === '1 1').toBe(true);
        });

    });

    describe("postgap attribute", function () {
        it("should be able to set/get the postgap attribute", function () {
            a.postgap('7');
            expect(a.postgap() === '7').toBe(true);
        });

    });

    describe("anchor attribute", function () {
        it("should be able to set/get the anchor attribute", function () {
            a.anchor('0 -1');
            expect(a.anchor() === '0 -1').toBe(true);
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                a.anchor(true);
            }).toThrow(new Error("invalid setter call for anchor"));
        });

    });

    describe("base attribute", function () {
        it("should be able to set/get the base attribute", function () {
            a.base('-1 0');
            expect(a.base() === '-1 0').toBe(true);
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                a.base(true);
            }).toThrow(new Error("invalid setter call for base"));
        });

    });

    describe("min attribute", function () {
        it("should be able to set/get the min attribute", function () {
            a.min('17');
            expect(a.min() === '17').toBe(true);
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                a.min(true);
            }).toThrow(new Error("invalid setter call for min"));
        });

    });

    describe("minoffset attribute", function () {
        it("should be able to set/get the minoffset attribute", function () {
            a.minoffset('9');
            expect(a.minoffset() === '9').toBe(true);
        });

    });

    describe("minposition attribute", function () {
        it("should be able to set/get the minposition attribute", function () {
            a.minposition('-1 1');
            expect(a.minposition() === '-1 1').toBe(true);
        });

    });

    describe("max attribute", function () {
        it("should be able to set/get the max attribute", function () {
            a.max('the-max');
            expect(a.max() === 'the-max').toBe(true);
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                a.max(true);
            }).toThrow(new Error("invalid setter call for max"));
        });

    });

    describe("maxoffset attribute", function () {
        it("should be able to set/get the maxoffset attribute", function () {
            a.maxoffset('8');
            expect(a.maxoffset() === '8').toBe(true);
        });

    });

    describe("maxposition attribute", function () {
        it("should be able to set/get the maxposition attribute", function () {
            a.maxposition('-1 0');
            expect(a.maxposition() === '-1 0').toBe(true);
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
            var label = new Label('10 1 .2'),
                label2 = new Label('100 50 25');
            labels.position('1 1');
            label2.anchor('0 0');
            labels.label().add(label);
            labels.label().add(label2);
            a.labels(labels);
            expect(a.labels().position() === "1 1").toBe(true);
            expect(a.labels().label().at(0) === label).toBe(true);
            expect(a.labels().label().at(1) === label2).toBe(true);
        });

        it("should be able to set/get attributes of labels added to a Axis", function () {
            var label = new Label('20 10 2 1'),
                label2 = new Label('200 100');
            labels.label().add(label);
            labels.label().add(label2);
            a.labels(labels);
            a.labels().position("1 1").angle(40);
            a.labels().label().at(1).anchor("0 1").angle(14);
            expect(a.labels().position() === "1 1").toBe(true);
            expect(a.labels().angle()).toBe(40);
            expect(a.labels().label().at(0).spacing() === '20 10 2 1').toBe(true);
            expect(a.labels().label().at(1).spacing() === '200 100').toBe(true);
            expect(a.labels().label().at(1).anchor() === '0 1').toBe(true);
            expect(a.labels().label().at(1).angle()).toBe(14);
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
});
