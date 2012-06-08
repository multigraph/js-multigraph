/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data Variables parsing", function () {
    "use strict";

    var Variables = window.multigraph.Data.Variables,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<variables missingvalue="-9000" missingop="lt"/>',
        $xml,
        variables;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
        $xml = $(xmlString);
        variables = Variables.parseXML($xml);
    });

    it("should be able to parse a variables from XML", function () {
        expect(variables).not.toBeUndefined();
    });

    it("should be able to parse a variables from XML and read its 'missingvalue' attribute", function () {
        expect(variables.missingvalue() === '-9000').toBe(true);
    });

    it("should be able to parse a variables from XML and read its 'missingop' attribute", function () {
        expect(variables.missingop() === 'lt').toBe(true);
    });

    it("should be able to parse a variables from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<variables missingop="gt"/>';
        expect(variables.serialize() === xmlString).toBe(true);
        variables = Variables.parseXML($(xmlString2));
//        expect(variables.serialize() === xmlString2).toBe(true);
    });

    describe("Variable parsing", function () {
        var Variable = window.multigraph.Data.Variables.Variable;

        beforeEach(function () {
            xmlString = '<variables missingop="gt"><variable id="x" column="7" type="datetime" missingvalue="1990" missingop="eq"/><variable id="y" column="2" type="number" missingvalue="19" missingop="gt"/><variable id="y1" column="2" type="datetime"/></variables>';
            jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
            $xml = $(xmlString);
            variables = Variables.parseXML($xml);
        });

        it("should be able to parse a variables with children from XML", function () {
            expect(variables).not.toBeUndefined();
            expect(variables instanceof Variables).toBe(true);
        });

        it("children should be instances of the 'variable' tag", function () {
            expect(variables.variable().at(0) instanceof Variable).toBe(true);
            expect(variables.variable().at(1) instanceof Variable).toBe(true);
            expect(variables.variable().at(2) instanceof Variable).toBe(true);
        });

        xit("should be able to parse a variables with children from XML, serialize it and get the same XML as the original", function () {
            expect(variables.serialize() === xmlString).toBe(true);
        });

    });
});
