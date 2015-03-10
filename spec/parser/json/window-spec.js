/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Window JSON parsing", function () {
    "use strict";

    var Window = require('../../../src/core/window.js'),
        Insets = require('../../../src/math/insets.js'),
        RGBColor = require('../../../src/math/rgb_color.js'),
        windowModel,
        margin = 1,
        padding = 10,
        bordercolor = "0x111223",
        width = 2,
        height = 97,
        border = 0,
        json = { "margin" : margin, "padding" : padding, "bordercolor" : bordercolor, "width" : width, "height" : height, "border" : border };


    require('../../../src/parser/json/window.js');

    beforeEach(function () {
        windowModel = Window.parseJSON(json);
    });

    it("should be able to parse a window from JSON", function () {
        expect(windowModel).not.toBeUndefined();
        expect(windowModel instanceof Window).toBe(true);
    });

    it("should be able to parse a window from JSON and read its 'width' attribute", function () {
        expect(windowModel.width()).toEqual(width);
    });

    it("should be able to parse a window from JSON and read its 'height' attribute", function () {
        expect(windowModel.height()).toEqual(height);
    });

    it("should be able to parse a window from JSON and read its 'border' attribute", function () {
        expect(windowModel.border()).toEqual(border);
    });

    it("should be able to parse a window from JSON and read its 'margin' attribute", function () {
        expect(windowModel.margin().top()).toEqual((new Insets(margin, margin, margin, margin)).top());
        expect(windowModel.margin().right()).toEqual((new Insets(margin, margin, margin, margin)).right());
        expect(windowModel.margin().bottom()).toEqual((new Insets(margin, margin, margin, margin)).bottom());
        expect(windowModel.margin().left()).toEqual((new Insets(margin, margin, margin, margin)).left());
    });

    it("should be able to parse a window from JSON and read its 'padding' attribute", function () {
        expect(windowModel.padding().top()).toEqual((new Insets(padding, padding, padding, padding)).top());
        expect(windowModel.padding().right()).toEqual((new Insets(padding, padding, padding, padding)).right());
        expect(windowModel.padding().bottom()).toEqual((new Insets(padding, padding, padding, padding)).bottom());
        expect(windowModel.padding().left()).toEqual((new Insets(padding, padding, padding, padding)).left());
    });

    it("should be able to parse a window from JSON and read its 'bordercolor' attribute", function () {
        expect(windowModel.bordercolor().getHexString("0x")).toEqual((RGBColor.parse(bordercolor)).getHexString("0x"));
    });

});
