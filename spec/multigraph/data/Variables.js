/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data Variables", function () {
    "use strict";

    var Variables = window.multigraph.Data.Variables,
        variables;

    beforeEach(function () {
        variables = new Variables();
    }); 

    it("should be able to create a Variables", function () {
        expect(variables instanceof Variables).toBe(true);
    });

    describe("missingvalue attribute", function () {
        it("should be able to set/get the missingvalue attribute", function () {
            variables.missingvalue('5000');
            expect(variables.missingvalue() === '5000').toBe(true);
        });

    });

    describe("missingop attribute", function () {
        it("should be able to set/get the missingop attribute", function () {
            variables.missingop('gt');
            expect(variables.missingop() === 'gt').toBe(true);
        });

    });

    describe("Variable", function () {
        var Variable = window.multigraph.Data.Variables.Variable,
            variable;

        beforeEach(function () {
            variable = new Variable();
        });

        it("should be able to add a Variable to a Variables", function () {
            variables.variable().add(variable);
            expect(variables.variable().at(0) === variable).toBe(true);
        });

        it("should be able to add many Variable tags to a Variables tag", function () {
            var variable2 = new Variable(),
                variable3 = new Variable();
            variables.variable().add(variable);
            variables.variable().add(variable2);
            variables.variable().add(variable3);
            expect(variables.variable().at(0) === variable).toBe(true);
            expect(variables.variable().at(1) === variable2).toBe(true);
            expect(variables.variable().at(2) === variable3).toBe(true);
        });

        it("should be able to add a Variable with attributes to a Variables", function () {
            variable.id('x').column('2').type('datetime');
            variables.variable().add(variable);
            expect(variables.variable().at(0) === variable).toBe(true);
        });

        it("should be able to add many Variable tags with attributes to a Variables tag", function () {
            var variable2 = new Variable(),
                variable3 = new Variable();
            variable.id("x").column("1").type("number");
            variable2.id("y").type("number").column("2").missingvalue('-2000');
            variable3.id("y1").column("3").type("datetime");
            variables.variable().add(variable);
            variables.variable().add(variable2);
            variables.variable().add(variable3);
            expect(variables.variable().at(0) === variable).toBe(true);
            expect(variables.variable().at(1) === variable2).toBe(true);
            expect(variables.variable().at(2) === variable3).toBe(true);
        });

        it("should be able to set/get attributes of an Variable added to a Variables", function () {
            var variable2 = new Variable(),
                variable3 = new Variable();
            variable.id("x").column("1").type("number");
            variable2.id("y").type("number").column("2");
            variable3.id("y1").column("3").type("datetime");
            variables.variable().add(variable);
            variables.variable().add(variable2);
            variables.variable().add(variable3);
            expect(variables.variable().at(0).id() === "x").toBe(true);
            expect(variables.variable().at(1).type() === "number").toBe(true);
            variables.variable().at(1).type('datetime');
            expect(variables.variable().at(1).type() === "datetime").toBe(true);
        });

    });


});
