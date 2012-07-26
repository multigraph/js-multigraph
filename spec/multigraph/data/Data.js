/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data", function () {
    "use strict";

    var Data = window.multigraph.Data,
        DataValue = window.multigraph.DataValue,
        NumberValue = window.multigraph.NumberValue,
        CSV = window.multigraph.Data.CSV,
        Service = window.multigraph.Data.Service,
        Values = window.multigraph.Data.Values,
        Variables = window.multigraph.Data.Variables,
        Variable = window.multigraph.Data.Variables.Variable,
        d;

    beforeEach(function () {
        d = new Data();
    });

    it("should be able to create an Data", function () {
        expect(d instanceof Data).toBe(true);
    });


    describe("Values", function () {
        var values;

        beforeEach(function () {
            values = new Values();
        });

        it("should be able to add a Values to a Data", function () {
            d.values(values);
            expect(d.values() === values).toBe(true);
        });

        it("should be able to add a Values with content to a Data", function () {
            values.content("1,2,3\r\n4,5,6\r\n7,8,9");
            d.values(values);
            expect(d.values() === values).toBe(true);
        });

        it("should be able to set/get the content from a values added to a Data", function () {
            d.values(values);
            d.values().content('1,2,3\r\n4,5,6\r\n7,8,9');
            expect(d.values().content() === '1,2,3\r\n4,5,6\r\n7,8,9').toBe(true);
            d.values().content('4,1,2,3\r\n9,4,5,6\r\n7,10,8,9');
            expect(d.values().content() === '4,1,2,3\r\n9,4,5,6\r\n7,10,8,9').toBe(true);
        });

    });

    describe("CSV", function () {
        var csv;

        beforeEach(function () {
            csv = new CSV();
        });

        it("should be able to add a CSV to a Data", function () {
            d.csv(csv);
            expect(d.csv() === csv).toBe(true);
        });

        it("should be able to add a CSV with attributes to a Data", function () {
            csv.location('http://example.com/CoolnessOfCats.csv');
            d.csv(csv);
            expect(d.csv() === csv).toBe(true);
        });

        it("should be able to set/get attributes from a csv added to a Data", function () {
            d.csv(csv);
            d.csv().location('http://example.com/RadnessOfCats.csv');
            expect(d.csv().location() === 'http://example.com/RadnessOfCats.csv').toBe(true);
        });

    });

    describe("Service", function () {
        var service;

        beforeEach(function () {
            service = new Service();
        });

        it("should be able to add a Service to a Data", function () {
            d.service(service);
            expect(d.service() === service).toBe(true);
        });

        it("should be able to add a Service with attributes to a Data", function () {
            service.location('http://example.com/CoolnessOfFerrets/1980/1990');
            d.service(service);
            expect(d.service() === service).toBe(true);
        });

        it("should be able to set/get attributes from a service added to a Data", function () {
            d.service(service);
            d.service().location('http://example.com/CoolnessOfFerrets/1970/1990');
            expect(d.service().location() === 'http://example.com/CoolnessOfFerrets/1970/1990').toBe(true);
        });

    });

    describe("Variables", function () {
        var variables;

        beforeEach(function () {
            variables = new Variables();
        });

        it("should be able to add a variables to a Data", function () {
            d.variables(variables);
            expect(d.variables() === variables).toBe(true);
        });

        it("should be able to add a Variables with attributes and children to a Data", function () {
            var variable = new Variable('x'),
                variable2 = new Variable('y');
            variables.missingvalue('11');
            variable.column(1).missingop(DataValue.EQ);
            variable2.column(2).missingvalue(new NumberValue(12));
            variables.variable().add(variable);
            variables.variable().add(variable2);
            d.variables(variables);
            expect(d.variables().missingvalue() === "11").toBe(true);
            expect(d.variables().variable().at(0) === variable).toBe(true);
            expect(d.variables().variable().at(1) === variable2).toBe(true);
        });

        it("should be able to set/get attributes of variables added to a Data", function () {
            var variable = new Variable('x'),
                variable2 = new Variable('y');
            variables.variable().add(variable);
            variables.variable().add(variable2);
            d.variables(variables);

            d.variables().missingvalue('5000');
            d.variables().variable().at(0).id("x").column(1).type("number");
            d.variables().variable().at(1).id("y").type("number").column(2);

            expect(d.variables().missingvalue() === '5000').toBe(true);
            expect(d.variables().variable().at(0).id() === "x").toBe(true);
            expect(d.variables().variable().at(1).type() === "number").toBe(true);
            variables.variable().at(1).type('datetime');
            expect(d.variables().variable().at(1).type() === "datetime").toBe(true);

        });

    });

});
