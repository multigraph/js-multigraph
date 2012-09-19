/*global describe, it, beforeEach, expect, xit, jasmine, waitsFor, runs */

describe("CSV Data hoo", function () {
    "use strict";
    var CSVData = window.multigraph.core.CSVData,
        NumberValue = window.multigraph.core.NumberValue,
        DataVariable = window.multigraph.core.DataVariable,
        DataValue = window.multigraph.core.DataValue,
        testArrayData;

    describe("constructor", function () {
        var csv;

        beforeEach(function () {
            csv = new CSVData();
        });

        it("should not be undefined", function () {
            expect(CSVData).not.toBeUndefined();
        });

        it("should have ArrayData methods", function () {
            expect(typeof(csv.onReady)).toBe("function");
            expect(typeof(csv.getIterator)).toBe("function");
        });

        it("should have a filename", function () {
            expect(typeof(csv.filename)).toBe("function");
        });

        it("should do an async request to get the csv file", function () {
            var spy = jasmine.createSpy();

            csv = new CSVData([], "core/fixtures/csv_test1.csv");
            csv.onReady(spy);

            waitsFor(function () {
                return csv.dataIsReady();
            });

            runs(function () {
                expect(spy).toHaveBeenCalled();
            });
        });

        it("should correctly create the data", function () {
            var spy = jasmine.createSpy(),
            dataVariables = [new DataVariable("column1", 0, DataValue.NUMBER),
                             new DataVariable("column2", 1, DataValue.NUMBER),
                             new DataVariable("column3", 2, DataValue.NUMBER),
                             new DataVariable("column4", 3, DataValue.NUMBER)
                            ];

            csv = new CSVData(dataVariables, "core/fixtures/csv_test1.csv");
        });


    });


    describe("getIterator method", function () {
        var dataVariables,
            csv;

        beforeEach(function () {
            dataVariables = [new DataVariable("column1", 0, DataValue.NUMBER),
                             new DataVariable("column2", 1, DataValue.NUMBER),
                             new DataVariable("column3", 2, DataValue.NUMBER),
                             new DataVariable("column4", 3, DataValue.NUMBER)
                            ];
            csv = new CSVData(dataVariables, "core/fixtures/csv_test1.csv");
        });

        it("should exist", function () {
            expect(typeof(csv.getIterator)).toBe("function");
        });

        it("does the right thing", function () {

            waitsFor(function () {
                return csv.dataIsReady();
            });

            runs(function () {
                var row,
                    iter = csv.getIterator(['column1', 'column2', 'column3', 'column4'],
                                           new NumberValue(1903), new NumberValue(1905));

                expect(iter.hasNext()).toBe(true);
                row = iter.next();
                expect(row[0] instanceof NumberValue).toBe(true);
                expect(row[0].getRealValue()).toBe(1903);
                expect(row[1].getRealValue()).toBe(-0.822017);
                expect(row[2].getRealValue()).toBe(-0.591622);
                expect(iter.hasNext()).toBe(true);
                row = iter.next();
                expect(row[0].getRealValue()).toBe(1904);
                expect(iter.hasNext()).toBe(true);
                row = iter.next();
                expect(row[0].getRealValue()).toBe(1905);
                expect(iter.hasNext()).toBe(false);
            });

        });

    });

});
