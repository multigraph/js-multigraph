/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Zoom serialization", function () {
    "use strict";

    var Zoom = window.multigraph.core.Zoom,
        xmlString,
        zoom;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize axis zoom models", function () {
        xmlString = '<zoom allowed="yes" min="0" max="80" anchor="1"/>';
        zoom = new Zoom();
        zoom.allowed(true);
        zoom.min(window.multigraph.core.DataMeasure.parse("number", 0));
        zoom.max(window.multigraph.core.DataMeasure.parse("number", 80));
        zoom.anchor(window.multigraph.core.DataValue.parse("number", "1"));
        expect(zoom.serialize()).toBe(xmlString);

        xmlString = '<zoom allowed="no" anchor="0"/>';
        zoom = new Zoom();
        zoom.allowed(false);
        zoom.anchor(window.multigraph.core.DataValue.parse("number", 0));
        expect(zoom.serialize()).toBe(xmlString);
    });

});
