/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Window serialization", function () {
    "use strict";

    var Window = window.multigraph.core.Window,
        xmlString,
        w;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize window models", function () {
        xmlString = '<window margin="1" padding="10" bordercolor="0x111223" width="2" height="97" border="0"/>';
        w = new Window();
        w.width(2);
        w.height(97);
        w.border(0);
        w.margin().set(1, 1, 1, 1);
        w.padding().set(10, 10, 10, 10);
        w.bordercolor(window.multigraph.math.RGBColor.parse("0x111223"));
        expect(w.serialize()).toEqual(xmlString);

        xmlString = '<window margin="1" padding="10" bordercolor="0x000000" width="100" height="127" border="3"/>';
        w = new Window();
        w.width(100);
        w.height(127);
        w.border(3);
        w.margin().set(1, 1, 1, 1);
        w.padding().set(10, 10, 10, 10);
        w.bordercolor(window.multigraph.math.RGBColor.parse("0x000000"));
        expect(w.serialize()).toEqual(xmlString);
    });

});
