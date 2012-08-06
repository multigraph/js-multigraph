/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Pointline Renderer", function () {
    "use strict";

    var Renderer = window.multigraph.core.Renderer,
        pr;

    beforeEach(function () {
        pr = new Renderer.create("pointline");
    }); 

    it("should be able to create a Renderer", function () {
        expect(pr instanceof Renderer).toBe(true);
    });

    describe("Options", function () {
        describe("linecolor", function () {
            it("should exist", function () {
                expect(pr.newOptions().linecolor).not.toBeUndefined();
                expect(typeof(pr.newOptions().linecolor)).toBe("function");
            });

            it("should have a reasonable default", function () {
                expect(pr.newOptions().linecolor().at(0) instanceof window.multigraph.core.Renderer.RGBColorOption).toBe(true);
                expect(pr.newOptions().linecolor().at(0).serializeValue()).toEqual(
                    (new window.multigraph.core.Renderer.RGBColorOption(new window.multigraph.math.RGBColor(0,0,0))).serializeValue()
                );
            });

        });

        describe("linewidth", function () {
            it("should exist", function () {
                expect(pr.newOptions().linewidth).not.toBeUndefined();
                expect(typeof(pr.newOptions().linewidth)).toBe("function");
            });

            it("should have a reasonable default", function () {
                expect(pr.newOptions().linewidth().at(0) instanceof window.multigraph.core.Renderer.NumberOption).toBe(true);
                expect(pr.newOptions().linewidth().at(0).serializeValue()).toEqual(
                    (new window.multigraph.core.Renderer.NumberOption(1)).serializeValue()
                );
            });

        });

    });

    describe("type attribute", function () {
        it("should be 'pointline'", function () {
            expect(pr.type()).toBe("pointline");
        });

    });

});
