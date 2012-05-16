/*global describe, it, beforeEach, expect, xit, jasmine */

describe("ModelTool", function () {
    "use strict";
    describe("Model function", function() {
        var Model = window.multigraph.ModelTool.Model;

        xit("should take a name and specification and return an object model", function () {

        });

        xit("should throw an error if the name is not a string", function () {

        });
        
        xit("should throw an error if the specification is not a function", function () {

        });


        it("should work with this example", function () {
            var Card,
            Deck,
            c,
            d;

            Card = new Model("Card", function () {
                this.hasA("suit");
                this.suit.validatesWith(function (suit) {
                    return ["clubs", "diamonds", "hearts", "spades"].indexOf(suit) > -1;
                });
                this.suit.errorsWith("invalid suit");
                
                //this.isBuiltWith('rank','suit');
                
                this.hasA("rank").whichValidatesWith(function (rank) {
                    return ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"].indexOf(rank) > -1;
                });
            });

            Deck = new Model("Deck", function () {
                this.hasMany("cards").validatesWith(function (card) {
                    return (card instanceof Card); 
                });
            });

            c = new Card();
            c.rank("A").suit("hearts");
            expect(c.rank()).toEqual("A");
            expect(c.suit()).toEqual("hearts");

            expect(function () {
                c.suit(4);
            }).toThrow(new Error("invalid suit"));

            d = new Deck();
            expect(d.cards().size()).toBe(0);
            d.cards().add(c);
            expect(d.cards().size()).toBe(1);
        });
    });
});