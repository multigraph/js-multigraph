/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Pan serialization", function () {
    "use strict";

    var Pan = window.multigraph.core.Pan,
        DataValue = window.multigraph.core.DataValue,
        xmlString,
        pan;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize axis pan models", function () {
        xmlString = '<pan allowed="yes" min="0" max="5"/>';
        pan = new Pan();
        pan.allowed(true);
        pan.min(DataValue.parse("number", "0"));
        pan.max(DataValue.parse("number", "5"));
        expect(pan.serialize()).toBe(xmlString);

        xmlString = '<pan allowed="no"/>';
        pan = new Pan();
        pan.allowed(false);
        expect(pan.serialize()).toBe(xmlString);
    });

});
