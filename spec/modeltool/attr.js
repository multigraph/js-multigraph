/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Attr", function () {
    "use strict";
    var Attr = window.multigraph.ModelTool.Attr,
        suits = ['clubs', 'diamonds', 'hearts', 'spades'],
        suit,
        ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K'],
        rank,
        num,
        obj,
        age,
        Card;

    beforeEach(function () {
        suit = new Attr("suit");
        rank = new Attr("rank");
        num = new Attr("num");
        age = new Attr("age");
        Card = {};
        obj = {};
    });

    it("should throw an error on an empty or no string parameter", function () {
        expect(function () {
            suit = new Attr();
        }).toThrow(new Error("Attr: constructor requires a name parameter which must be a string"));

        expect(function () {
            suit = new Attr(5);
        }).toThrow(new Error("Attr: constructor requires a name parameter which must be a string"));
    });

    it("once added to an object, it should throw a default error if the set value doesn't pass the validator", function () {
        suit.validatesWith(function (suit) {
            return suits.indexOf(suit) > 0;
        });
        suit.addTo(Card);
        expect(function () {
            Card.suit(4);
        }).toThrow(new Error("invalid setter call for suit"));
    });

    describe("isGreaterThan method", function () {
        it("once added to the object, it should throw an error if the argument is not greater than the parameter", function () {
            num.isGreaterThan(5);
            num.addTo(obj);

            expect(function () {
                obj.num(4);
            }).toThrow("4 should be greater than 5");
        });
    });

    describe("isLessThan method", function () {
        it("once added to the object, it should throw an error if the argument is not less than the parameter", function () {
            num.isGreaterThan(5);
            num.isLessThan(10);
            num.addTo(obj);

            expect(function () {
                obj.num(4);
            }).toThrow("4 should be greater than 5");

            expect(function () {
                obj.num(12);
            }).toThrow("12 should be less than 10");
        });
    });

    describe("isA method", function () {
        it("once added to the object, it should throw an error if the argument is not the correct type", function () {
            num.isA("number").and.isGreaterThan(5).and.isLessThan(10);

            num.addTo(obj);

            expect(function () {
                obj.num(4);
            }).toThrow("4 should be greater than 5");

            expect(function () {
                obj.num(12);
            }).toThrow("12 should be less than 10");

            expect(function () {
                obj.num("hello");
            }).toThrow("hello should be a number");
        });

        it("should throw an error if the parameter is a string and not one of the JS predefined types", function () {
            expect(function () {
                num.isA("nmbr");
                num.addTo(obj);
                obj.num(5);
            }).toThrow();
        });
    });

    describe("isOneOf method", function () {
        it("should throw an error if the parameter does not come from the specified set", function () {
            suit.isOneOf(suits);
            suit.addTo(Card);
            expect(function () {
                Card.suit("cubs");
            }).toThrow("cubs should be one of the set: clubs,diamonds,hearts,spades");
        });
    });

    describe("validator method", function () {
        it("should return the validator function", function () {
            expect(typeof(suit.validator())).toBe('function');
        });
    });

    describe("validatesWith method", function () {
        it("should add a new validation criteria", function () {
            var v = function (thing) {
                if (thing === "hello") {
                    return true;
                } else {
                    return false;
                }
            };
            suit.validatesWith(v);
            expect(suit.validator()("hello")).toBe(true);
            expect(suit.validator()("goodbye")).toBe(false);
        });

        it("should allow for a new error message to be set using this.message in the specified function", function () {
            var v = function (num) {
                    this.message = "Expected " + num + " to be bigger than 5";
                    return num > 5;
                };

            suit.validatesWith(v);

            suit.validatesWith(function (num) {
                this.message = "Expected " + num + " to be less than 10";
                return num < 10;
            });

            suit.validatesWith(function (num) {
                this.message = "Expected " + num + " to be divisible by 4";
                return num%4 === 0;
            });

            suit.addTo(obj);
            expect(function () {
                obj.suit(3);
            }).toThrow("Expected 3 to be bigger than 5");

            expect(function () {
                obj.suit(12);
            }).toThrow("Expected 12 to be less than 10");

            expect(function () {
                obj.suit(7);
            }).toThrow("Expected 7 to be divisible by 4");
            
            expect(function () {
                obj.suit(8);
            }).not.toThrow();
        });

        it("should allow for multiple attrs to be created with different validators", function () {
            suit.validatesWith(function (suit) {
                return suits.indexOf(suit) >= 0;
            });

            expect(rank.validator() !== suit.validator()).toBe(true);
        });


        it("should return the Attr object for cascading", function () {
            expect(suit.validatesWith(function () {
                return false;
            })).toEqual(suit);
        });

        it("should throw an error if the argument is not a function", function () {
            expect(function () {
                suit.validatesWith(5);
            }).toThrow(new Error("Attr: validator must be a function"));
        });
    });

    describe("and syntactic sugar", function () {
        it("should return the object", function () {
            expect(suit.and).toEqual(suit);
        });
    });

    describe("which syntactic sugar", function () {
        it("should return the object", function () {
            expect(suit.which).toEqual(suit);
        });
    });

    describe("eachOfWhich syntactic sugar", function () {
        it("should return the object", function () {
            expect(suit.eachOfWhich).toEqual(suit);
        });
    });

    describe("defaultsTo method", function () {
        it("should validate the default value when it is added to an object", function () {
            var spy = jasmine.createSpy(),
            v = function (age) {
                spy();
                return (typeof(age) === "number" && age >= 0);
            };

            age.validatesWith(v).and.defaultsTo(0);
            age.addTo(obj);
            expect(spy).toHaveBeenCalled();

            age.defaultsTo(-5);
            expect(function () {
                age.addTo(obj);
            }).toThrow("Attr: Default value of -5 does not pass validation for age");
        });

        it("should set the attribute to the parameter for all new objects", function () {
            age.defaultsTo(0);
            age.addTo(obj);
            expect(obj.age()).toBe(0);
        });

        it("should return the Attr object for cascading", function () {
            var result = age.defaultsTo(0);
            expect(result).toBe(age);
        });
    });

    /* DEPRECATED */
    describe("errorsWith method", function () {
        it("should set the error string", function () {
            suit.errorsWith("suit must be one of 'clubs', 'diamonds', 'hearts', 'spades'");
            suit.validatesWith(function (suit) {
                return suits.indexOf(suit) > 0;                
            });
            suit.addTo(Card);
            expect(function () {
                Card.suit(5);
            }).toThrow(new Error("suit must be one of 'clubs', 'diamonds', 'hearts', 'spades'"));
        });

        it("should return the Attr object for cascading", function () {
            expect(suit.errorsWith('hello world!')).toEqual(suit);
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                suit.errorsWith(5);
            }).toThrow(new Error("Attr: errorsWith method requires string parameter"));
        });
    });

    /* DEPRECATED */
    describe("errorMessage method", function () {
        it("should return the error message once it is set", function () {
            suit.errorsWith("Test Error Message");
            expect(suit.errorMessage()).toEqual("Test Error Message");
            suit.errorsWith("Test Error Messsage");
            expect(suit.errorMessage()).toEqual("Test Error Messsage");
        });
    });

    describe("isMutable method", function () {
        beforeEach(function () {
            suit.isImmutable().and.validatesWith(function (suit) {
                return suits.indexOf(suit) > -1;
            });
        });

        it("should make a formerly immutable attribute mutable again", function () {
            suit.isMutable();
            suit.addTo(Card);
            Card.suit("clubs");
            expect(Card.suit()).toBe("clubs");
            Card.suit("hearts");
            expect(Card.suit()).toBe("hearts");
            Card.suit("diamonds");
            expect(Card.suit()).toBe("diamonds");
        });

        it("should return the attribute for chaining", function () {
            expect(suit.isMutable()).toBe(suit);
        });
    });

    describe("isImmutable method", function () {
        beforeEach(function () {
            suit.isImmutable().and.validatesWith(function (suit) {
                return suits.indexOf(suit) > -1;
            });
            suit.addTo(Card);
        });

        it("should allow for the setter to be called once after it is added to an object", function () {
            Card.suit("diamonds");
            expect(Card.suit()).toBe("diamonds");
        });

        it("should still validate it the first time it is set", function () {
            expect(function () {
                Card.suit("notARealRank");
            }).toThrow(new Error("invalid setter call for suit"));
        });

        it("should throw an error if the setter is called once the attribute is set", function () {
            Card.suit("diamonds");
            expect(function () {
                Card.suit("hearts");
            }).toThrow(new Error("cannot set the immutable property suit after it has been set"));
        });

        it("should return the Attr object for chaining", function () {
            expect(suit.isImmutable()).toBe(suit);
        });
    });

    describe("addTo method", function () {
        it("should throw an error if the argument is not an object", function () {
            expect(function () {
                suit.addTo();
            }).toThrow(new Error("Attr: addAttr method requires an object parameter"));

            expect(function () {
                suit.addTo(5);
            }).toThrow(new Error("Attr: addAttr method requires an object parameter"));
        });

        it("should add the attribute to the specified object", function () {
            suit.addTo(Card);
            expect(Card.suit).not.toBeUndefined();
        });

        it("should default the value of the attribute to undefined, unless specified otherwise", function () {
            suit.addTo(Card);
            expect(Card.suit()).toBeUndefined();
        });

    });

    describe("resulting getter/setter", function () {
        it("should correctly set the attribute, even if it is falsy", function () {
            var attr = new Attr("x"),
                obj = {};
            attr.addTo(obj);
            obj.x(0);
            expect(obj.x()).toBe(0);
        });
    });

    describe("clone method", function () {
        it("should clone all aspects of the attribute and return a new one", function () {
            var attribute = new Attr("test"),
                validator = function () {
                    return 5 > 3;
                },
                error = "5 must be greater than 3",
                def = 5,
                clonedAttr,
                objA = {},
                objB = {};

            attribute.validatesWith(validator).and.errorsWith(error).and.defaultsTo(def);
            clonedAttr = attribute.clone();
            
            expect(clonedAttr.validator()()).toBe(true);
            expect(clonedAttr.errorMessage()).toBe(error);
            
            attribute.addTo(objA);
            clonedAttr.addTo(objB);
            
            expect(objA.test()).toBe(def);
            expect(objB.test()).toBe(def);
            expect(objA.test()).toEqual(objB.test());
        });
    });
    
    describe("static addValidator method", function () {
        it("should throw an error if the first parameter is absent or not a string", function () {
            expect(function () {
                Attr.addValidator();
            }).toThrow(new Error("addValidator requires a name to be specified as the first parameter"));

            expect(function () {
                Attr.addValidator(5);
            }).toThrow(new Error("addValidator requires a name to be specified as the first parameter"));
        });

        it("should throw an error if the second parameter is absent or not a function", function () {
            expect(function () {
                Attr.addValidator("isGreaterThan");
            }).toThrow("addValidator requires a function as the second parameter");

            expect(function () {
                Attr.addValidator("isGreaterThan", 5);
            }).toThrow("addValidator requires a function as the second parameter");
        });


        it("should add the validator object to the static validators list", function () {
            expect(function () {
                Attr.addValidator("isGreaterThan5", function (thing) {
                    this.message = "Expected " + thing + " to be greater than 5";
                    return thing > 5;
                });
            }).not.toThrow();

            expect((new Attr("whatever")).isGreaterThan5).not.toBeUndefined();
        });

        it("should throw an error if a validator is added that already exists", function () {
            expect(function () {
                Attr.addValidator("isGreaterThan5", function (thing) {
                    return false;
                });
            }).toThrow("Validator 'isGreaterThan5' already defined");
        });
    });


    describe("full example", function () {
        it("should work with this example", function () {
            rank = new Attr("rank").which.isA('string').and.isOneOf(ranks);
            suit = new Attr("suit").which.isA('string').and.isOneOf(suits);

            rank.addTo(Card);
            suit.addTo(Card);

            Card.rank("5").suit("clubs");
            expect(Card.suit()).toEqual("clubs");
            expect(Card.rank()).toEqual("5");

            expect(function () {
                Card.rank(5);
            }).toThrow();

            expect(function () {
                Card.rank("5");
            }).not.toThrow();
        });
    });
});