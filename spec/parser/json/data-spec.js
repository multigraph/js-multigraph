/*global describe, it, beforeEach, expect, xit, jasmine, waitsFor, runs */
/*jshint  laxbreak:true */


describe("Data JSON parsing", function () {
    "use strict";

    var Data = require('../../../src/core/data.js'),
        ArrayData = require('../../../src/core/array_data.js'),
        PeriodicArrayData = require('../../../src/core/periodic_array_data.js'),
        DataVariable = require('../../../src/core/data_variable.js'),
        NumberValue = require('../../../src/core/number_value.js'),
        DataValue = require('../../../src/core/data_value.js'),
        DatetimeValue = require('../../../src/core/datetime_value.js'),
        vF = require('../../../src/util/validationFunctions.js'),
        sprintf = require('sprintf'),
        CSVData,
        Multigraph,
        data;

    // returns true iff a and b are two (possibly nested) arrays with exactly
    // the same structure and same values
    function nested_arrays_equal(a, b) {
        if (vF.typeOf(a) === 'array' && vF.typeOf(b) === 'array') {
            if (a.length != b.length) { return false; }
            var i;
            for (i=0; i<a.length; ++i) {
                if (!nested_arrays_equal(a[i], b[i])) { return false; }
            }
            return true;
        } else {
            return a === b;
        }
    }

    var NodeJQueryHelper = require('../../node_jquery_helper.js');
    var $, jqw = NodeJQueryHelper.createJQuery();
    beforeEach(function() { $ = jqw.$; });

    beforeEach(function () {
        require('../../../src/parser/json/data.js')($);
        CSVData = require('../../../src/core/csv_data.js')($);
        Multigraph = require('../../../src/core/multigraph.js')($);
    });


    it("Data model should have a parseJSON method", function () {
        expect(typeof(Data.parseJSON)).toBe("function");
    });

    describe("ArrayData -- <data> with <values> section", function () {

        var variable1Id = "x",
            variable1Column = 0,
            variable1Type = "number",
            variable2Id = "y",
            variable2Column = 1,
            variable2Type = "number",
            values = [
                [3,4],
                [5,6]
            ],
            json;

        beforeEach(function () {
            json = {
                "variables" : [
                    { "id" : variable1Id, "column" : variable1Column, "type" : variable1Type },
                    { "id" : variable2Id, "column" : variable2Column, "type" : variable2Type }
                ],
                "values" : values
            };
            data = Data.parseJSON(json);
            //data.normalize();
        });

        it("parser should return an ArrayData instance", function () {
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data instanceof ArrayData).toBe(true);
        });

        it("data columns should be correctly set up", function () {
            expect(data.columns().size()).toEqual(2);
            expect(data.columns().at(0) instanceof DataVariable).toBe(true);
            expect(data.columns().at(0).id()).toEqual(variable1Id);
            expect(data.columns().at(0).type()).toEqual(DataValue.parseType(variable1Type));
            expect(data.columns().at(1) instanceof DataVariable).toBe(true);
            expect(data.columns().at(1).id()).toEqual(variable2Id);
            expect(data.columns().at(1).type()).toEqual(DataValue.parseType(variable2Type));
        });

        it("stringArray should be correctly set up", function () {
            expect(data.stringArray()).not.toBeUndefined();
            expect(data.stringArray().length).toEqual(values.length);
            expect(nested_arrays_equal(data.stringArray(), values));
            
        });

        // TODO : move this spec onto core or normalizer
        it("getIterator() method should return an interator that behaves correctly", function () {
            data.normalize();
            var iter = data.getIterator(["x","y"], new NumberValue(3), new NumberValue(5));
            expect(iter).not.toBeUndefined();
            expect(iter.hasNext()).toBe(true);
            var values = iter.next();
            expect(values).not.toBeUndefined();
            expect(values.length).toEqual(2);
            expect(values[0].getRealValue()).toEqual(3);
            expect(values[1].getRealValue()).toEqual(4);
            expect(iter.hasNext()).toBe(true);
            values = iter.next();
            expect(values).not.toBeUndefined();
            expect(values.length).toEqual(2);
            expect(values[0].getRealValue()).toEqual(5);
            expect(values[1].getRealValue()).toEqual(6);
            expect(iter.hasNext()).toBe(false);
        });

    });


     describe("PeriodicArrayData -- <data> with <repeat> and <values> section", function () {
         var json;

        beforeEach(function () {
            json = {
                "variables": [
                  { "id": "time", "column": 0, "type" : "datetime" },
                  { "id": "temp", "column": 1, "type" : "number" }
                ],
                "repeat" : { "period" : "1Y" },
                "values" : [
                    ['2010-01-01',1],
                    ['2010-05-01',5],
                    ['2010-10-01',10]
                ]
            };
            data = Data.parseJSON(json);
        });

        it("parser should return an PeriodicArrayData instance", function () {
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data instanceof ArrayData).toBe(true);
            expect(data instanceof PeriodicArrayData).toBe(true);
        });

        it("the period should be correct", function () {
            expect(data.period().getRealValue()).toEqual(31536000000);
        });

    });


    describe("CSVData -- <data> with <csv> section", function () {

        var variable1Id = "x",
            variable1Column = 0,
            variable1Type = "number",
            variable2Id = "y",
            variable2Column = 1,
            variable2Type = "number",
            location = NodeJQueryHelper.localFileURL(__dirname, "/fixtures/test1.csv"),
            json;

        beforeEach(function (done) {
            json = {
                "variables" : [
                    { "id" : variable1Id, "column" : variable1Column, "type" : variable1Type },
                    { "id" : variable2Id, "column" : variable2Column, "type" : variable2Type }
                ],
                "csv" : location
            };
            data = Data.parseJSON(json);
            data.addListener('dataReady', function() {
                done();
            });
        });

        it("parser should return a CSVData instance", function () {
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data instanceof ArrayData).toBe(true);
            expect(data instanceof CSVData).toBe(true);
        });

        it("filename attribute should be correctly set", function () {
            expect(data.filename()).toEqual(location);
        });

        it("data columns should be correctly set up", function () {
            expect(data.columns().size()).toEqual(2);
            expect(data.columns().at(0) instanceof DataVariable).toBe(true);
            expect(data.columns().at(0).id()).toEqual(variable1Id);
            expect(data.columns().at(0).type()).toEqual(DataValue.parseType(variable1Type));
            expect(data.columns().at(1) instanceof DataVariable).toBe(true);
            expect(data.columns().at(1).id()).toEqual(variable2Id);
            expect(data.columns().at(1).type()).toEqual(DataValue.parseType(variable2Type));
        });

        it("getIterator() method should return an interator that behaves correctly", function () {
            var iter = data.getIterator(["x","y"], new NumberValue(10), new NumberValue(12));
            expect(iter).not.toBeUndefined();
            expect(iter.hasNext()).toBe(true);
            var values = iter.next();
            expect(values).not.toBeUndefined();
            expect(values.length).toEqual(2);
            expect(values[0].getRealValue()).toEqual(10);
            expect(values[1].getRealValue()).toEqual(11);
            expect(iter.hasNext()).toBe(true);
            values = iter.next();
            expect(values).not.toBeUndefined();
            expect(values.length).toEqual(2);
            expect(values[0].getRealValue()).toEqual(12);
            expect(values[1].getRealValue()).toEqual(13);
            expect(iter.hasNext()).toBe(false);
        });

    });

});
