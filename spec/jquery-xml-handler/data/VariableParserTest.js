/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data Variable parsing", function () {
    "use strict";

    var Variable = window.multigraph.Data.Variables.Variable,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<variable id="x" column="7" type="datetime" missingvalue="1990" missingop="eq"/>',
        $xml,
        variable;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
        $xml = $(xmlString);
        variable = Variable.parseXML($xml);
    });

    it("should be able to parse a Variable from XML", function () {
        expect(variable).not.toBeUndefined();
        expect(variable instanceof Variable).toBe(true);
    });

    it("should be able to parse a variable from XML and read its 'id' attribute", function () {
        expect(variable.id() === 'x').toBe(true);
    });

    it("should be able to parse a variable from XML and read its 'column' attribute", function () {
        expect(variable.column() === '7').toBe(true);
    });

    it("should be able to parse a variable from XML and read its 'type' attribute", function () {
        expect(variable.type() === 'datetime').toBe(true);
    });

    it("should be able to parse a variable from XML and read its 'missingvalue' attribute", function () {
        expect(variable.missingvalue() === '1990').toBe(true);
    });

    it("should be able to parse a variable from XML and read its 'missingop' attribute", function () {
        expect(variable.missingop() === 'eq').toBe(true);
    });

    it("should be able to parse a variable from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<variable id="y" column="10" type="number" missingop="gt"/>';
        expect(variable.serialize() === xmlString).toBe(true);
        variable = Variable.parseXML($(xmlString2));
        expect(variable.serialize() === xmlString2).toBe(true);
    });

});
