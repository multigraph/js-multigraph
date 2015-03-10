/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Legend Icon JSON parsing", function () {
    "use strict";

    var Icon = require('../../../src/core/icon.js');

    var json,
        icon,
        height = 12,
        width = 59,
        border = 7;

    require('../../../src/parser/json/icon.js');
    
    beforeEach(function () {
        json = { "height" : height, "width" : width, "border" : border };
        icon = Icon.parseJSON(json);
    });

    it("should be able to parse a icon from JSON", function () {
        expect(icon).not.toBeUndefined();
        expect(icon instanceof Icon).toBe(true);
    });

    it("should be able to parse a icon from JSON and read its 'height' attribute", function () {
        expect(icon.height()).toEqual(height);
    });

    it("should be able to parse a icon from JSON and read its 'width' attribute", function () {
        expect(icon.width()).toEqual(width);
    });

    it("should be able to parse a icon from JSON and read its 'border' attribute", function () {
        expect(icon.border()).toEqual(border);
    });

});
