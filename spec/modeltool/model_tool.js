/*global describe, it, beforeEach, expect, xit, jasmine */

describe("ModelTool", function () {
    "use strict";
    describe("Model function", function() {
        var model = window.multigraph.ModelTool.Model,
        Attr = window.multigraph.ModelTool.Attr,
        Axis;

        beforeEach(function() {
            Axis = model('Axis', function() {
                this.hasA("id");
                this.hasMany("things");
                
            });
        });

        it("should take a name and specification and return an object model", function () {
            var a;
            
            a = new Axis();
            expect(a.id).not.toBeUndefined();
            expect(typeof(a.id) === 'function').toBe(true);
            expect(a instanceof Axis).toBe(true);
        });
        
        it("should allow two models with hasMany to be created", function() {
            var Graph,
            g,
            a;
            Graph = model('Graph', function() {
                this.hasMany("axes").which.validatesWith(function (axis) {
                    return axis instanceof Axis;
                });
            });         
            g = new Graph();
            a = new Axis();
            
            g.axes().add(a);
            expect(a instanceof Axis).toBe(true);
            
            expect(a.id).not.toBeUndefined();
            expect(typeof(a.id) === 'function').toBe(true);
            expect(a instanceof Axis).toBe(true);
            expect(g.axes).not.toBeUndefined();
            expect(typeof(g.axes) === 'function').toBe(true);
            expect(g instanceof Graph).toBe(true);
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

            Card = model("Card", function () {
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

            Deck = model("Deck", function () {
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