/*global describe, it, beforeEach, expect, xit, jasmine */

describe("AttrList", function () {
    "use strict";
    var AttrList = window.multigraph.ModelTool.AttrList,
    al,
    obj;

    beforeEach(function () {
        al = new AttrList("friends");
        obj = {};
        al.addTo(obj);
    });

    it("should be an Attr object", function () {
        expect(al instanceof window.multigraph.ModelTool.Attr).toBe(true);
    });

    it("should have a pop function", function () {
        expect(obj.friends().pop).not.toBeUndefined();
    });

    describe("size method", function () {
        it("should be initialized to 0", function () {
            expect(obj.friends().size()).toEqual(0);
        });

        it("should increase when an object is added", function () {
            var size = al.size();
            obj.friends().add("john");
            expect(al.size()).toEqual(size+1);
        });

        xit("should decrease when an object is removed", function () {

        });
    });

    describe("at method", function () {
        it("should return the element at a given index", function () {
            obj.friends().add("john");
            expect(obj.friends().at(0)).toEqual("john");
            obj.friends().add("semmy");
            expect(obj.friends().at(0)).toEqual("john");
            expect(obj.friends().at(1)).toEqual("semmy");
            obj.friends().add("mark");
            expect(obj.friends().at(0)).toEqual("john");
            expect(obj.friends().at(1)).toEqual("semmy");
            expect(obj.friends().at(2)).toEqual("mark");
        });

        it("should throw an exception if the parameter is out of bounds", function () {
            obj.friends().add("john");
            obj.friends().add("semmy");

            expect(function() {
                obj.friends().at(-1);
            }).toThrow(new Error("AttrList: Index out of bounds"));

            expect(function() {
                obj.friends().at(1);
            }).not.toThrow(new Error("AttrList: Index out of bounds"));
  
            expect(function() {
                obj.friends().at(2);
            }).toThrow(new Error("AttrList: Index out of bounds"));
        });

    });

    describe("add method", function () {
        it("should add an element to the end of the list", function () {
            obj.friends().add("john");
            expect(obj.friends().at(obj.friends().size()-1)).toEqual("john");
            obj.friends().add("semmy");
            expect(obj.friends().at(obj.friends().size()-2)).toEqual("john");
            expect(obj.friends().at(obj.friends().size()-1)).toEqual("semmy");
        });

        it("should call the validator function", function () {
            var v = jasmine.createSpy();
            var t = function (friend) {
                v();
                return true;
            };

            al.validatesWith(t);
            al.addTo(obj);
            obj.friends().add("john");
            expect(v).toHaveBeenCalled();

        });

        it("should throw an error when the object does not pass validation", function () {
            expect(function () {
                al.errorsWith("Invalid").validatesWith(function (friend) {
                    return typeof(friend) === 'string';
                });
                al.addTo(obj);
                obj.friends().add(1);
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