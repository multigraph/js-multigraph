/*global describe, it, beforeEach, expect, xit, jasmine */

describe("AttrList", function () {
    "use strict";
    var AttrList = window.multigraph.ModelTool.AttrList,
    al;

    beforeEach(function () {
        al = new AttrList("friends");
    });

    it("should be an Attr object", function () {
        expect(al instanceof window.multigraph.ModelTool.Attr).toBe(true);
    });

    it("should have a pop function", function () {
        expect(al.pop).not.toBeUndefined();
    });

    describe("size method", function () {
        it("should be initialized to 0", function () {
            expect(al.size()).toEqual(0);
        });

        it("should increase when an object is added", function () {
            var size = al.size();
            al.add("john");
            expect(al.size()).toEqual(size+1);
        });

        xit("should decrease when an object is removed", function () {

        });
    });

    describe("at method", function () {
        it("should return the element at a given index", function () {
            al.add("john");
            expect(al.at(0)).toEqual("john");
            al.add("semmy");
            expect(al.at(0)).toEqual("john");
            expect(al.at(1)).toEqual("semmy");
            al.add("mark");
            expect(al.at(0)).toEqual("john");
            expect(al.at(1)).toEqual("semmy");
            expect(al.at(2)).toEqual("mark");
        });

        it("should throw an exception if the parameter is out of bounds", function () {
            al.add("john");
            al.add("semmy");

            expect(function() {
                al.at(-1);
            }).toThrow(new Error("AttrList: Index out of bounds"));

            expect(function() {
                al.at(1);
            }).not.toThrow(new Error("AttrList: Index out of bounds"));
  
            expect(function() {
                al.at(2);
            }).toThrow(new Error("AttrList: Index out of bounds"));
        });

    });

    describe("add method", function () {
        it("should add an element to the end of the list", function () {
            al.add("john");
            expect(al.at(al.size()-1)).toEqual("john");
            al.add("semmy");
            expect(al.at(al.size()-2)).toEqual("john");
            expect(al.at(al.size()-1)).toEqual("semmy");
        });

        it("should call the validator function", function () {
            var v = jasmine.createSpy();
            var t = function (friend) {
                v();
                return true;
            };

            al.validatesWith(t);
            al.add("john");
            expect(v).toHaveBeenCalled();

        });

        it("should throw an error when the object does not pass validation", function () {
            expect(function () {
                al.errorsWith("Invalid").validatesWith(function (friend) {
                    return typeof(friend) === 'string';
                }).add(1);
            }).toThrow(new Error("Invalid"));
        });
    });

    describe("addTo method", function () {
        var Person = {};

        it("should add the AttrList to the specified object", function () {
            al.addTo(Person);
            expect(Person.friends).not.toBeUndefined();
            expect(Person.friends().add).not.toBeUndefined();
            expect(Person.friends().at).not.toBeUndefined();
            expect(Person.friends().size).not.toBeUndefined();
        });

        it("should not add any additional AttrList functions to the specified object", function () {
            al.addTo(Person);
            expect(Person.friends().validatesWith).toBeUndefined();
        });


        it("should accept the creation of two lists on the same object", function() {
            var al2 = new AttrList("cats");
            al.addTo(Person);
            al2.addTo(Person);
            expect(Person.friends).not.toBeUndefined();
            expect(Person.cats).not.toBeUndefined();
        });

        //test for the inheritance bug
        it("should allow for multiple attr_lists to be created", function () {
            var al2 = new AttrList("suit");
            
            al.validatesWith(function (suit) {
                return (suit === "diamonds");
            });

            expect(al.validator() !== al2.validator()).toBe(true);
        });

        it("should throw an error if the parameter is not an object", function () {
            expect(function () {
                al.addTo(5);
            }).toThrow(new Error("AttrList: addTo method requires an object parameter"));
        });

    });
});