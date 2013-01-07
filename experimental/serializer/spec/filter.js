/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Filter serialization", function () {
    "use strict";

    var Filter = window.multigraph.core.Filter,
        xmlString,
        filter;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize filter models", function () {
        xmlString = '<filter type="number"/>';
        filter = new Filter();
        filter.type("number");
        expect(filter.serialize()).toEqual(xmlString);

        xmlString = '<filter type="datetime"/>';
        filter = new Filter();
        filter.type("datetime");
        expect(filter.serialize()).toEqual(xmlString);
    });

    describe("with Option child tags", function () {
        var FilterOption = window.multigraph.core.FilterOption;

        beforeEach(function () {
            window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
        });

        it("should properly serialize filter models with option submodels", function () {
            xmlString = '<filter type="number"><option name="foo" value="bar"/></filter>';
            filter = new Filter();
            filter.type("number");
            filter.options().add(new FilterOption());
            filter.options().at(0).name("foo").value("bar");
            expect(filter.serialize()).toEqual(xmlString);

            xmlString = '<filter type="datetime"><option name="foo"/><option name="foo1" value="bar1"/><option name="foo2" value="bar2"/></filter>';
            filter = new Filter();
            filter.type("datetime");
            filter.options().add(new FilterOption());
            filter.options().at(0).name("foo");
            filter.options().add(new FilterOption());
            filter.options().at(1).name("foo1").value("bar1");
            filter.options().add(new FilterOption());
            filter.options().at(2).name("foo2").value("bar2");
            expect(filter.serialize()).toEqual(xmlString);
        });

    });
});
