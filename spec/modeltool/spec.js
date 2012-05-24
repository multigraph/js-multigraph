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
            expect(s.attribute("friend")).not.toBeUndefined();
        });

        it("should add the attribute to the spec object", function () {
            s.hasA("friend");
            expect(s.attribute("friend")).not.toBeUndefined();
        });

        it("should return the Attr object so it can be cascaded with other functions", function () {
            var a = s.hasA("friend");
            expect(a instanceof Attr).toBe(true);
            expect(s.attribute("friend")).not.toBeUndefined();
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
            expect(s.attribute("friends")).not.toBeUndefined();
            expect(s.attribute("friends") instanceof window.multigraph.ModelTool.AttrList).toBe(true);
        });

        it("should return the AttrList so it can be cascaded", function () {
            var al = s.hasMany("friends");
            expect(al instanceof window.multigraph.ModelTool.AttrList).toBe(true);
        });

        it("should be callable twice on the same spec", function() {
            var al = s.hasMany("friends"),
            al2 = s.hasMany("cats");

            expect(s.attribute("friends")).not.toBeUndefined();
            expect(s.attribute("cats")).not.toBeUndefined();
            expect(al instanceof window.multigraph.ModelTool.AttrList).toBe(true);
            expect(al2 instanceof window.multigraph.ModelTool.AttrList).toBe(true);
        });

        it("should be callable twice on 2 different specs", function() {
            var s2 = new Spec(),
            al = s.hasMany("friends"),
            al2 = s2.hasMany("cats");

            expect(s.attribute("friends")).not.toBeUndefined();
            expect(s2.attribute("cats")).not.toBeUndefined();
            expect(al instanceof window.multigraph.ModelTool.AttrList).toBe(true);
            expect(al2 instanceof window.multigraph.ModelTool.AttrList).toBe(true);
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                s.hasMany(5);
            }).toThrow(new Error("Spec: hasMany parameter must be a string"));
        });
    });

    describe("attribute method", function () {
        it("should return the attribute object associated with the attribute name", function () {
            var a,
            al;

            s.hasA("name");
            a = s.attribute("name");
            expect(a instanceof window.multigraph.ModelTool.Attr).toBe(true);
            expect(a instanceof window.multigraph.ModelTool.AttrList).toBe(false);

            s.hasMany("friends");
            al = s.attribute("friends");
            expect(al instanceof window.multigraph.ModelTool.Attr).toBe(true);
            expect(al instanceof window.multigraph.ModelTool.AttrList).toBe(true);
        });

        it("should throw an error if the attribute doesn't exist", function () {
            var a;
            expect(function () {
                a = s.attribute("name");
            }).toThrow(new Error("Spec: attribute name does not exist!"));
        });

        it("should throw an error if the argument is not a string", function () {
            expect(function () {
                s.attribute(5);
            }).toThrow(new Error("Spec: expected string argument to attribute method, but recieved 5"));
        });
    });

    describe("method method", function () {
        it("should return the method object associated with the method name", function () {
            var m;
            s.respondsTo("isAwesome", function () {
                return true;
            });

            m = s.method("isAwesome");

            expect(m instanceof window.multigraph.ModelTool.Method).toBe(true);
        });

        it("should throw an error if the method doesn't exist", function () {
            var m;
            expect(function () {
                m = s.method("isAwesome");
            }).toThrow(new Error("Spec: method isAwesome does not exist!"));
        });

        it("should throw an error if the argument is not a string", function () {
            expect(function () {
                s.method(5);
            }).toThrow(new Error("Spec: expected string argument to method method, but recieved 5"));
        });
    });





    describe("isBuiltWith method", function () {
        it("should take any number of string parameters", function () {
            expect(function () {
                s.isBuiltWith("larry", "moe", 3.4);
            }).toThrow(new Error("Spec: isBuiltWith parameters must be strings except for a function as the optional final parameter"));
            expect(function () {
                s.isBuiltWith("larry", 3.4, "moe", "curly");
            }).toThrow(new Error("Spec: isBuiltWith parameters must be strings except for a function as the optional final parameter"));
            expect(function () {
                s.isBuiltWith("larry", "moe", "curly", "semmy", "john");
            }).not.toThrow(new Error("Spec: isBuiltWith parameters must be strings except for a function as the optional final parameter"));
            s = new Spec();
            expect(function () {
                s.isBuiltWith("larry", "curly", "moe", "semmy", "john", "mark", "anotherMark");
            }).not.toThrow(new Error("Spec: isBuiltWith parameters must be strings except for a function as the optional final parameter"));
        });

        it("should accept a function as an optional final argument", function () {
            var f = function () {
                return true;
            },  g = function () {
                return false;
            };
            expect(function () {
                s.isBuiltWith("larry", "moe", f, g);
            }).toThrow(new Error("Spec: isBuiltWith parameters must be strings except for a function as the optional final parameter"));
            expect(function () {
                s.isBuiltWith("larry", "moe", g, "curly", "semmy", "john");
            }).toThrow(new Error("Spec: isBuiltWith parameters must be strings except for a function as the optional final parameter"));
            expect(function () {
                s.isBuiltWith("larry", f);
            }).not.toThrow(new Error("Spec: isBuiltWith parameters must be strings except for a function as the optional final parameter"));
        });

        it("should accept strings preceded with a % as the final parameters before the optional function", function () {
            expect(function () {
                s.isBuiltWith("larry", "%moe", "curly");
            }).toThrow(new Error("Spec: isBuiltWith requires parameters preceded with a % to be the final parameters before the optional function"));
            expect(function () {
                s.isBuiltWith("larry", "moe", "curly", "%semmy");
            }).not.toThrow(new Error("Spec: isBuiltWith requires parameters preceded with a % to be the final parameters before the optional function"));
            expect(function () {
                s.isBuiltWith("larry", "moe", "curly", "%semmy", "%john", function () { return false; });
            }).not.toThrow(new Error("Spec: isBuiltWith requires parameters preceded with a % to be the final parameters before the optional function"));
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

            s.respondsTo("runsForOffice", function () {
                return this.name() + " is running for office!";
            });

            s.respondsTo("returnsNull", function () {
                return null;
            });

            s.respondsTo("addsTwoNumbers", function (numA, numB) {
                return numA+numB;
            });
            
            Person = s.create();
            p = new Person();
            p.name("Mark");

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

        it("should add all specified methods to the object", function () {
            expect(p.runsForOffice).not.toBeUndefined();
            expect(p.runsForOffice()).toEqual("Mark is running for office!");
            expect(p.returnsNull).not.toBeUndefined();
            expect(p.returnsNull()).toBe(null);
            expect(p.addsTwoNumbers(3,2)).toEqual(5);
        });

        it("should throw an error if any of the strings are not defined as attributes but are specified in isBuiltWith", function () {
            var Person;
            s.hasA("firstName");
            s.hasA("lastName");
            s.hasAn("id");
            s.isBuiltWith("firstName","lastName","ied");
            expect(function () {
                Person = s.create();
            }).toThrow(new Error("ied, specified in the isBuiltWith method, is not an attribute"));

            s.isBuiltWith("firstName","lastName","id");
            expect(function () {
                Person = s.create();
            }).not.toThrow(new Error("ied, specified in the isBuiltWith method, is not an attribute"));

            s.isBuiltWith("firstName","lastName","%ied");
            expect(function () {
                Person = s.create();
            }).toThrow(new Error("ied, specified in the isBuiltWith method, is not an attribute"));

            s.isBuiltWith("firstName","lastName","%id");
            expect(function () {
                Person = s.create();
            }).not.toThrow(new Error("ied, specified in the isBuiltWith method, is not an attribute"));
        });


        it("should require the constructor to be called with the non-% parameters", function () {
            var Person,
            AnotherPerson
            p;
            s.hasA("firstName");
            s.hasA("lastName");
            s.hasAn("id");

            s.isBuiltWith("firstName", "lastName", "%id");

            Person = s.create();

            //s.isBuiltWith("firstName", "lastName", "id");

            //AnotherPerson = s.create();
            
            expect(function () {
                p = new Person("semmy");
            }).toThrow(new Error("Constructor requires firstName, lastName to be specified"));

            expect(function () {
                p = new Person("semmy","purewal");
            }).not.toThrow(new Error("Constructor requires firstName, lastName to be specified"));

            expect(function () {
                p = new Person("semmy","purewal", 100);
            }).not.toThrow(new Error("Constructor requires firstName, lastName to be specified"));
        });

        xit("should require that the resulting constructor's parameters pass the appropriate validators", function () {

        });

        //think of the optional function as an initializer that is run after the attributes are set
        //for example, consider the Deck model. In addition to setting up the hasMany("cards") attribute,
        //we'll want to create a nested for loop that creates a card of each suit/rank combination
        //that would be the 'initializer' function
        xit("should call the optional function after the attributes are set in the constructor", function () {
            
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