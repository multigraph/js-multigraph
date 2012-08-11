/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Labeler", function () {
    "use strict";

    var Labeler = window.multigraph.core.Labeler,
        Point = window.multigraph.math.Point,
        Axis = window.multigraph.core.Axis,
        NumberFormatter = window.multigraph.core.NumberFormatter,
        DataValue = window.multigraph.core.DataValue,
        NumberValue = window.multigraph.core.NumberValue,
        NumberMeasure = window.multigraph.core.NumberMeasure,
        labeler;

    beforeEach(function () {
        labeler = new Labeler(new Axis(Axis.HORIZONTAL).type(DataValue.NUMBER));
    });

    it("should be able to create a Labeler", function () {
        expect(labeler instanceof Labeler).toBe(true);
    });

    describe("formatter attribute", function () {
        it("should be able to set/get the formatter attribute", function () {
            labeler.formatter(new NumberFormatter("%2d"));
            expect(labeler.formatter() instanceof NumberFormatter).toBe(true);
        });

    });

    describe("start attribute", function () {
        it("should be able to set/get the start attribute", function () {
            labeler.start(new NumberValue("7"));
            expect(labeler.start().getRealValue()).toBe("7");
        });

    });

    describe("angle attribute", function () {
        it("should be able to set/get the angle attribute", function () {
            labeler.angle(5);
            expect(labeler.angle()).toBe(5);
        });

    });

    describe("position attribute", function () {
        it("should be able to set/get the position attribute", function () {
            labeler.position(new Point(0,1));
            expect(labeler.position().x()).toEqual(0);
            expect(labeler.position().y()).toEqual(1);
        });

    });

    describe("anchor attribute", function () {
        it("should be able to set/get the anchor attribute", function () {
            labeler.anchor(new Point(-1,1));
            expect(labeler.anchor().x()).toEqual(-1);
            expect(labeler.anchor().y()).toEqual(1);
        });

    });

    describe("spacing attribute", function () {
        it("should be able to set/get the spacing attribute", function () {
            labeler.spacing(new NumberMeasure(10));
            expect(labeler.spacing().getRealValue()).toBe(10);
        });

    });

    describe("densityfactor attribute", function () {
        it("should be able to set/get the densityfactor attribute", function () {
            labeler.densityfactor(5);
            expect(labeler.densityfactor()).toEqual(5);
        });
    });


    describe("iteration", function () {

        it("next() should return undefined if called before prepare() is called", function() {
            expect(labeler.next()).toBeUndefined();
        });
        it("peekNext() should return undefined if called before prepare() is called", function() {
            expect(labeler.peekNext()).toBeUndefined();
        });
        it("hasNext() should return false if called before prepare() is called", function() {
            expect(labeler.hasNext()).toBe(false);
        });


        describe("iteration over NUMBER data values", function () {

            it("should iterate over exactly the one value 0 for the range [0,0] with start=0 and spacing=1", function() {
                labeler.spacing(new NumberMeasure(1));
                labeler.start(new NumberValue(0));
                labeler.prepare(new NumberValue(0), new NumberValue(0));
                expect(labeler.hasNext()).toBe(true);
                expect(labeler.peekNext().getRealValue()).toEqual(0);
                expect(labeler.next().getRealValue()).toEqual(0);
                expect(labeler.hasNext()).toBe(false);
            });


            it("should correctly iterate over the values 1,2,3 for the range [1,3] with start=0 and spacing=1", function () {
                labeler.spacing(new NumberMeasure(1));
                labeler.start(new NumberValue(0));
                labeler.prepare(new NumberValue(1), new NumberValue(3));

                expect(labeler.hasNext()).toBe(true);
                expect(labeler.peekNext().getRealValue()).toEqual(1);
                expect(labeler.next().getRealValue()).toEqual(1);

                expect(labeler.hasNext()).toBe(true);
                expect(labeler.peekNext().getRealValue()).toEqual(2);
                expect(labeler.next().getRealValue()).toEqual(2);

                expect(labeler.hasNext()).toBe(true);
                expect(labeler.peekNext().getRealValue()).toEqual(3);
                expect(labeler.next().getRealValue()).toEqual(3);

                expect(labeler.hasNext()).toBe(false);
            });

            it("should correctly iterate over the values -1, -0.5, 0, 0.5, 1.0 for the range [-1,1] with start=0 and spacing=0.5", function () {
                labeler.spacing(new NumberMeasure(0.5));
                labeler.start(new NumberValue(0));
                labeler.prepare(new NumberValue(-1), new NumberValue(1));

                expect(labeler.hasNext()).toBe(true);
                expect(labeler.peekNext().getRealValue()).toEqual(-1);
                expect(labeler.next().getRealValue()).toEqual(-1);

                expect(labeler.hasNext()).toBe(true);
                expect(labeler.peekNext().getRealValue()).toEqual(-0.5);
                expect(labeler.next().getRealValue()).toEqual(-0.5);

                expect(labeler.hasNext()).toBe(true);
                expect(labeler.peekNext().getRealValue()).toEqual(0.0);
                expect(labeler.next().getRealValue()).toEqual(0.0);

                expect(labeler.hasNext()).toBe(true);
                expect(labeler.peekNext().getRealValue()).toEqual(0.5);
                expect(labeler.next().getRealValue()).toEqual(0.5);

                expect(labeler.hasNext()).toBe(true);
                expect(labeler.peekNext().getRealValue()).toEqual(1.0);
                expect(labeler.next().getRealValue()).toEqual(1.0);

                expect(labeler.hasNext()).toBe(false);
            });

            it("should correctly iterate over the values 100, 100.25, 100.5, 100.75 for the range [100.0,100.9] with start=0.25 and spacing=0.25", function () {
                labeler.spacing(new NumberMeasure(0.25));
                labeler.start(new NumberValue(0.25));
                labeler.prepare(new NumberValue(100), new NumberValue(100.9));

                expect(labeler.hasNext()).toBe(true);
                expect(labeler.peekNext().getRealValue()).toEqual(100.0);
                expect(labeler.next().getRealValue()).toEqual(100.0);

                expect(labeler.hasNext()).toBe(true);
                expect(labeler.peekNext().getRealValue()).toEqual(100.25);
                expect(labeler.next().getRealValue()).toEqual(100.25);

                expect(labeler.hasNext()).toBe(true);
                expect(labeler.peekNext().getRealValue()).toEqual(100.5);
                expect(labeler.next().getRealValue()).toEqual(100.5);

                expect(labeler.hasNext()).toBe(true);
                expect(labeler.peekNext().getRealValue()).toEqual(100.75);
                expect(labeler.next().getRealValue()).toEqual(100.75);

                expect(labeler.hasNext()).toBe(false);
            });

            describe("behavior after iteration has completed", function() {
                beforeEach(function() {
                    labeler.spacing(new NumberMeasure(1));
                    labeler.start(new NumberValue(0));
                    labeler.prepare(new NumberValue(0), new NumberValue(0));
                    expect(labeler.hasNext()).toBe(true);
                    expect(labeler.peekNext().getRealValue()).toEqual(0);
                    expect(labeler.next().getRealValue()).toEqual(0);
                    expect(labeler.hasNext()).toBe(false);
                });
                it("hasNext() should return false", function() {
                    expect(labeler.hasNext()).toBe(false);
                });
                it("next() should return undefined", function() {
                    expect(labeler.next()).toBeUndefined();
                });
                it("peekNext() should return undefined", function() {
                    expect(labeler.peekNext()).toBeUndefined();
                });

            });

        });


    });

});
