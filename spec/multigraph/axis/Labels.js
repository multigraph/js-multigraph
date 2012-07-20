/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Labels", function () {
    "use strict";

    var Labels = window.multigraph.Axis.Labels,
        Point = window.multigraph.math.Point,
        l;

    beforeEach(function () {
        l = new Labels();
    }); 

    it("should be able to create a Labels", function () {
        expect(l instanceof Labels).toBe(true);
    });

    describe("format attribute", function () {
        it("should be able to set/get the format attribute", function () {
            l.format('%2d');
            expect(l.format() === '%2d').toBe(true);
        });

    });

    describe("start attribute", function () {
        it("should be able to set/get the start attribute", function () {
            l.start('7');
            expect(l.start() === '7').toBe(true);
        });

    });

    describe("angle attribute", function () {
        it("should be able to set/get the angle attribute", function () {
            l.angle(5);
            expect(l.angle()).toBe(5);
        });

    });

    describe("position attribute", function () {
        it("should be able to set/get the position attribute", function () {
            l.position('0 1');
            expect(l.position() === '0 1').toBe(true);
        });

    });

    describe("anchor attribute", function () {
        it("should be able to set/get the anchor attribute", function () {
            l.anchor('-1 1');
            expect(l.anchor() === '-1 1').toBe(true);
        });

    });

    describe("spacing attribute", function () {
        it("should be able to set/get the spacing attribute", function () {
            l.spacing('10 5 3 2 1 .1 .01');
            expect(l.spacing() === '10 5 3 2 1 .1 .01').toBe(true);
        });

    });

    describe("function attribute", function () {
        it("should be able to set/get the function attribute", function () {
            l['function']('fred');
            expect(l['function']() === 'fred').toBe(true);
        });

    });

    describe("densityfactor attribute", function () {
        it("should be able to set/get the densityfactor attribute", function () {
            l.densityfactor('5');
            expect(l.densityfactor() === '5').toBe(true);
        });

    });

    describe("Label", function () {
        var Label = window.multigraph.Axis.Labels.Label,
            label;

        beforeEach(function () {
            label = new Label("10 5 1");
        });

        it("should be able to add a Label to a Labels", function () {
            l.label().add(label);
            expect(l.label().at(0) === label).toBe(true);
        });

        it("should be able to add many Label tags to a Labels tag", function () {
            var label2 = new Label("10 5 1"),
                label3 = new Label("10 5 1");
            l.label().add(label);
            l.label().add(label2);
            l.label().add(label3);
            expect(l.label().at(0) === label).toBe(true);
            expect(l.label().at(1) === label2).toBe(true);
            expect(l.label().at(2) === label3).toBe(true);
        });

        it("should be able to add a Label with attributes to a Labels", function () {
            label.spacing("10 5 1");
            label.position(new Point(1,0));
            l.label().add(label);
            expect(l.label().at(0) === label).toBe(true);
        });

        it("should be able to add many Label tags with attributes to a Labels tag", function () {
            var label2 = new Label("10 5 1"),
                label3 = new Label("10 5 1");
            label.spacing("100 10 5 1").position(new Point(1,0));
            label2.spacing("10 5 1").angle(-7).anchor(new Point(1,1));
            label3.spacing("10 5 1").position(new Point(0,0));
            l.label().add(label);
            l.label().add(label2);
            l.label().add(label3);
            expect(l.label().at(0) === label).toBe(true);
            expect(l.label().at(1) === label2).toBe(true);
            expect(l.label().at(2) === label3).toBe(true);
        });

        it("should be able to set/get attributes of an Label added to a Labels", function () {
            var label2 = new Label("10 5 1"),
                label3 = new Label("10 5 1");
            label.spacing("100 10 5 1").position(new Point(1,0));
            label2.spacing("10 5 1").angle(-7).anchor(new Point(1,1));
            label3.spacing("10 5 1").position(new Point(0,0));
            l.label().add(label);
            l.label().add(label2);
            l.label().add(label3);
            expect(l.label().at(0).spacing() === "100 10 5 1").toBe(true);
            expect(l.label().at(1).angle()).toBe(-7);
            l.label().at(1).angle(24);
            expect(l.label().at(1).angle()).toBe(24);
        });

    });


});
