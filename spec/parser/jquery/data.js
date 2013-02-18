/*global describe, it, beforeEach, expect, xit, jasmine, waitsFor, runs */
/*jshint  laxbreak:true */

describe("Data parsing", function () {
    "use strict";

    var Data = window.multigraph.core.Data,
        ArrayData = window.multigraph.core.ArrayData,
        PeriodicArrayData = window.multigraph.core.PeriodicArrayData,
        CSVData = window.multigraph.core.CSVData,
        DataVariable = window.multigraph.core.DataVariable,
        NumberValue = window.multigraph.core.NumberValue,
        DataValue = window.multigraph.core.DataValue,
        xmlString,
        $xml,
        data;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML");
    });

    it("Data model should have a parseXML method", function () {
        expect(typeof(Data.parseXML)).toBe("function");
    });

    describe("ArrayData -- <data> with <values> section", function () {

        var variable1IdString = "x",
            variable1ColumnString = "0",
            variable1TypeString = "number",
            variable2IdString = "y",
            variable2ColumnString = "1",
            variable2TypeString = "number",
            valuesString = ""
                + "3,4\n"
                + "5,6";

        beforeEach(function () {
            xmlString = ''
                + '<data>'
                +   '<variables>'
                +     '<variable'
                +         ' id="' + variable1IdString + '"'
                +         ' column="' + variable1ColumnString + '"'
                +         ' type="' + variable1TypeString + '"'
                +         '/>'
                +     '<variable'
                +         ' id="' + variable2IdString + '"'
                +         ' column="' + variable2ColumnString + '"'
                +         ' type="' + variable2TypeString + '"'
                +         '/>'
                +   '</variables>'
                +   '<values>'
                +     valuesString
                +   '</values>'
                + '</data>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            data = Data.parseXML($xml);
        });

        it("parser should return an ArrayData instance", function () {
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data instanceof ArrayData).toBe(true);
        });

        it("data columns should be correctly set up", function () {
            expect(data.columns().size()).toEqual(2);
            expect(data.columns().at(0) instanceof DataVariable).toBe(true);
            expect(data.columns().at(0).id()).toEqual(variable1IdString);
            expect(data.columns().at(0).type()).toEqual(DataValue.parseType(variable1TypeString));
            expect(data.columns().at(1) instanceof DataVariable).toBe(true);
            expect(data.columns().at(1).id()).toEqual(variable2IdString);
            expect(data.columns().at(1).type()).toEqual(DataValue.parseType(variable2TypeString));
        });

        it("stringArray should be correctly set up", function () {
            expect(data.stringArray()).not.toBeUndefined();
            expect(data.stringArray().length).toEqual(valuesString.match(/\n/g).length + 1);
            expect(data.stringArray().join("\n")).toEqual(valuesString);
            
        });

        // TODO : move this spec onto core or normalizer
        xit("getIterator() method should return an interator that behaves correctly", function () {
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

        beforeEach(function () {
            xmlString = ''
                + '<data>'
                +   '<variables>'
                +     '<variable id="time" column="0" type="datetime"/>'
                +     '<variable id="temp" column="1" type="number"/>'
                +   '</variables>'
                +   '<repeat period="1Y"/>'
                +   '<values>'
                +     '2010-01-01,1'
                +     '2010-05-01,5'
                +     '2010-10-01,10'
                +   '</values>'
                + '</data>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            data = Data.parseXML($xml);
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

        var variable1IdString = "x",
            variable1ColumnString = "0",
            variable1TypeString = "number",
            variable2IdString = "y",
            variable2ColumnString = "1",
            variable2TypeString = "number",
            locationString = "parser/jquery/fixtures/test1.csv";

        beforeEach(function () {
            xmlString = ''
                + '<data>'
                +   '<variables>'
                +     '<variable'
                +         ' id="' + variable1IdString + '"'
                +         ' column="' + variable1ColumnString + '"'
                +         ' type="' + variable1TypeString + '"'
                +         '/>'
                +     '<variable'
                +         ' id="' + variable2IdString + '"'
                +         ' column="' + variable2ColumnString + '"'
                +         ' type="' + variable2TypeString + '"'
                +         '/>'
                +   '</variables>'
                +   '<csv'
                +       ' location="' + locationString + '"'
                +       '/>'
                + '</data>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            data = Data.parseXML($xml);
        });

        it("parser should return a CSVData instance", function () {
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data instanceof ArrayData).toBe(true);
            expect(data instanceof CSVData).toBe(true);
        });

        it("filename attribute should be correctly set", function () {
            expect(data.filename()).toEqual(locationString);
        });

        it("data columns should be correctly set up", function () {
            expect(data.columns().size()).toEqual(2);
            expect(data.columns().at(0) instanceof DataVariable).toBe(true);
            expect(data.columns().at(0).id()).toEqual(variable1IdString);
            expect(data.columns().at(0).type()).toEqual(DataValue.parseType(variable1TypeString));
            expect(data.columns().at(1) instanceof DataVariable).toBe(true);
            expect(data.columns().at(1).id()).toEqual(variable2IdString);
            expect(data.columns().at(1).type()).toEqual(DataValue.parseType(variable2TypeString));
        });

        it("getIterator() method should return an interator that behaves correctly", function () {
            waitsFor(function () {
                return data.dataIsReady();
            });
            runs(function () {
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

});
