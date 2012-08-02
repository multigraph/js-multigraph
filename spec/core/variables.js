/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data Variables", function () {
    "use strict";

    var Variables = window.multigraph.core.Variables,
        NumberValue = window.multigraph.core.NumberValue,
        variables;

    beforeEach(function () {
        variables = new Variables();
    }); 

    it("should be able to create a Variables", function () {
        expect(variables instanceof Variables).toBe(true);
    });

    describe("missingvalue attribute", function () {
        it("should be able to set/get the missingvalue attribute", function () {
            variables.missingvalue("5000");
            expect(variables.missingvalue()).toEqual("5000");
        });

    });

    describe("missingop attribute", function () {
        it("should be able to set/get the missingop attribute", function () {
            variables.missingop("gt");
            expect(variables.missingop()).toBe("gt");
        });

    });

    describe("DataVariable", function () {
        var DataVariable = window.multigraph.core.DataVariable,
            variable;

        beforeEach(function () {
            variable = new DataVariable("x");
        });

        it("should be able to add a DataVariable to a Variables", function () {
            variables.variable().add(variable);
            expect(variables.variable().at(0)).toBe(variable);
        });

        it("should be able to add many DataVariable tags to a Variables tag", function () {
            var variable2 = new DataVariable("y"),
                variable3 = new DataVariable("y2");
            variables.variable().add(variable);
            variables.variable().add(variable2);
            variables.variable().add(variable3);
            expect(variables.variable().at(0)).toBe(variable);
            expect(variables.variable().at(1)).toBe(variable2);
            expect(variables.variable().at(2)).toBe(variable3);
        });

        it("should be able to add a DataVariable with attributes to a Variables", function () {
            variable.id("x").column(2).type("datetime");
            variables.variable().add(variable);
            expect(variables.variable().at(0)).toBe(variable);
        });

        it("should be able to add many DataVariable tags with attributes to a Variables tag", function () {
            var variable2 = new DataVariable("y"),
                variable3 = new DataVariable("y2");
            variable.id("x").column(1).type("number");
            variable2.id("y").type("number").column(2).missingvalue(new NumberValue(-2000));
            variable3.id("y1").column(3).type("datetime");
            variables.variable().add(variable);
            variables.variable().add(variable2);
            variables.variable().add(variable3);
            expect(variables.variable().at(0)).toBe(variable);
            expect(variables.variable().at(1)).toBe(variable2);
            expect(variables.variable().at(2)).toBe(variable3);
        });

        it("should be able to set/get attributes of an DataVariable added to a Variables", function () {
            var variable2 = new DataVariable("y"),
                variable3 = new DataVariable("y1");
            variable.id("x").column(1).type("number");
            variable2.id("y").type("number").column(2);
            variable3.id("y1").column(3).type("datetime");
            variables.variable().add(variable);
            variables.variable().add(variable2);
            variables.variable().add(variable3);
            expect(variables.variable().at(0).id()).toBe("x");
            expect(variables.variable().at(1).type()).toBe("number");
            variables.variable().at(1).type("datetime");
            expect(variables.variable().at(1).type()).toBe("datetime");
        });

    });


});
