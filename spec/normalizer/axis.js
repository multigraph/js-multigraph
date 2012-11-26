/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Normalizer", function () {
    "use strict";

    var Axis = window.multigraph.core.Axis,
        Title = window.multigraph.core.AxisTitle,
        Labeler = window.multigraph.core.Labeler,
        NumberMeasure = window.multigraph.core.NumberMeasure,
        DatetimeMeasure = window.multigraph.core.DatetimeMeasure,
        haxis,
        vaxis;
    
    beforeEach(function () {
        window.multigraph.normalizer.mixin.apply(window.multigraph.core);
        haxis = (new Axis(Axis.HORIZONTAL)).id("x");
        vaxis = (new Axis(Axis.VERTICAL)).id("y");
    });

    describe("handling missing titles", function () {
        it("should insert a title if one does not exist", function () {
            expect(haxis.title()).toBe(undefined);
            expect(vaxis.title()).toBe(undefined);

            haxis.normalize();
            vaxis.normalize();

            expect(haxis.title()).not.toBe(undefined);
            expect(vaxis.title()).not.toBe(undefined);
            expect(haxis.title() instanceof Title).toBe(true);
            expect(vaxis.title() instanceof Title).toBe(true);
        });

        it("should insert a title with it's content being the id of the axis if a title does not exist", function () {
            expect(haxis.title()).toBe(undefined);
            expect(vaxis.title()).toBe(undefined);

            haxis.normalize();
            vaxis.normalize();

            expect(haxis.title().content().string()).toEqual("x");
            expect(vaxis.title().content().string()).toEqual("y");
        });

        it("should not insert a title if one exists", function () {
            var htitle = new Title(),
                vtitle = new Title();
    
            expect(haxis.title()).toBe(undefined);
            expect(vaxis.title()).toBe(undefined);

            haxis.title(htitle);
            vaxis.title(vtitle);

            expect(haxis.title()).toBe(htitle);
            expect(vaxis.title()).toBe(vtitle);
            expect(haxis.title() instanceof Title).toBe(true);
            expect(vaxis.title() instanceof Title).toBe(true);

            haxis.normalize();
            vaxis.normalize();

            expect(haxis.title()).toBe(htitle);
            expect(vaxis.title()).toBe(vtitle);
            expect(haxis.title() instanceof Title).toBe(true);
            expect(vaxis.title() instanceof Title).toBe(true);
        });

    });

    describe("handling missing labelers", function () {
        it("should insert labelers if they did not exist", function () {
            expect(haxis.labelers().size()).toEqual(0);
            expect(vaxis.labelers().size()).toEqual(0);

            haxis.normalize();
            vaxis.normalize();

            expect(haxis.labelers().size()).toBeGreaterThan(0);
            expect(vaxis.labelers().size()).toBeGreaterThan(0);
        });

        it("should not insert labelers if they did exist", function () {
            var hlabel1 = new Labeler(haxis),
                hlabel2 = new Labeler(haxis),
                vlabel1 = new Labeler(vaxis);

            expect(haxis.labelers().size()).toEqual(0);
            expect(vaxis.labelers().size()).toEqual(0);

            haxis.labelers().add(hlabel1);
            haxis.labelers().add(hlabel2);
            vaxis.labelers().add(vlabel1);

            expect(haxis.labelers().size()).toEqual(2);
            expect(vaxis.labelers().size()).toEqual(1);

            expect(haxis.labelers().at(0)).toEqual(hlabel1);
            expect(haxis.labelers().at(1)).toEqual(hlabel2);
            expect(vaxis.labelers().at(0)).toEqual(vlabel1);

            haxis.normalize();
            vaxis.normalize();

            expect(haxis.labelers().size()).toEqual(2);
            expect(vaxis.labelers().size()).toEqual(1);

            expect(haxis.labelers().at(0)).toEqual(hlabel1);
            expect(haxis.labelers().at(1)).toEqual(hlabel2);
            expect(vaxis.labelers().at(0)).toEqual(vlabel1);
        });

        it("should insert labels of the proper type", function () {
            var i;

            haxis.type(window.multigraph.core.DataValue.DATETIME);

            haxis.normalize();
            vaxis.normalize();

            for (i = 0; i < haxis.labelers().size(); i++) {
                expect(haxis.labelers().at(i).spacing() instanceof DatetimeMeasure).toBe(true);
            }

            for (i = 0; i < vaxis.labelers().size(); i++) {
                expect(vaxis.labelers().at(i).spacing() instanceof NumberMeasure).toBe(true);
            }
        });

    });

});
