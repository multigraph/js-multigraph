/*global describe, it, beforeEach, expect, xit, jasmine */

describe("DatatipsVariable serialization", function () {
    "use strict";

    var Variable = window.multigraph.core.DatatipsVariable,
        xmlString,
        variable;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });


    it("should properly serialize datatips variable models", function () {
        xmlString = '<variable format="number"/>';
        variable = new Variable();
        variable.format("number");
        expect(variable.serialize()).toEqual(xmlString);

        xmlString = '<variable format="datetime"/>';
        variable = new Variable();
        variable.format("datetime");
        expect(variable.serialize()).toEqual(xmlString);
    });

});
