/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Normalizer", function () {
    "use strict";

    var Axis = require('../../src/core/axis.js'),
        Title = require('../../src/core/axis_title.js'),
        Labeler = require('../../src/core/labeler.js'),
        NumberMeasure = require('../../src/core/number_measure.js'),
        DatetimeMeasure = require('../../src/core/datetime_measure.js'),
        DataValue = require('../../src/core/data_value.js'),
        Text = require('../../src/core/text.js'),
        haxis,
        vaxis;
    
    beforeEach(function () {
        //var NormalizerMixin = require('../../src/normalizer/normalizer_mixin.js');
        //NormalizerMixin.apply();
        haxis = (new Axis(Axis.HORIZONTAL)).id("x");
        vaxis = (new Axis(Axis.VERTICAL)).id("y");
    });

    describe("handling titles", function () {
            var htitle,
                vtitle;

        beforeEach(function () {
            htitle = new Title(haxis);
            vtitle = new Title(vaxis);
        });

        it("should set a title's content to the id of its axis if the title does not have a 'content' attribute", function () {
            haxis.title(htitle);
            haxis.normalize();
            expect(haxis.title().content().string()).toEqual("x");

            var text = new Text("foobar");
            vtitle.content(text);
            vaxis.title(vtitle);
            vaxis.normalize();
            expect(vaxis.title().content()).toBe(text);
        });

        it("should not insert a title if one exists", function () {
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

            haxis.type(DataValue.DATETIME);

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
