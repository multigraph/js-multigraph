/*global describe, it, beforeEach, expect, xit, jasmine */

describe("AxisBinding", function () {
    "use strict";

    var AxisBinding = require('../../src/core/axis_binding.js'),
        Axis = require('../../src/core/axis.js'),
        DataValue = require('../../src/core/data_value.js'),
        NumberValue = require('../../src/core/number_value.js'),
        binding;

    beforeEach(function () {
        binding = new AxisBinding("myBinding");
    });

    it("should be able to create a AxisBinding", function () {
        expect(binding instanceof AxisBinding).toBe(true);
    });

    describe("id attribute", function () {
        it("should be able to set/get the id attribute", function () {
            binding.id("newId");
            expect(binding.id()).toBe("newId");
        });

    });

    describe("AxisBinding.findByIdOrCreateNew", function() {

        var newBinding = AxisBinding.findByIdOrCreateNew("newBinding"),
            newBinding2,
            newBinding3;

        it("should create a new AxisBinding", function() {
            expect(newBinding).not.toBeUndefined();
            expect(newBinding instanceof AxisBinding).toBe(true);
        });

        it("should return the same AxisBinding when invoked with the same id", function() {
            newBinding2 = AxisBinding.findByIdOrCreateNew("newBinding");
            expect(newBinding2).not.toBeUndefined();
            expect(newBinding2 instanceof AxisBinding).toBe(true);
            expect(newBinding2).toEqual(newBinding);
        });

        it("should return a different new AxisBinding when invoked with a different id", function() {
            newBinding3 = AxisBinding.findByIdOrCreateNew("newBinding3");
            expect(newBinding3).not.toBeUndefined();
            expect(newBinding3 instanceof AxisBinding).toBe(true);
            expect(newBinding3).not.toEqual(newBinding);
        });
    });


    describe("binding of axes", function() {
        var a,b;

        beforeEach(function() {
            a = new Axis(Axis.VERTICAL).type(DataValue.NUMBER);
            b = new Axis(Axis.VERTICAL).type(DataValue.NUMBER);
        });

        it("axes realted by a factor of 10", function() {
            binding.addAxis(a, new NumberValue(0), new NumberValue(10));
            binding.addAxis(b, new NumberValue(0), new NumberValue(100));

            a.setDataRange(new NumberValue(0), new NumberValue(10));
            expect(b.dataMin().getRealValue()).toEqual(0);
            expect(b.dataMax().getRealValue()).toEqual(100);

            b.setDataRange(new NumberValue(10), new NumberValue(50));
            expect(a.dataMin().getRealValue()).toEqual(1);
            expect(a.dataMax().getRealValue()).toEqual(5);
        });


        it("celsius/fahrenheit temperature axes", function() {
            binding.addAxis(a, new NumberValue(32), new NumberValue(212));
            binding.addAxis(b, new NumberValue(0), new NumberValue(100));

            a.setDataRange(new NumberValue(32), new NumberValue(212));
            expect(b.dataMin().getRealValue()).toEqual(0);
            expect(b.dataMax().getRealValue()).toEqual(100);

            b.setDataRange(new NumberValue(0), new NumberValue(100));
            expect(a.dataMin().getRealValue()).toEqual(32);
            expect(a.dataMax().getRealValue()).toEqual(212);

            a.setDataRange(new NumberValue(-40), new NumberValue(73));
            expect(b.dataMin().getRealValue()).toEqual(-40);
        });

        it("using a binding obtained from AxisBinding.findByIdOrCreateNew to bind axes", function() {
            AxisBinding.findByIdOrCreateNew("ourBinding").addAxis(a, new NumberValue(0), new NumberValue(10));
            AxisBinding.findByIdOrCreateNew("ourBinding").addAxis(b, new NumberValue(0), new NumberValue(100));

            a.setDataRange(new NumberValue(0), new NumberValue(10));
            expect(b.dataMin().getRealValue()).toEqual(0);
            expect(b.dataMax().getRealValue()).toEqual(100);

            b.setDataRange(new NumberValue(10), new NumberValue(50));
            expect(a.dataMin().getRealValue()).toEqual(1);
            expect(a.dataMax().getRealValue()).toEqual(5);
        });

    });

});
