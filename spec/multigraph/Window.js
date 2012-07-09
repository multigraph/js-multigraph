/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Window", function () {
    "use strict";

    var Window = window.multigraph.Window,
        w,
        defaultValues;

    beforeEach(function () {
        w = new Window();
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD();
    });

    it("should be able to create a Window", function () {
        expect(w instanceof Window).toBe(true);
    });

    describe("width attribute", function () {
        it("should be able to set/get the width attribute", function () {
            w.width(100);
            expect(w.width() === 100).toBe(true);
        });
    });

    describe("height attribute", function () {
        it("should be able to set/get the height attribute", function () {
            w.height(250);
            expect(w.height() === 250).toBe(true);
        });
    });

    describe("border attribute", function () {
        it("should have a border attribute which has been initialized to the correct default value", function () {
            expect(w.border() === defaultValues.window.border).toBe(true);
        });
        it("should be able to set/get the border attribute", function () {
            w.border(3);
            expect(w.border() === 3).toBe(true);
        });
    });

    describe("margin attribute", function () {
        it("should have a margin attribute which has been initialized to the correct default value", function () {
            expect(w.margin().top()    === defaultValues.window.margin().top()   ).toBe(true);
            expect(w.margin().left()   === defaultValues.window.margin().left()  ).toBe(true);
            expect(w.margin().bottom() === defaultValues.window.margin().bottom()).toBe(true);
            expect(w.margin().right()  === defaultValues.window.margin().right() ).toBe(true);
        });
    });

    describe("padding attribute", function () {
        it("should have a padding attribute which has been initialized to the correct default value", function () {
            expect(w.padding().top()    === defaultValues.window.padding().top()   ).toBe(true);
            expect(w.padding().left()   === defaultValues.window.padding().left()  ).toBe(true);
            expect(w.padding().bottom() === defaultValues.window.padding().bottom()).toBe(true);
            expect(w.padding().right()  === defaultValues.window.padding().right() ).toBe(true);
        });
    });

    describe("bordercolor attribute", function () {
        it("should be able to set/get the bordercolor attribute", function () {
            w.bordercolor(window.multigraph.math.RGBColor.parse("0x456210"));
            expect(w.bordercolor().getHexString()).toBe("0x456210");
        });

    });

});
