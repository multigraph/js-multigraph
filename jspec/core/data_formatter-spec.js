/*global describe, it, beforeEach, expect, xit, jasmine */

describe("DataFormatter", function () {
    "use strict";

    var DataFormatter = require('../../src/core/data_formatter.js'),
        DataValue = require('../../src/core/data_value.js'),
        NumberFormatter = require('../../src/core/number_formatter.js');


    describe("isInstance() method", function () {
        it("should return true for a NumberFormatter instance", function () {
            var f = new NumberFormatter("%5.2f");
            expect(DataFormatter.isInstance(f)).toBe(true);
        });
    });

    describe("create() method", function () {
        it("should be able to create a NumberFormatter instance", function () {
            var f = DataFormatter.create(DataValue.NUMBER, "%5.2f");
            expect(f instanceof NumberFormatter).toBe(true);
            expect(DataFormatter.isInstance(f)).toBe(true);
        });
    });


});
