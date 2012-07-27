/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Renderer", function () {
    "use strict";

    var Renderer = window.multigraph.core.Renderer,
        r;

    beforeEach(function () {
        r = new Renderer('line');
    }); 

    it("should be able to create a Renderer", function () {
        expect(r instanceof Renderer).toBe(true);
    });

    describe("type attribute", function () {
        it("should be able to set/get the type attribute", function () {
            r.type("lineerror");
            expect(r.type() === "lineerror").toBe(true);
        });


        it("should throw an error if types value is not one of the predefined values", function () {
            expect(function () {
                r.type("barerror");
            }).not.toThrow();
            expect(function () {
                r.type("barerrors");
            }).toThrow("validator failed with parameter barerrors");
        });
    });

    describe("Option", function () {
        var RendererOption = window.multigraph.core.RendererOption,
            option;

        beforeEach(function () {
            option = new RendererOption('linewidth', '100');
        });

        it("should be able to add a RendererOption to a Renderer", function () {
            r.options().add(option);
            expect(r.options().at(0) === option).toBe(true);
        });

        it("should be able to add multiple RendererOptions to a Renderer", function () {
            var option2 = new RendererOption('linecolor', '0x123456');
            r.options().add(option);
            r.options().add(option2);
            expect(r.options().at(0) === option).toBe(true);
            expect(r.options().at(1) === option2).toBe(true);
        });

        it("should be able to add an RendererOption with attributes to a Renderer", function () {
            option.name("linewidth");
            option.value("100");
            r.options().add(option);
            expect(r.options().at(0) === option).toBe(true);
        });

        it("should be able to add multiple RendererOptions with attributes to a Renderer", function () {
            var option2 = new RendererOption("linecolor", "0x123456"),
                option3 = new RendererOption("dotsize", "2");
            option.name("linewidth");
            option.value("13");
            option3.min("2");
            r.options().add(option);
            r.options().add(option2);
            r.options().add(option3);
            expect(r.options().at(0) === option).toBe(true);
            expect(r.options().at(1) === option2).toBe(true);
            expect(r.options().at(2) === option3).toBe(true);
        });

        it("should be able to set/get attributes of an RendererOption added to a Renderer", function () {
            r.options().add(option);
            r.options().at(0).name("dotcolor");
            r.options().at(0).value("0x0945AF");
            expect(r.options().at(0).name() === "dotcolor").toBe(true);
            expect(r.options().at(0).value() === "0x0945AF").toBe(true);
        });

    });

});
