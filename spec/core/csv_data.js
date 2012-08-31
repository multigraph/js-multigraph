/*global describe, it, beforeEach, expect, xit, jasmine */

describe("CSV Data", function () {
    var CSVData = window.multigraph.core.CSVData,
        DataVariable = window.multigraph.core.DataVariable,
        DataValue = window.multigraph.core.DataValue;


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

            csv = new CSVData([], "fixtures/csv_test1.csv");
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

            csv = new CSVData(dataVariables, "fixtures/csv_test2.csv");
        });


    });


});