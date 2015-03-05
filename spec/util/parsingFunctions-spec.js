/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

var parsingFunctions = require('../../src/util/parsingFunctions.js');

describe("parsing utility functions", function () {
    "use strict";

    describe("parseBoolean", function () {
        var parseBoolean = parsingFunctions.parseBoolean;

        it("should return true when passed the string 'true'", function () {
            expect(parseBoolean("true")).toEqual(true);
            expect(parseBoolean("True")).toEqual(true);
            expect(parseBoolean("TRUE")).toEqual(true);
        });

        it("should return true when passed the string 'yes'", function () {
            expect(parseBoolean("yes")).toEqual(true);
            expect(parseBoolean("Yes")).toEqual(true);
            expect(parseBoolean("YES")).toEqual(true);
        });
        it("should return false when passed the string 'false'", function () {
            expect(parseBoolean("false")).toEqual(false);
            expect(parseBoolean("False")).toEqual(false);
            expect(parseBoolean("FALSE")).toEqual(false);
        });

        it("should return false when passed the string 'no'", function () {
            expect(parseBoolean("no")).toEqual(false);
            expect(parseBoolean("No")).toEqual(false);
            expect(parseBoolean("NO")).toEqual(false);
        });

        it("should the parameter when it is passed any string other than these", function () {
            expect(parseBoolean("foobar")).toEqual("foobar");
            expect(parseBoolean("FooBar")).toEqual("FooBar");
            expect(parseBoolean("Fizz Buzz Bang")).toEqual("Fizz Buzz Bang");
        });

    });

});
