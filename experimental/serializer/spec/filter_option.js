/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Filter Option serialization", function () {
    "use strict";

    var FilterOption = window.multigraph.core.FilterOption,
        xmlString,
        option;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize filter option models", function () {
        xmlString = '<option name="foo" value="bar"/>';
        option = new FilterOption();
        option.name("foo");
        option.value("bar");
        expect(option.serialize()).toEqual(xmlString);

        xmlString = '<option name="foo1"/>';
        option = new FilterOption();
        option.name("foo1");
        expect(option.serialize()).toEqual(xmlString);
    });

});
