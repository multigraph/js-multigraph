/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Spec", function () {
    "use strict";
    var Spec = window.multigraph.ModelTool.Spec,
    Attr = window.multigraph.ModelTool.Attr,
    AttrList = window.multigraph.ModelTool.AttrList,
    s;


    beforeEach(function () {
        s = new Spec();
    });

    describe("hasA method", function () {
        it("should create a new Attr with the specified name", function () {
            var a = s.hasA("friend");
            expect(a instanceof Attr).toBe(true);
            expect(s.friend).not.toBeUndefined();
        });

        it("should add the attribute to the spec object", function () {
            s.hasA("friend");
            expect(s.friend).not.toBeUndefined();
        });

        it("should return the Attr object so it can be cascaded with other functions", function () {
            var a = s.hasA("friend");
            expect(a instanceof Attr).toBe(true);
            expect(s.friend).not.toBeUndefined();
            expect(a.validatesWith).not.toBeUndefined();
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                s.hasA(5);
            }).toThrow(new Error("Spec: hasA parameter must be a string"));
        });
    });

    describe("hasAn method", function () {
        it("should be an alias for the hasA method", function () {
            expect(this.hasAn).toEqual(this.hasA);
        });
    });

    describe("hasMany method", function () {
        it("should create a new AttrList object with the specified name", function () {
            var al = s.hasMany("friends");
            expect(al instanceof window.multigraph.ModelTool.AttrList).toBe(true);
        });

        it("should add the AttrList to the Spec object", function () {
            s.hasMany("friends");
            expect(s.friends).not.toBeUndefined();
            expect(s.friends instanceof window.multigraph.ModelTool.AttrList).toBe(true);
        });

        it("should return the AttrList so it can be cascaded", function () {
            var al = s.hasMany("friends");
            expect(al instanceof window.multigraph.ModelTool.AttrList).toBe(true);
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                s.hasMany(5);
            }).toThrow(new Error("Spec: hasMany parameter must be a string"));
        });
    });

    describe("looksLike method", function () {
        xit("should be way more interesting than it currently is", function () {

        });
    });

    describe("create method", function () {
        var s,
        Person,
        p;

        beforeEach(function () {
            s = new Spec();
            s.hasA("name").whichValidatesWith(function (name) {
                return name.length > 3;
            }).and.errorsWith("name must be at least 3 characters");
            
            s.hasAn("id").whichValidatesWith(function (id) {
                return 100000000 <= id && id <= 999999999;
            }).and.errorsWith("id must be 9 digits");

            s.hasMany("friends").whichValidatesWith(function (friend) {
                return friend instanceof Person;
            }).and.errorsWith("friend must be a person");

            Person = s.create();

            p = new Person();

        });

        it("should return a constructor function that creates an object with all attributes", function () {
            expect(p.name).not.toBeUndefined();
            expect(p.id).not.toBeUndefined();
            expect(p.friends).not.toBeUndefined();
            expect(p.friends().add).not.toBeUndefined();
        });

        it("should not add any additional Attr methods", function () {
            expect(Person.validator).toBeUndefined();
            expect(p.validator).toBeUndefined();
            expect(p.validatesWith).toBeUndefined();
            expect(p.whichValidatesWith).toBeUndefined();
        });
    });


    xit("should work with this example", function () {
        /*var Card,
        Deck;


        var Card = new Spec(function () {
            this.hasA("suit");
            this.suit.validatesWith(function (suit) {
                return ["clubs", "diamonds", "hearts", "spades"].indexOf(suit) > -1;
            });

            this.isBuiltWith('rank','suit');

            this.hasA("rank").whichValidatesWith(function (rank) {
                return ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"].indexOf(rank) > -1;
            });
        }).create("Card");


        Deck = new Spec(function () {
            this.hasMany("cards").validatesWith(function (card) {
                return (card instanceof Card); 
            });
        }).create("Deck");*/
    });
});