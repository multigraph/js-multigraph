/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data DataVariable parsing", function () {
    "use strict";

    var DataVariable = window.multigraph.core.DataVariable,
        xmlString = '<variable id="x" column="7" type="number" missingvalue="1990" missingop="eq"/>',
        $xml,
        variable;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        $xml = $(xmlString);
        variable = DataVariable.parseXML($xml);
    });

    xit("should be able to parse a DataVariable from XML", function () {
        expect(variable).not.toBeUndefined();
        expect(variable instanceof DataVariable).toBe(true);
    });

    xit("should be able to parse a variable from XML and read its 'id' attribute", function () {
        expect(variable.id()).toBe("x");
    });

    xit("should be able to parse a variable from XML and read its 'column' attribute", function () {
        expect(variable.column()).toEqual(7);
    });

    xit("should be able to parse a variable from XML and read its 'type' attribute", function () {
        expect(variable.type()).toBe("number");
    });

    it("should be able to parse a variable from XML and read its 'missingvalue' attribute", function () {
        expect(variable.missingvalue().getRealValue()).toEqual(1990);
    });

    xit("should be able to parse a variable from XML and read its 'missingop' attribute", function () {
        expect(variable.missingop()).toBe("eq");
    });

    xit("should be able to parse a variable from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<variable id="y" column="10" type="number" missingvalue="lt" missingop="gt"/>';
        expect(variable.serialize()).toBe(xmlString);
        variable = DataVariable.parseXML($(xmlString2));
        expect(variable.serialize()).toEqual(xmlString2);
    });

});
