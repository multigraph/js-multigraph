/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data Normalizer", function () {
    "use strict";

    var Data = require('../../src/core/data.js'),
        ArrayData = require('../../src/core/array_data.js'),
        CSVData = require('../../src/core/csv_data.js'),
        WebServiceData = require('../../src/core/web_service_data.js'),
        DataVariable = require('../../src/core/data_variable.js'),
        DataValue = require('../../src/core/data_value.js'),
        NumberValue = require('../../src/core/number_value.js'),
        DatetimeValue = require('../../src/core/datetime_value.js'),
        variable1,
        variable2,
        variable3,
        variable4,
        variable5,
        data,
        valuesdata,
        csvdata,
        servicedata,
        row, numValueRow, col,
        rawData, numberValueData;


    var Axis = require('../../src/core/axis.js'),
        Title = require('../../src/core/axis_title.js'),
        Labeler = require('../../src/core/labeler.js'),
        NumberMeasure = require('../../src/core/number_measure.js'),
        DatetimeMeasure = require('../../src/core/datetime_measure.js'),
        haxis,
        vaxis;
    
    beforeEach(function () {
        var NormalizerMixin = require('../../src/normalizer/normalizer_mixin.js');
        NormalizerMixin.apply();
        variable1 = new DataVariable("ax", 0, DataValue.NUMBER);
        variable2 = new DataVariable("ay", 1, DataValue.NUMBER);
        variable3 = new DataVariable("ay1", 2, DataValue.NUMBER);
        variable4 = new DataVariable("ay2", 3, DataValue.NUMBER);
        variable5 = new DataVariable("ay3", 4, DataValue.NUMBER);
        haxis = (new Axis(Axis.HORIZONTAL)).id("x");
        vaxis = (new Axis(Axis.VERTICAL)).id("y");

        numberValueData = [];

        rawData = [[1900,-0.710738,-0.501011,-0.291284],
                   [1901,-0.709837,-0.488806,-0.267776],
                   [1902,-0.738885,-0.505620,-0.272355],
                   [1903,-0.822017,-0.591622,-0.361227],
                   [1904,-0.828376,-0.562089,-0.295802],
                   [1905,-0.748973,-0.544255,-0.339537],
                   [1906,-0.670167,-0.523723,-0.377279],
                   [1907,-0.717963,-0.510749,-0.303535],
                   [1908,-0.757014,-0.477469,-0.197924]];


        for (row = 0; row < rawData.length; ++row) {
            numValueRow = [];
            for (col = 0; col < rawData[row].length; ++col) {
                numValueRow.push(new NumberValue(rawData[row][col]));
            }
            numberValueData.push(numValueRow);
        }
    });

    it("should exist for each data type", function () {
        data = new Data();
        valuesdata = new ArrayData();
        csvdata = new CSVData();
        servicedata = new WebServiceData();

        expect(data.normalize).not.toBeUndefined();
        expect(typeof(data.normalize)).toEqual("function");
        expect(valuesdata.normalize).not.toBeUndefined();
        expect(typeof(valuesdata.normalize)).toEqual("function");
        expect(csvdata.normalize).not.toBeUndefined();
        expect(typeof(csvdata.normalize)).toEqual("function");
        expect(servicedata.normalize).not.toBeUndefined();
        expect(typeof(servicedata.normalize)).toEqual("function");
    });

    it("should throw an error if csv or web service data call it without any variables", function () {
        csvdata = new CSVData();
        servicedata = new WebServiceData();

        expect(function () {
            csvdata.normalize();
        //}).toThrowError("Data Normalization: Data gotten from csv and web service sources require variables to be specified in the mugl.");
        }).toThrow();

        expect(function () {
            servicedata.normalize();
        //}).toThrowError("Data Normalization: Data gotten from csv and web service sources require variables to be specified in the mugl.");
        }).toThrow();


        /*
         * NO - do not do this - do not create a CSVData() object by
         * referencing a made-up URL.  The CSVData() constructor
         * initiates a request to the given URL immediately, so the
         * code below causes a request to go out to
         * http://example.com.
         * 
        csvdata = new CSVData([variable1,variable2], "http://example.com");
        expect(function () {
            csvdata.normalize();
        }).not.toThrow("Data Normalization: Data gotten from csv and web service sources require variables to be specified in the mugl.");
         *
         */

        /*
         * It's OK to do it with a WebServiceData, though, as long as
         * you don't actually try to fetch any data from the object,
         * because WebServiceData doesn't actually initiate any
         * requests until data is fetched from it.
         */
        servicedata = new WebServiceData([variable1,variable2], "http://example.com");
        expect(function () {
            servicedata.normalize();
            //}).not.toThrowError("Data Normalization: Data gotten from csv and web service sources require variables to be specified in the mugl.");        
        }).not.toThrow();
    });

    describe("handling missing variables with 'values' tags", function () {
        it("should create a variable for each column that doen't have one", function () {
            valuesdata = new ArrayData([], numberValueData);
            expect(valuesdata.columns().size()).toEqual(0);
            valuesdata.normalize();
            expect(valuesdata.columns().size()).toEqual(4);

            valuesdata = new ArrayData([variable1, variable3], numberValueData);
            expect(valuesdata.columns().size()).toEqual(2);
            valuesdata.normalize();
            expect(valuesdata.columns().size()).toEqual(4);

        });

        it("should insert variables for each column which doen't have one in the correct location", function () {
            valuesdata = new ArrayData([], numberValueData);
            expect(valuesdata.columns().size()).toEqual(0);
            valuesdata.normalize();
            expect(valuesdata.columns().size()).toEqual(4);
            expect(valuesdata.columns().at(0).id()).toEqual("x");
            expect(valuesdata.columns().at(0).column()).toEqual(0);
            expect(valuesdata.columns().at(1).id()).toEqual("y");
            expect(valuesdata.columns().at(1).column()).toEqual(1);
            expect(valuesdata.columns().at(2).id()).toEqual("y1");
            expect(valuesdata.columns().at(2).column()).toEqual(2);
            expect(valuesdata.columns().at(3).id()).toEqual("y2");
            expect(valuesdata.columns().at(3).column()).toEqual(3);

            valuesdata = new ArrayData([variable1, variable3], numberValueData);
            expect(valuesdata.columns().size()).toEqual(2);
            expect(valuesdata.columns().at(0)).toBe(variable1);
            expect(valuesdata.columns().at(1)).toBe(variable3);
            valuesdata.normalize();
            expect(valuesdata.columns().size()).toEqual(4);
            expect(valuesdata.columns().at(0)).toBe(variable1);
            expect(valuesdata.columns().at(1).id()).toEqual("y");
            expect(valuesdata.columns().at(1).column()).toEqual(1);
            expect(valuesdata.columns().at(2)).toBe(variable3);
            expect(valuesdata.columns().at(3).id()).toEqual("y2");
            expect(valuesdata.columns().at(3).column()).toEqual(3);

        });

        it("should insert variables for each column which doen't have one in the correct location with the correct defaults", function () {
            valuesdata = new ArrayData([], numberValueData);
            expect(valuesdata.columns().size()).toEqual(0);
            valuesdata.normalize();
            expect(valuesdata.columns().size()).toEqual(4);
            expect(valuesdata.columns().at(0).id()).toEqual("x");
            expect(valuesdata.columns().at(0).column()).toEqual(0);
            expect(valuesdata.columns().at(1).id()).toEqual("y");
            expect(valuesdata.columns().at(1).column()).toEqual(1);
            expect(valuesdata.columns().at(2).id()).toEqual("y1");
            expect(valuesdata.columns().at(2).column()).toEqual(2);
            expect(valuesdata.columns().at(3).id()).toEqual("y2");
            expect(valuesdata.columns().at(3).column()).toEqual(3);

            valuesdata = new ArrayData([variable1, variable3], numberValueData);
            expect(valuesdata.columns().size()).toEqual(2);
            expect(valuesdata.columns().at(0)).toBe(variable1);
            expect(valuesdata.columns().at(1)).toBe(variable3);
            valuesdata.normalize();
            expect(valuesdata.columns().size()).toEqual(4);
            expect(valuesdata.columns().at(0)).toBe(variable1);
            expect(valuesdata.columns().at(1).id()).toEqual("y");
            expect(valuesdata.columns().at(1).column()).toEqual(1);
            expect(valuesdata.columns().at(2)).toBe(variable3);
            expect(valuesdata.columns().at(3).id()).toEqual("y2");
            expect(valuesdata.columns().at(3).column()).toEqual(3);

        });

    });

    describe("default values", function () {
        it("should insert the proper value for 'column'", function () {
            variable2 = new DataVariable("y");
            variable4 = new DataVariable("y2");

            data = new Data([variable1, variable2, variable3, variable4]);
            data.normalize();
            expect(data.columns().at(0).column()).toEqual(0);
            expect(data.columns().at(1).column()).toEqual(1);
            expect(data.columns().at(2).column()).toEqual(2);
            expect(data.columns().at(3).column()).toEqual(3);
            expect(data.columns().size()).toEqual(4);

            variable1 = new DataVariable("x");
            variable2 = new DataVariable("y");
            variable4 = new DataVariable("y2");
            data = new Data([variable5, variable4, variable2, variable3, variable1]);
            data.normalize();
            expect(data.columns().at(0).column()).toEqual(0);
            expect(data.columns().at(1).column()).toEqual(1);
            expect(data.columns().at(2).column()).toEqual(2);
            expect(data.columns().at(3).column()).toEqual(3);
            expect(data.columns().at(4).column()).toEqual(4);
            expect(data.columns().size()).toEqual(5);

        });

        it("should insert the proper value for 'type'", function () {
            variable1 = new DataVariable("ax", 0);
            variable2 = new DataVariable("ay", 1);
            variable3 = new DataVariable("y1", 2, DataValue.DATETIME);
            variable4 = new DataVariable("y2", 3, DataValue.DATETIME);

            data = new Data([variable1, variable2, variable3, variable4]);
            data.normalize();
            expect(data.columns().at(0).type()).toEqual(DataValue.NUMBER);
            expect(data.columns().at(1).type()).toEqual(DataValue.NUMBER);
            expect(data.columns().at(2).type()).toEqual(DataValue.DATETIME);
            expect(data.columns().at(3).type()).toEqual(DataValue.DATETIME);
            expect(data.columns().size()).toEqual(4);

        });

        it("should insert the proper value for 'missingvalue'", function () {
            var missingvalue = DataValue.parse(DataValue.NUMBER, 12);

            variable1 = new DataVariable("ax", 0);
            variable2 = new DataVariable("ay", 1);
            variable3 = new DataVariable("y1", 2, DataValue.DATETIME);
            variable4 = new DataVariable("y2", 3, DataValue.DATETIME);

            variable2.missingvalue(missingvalue);

            data = new Data([variable1, variable2, variable3, variable4]);
            expect(data.columns().at(0).missingvalue()).toBeUndefined();
            expect(data.columns().at(1).missingvalue()).toBe(missingvalue);
            expect(data.columns().at(2).missingvalue()).toBeUndefined();
            expect(data.columns().at(3).missingvalue()).toBeUndefined();
            data.normalize();
            expect(data.columns().at(0).missingvalue()).toBeUndefined();
            expect(data.columns().at(1).missingvalue()).toBe(missingvalue);
            expect(data.columns().at(2).missingvalue()).toBeUndefined();
            expect(data.columns().at(3).missingvalue()).toBeUndefined();
            expect(data.columns().size()).toEqual(4);

            data = new Data([variable1, variable2, variable3, variable4]);
            data.defaultMissingvalue("0");
            expect(data.columns().at(0).missingvalue()).toBeUndefined();
            expect(data.columns().at(1).missingvalue()).toBe(missingvalue);
            expect(data.columns().at(2).missingvalue()).toBeUndefined();
            expect(data.columns().at(3).missingvalue()).toBeUndefined();
            data.normalize();
            expect(data.columns().at(0).missingvalue()).not.toBeUndefined();
            expect(data.columns().at(0).missingvalue() instanceof NumberValue).toBe(true);
            expect(data.columns().at(0).missingvalue().getRealValue()).toBe(0);
            expect(data.columns().at(1).missingvalue()).toBe(missingvalue);
            expect(data.columns().at(2).missingvalue()).not.toBeUndefined();
            expect(data.columns().at(2).missingvalue() instanceof DatetimeValue).toBe(true);
            expect(data.columns().at(2).missingvalue().getRealValue()).toBe(0);
            expect(data.columns().at(3).missingvalue()).not.toBeUndefined();
            expect(data.columns().at(3).missingvalue() instanceof DatetimeValue).toBe(true);
            expect(data.columns().at(3).missingvalue().getRealValue()).toBe(0);
            expect(data.columns().size()).toEqual(4);

        });

        it("should insert the proper value for 'missingop'", function () {
            var missingop = DataValue.parseComparator("gt");

            variable1 = new DataVariable("ax", 0);
            variable2 = new DataVariable("ay", 1);
            variable3 = new DataVariable("y1", 2, DataValue.DATETIME);
            variable4 = new DataVariable("y2", 3, DataValue.DATETIME);

            variable2.missingop(missingop);

            data = new Data([variable1, variable2, variable3, variable4]);
            expect(data.columns().at(0).missingop()).toBeUndefined();
            expect(data.columns().at(1).missingop()).toBe(missingop);
            expect(data.columns().at(2).missingop()).toBeUndefined();
            expect(data.columns().at(3).missingop()).toBeUndefined();
            data.normalize();
            expect(data.columns().at(0).missingop()).toBe(DataValue.EQ);
            expect(data.columns().at(1).missingop()).toBe(missingop);
            expect(data.columns().at(2).missingop()).toBe(DataValue.EQ);
            expect(data.columns().at(3).missingop()).toBe(DataValue.EQ);
            expect(data.columns().size()).toEqual(4);

        });

    });

    describe("'csv' tags", function () {
        //mbp xyzzy
        xit("should create a variable for each column that doen't have one up to the last specified column. ie if columns 0, 1, and 3 are specified then a variable should be created for column 2", function () {
            csvdata = new CSVData([variable1, variable4], "../spec/core/fixtures/csv_test1.csv", function (e) { throw e; });
            expect(csvdata.columns().size()).toEqual(2);
            csvdata.normalize();
            expect(csvdata.columns().size()).toEqual(4);
        });

        //mbp xyzzy
        xit("should create a variable with the correct defaults for each column that doen't have one up to the last specified column", function () {
            csvdata = new CSVData([variable1, variable4], "../spec/core/fixtures/csv_test1.csv", function (e) { throw e; });
            expect(csvdata.columns().at(0)).toBe(variable1);
            expect(csvdata.columns().at(1)).toBe(variable4);
            csvdata.normalize();
            expect(csvdata.columns().at(0)).toBe(variable1);
            expect(csvdata.columns().at(1).id()).toEqual("y");
            expect(csvdata.columns().at(1).column()).toEqual(1);
            expect(csvdata.columns().at(2).id()).toEqual("y1");
            expect(csvdata.columns().at(2).column()).toEqual(2);
            expect(csvdata.columns().at(3)).toBe(variable4);
        });

        //mbp xyzzy
        xit("should properly sort the variables into column order", function () {
            csvdata = new CSVData([variable3, variable1, variable4, variable2], "../spec/core/fixtures/csv_test1.csv", function (e) { throw e; });
            expect(csvdata.columns().at(0)).toBe(variable3);
            expect(csvdata.columns().at(1)).toBe(variable1);
            expect(csvdata.columns().at(2)).toBe(variable4);
            expect(csvdata.columns().at(3)).toBe(variable2);
            csvdata.normalize();
            expect(csvdata.columns().at(0)).toBe(variable1);
            expect(csvdata.columns().at(1)).toBe(variable2);
            expect(csvdata.columns().at(2)).toBe(variable3);
            expect(csvdata.columns().at(3)).toBe(variable4);
        });

    });

    describe("'service' tags", function () {
        it("should create a variable for each column that doen't have one up to the last specified column. ie if columns 0, 1, and 3 are specified then a variable should be created for column 2", function () {
            servicedata = new WebServiceData([variable1, variable4], "http://www.example.com/foo/bar");
            expect(servicedata.columns().size()).toEqual(2);
            servicedata.normalize();
            expect(servicedata.columns().size()).toEqual(4);
        });

        it("should create a variable with the correct defaults for each column that doen't have one up to the last specified column", function () {
            servicedata = new WebServiceData([variable1, variable4], "http://www.example.com/foo/bar");
            expect(servicedata.columns().at(0)).toBe(variable1);
            expect(servicedata.columns().at(1)).toBe(variable4);
            servicedata.normalize();
            expect(servicedata.columns().at(0)).toBe(variable1);
            expect(servicedata.columns().at(1).id()).toEqual("y");
            expect(servicedata.columns().at(1).column()).toEqual(1);
            expect(servicedata.columns().at(2).id()).toEqual("y1");
            expect(servicedata.columns().at(2).column()).toEqual(2);
            expect(servicedata.columns().at(3)).toBe(variable4);
        });

        it("should properly sort the variables into column order", function () {
            servicedata = new WebServiceData([variable3, variable1, variable4, variable2], "http://www.example.com/foo/bar");
            expect(servicedata.columns().at(0)).toBe(variable3);
            expect(servicedata.columns().at(1)).toBe(variable1);
            expect(servicedata.columns().at(2)).toBe(variable4);
            expect(servicedata.columns().at(3)).toBe(variable2);
            servicedata.normalize();
            expect(servicedata.columns().at(0)).toBe(variable1);
            expect(servicedata.columns().at(1)).toBe(variable2);
            expect(servicedata.columns().at(2)).toBe(variable3);
            expect(servicedata.columns().at(3)).toBe(variable4);
        });

    });

});
