/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Title serialization", function () {
    "use strict";

    var AxisTitle = window.multigraph.core.AxisTitle,
        xmlString,
        title;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize axis title models", function () {
        xmlString = '<title angle="70" anchor="1,1" position="-1,1">A Title</title>';
        title = new AxisTitle();
        title.position(window.multigraph.math.Point.parse("-1,1"));
        title.anchor(window.multigraph.math.Point.parse("1,1"));
        title.angle(70);
        title.content("A Title");
        expect(title.serialize()).toEqual(xmlString);
    });

});
