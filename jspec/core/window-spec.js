/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Window", function () {
    "use strict";

    var Window = require('../../src/core/window.js'),
        w,
        defaultValues;

    beforeEach(function () {
        w = new Window();
        defaultValues = require('../../src/util/utilityFunctions.js').getDefaultValuesFromXSD();
    });

    it("should be able to create a Window", function () {
        expect(w instanceof Window).toBe(true);
    });

    describe("width attribute", function () {
        it("should be able to set/get the width attribute", function () {
            w.width(100);
            expect(w.width()).toBe(100);
        });
    });

    describe("height attribute", function () {
        it("should be able to set/get the height attribute", function () {
            w.height(250);
            expect(w.height()).toBe(250);
        });
    });

    describe("border attribute", function () {
        it("should have a border attribute which has been initialized to the correct default value", function () {
            expect(w.border()).toBe(defaultValues.window.border);
        });
        it("should be able to set/get the border attribute", function () {
            w.border(3);
            expect(w.border()).toBe(3);
        });
    });

    describe("margin attribute", function () {
        it("should have a margin attribute which has been initialized to the correct default value", function () {
            expect(w.margin().top()   ).toBe(defaultValues.window.margin().top()   );
            expect(w.margin().left()  ).toBe(defaultValues.window.margin().left()  );
            expect(w.margin().bottom()).toBe(defaultValues.window.margin().bottom());
            expect(w.margin().right() ).toBe(defaultValues.window.margin().right() );
        });
    });

    describe("padding attribute", function () {
        it("should have a padding attribute which has been initialized to the correct default value", function () {
            expect(w.padding().top()   ).toBe(defaultValues.window.padding().top()   );
            expect(w.padding().left()  ).toBe(defaultValues.window.padding().left()  );
            expect(w.padding().bottom()).toBe(defaultValues.window.padding().bottom());
            expect(w.padding().right() ).toBe(defaultValues.window.padding().right() );
        });
    });

    describe("bordercolor attribute", function () {
        it("should be able to set/get the bordercolor attribute", function () {
            w.bordercolor(require('../../src/math/rgb_color.js').parse("0x456210"));
            expect(w.bordercolor().getHexString()).toBe("0x456210");
        });

    });

});
