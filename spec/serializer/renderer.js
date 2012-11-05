/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Renderer serialization", function () {
    "use strict";

    var Renderer = window.multigraph.core.Renderer,
        xmlString,
        renderer;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });


    it("should properly serialize renderer models", function () {
        xmlString = '<renderer type="pointline"/>';
        renderer = Renderer.create(Renderer.POINTLINE);
        expect(renderer.serialize()).toEqual(xmlString);
    });

    describe("with Option child tags", function () {
        var option;

        it("should properly serialize renderer models with option submodels", function () { 
            xmlString = '<renderer type="pointline"><option name="pointsize" value="3"/></renderer>';
            renderer = Renderer.create(Renderer.POINTLINE);
            option = new (renderer.optionsMetaData.pointsize.type)();
            option.value(3);
            renderer.options().pointsize().add(option);
            expect(renderer.serialize()).toEqual(xmlString);

            xmlString = '<renderer type="pointline"><option name="linewidth" value="7"/><option name="pointsize" value="3"/></renderer>';
            renderer = Renderer.create(Renderer.POINTLINE);

            option = new (renderer.optionsMetaData.linewidth.type)();
            option.value(7);
            renderer.options().linewidth().add(option);

            option = new (renderer.optionsMetaData.pointsize.type)();
            option.value(3);
            renderer.options().pointsize().add(option);

            expect(renderer.serialize()).toEqual(xmlString);
        });

    });
});
