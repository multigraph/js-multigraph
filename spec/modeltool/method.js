/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Method", function () {
    "use strict";
    var Method = window.multigraph.ModelTool.Method,
    Person,
    m;

    beforeEach(function () {
        m = new Method("runsForOffice", function() { return true; });
        Person = {};
    });

    it("should throw an error on an empty or no string parameter", function () {
        expect(function () {
            m = new Method();
        }).toThrow(new Error("Method: constructor requires a name parameter which must be a string"));

        expect(function () {
            m = new Method(5);
        }).toThrow(new Error("Method: constructor requires a name parameter which must be a string"));
    });

    it("should throw an error if the second parameter is not a function", function () {
        expect(function () {
            m = new Method("function", 5);
        }).toThrow(new Error("Method: second parameter must be a function"));
    });

    describe("addTo method", function () {
        it("should throw an error if the argument is not an object", function () {
            expect(function () {
                m.addTo();
            }).toThrow(new Error("Method: addTo method requires an object parameter"));

            expect(function () {
                m.addTo(5);
            }).toThrow(new Error("Method: addTo method requires an object parameter"));
        });

        it("should add the method to the specified object", function () {
            m.addTo(Person);
            expect(Person.runsForOffice).not.toBeUndefined();
        });
        
        it("should allow the method to be called from the specified object", function () {
            m.addTo(Person);
            expect(Person.runsForOffice()).toBe(true);
        });
    });
});