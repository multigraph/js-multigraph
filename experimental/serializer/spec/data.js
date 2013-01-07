/*global describe, it, beforeEach, expect, xit, xdescribe, jasmine, waitsFor, runs */
/*jshint  laxbreak:true */

describe("Data Serialization", function () {
    "use strict";

    var Data = window.multigraph.core.Data,
        ArrayData = window.multigraph.core.ArrayData,
        CSVData = window.multigraph.core.CSVData,
        WebServiceData = window.multigraph.core.WebServiceData,
        DataVariable = window.multigraph.core.DataVariable,
        DataValue = window.multigraph.core.DataValue,
        xmlString,
        data;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    describe("with ArrayData models -- i.e. <data> with <values> tag --", function () {

        var variables = [];

        it("should properly serialize data models", function () {
            xmlString = ''
                + '<data>'
                +   '<variables>'
                +     '<variable id="x" column="0" type="number" missingop="eq"/>'
                +     '<variable id="y" column="1" type="number"/>'
                +   '</variables>'
                +   '<values>'
                +     '3,4\n'
                +     '5,6'
                +   '</values>'
                + '</data>';

            variables.push(new DataVariable("x"));
            variables[0].column(0);
            variables[0].type("number");
            variables[0].missingop(DataValue.parseComparator("eq"));

            variables.push(new DataVariable("y"));
            variables[1].column(1);
            variables[1].type("number");

            data = new ArrayData(variables, [["3", "4"], ["5", "6"]]);
            data.stringArray([]);
            data.array([
                [DataValue.parse("number", "3"), DataValue.parse("number", "4")],
                [DataValue.parse("number", "5"), DataValue.parse("number", "6")]
            ]);

            expect(data.serialize()).toEqual(xmlString);
        });

    });

    describe("with CSVData models -- i.e. <data> with <csv> tag --", function () {

        var variables = [];

        it("should properly serialize data models", function () {
            xmlString = ''
                + '<data>'
                +   '<variables>'
                +     '<variable id="x" column="0" type="number"/>'
                +     '<variable id="y" column="1" type="number"/>'
                +   '</variables>'
                +   '<csv location="parser/jquery/fixtures/test1.csv"/>'
                + '</data>';

            variables.push(new DataVariable("x"));
            variables[0].column(0);
            variables[0].type("number");

            variables.push(new DataVariable("y"));
            variables[1].column(1);
            variables[1].type("number");

            data = new CSVData(variables, "parser/jquery/fixtures/test1.csv");

            waitsFor(function () {
                return data.dataIsReady();
            });
            runs(function () {
                expect(data.serialize()).toEqual(xmlString);
            });

        });

    });

    xdescribe("with WebServiceData models -- i.e. <data> with <service> tag --", function () {
        // TODO : implement a test for this
    });

});
