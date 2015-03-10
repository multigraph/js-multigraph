/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Background JSON parsing", function () {
    "use strict";

    var Background = require('../../../src/core/background.js'),
        Img = require('../../../src/core/img.js'),
        Point = require('../../../src/math/point.js'),
        RGBColor = require('../../../src/math/rgb_color.js'),
        color = "0x123456",
        src = "http://www.example.com/background_img.gif",
        frame = "plot",
        anchor = [1,1],
        base = [0,0],
        position = [-1,1],
        json = { "color": color,
                 "img" : { "src": src, "frame": frame, "anchor": anchor, "base": base, "position": position } },
        background;

    require('../../../src/parser/json/background.js');

    beforeEach(function () {
        background = Background.parseJSON(json);
    });

    it("should be able to parse a background from JSON", function () {
        expect(background).not.toBeUndefined();
        expect(background instanceof Background).toBe(true);
    });

    it("should be able to parse a background from JSON and read its 'color' attribute", function () {
        expect(background.color().getHexString("0x")).toEqual((RGBColor.parse(color)).getHexString("0x"));
    });


    it("should be able to parse a background with an img from JSON", function () {
        expect(background).not.toBeUndefined();
        expect(background instanceof Background).toBe(true);
        expect(background.img()).not.toBeUndefined();
        expect(background.img() instanceof Img).toBe(true);
    });

    it("should be able to properly parse a background with an img from JSON", function () {
        expect(background.img().src()).toEqual(src);
        expect(background.img().frame()).toEqual(frame.toLowerCase());
        expect(background.img().anchor().x()).toEqual(anchor[0]);
        expect(background.img().anchor().y()).toEqual(anchor[1]);
        expect(background.img().base().x()).toEqual(base[0]);
        expect(background.img().base().y()).toEqual(base[1]);
        expect(background.img().position().x()).toEqual(position[0]);
        expect(background.img().position().y()).toEqual(position[1]);
    });


});
