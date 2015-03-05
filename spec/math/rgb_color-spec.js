/*global describe, it, beforeEach, expect, xit, jasmine */

describe("RGBColor", function () {
    "use strict";

    var RGBColor = require('../../src/math/rgb_color.js'),
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
        var rgb2;
        describe("long hex strings", function () {
            it("should parse '0x123456' correctly", function () {
                rgb2 = RGBColor.parse("0x123456");
                expect(rgb2.r()).toBe(parseInt("12", 16) / 255);
                expect(rgb2.g()).toBe(parseInt("34", 16) / 255);
                expect(rgb2.b()).toBe(parseInt("56", 16) / 255);
            });
            it("should parse '#8dab89' correctly", function () {
                rgb2 = RGBColor.parse("#8dab89");
                expect(rgb2.r()).toBe(parseInt("8d", 16) / 255);
                expect(rgb2.g()).toBe(parseInt("ab", 16) / 255);
                expect(rgb2.b()).toBe(parseInt("89", 16) / 255);
            });
            it("should parse '#8DAB89' correctly", function () {
                rgb2 = RGBColor.parse("#8DAB89");
                expect(rgb2.r()).toBe(parseInt("8D", 16) / 255);
                expect(rgb2.g()).toBe(parseInt("AB", 16) / 255);
                expect(rgb2.b()).toBe(parseInt("89", 16) / 255);
            });
            it("should parse '0X020202' correctly", function () {
                rgb2 = RGBColor.parse("0X020202");
                expect(rgb2.r()).toBe(parseInt("02", 16) / 255);
                expect(rgb2.g()).toBe(parseInt("02", 16) / 255);
                expect(rgb2.b()).toBe(parseInt("02", 16) / 255);
            });
        });
        describe("shorthand hex strings", function () {
            it("should parse '0x000' correctly", function () {
                rgb2 = RGBColor.parse("0x000");
                expect(rgb2.r()).toBe(parseInt("00", 16) / 255);
                expect(rgb2.g()).toBe(parseInt("00", 16) / 255);
                expect(rgb2.b()).toBe(parseInt("00", 16) / 255);
            });
            it("should parse '#efb' correctly", function () {
                rgb2 = RGBColor.parse("#efb");
                expect(rgb2.r()).toBe(parseInt("ee", 16) / 255);
                expect(rgb2.g()).toBe(parseInt("ff", 16) / 255);
                expect(rgb2.b()).toBe(parseInt("bb", 16) / 255);
            });
            it("should parse '#8Fb' correctly", function () {
                rgb2 = RGBColor.parse("#8Fb");
                expect(rgb2.r()).toBe(parseInt("88", 16) / 255);
                expect(rgb2.g()).toBe(parseInt("ff", 16) / 255);
                expect(rgb2.b()).toBe(parseInt("bb", 16) / 255);
            });
            it("should parse '0X123' correctly", function () {
                rgb2 = RGBColor.parse("0X123");
                expect(rgb2.r()).toBe(parseInt("11", 16) / 255);
                expect(rgb2.g()).toBe(parseInt("22", 16) / 255);
                expect(rgb2.b()).toBe(parseInt("33", 16) / 255);
            });

        });

        describe("named color strings", function () {
            it("should parse 'black' correctly", function () {
                rgb2 = RGBColor.parse("black");
                expect(rgb2.r()).toBe(0);
                expect(rgb2.g()).toBe(0);
                expect(rgb2.b()).toBe(0);
            });
            it("should parse 'red' correctly", function () {
                rgb2 = RGBColor.parse("red");
                expect(rgb2.r()).toBe(1);
                expect(rgb2.g()).toBe(0);
                expect(rgb2.b()).toBe(0);
            });
            it("should parse 'green' correctly", function () {
                rgb2 = RGBColor.parse("green");
                expect(rgb2.r()).toBe(0);
                expect(rgb2.g()).toBe(1);
                expect(rgb2.b()).toBe(0);
            });
            it("should parse 'blue' correctly", function () {
                rgb2 = RGBColor.parse("blue");
                expect(rgb2.r()).toBe(0);
                expect(rgb2.g()).toBe(0);
                expect(rgb2.b()).toBe(1);
            });
            it("should parse 'yellow' correctly", function () {
                rgb2 = RGBColor.parse("yellow");
                expect(rgb2.r()).toBe(1);
                expect(rgb2.g()).toBe(1);
                expect(rgb2.b()).toBe(0);
            });
            it("should parse 'magenta' correctly", function () {
                rgb2 = RGBColor.parse("magenta");
                expect(rgb2.r()).toBe(1);
                expect(rgb2.g()).toBe(0);
                expect(rgb2.b()).toBe(1);
            });
            it("should parse 'cyan' correctly", function () {
                rgb2 = RGBColor.parse("cyan");
                expect(rgb2.r()).toBe(0);
                expect(rgb2.g()).toBe(1);
                expect(rgb2.b()).toBe(1);
            });
            it("should parse 'white' correctly", function () {
                rgb2 = RGBColor.parse("white");
                expect(rgb2.r()).toBe(1);
                expect(rgb2.g()).toBe(1);
                expect(rgb2.b()).toBe(1);
            });
            it("should parse 'grey' correctly", function () {
                rgb2 = RGBColor.parse("grey");
                expect(rgb2.r()).toBe(parseInt("ee", 16) / 255);
                expect(rgb2.g()).toBe(parseInt("ee", 16) / 255);
                expect(rgb2.b()).toBe(parseInt("ee", 16) / 255);
            });
            it("should parse 'skyblue' correctly", function () {
                rgb2 = RGBColor.parse("skyblue");
                expect(rgb2.r()).toEqual(parseInt("87", 16) / 255);
                expect(rgb2.g()).toEqual(parseInt("ce", 16) / 255);
                expect(rgb2.b()).toEqual(parseInt("eb", 16) / 255);
            });
            it("should parse 'khaki' correctly", function () {
                rgb2 = RGBColor.parse("khaki");
                expect(rgb2.r()).toEqual(parseInt("f0", 16) / 255);
                expect(rgb2.g()).toEqual(parseInt("e6", 16) / 255);
                expect(rgb2.b()).toEqual(parseInt("8c", 16) / 255);
            });
            it("should parse 'orange' correctly", function () {
                rgb2 = RGBColor.parse("orange");
                expect(rgb2.r()).toEqual(parseInt("ff", 16) / 255);
                expect(rgb2.g()).toEqual(parseInt("a5", 16) / 255);
                expect(rgb2.b()).toEqual(parseInt("00", 16) / 255);
            });
            it("should parse 'salmon' correctly", function () {
                rgb2 = RGBColor.parse("salmon");
                expect(rgb2.r()).toEqual(parseInt("fa", 16) / 255);
                expect(rgb2.g()).toEqual(parseInt("80", 16) / 255);
                expect(rgb2.b()).toEqual(parseInt("72", 16) / 255);
            });
            it("should parse 'olive' correctly", function () {
                rgb2 = RGBColor.parse("olive");
                expect(rgb2.r()).toEqual(parseInt("9a", 16) / 255);
                expect(rgb2.g()).toEqual(parseInt("cd", 16) / 255);
                expect(rgb2.b()).toEqual(parseInt("32", 16) / 255);
            });
            it("should parse 'sienna' correctly", function () {
                rgb2 = RGBColor.parse("sienna");
                expect(rgb2.r()).toEqual(parseInt("a0", 16) / 255);
                expect(rgb2.g()).toEqual(parseInt("52", 16) / 255);
                expect(rgb2.b()).toEqual(parseInt("2d", 16) / 255);
            });
            it("should parse 'pink' correctly", function () {
                rgb2 = RGBColor.parse("pink");
                expect(rgb2.r()).toEqual(parseInt("ff", 16) / 255);
                expect(rgb2.g()).toEqual(parseInt("b5", 16) / 255);
                expect(rgb2.b()).toEqual(parseInt("c5", 16) / 255);
            });
            it("should parse 'violet' correctly", function () {
                rgb2 = RGBColor.parse("violet");
                expect(rgb2.r()).toEqual(parseInt("ee", 16) / 255);
                expect(rgb2.g()).toEqual(parseInt("82", 16) / 255);
                expect(rgb2.b()).toEqual(parseInt("ee", 16) / 255);
            });
            it("should parse 'BlAck' correctly", function () {
                rgb2 = RGBColor.parse("BlAck");
                expect(rgb2.r()).toBe(0);
                expect(rgb2.g()).toBe(0);
                expect(rgb2.b()).toBe(0);
            });
        });

        describe("incorrect input", function () {
            it("should throw an error if a hex string is not 3 or 6 characters long", function () {
                expect(function () {
                    rgb2 = RGBColor.parse("0x11");
                //}).toThrowError("'0x11' is not a valid color");
                }).toThrow();
                expect(function () {
                    rgb2 = RGBColor.parse("0x1111");
                //}).toThrowError("'0x1111' is not a valid color");
                }).toThrow();
                expect(function () {
                    rgb2 = RGBColor.parse("0xab34343");
                //}).toThrowError("'0xab34343' is not a valid color");
                }).toThrow();
                expect(function () {
                    rgb2 = RGBColor.parse("0x343434");
                //}).not.toThrowError("'0x343434' is not a valid color");
                }).not.toThrow();
            });
            it("should throw an error if a hex string contains a character other than [0-9] or [a-f|A-F]", function () {
                expect(function () {
                    rgb2 = RGBColor.parse("0x1222Tg");
                //}).toThrowError("'0x1222Tg' is not a valid color");
                }).toThrow();
                expect(function () {
                    rgb2 = RGBColor.parse("0xX2X2X2");
                //}).toThrowError("'0xX2X2X2' is not a valid color");
                }).toThrow();
                expect(function () {
                    rgb2 = RGBColor.parse("0xF0`");
                //}).toThrowError("'0xF0`' is not a valid color");
                }).toThrow();
            });
            it("should throw an error if a named string is not one of the specified names", function () {
                expect(function () {
                    rgb2 = RGBColor.parse("red~ish");
                //}).toThrowError("'red~ish' is not a valid color");
                }).toThrow();
                expect(function () {
                    rgb2 = RGBColor.parse("pin");
                //}).toThrowError("'pin' is not a valid color");
                }).toThrow();
                expect(function () {
                    rgb2 = RGBColor.parse("teal");
                //}).toThrowError("'teal' is not a valid color");
                }).toThrow();
            });
        });
    });

    describe("getHexString method", function () {
        var rgb2;
        it("should serialize '0x123456' correctly", function () {
            rgb2 = RGBColor.parse("0x123456");
            expect(rgb2.getHexString()).toBe("0x123456");
        });
        it("should serialize '#878FF9' correctly", function () {
            rgb2 = RGBColor.parse("#878FF9");
            expect(rgb2.getHexString()).toBe("0x878ff9");
        });
        it("should serialize '0X3434aa' correctly", function () {
            rgb2 = RGBColor.parse("0X3434aa");
            expect(rgb2.getHexString()).toBe("0x3434aa");
        });
        it("should serialize 'black' correctly", function () {
            rgb2 = RGBColor.parse("black");
            expect(rgb2.getHexString()).toBe("0x000000");
        });
        it("should serialize 'red' correctly", function () {
            rgb2 = RGBColor.parse("red");
            expect(rgb2.getHexString()).toBe("0xff0000");
        });
        it("should serialize 'green' correctly", function () {
            rgb2 = RGBColor.parse("green");
            expect(rgb2.getHexString()).toBe("0x00ff00");
        });
        it("should serialize 'blue' correctly", function () {
            rgb2 = RGBColor.parse("blue");
            expect(rgb2.getHexString()).toBe("0x0000ff");
        });
        it("should serialize 'yellow' correctly", function () {
            rgb2 = RGBColor.parse("yellow");
            expect(rgb2.getHexString()).toBe("0xffff00");
        });
        it("should serialize 'magenta' correctly", function () {
            rgb2 = RGBColor.parse("magenta");
            expect(rgb2.getHexString()).toBe("0xff00ff");
        });
        it("should serialize 'cyan' correctly", function () {
            rgb2 = RGBColor.parse("cyan");
            expect(rgb2.getHexString()).toBe("0x00ffff");
        });
        it("should serialize 'white' correctly", function () {
            rgb2 = RGBColor.parse("white");
            expect(rgb2.getHexString()).toBe("0xffffff");
        });
        it("should serialize 'grey' correctly", function () {
            rgb2 = RGBColor.parse("grey");
            expect(rgb2.getHexString()).toBe("0xeeeeee");
        });
        it("should serialize 'BlAck' correctly", function () {
            rgb2 = RGBColor.parse("BlAck");
            expect(rgb2.getHexString()).toBe("0x000000");
        });
    });

    describe("eq method", function () {
        it("should return true when testing RGBColor(.2,.8,.1) and RGBColor(.2,.8,.1)", function () {
            var c1 = new RGBColor(0.2,0.8,0.1);
            var c2 = new RGBColor(0.2,0.8,0.1);
            expect(c1.eq(c2)).toBe(true);
        });
        it("should return false when testing RGBColor(.2,.8,.1) and RGBColor(.6,.8,.1)", function () {
            var c1 = new RGBColor(0.2,0.8,0.1);
            var c2 = new RGBColor(0.6,0.8,0.1);
            expect(c1.eq(c2)).toBe(false);
        });
        it("should return true when testing RGBColor(.2,.8,.1) and RGBColor(.2,.6,.1)", function () {
            var c1 = new RGBColor(0.2,0.8,0.1);
            var c2 = new RGBColor(0.2,0.6,0.1);
            expect(c1.eq(c2)).toBe(false);
        });
        it("should return true when testing RGBColor(.2,.8,.1) and RGBColor(.2,.8,.6)", function () {
            var c1 = new RGBColor(0.2,0.8,0.1);
            var c2 = new RGBColor(0.2,0.8,0.6);
            expect(c1.eq(c2)).toBe(false);
        });
    });

});
