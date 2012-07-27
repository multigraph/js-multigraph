/*global describe, it, beforeEach, expect, xit, jasmine */

describe("RGBColor", function () {
    "use strict";

    var RGBColor = window.multigraph.math.RGBColor,
        rgb;

    beforeEach(function () {
        rgb = new RGBColor(0.5,0.2,0.8);
    });

    it("should be able to create a RGBColor", function () {
        expect(rgb instanceof RGBColor).toBe(true);
    });

    describe("r attribute", function () {
        it("should be able to set/get the 'r' attribute with a value of 0.5", function () {
            rgb.r(0.5);
            expect(rgb.r()).toBe(0.5);
        });
        it("should be able to set/get the 'r' attribute with a value of 0.0", function () {
            expect(rgb.r()).toBe(0.5);
            rgb.r(0.0);
            expect(rgb.r()).toBe(0.0);
        });
        it("should be able to set/get the 'r' attribute with a value of 1", function () {
            expect(rgb.r()).toBe(0.5);
            rgb.r(1);
            expect(rgb.r()).toBe(1);
        });

        it("should throw an error if the 'r' attribute is less than 0", function () {
            expect(function () {
                rgb.r(-0.2);
            }).toThrow(new Error("validator failed with parameter -0.2"));
        });
        it("should throw an error if the 'r' attribute is greater than 1", function () {
            expect(function () {
                rgb.r(2);
            }).toThrow(new Error("validator failed with parameter 2"));
        });
        it("should throw an error if the 'r' attribute is a string", function () {
            expect(function () {
                rgb.r("larry");
            }).toThrow(new Error("validator failed with parameter larry"));
        });
        it("should throw an error if the 'r' attribute is NaN", function () {
            expect(function () {
                rgb.r(NaN);
            }).toThrow(new Error("validator failed with parameter NaN"));
        });

    });

    describe("g attribute", function () {
        it("should be able to set/get the 'g' attribute with a value of 0.7", function () {
            expect(rgb.g()).toBe(0.2);
            rgb.g(0.7);
            expect(rgb.g()).toBe(0.7);
        });
        it("should be able to set/get the 'g' attribute with a value of 0.0", function () {
            expect(rgb.g()).toBe(0.2);
            rgb.g(0.0);
            expect(rgb.g()).toBe(0.0);
        });
        it("should be able to set/get the 'g' attribute with a value of 1", function () {
            expect(rgb.g()).toBe(0.2);
            rgb.g(1);
            expect(rgb.g()).toBe(1);
        });

        it("should throw an error if the 'g' attribute is less than 0", function () {
            expect(function () {
                rgb.g(-12);
            }).toThrow(new Error("validator failed with parameter -12"));
        });
        it("should throw an error if the 'g' attribute is greater than 1", function () {
            expect(function () {
                rgb.g(1.2);
            }).toThrow(new Error("validator failed with parameter 1.2"));
        });
        it("should throw an error if the 'g' attribute is a string", function () {
            expect(function () {
                rgb.g("curly");
            }).toThrow(new Error("validator failed with parameter curly"));
        });
        it("should throw an error if the 'g' attribute is NaN", function () {
            expect(function () {
                rgb.g(NaN);
            }).toThrow(new Error("validator failed with parameter NaN"));
        });

    });

    describe("b attribute", function () {
        it("should be able to set/get the 'b' attribute with a value of 0.274329", function () {
            expect(rgb.b()).toBe(0.8);
            rgb.b(0.274329);
            expect(rgb.b()).toBe(0.274329);
        });
        it("should be able to set/get the 'b' attribute with a value of 0.0", function () {
            expect(rgb.b()).toBe(0.8);
            rgb.b(0.0);
            expect(rgb.b()).toBe(0.0);
        });
        it("should be able to set/get the 'b' attribute with a value of 1", function () {
            expect(rgb.b()).toBe(0.8);
            rgb.b(1);
            expect(rgb.b()).toBe(1);
        });

        it("should throw an error if the 'b' attribute is less than 0", function () {
            expect(function () {
                rgb.b(-87);
            }).toThrow(new Error("validator failed with parameter -87"));
        });
        it("should throw an error if the 'b' attribute is greater than 1", function () {
            expect(function () {
                rgb.b(200);
            }).toThrow(new Error("validator failed with parameter 200"));
        });
        it("should throw an error if the 'b' attribute is a string", function () {
            expect(function () {
                rgb.b("moe");
            }).toThrow(new Error("validator failed with parameter moe"));
        });
        it("should throw an error if the 'b' attribute is NaN", function () {
            expect(function () {
                rgb.b(NaN);
            }).toThrow(new Error("validator failed with parameter NaN"));
        });

    });

    describe("parse method", function () {
        it("should parse '0x123456' correctly", function () {
            var rgb2 = RGBColor.parse("0x123456");
            expect(rgb2.r()).toBe(parseInt("12", 16) / 255);
            expect(rgb2.g()).toBe(parseInt("34", 16) / 255);
            expect(rgb2.b()).toBe(parseInt("56", 16) / 255);
        });
        it("should parse '#8dab89' correctly", function () {
            var rgb2 = RGBColor.parse("#8dab89");
            expect(rgb2.r()).toBe(parseInt("8d", 16) / 255);
            expect(rgb2.g()).toBe(parseInt("ab", 16) / 255);
            expect(rgb2.b()).toBe(parseInt("89", 16) / 255);
        });
        it("should parse '#8DAB89' correctly", function () {
            var rgb2 = RGBColor.parse("#8DAB89");
            expect(rgb2.r()).toBe(parseInt("8D", 16) / 255);
            expect(rgb2.g()).toBe(parseInt("AB", 16) / 255);
            expect(rgb2.b()).toBe(parseInt("89", 16) / 255);
        });
        it("should parse '0X020202' correctly", function () {
            var rgb2 = RGBColor.parse("0X020202");
            expect(rgb2.r()).toBe(parseInt("02", 16) / 255);
            expect(rgb2.g()).toBe(parseInt("02", 16) / 255);
            expect(rgb2.b()).toBe(parseInt("02", 16) / 255);
        });
        it("should parse 'black' correctly", function () {
            var rgb2 = RGBColor.parse("black");
            expect(rgb2.r()).toBe(0);
            expect(rgb2.g()).toBe(0);
            expect(rgb2.b()).toBe(0);
        });
        it("should parse 'red' correctly", function () {
            var rgb2 = RGBColor.parse("red");
            expect(rgb2.r()).toBe(1);
            expect(rgb2.g()).toBe(0);
            expect(rgb2.b()).toBe(0);
        });
        it("should parse 'green' correctly", function () {
            var rgb2 = RGBColor.parse("green");
            expect(rgb2.r()).toBe(0);
            expect(rgb2.g()).toBe(1);
            expect(rgb2.b()).toBe(0);
        });
        it("should parse 'blue' correctly", function () {
            var rgb2 = RGBColor.parse("blue");
            expect(rgb2.r()).toBe(0);
            expect(rgb2.g()).toBe(0);
            expect(rgb2.b()).toBe(1);
        });
        it("should parse 'yellow' correctly", function () {
            var rgb2 = RGBColor.parse("yellow");
            expect(rgb2.r()).toBe(1);
            expect(rgb2.g()).toBe(1);
            expect(rgb2.b()).toBe(0);
        });
        it("should parse 'magenta' correctly", function () {
            var rgb2 = RGBColor.parse("magenta");
            expect(rgb2.r()).toBe(1);
            expect(rgb2.g()).toBe(0);
            expect(rgb2.b()).toBe(1);
        });
        it("should parse 'cyan' correctly", function () {
            var rgb2 = RGBColor.parse("cyan");
            expect(rgb2.r()).toBe(0);
            expect(rgb2.g()).toBe(1);
            expect(rgb2.b()).toBe(1);
        });
        it("should parse 'white' correctly", function () {
            var rgb2 = RGBColor.parse("white");
            expect(rgb2.r()).toBe(1);
            expect(rgb2.g()).toBe(1);
            expect(rgb2.b()).toBe(1);
        });
        it("should parse 'grey' correctly", function () {
            var rgb2 = RGBColor.parse("grey");
            expect(rgb2.r()).toBe(parseInt("ee", 16) / 255);
            expect(rgb2.g()).toBe(parseInt("ee", 16) / 255);
            expect(rgb2.b()).toBe(parseInt("ee", 16) / 255);
        });
        it("should parse 'BlAck' correctly", function () {
            var rgb2 = RGBColor.parse("BlAck");
            expect(rgb2.r()).toBe(0);
            expect(rgb2.g()).toBe(0);
            expect(rgb2.b()).toBe(0);
        });
    });

    describe("getHexString method", function () {
        it("should serialize '0x123456' correctly", function () {
            var rgb2 = RGBColor.parse("0x123456");
            expect(rgb2.getHexString()).toBe("0x123456");
        });
        it("should serialize '#878FF9' correctly", function () {
            var rgb2 = RGBColor.parse("#878FF9");
            expect(rgb2.getHexString()).toBe("0x878ff9");
        });
        it("should serialize '0X3434aa' correctly", function () {
            var rgb2 = RGBColor.parse("0X3434aa");
            expect(rgb2.getHexString()).toBe("0x3434aa");
        });
        it("should serialize 'black' correctly", function () {
            var rgb2 = RGBColor.parse("black");
            expect(rgb2.getHexString()).toBe("0x000000");
        });
        it("should serialize 'red' correctly", function () {
            var rgb2 = RGBColor.parse("red");
            expect(rgb2.getHexString()).toBe("0xff0000");
        });
        it("should serialize 'green' correctly", function () {
            var rgb2 = RGBColor.parse("green");
            expect(rgb2.getHexString()).toBe("0x00ff00");
        });
        it("should serialize 'blue' correctly", function () {
            var rgb2 = RGBColor.parse("blue");
            expect(rgb2.getHexString()).toBe("0x0000ff");
        });
        it("should serialize 'yellow' correctly", function () {
            var rgb2 = RGBColor.parse("yellow");
            expect(rgb2.getHexString()).toBe("0xffff00");
        });
        it("should serialize 'magenta' correctly", function () {
            var rgb2 = RGBColor.parse("magenta");
            expect(rgb2.getHexString()).toBe("0xff00ff");
        });
        it("should serialize 'cyan' correctly", function () {
            var rgb2 = RGBColor.parse("cyan");
            expect(rgb2.getHexString()).toBe("0x00ffff");
        });
        it("should serialize 'white' correctly", function () {
            var rgb2 = RGBColor.parse("white");
            expect(rgb2.getHexString()).toBe("0xffffff");
        });
        it("should serialize 'grey' correctly", function () {
            var rgb2 = RGBColor.parse("grey");
            expect(rgb2.getHexString()).toBe("0xeeeeee");
        });
        it("should serialize 'BlAck' correctly", function () {
            var rgb2 = RGBColor.parse("BlAck");
            expect(rgb2.getHexString()).toBe("0x000000");
        });
    });

});
