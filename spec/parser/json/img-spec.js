/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Background Img JSON parsing", function () {
    "use strict";

    var Img = require('../../../src/core/img.js'),
        Point = require('../../../src/math/point.js'),
        image,
        src = "http://www.example.com/example_img.png",
        frame = "plot",
        anchor = [1, 1],
        base = [0, 0],
        position = [-1, 1],
        json = { "src": src, "frame": frame, "anchor": anchor, "base": base, "position": position };

    require('../../../src/parser/json/img.js');

    beforeEach(function() {
        image = Img.parseJSON(json);
    });

    it("should be able to parse a background from JSON", function () {
        expect(image).not.toBeUndefined();
        expect(image instanceof Img).toBe(true);
    });

    it("should be able to parse a img from JSON and read its 'src' attribute", function () {
        expect(image.src()).toBe(src);
    });

    it("should be able to parse a img from JSON and read its 'anchor' attribute", function () {
        expect(image.anchor().x()).toEqual(anchor[0]);
        expect(image.anchor().y()).toEqual(anchor[1]);
    });

    it("should be able to parse a img from JSON and read its 'base' attribute", function () {
        expect(image.base().x()).toEqual(base[0]);
        expect(image.base().y()).toEqual(base[1]);
    });

    it("should be able to parse a img from JSON and read its 'position' attribute", function () {
        expect(image.position().x()).toEqual(position[0]);
        expect(image.position().y()).toEqual(position[1]);
    });

    it("should be able to parse a img from JSON and read its 'frame' attribute", function () {
        expect(image.frame()).toBe(frame.toLowerCase());
    });

});
