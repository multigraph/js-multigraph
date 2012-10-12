/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data Variables parsing", function () {
    "use strict";

    var Variables = window.multigraph.core.Variables,
        DataVariable = window.multigraph.core.DataVariable,
        xmlString = '<variables missingvalue="-9000" missingop="lt"/>',
        $xml,
        variables;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        variables = Variables.parseXML($xml, {});
    });

    it("should be able to parse a variables from XML", function () {
        expect(variables).not.toBeUndefined();
    });

    it("should be able to parse a variables from XML and read its 'missingvalue' attribute", function () {
        expect(variables.missingvalue()).toBe("-9000");
    });

    it("should be able to parse a variables from XML and read its 'missingop' attribute", function () {
        expect(variables.missingop()).toBe("lt");
    });

    it("should be able to parse a variables from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<variables missingop="gt"/>';
        expect(variables.serialize()).toBe(xmlString);
        variables = Variables.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString2), {});
//        expect(variables.serialize() === xmlString2).toBe(true);
    });

    describe("DataVariable parsing", function () {

        beforeEach(function () {
            xmlString = '<variables missingop="gt"><variable id="x" column="7" type="number" missingvalue="1990" missingop="eq"/><variable id="y" column="2" type="number" missingvalue="19" missingop="gt"/><variable id="y1" column="2" type="number"/></variables>';
            window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            variables = Variables.parseXML($xml, {});
        });

        it("should be able to parse a variables with children from XML", function () {
            expect(variables).not.toBeUndefined();
            expect(variables instanceof Variables).toBe(true);
        });

        it("children should be instances of the 'variable' tag", function () {
            expect(variables.variable().at(0) instanceof DataVariable).toBe(true);
            expect(variables.variable().at(1) instanceof DataVariable).toBe(true);
            expect(variables.variable().at(2) instanceof DataVariable).toBe(true);
        });

        xit("should be able to parse a variables with children from XML, serialize it and get the same XML as the original", function () {
            expect(variables.serialize()).toBe(xmlString);
        });

    });
});
