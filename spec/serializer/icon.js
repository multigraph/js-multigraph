/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Legend Icon serialization", function () {
    "use strict";

    var Icon = window.multigraph.core.Icon,
        xmlString,
        icon;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize legend icon models", function () {
        xmlString = '<icon height="12" width="59" border="7"/>';
        icon = new Icon();
        icon.height(12);
        icon.width(59);
        icon.border(7);
        expect(icon.serialize()).toBe(xmlString);
    });

});
