/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data DataVariable serialization", function () {
    "use strict";

    var DataVariable = window.multigraph.core.DataVariable,
        DataValue = window.multigraph.core.DataValue,
        xmlString,
        variable;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize data variable models", function () {
        xmlString = '<variable id="x" column="7" type="number" missingvalue="1990" missingop="eq"/>';
        variable = new DataVariable("x");
        variable.column(7);
        variable.type("number");
        variable.missingvalue(DataValue.parse("number", 1990));
        variable.missingop(DataValue.parseComparator("eq"));
        expect(variable.serialize()).toEqual(xmlString);

        xmlString = '<variable id="y" column="10" type="number" missingvalue="10" missingop="gt"/>';
        variable = new DataVariable("y");
        variable.column(10);
        variable.type("number");
        variable.missingvalue(DataValue.parse("number", 10));
        variable.missingop(DataValue.parseComparator("gt"));
        expect(variable.serialize()).toEqual(xmlString);
    });

});
