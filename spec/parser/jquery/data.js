/*global describe, it, beforeEach, expect, xit, jasmine, waitsFor, runs */
/*jshint  laxbreak:true */

describe("NEW Data parsing", function () {
    "use strict";

    var Data = window.multigraph.core.Data,
        ArrayData = window.multigraph.core.ArrayData,
        CSVData = window.multigraph.core.CSVData,
        NumberValue = window.multigraph.core.NumberValue,
        DataValue = window.multigraph.core.DataValue;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        window.multigraph.normalizer.mixin.apply(window.multigraph.core);
    });

    it("Data model should have a parseXML method", function () {
        expect(typeof(Data.parseXML)).toBe("function");
    });

    describe("ArrayData -- <data> with <values> section", function () {

        var xmlString = ''
                + '<data>'
                +   '<variables>'
                +     '<variable id="x" column="0" type="number" missingop="eq"/>'
                +     '<variable id="y" column="1" type="number" missingop="eq"/>'
                +   '</variables>'
                +   '<values>'
                +     '3,4\n'
                +     '5,6'
                +   '</values>'
                + '</data>',
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString),
            data;

        beforeEach(function () {
            data = Data.parseXML($xml);
            data.normalize()
        });

        it("parser should return an ArrayData instance", function () {
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data instanceof ArrayData).toBe(true);
        });

        it("data columns should be correctly set up", function () {
            expect(data.columns().size()).toBe(2);
            expect(data.columns().at(0).id()).toBe("x");
            expect(data.columns().at(0).type()).toBe(DataValue.NUMBER);
            expect(data.columns().at(1).id()).toBe("y");
            expect(data.columns().at(1).type()).toBe(DataValue.NUMBER);
        });

        it("getIterator() method should return an interator that behaves correctly", function () {
            var iter = data.getIterator(["x","y"], new NumberValue(3), new NumberValue(5));
            expect(iter).not.toBeUndefined();
            expect(iter.hasNext()).toBe(true);
            var values = iter.next();
            expect(values).not.toBeUndefined();
            expect(values.length).toBe(2);
            expect(values[0].getRealValue()).toBe(3);
            expect(values[1].getRealValue()).toBe(4);
            expect(iter.hasNext()).toBe(true);
            values = iter.next();
            expect(values).not.toBeUndefined();
            expect(values.length).toBe(2);
            expect(values[0].getRealValue()).toBe(5);
            expect(values[1].getRealValue()).toBe(6);
            expect(iter.hasNext()).toBe(false);
        });

        it("serialize method should return the original xml string", function () {
            expect(data.serialize()).toEqual(xmlString);
        });

    });

    describe("CSVData -- <data> with <csv> section", function () {

        var xmlString = ''
                + '<data>'
                +   '<variables>'
                +     '<variable id="x" column="0" type="number"/>'
                +     '<variable id="y" column="1" type="number"/>'
                +   '</variables>'
                +   '<csv location="parser/jquery/fixtures/test1.csv"/>'
                + '</data>',
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString),
            data;

        beforeEach(function () {
            data = Data.parseXML($xml);
        });

        it("parser should return a CSVData instance", function () {
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data instanceof ArrayData).toBe(true);
            expect(data instanceof CSVData).toBe(true);
        });

        it("filename attribute should be correctly set", function () {
            expect(data.filename()).toBe('parser/jquery/fixtures/test1.csv');
        });

        it("data columns should be correctly set up", function () {
            expect(data.columns().size()).toBe(2);
            expect(data.columns().at(0).id()).toBe("x");
            expect(data.columns().at(0).type()).toBe(DataValue.NUMBER);
            expect(data.columns().at(1).id()).toBe("y");
            expect(data.columns().at(1).type()).toBe(DataValue.NUMBER);
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
                expect(values.length).toBe(2);
                expect(values[0].getRealValue()).toBe(10);
                expect(values[1].getRealValue()).toBe(11);
                expect(iter.hasNext()).toBe(true);
                values = iter.next();
                expect(values).not.toBeUndefined();
                expect(values.length).toBe(2);
                expect(values[0].getRealValue()).toBe(12);
                expect(values[1].getRealValue()).toBe(13);
                expect(iter.hasNext()).toBe(false);
            });
        });

        it("serialize method should return the original xml string", function () {
            waitsFor(function () {
                return data.dataIsReady();
            });
            runs(function () {
                expect(data.serialize()).toEqual(xmlString);
            });
        });

    });

});
