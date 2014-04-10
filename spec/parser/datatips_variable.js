/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("DatatipsVariable parsing", function () {
    "use strict";

    var DatatipsVariable = window.multigraph.core.DatatipsVariable,
        xmlString,
        $xml,
        variable,
        formatString = "number";

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML");
        xmlString = ''
            + '<variable'
            +     ' format="' + formatString + '"'
            +     '/>',
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        variable = DatatipsVariable.parseXML($xml);
    });

    it("should be able to parse a variable from XML", function () {
        expect(variable).not.toBeUndefined();
        expect(variable instanceof DatatipsVariable).toBe(true);
    });

    it("should be able to parse a variable from XML and read its 'format' attribute", function () {
        expect(variable.format()).toEqual(formatString);
    });

});
