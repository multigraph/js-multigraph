/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Attr", function () {
    "use strict";
    var Attr = window.multigraph.ModelTool.Attr,
    suits = ['clubs', 'diamonds', 'hearts', 'spades'],
    a,
    Card;

    beforeEach(function () {
        a = new Attr("suit");
        Card = {};
    });

    it("should throw an error on an empty or no string parameter", function () {
        expect(function () {
            a = new Attr();
        }).toThrow(new Error("Attr: constructor requires a name parameter which must be a string"));

        expect(function () {
            a = new Attr(5);
        }).toThrow(new Error("Attr: constructor requires a name parameter which must be a string"));
    });

    it("should throw an error if the error argument is not a string", function () {
        expect(function () {
            a = new Attr("suit", 5);
        }).toThrow(new Error("Attr: second parameter should be a string representing an error message"));
    });

    it("once added to an object, it should throw a default error if the set value doesn't pass the validator", function () {
        a.validatesWith(function (suit) {
            return suits.indexOf(suit) > 0;
        });
        a.addTo(Card);
        expect(function () {
            Card.suit(4);
        }).toThrow(new Error("invalid setter call for suit"));
    });

    describe("validator method", function () {
        var validator;
        it("should return the validator function", function () {
            validator = a.validator();
            expect(typeof(validator)).toBe('function');
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
            a.validatesWith(v);
            expect(a.validator()("hello")).toBe(true);
            expect(a.validator()("goodbye")).toBe(false);
        });

        it("should allow for a new error message to be set using this.message in the specified function", function () {
            var obj = {},
                v = function (num) {
                    this.message = "Expected " + num + " to be bigger than 5";
                    return num > 5;
                };

            a.validatesWith(v);

            a.validatesWith(function (num) {
                this.message = "Expected " + num + " to be less than 10";
                return num < 10;
            });

            a.validatesWith(function (num) {
                this.message = "Expected " + num + " to be divisible by 4";
                return num%4 === 0;
            });

            a.addTo(obj);
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
            var r;
            
            a.validatesWith(function (suit) {
                return ["clubs", "diamonds", "hearts", "spades"].indexOf(suit) >= 0;
            });

            r = new Attr("rank");
            expect(r.validator() !== a.validator()).toBe(true);
        });


        it("should return the Attr object for cascading", function () {
            expect(a.validatesWith(function () {
                return false;
            })).toEqual(a);
        });

        it("should throw an error if the argument is not a function", function () {
            expect(function () {
                a.validatesWith(5);
            }).toThrow(new Error("Attr: validator must be a function"));
        });
    });

    /* DEPRECATED */
    /*describe("whichValidatesWith method", function () {
        xit("should be an alias for the validatesWith method", function () {
            expect(a.validatesWith).toEqual(a.whichValidatesWith);
        });
    });*/

    describe("and syntactic sugar", function () {
        it("should return the object", function () {
            expect(a.and).toEqual(a);
        });
    });

    describe("which syntactic sugar", function () {
        it("should return the object", function () {
            expect(a.which).toEqual(a);
        });
    });

    describe("defaultsTo method", function () {
        var age,
        obj;
        beforeEach(function () {
            obj = {},
            age = new Attr("age");
        });

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

    describe("errorsWith method", function () {
        it("should set the error string", function () {
            a.errorsWith("suit must be one of 'clubs', 'diamonds', 'hearts', 'spades'");
            a.validatesWith(function (suit) {
                return suits.indexOf(suit) > 0;                
            });
            a.addTo(Card);
            expect(function () {
                Card.suit(5);
            }).toThrow(new Error("suit must be one of 'clubs', 'diamonds', 'hearts', 'spades'"));
        });

        it("should return the Attr object for cascading", function () {
            expect(a.errorsWith('hello world!')).toEqual(a);
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                a.errorsWith(5);
            }).toThrow(new Error("Attr: errorsWith method requires string parameter"));
        });
    });

    /* DEPRECATED */
    /*describe("whichErrorsWith method", function () {
        expect(a.errorsWith).toEqual(a.whichErrorsWith);
    });*/
    //);

    describe("errorMessage method", function () {
        it("should return the error message once it is set", function () {
            a.errorsWith("Test Error Message");
            expect(a.errorMessage()).toEqual("Test Error Message");
            a.errorsWith("Test Error Messsage");
            expect(a.errorMessage()).toEqual("Test Error Messsage");
        });
    });

    describe("isMutable method", function () {
        var card;
        
        beforeEach(function () {
            card = {};
            a.isImmutable().and.validatesWith(function (suit) {
                return ["clubs", "diamonds", "hearts", "spades"].indexOf(suit) > -1;
            });
        });

        it("should make a formerly immutable attribute mutable again", function () {
            a.isMutable();
            a.addTo(card);
            card.suit("clubs");
            expect(card.suit()).toBe("clubs");
            card.suit("hearts");
            expect(card.suit()).toBe("hearts");
            card.suit("diamonds");
            expect(card.suit()).toBe("diamonds");
        });

        it("should return the attribute for chaining", function () {
            expect(a.isMutable()).toBe(a);
        });

    });

    describe("isImmutable method", function () {
        var card;

        beforeEach(function () {
            card = {};
            a.isImmutable().and.validatesWith(function (suit) {
                return ["clubs", "diamonds", "hearts", "spades"].indexOf(suit) > -1;
            });
            a.addTo(card);
        });

        it("should allow for the setter to be called once after it is added to an object", function () {
            card.suit("diamonds");
            expect(card.suit()).toBe("diamonds");
        });

        it("should still validate it the first time it is set", function () {
            expect(function () {
                card.suit("notARealRank");
            }).toThrow(new Error("invalid setter call for suit"));
        });

        it("should throw an error if the setter is called once the attribute is set", function () {
            card.suit("diamonds");
            expect(function () {
                card.suit("hearts");
            }).toThrow(new Error("cannot set the immutable property suit after it has been set"));
        });

        it("should return the Attr object for chaining", function () {
            expect(a.isImmutable()).toBe(a);
        });
    });

    describe("addTo method", function () {
        it("should throw an error if the argument is not an object", function () {
            expect(function () {
                a.addTo();
            }).toThrow(new Error("Attr: addAttr method requires an object parameter"));

            expect(function () {
                a.addTo(5);
            }).toThrow(new Error("Attr: addAttr method requires an object parameter"));
        });

        it("should add the attribute to the specified object", function () {
            a.addTo(Card);
            expect(Card.suit).not.toBeUndefined();
        });

        it("should default the value of the attribute to undefined, unless specified otherwise", function () {
            a.addTo(Card);
            expect(Card.suit()).toBeUndefined();
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
    
    describe("full example", function () {
        it("should work with this example", function () {
            var ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
        
            var rank = new Attr("rank");
            rank.validatesWith(function (rank) {
                return ranks.indexOf(rank) >= 0;
            });
            rank.errorsWith("rank must be a normal card rank");

            var suit = new Attr("suit")
                .which.validatesWith(function (suit) {
                    return suits.indexOf(suit) >= 0;
                })
                .and.errorsWith("suit must be a normal card suit");
            
            var Card = {};

            rank.addTo(Card);
            suit.addTo(Card);

            Card.rank("5").suit("clubs");
            expect(Card.suit()).toEqual("clubs");
            expect(Card.rank()).toEqual("5");
        });
    });
});