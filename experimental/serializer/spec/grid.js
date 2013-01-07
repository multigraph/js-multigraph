/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Grid serialization", function () {
    "use strict";

    var Grid = window.multigraph.core.Grid,
        xmlString,
        grid;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize axis grid models", function () {
        xmlString = '<grid color="0x984545" visible="false"/>';
        grid = new Grid();
        grid.color(window.multigraph.math.RGBColor.parse("0x984545"));
        grid.visible(false);
        expect(grid.serialize()).toBe(xmlString);
    });

});
