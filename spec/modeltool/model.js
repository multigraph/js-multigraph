/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Model", function () {
    "use strict";
    var Model = window.multigraph.ModelTool.Model,
    Attr = window.multigraph.ModelTool.Attr,
    AttrList = window.multigraph.ModelTool.AttrList,
    s;


    beforeEach(function () {
        s = new Model();
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
            }).toThrow(new Error("Model: hasA parameter must be a string"));
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

        it("should add the AttrList to the Model object", function () {
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
            var s2 = new Model(),
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
            }).toThrow(new Error("Model: hasMany parameter must be a string"));
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
            }).toThrow(new Error("Model: attribute name does not exist!"));
        });

        it("should throw an error if the argument is not a string", function () {
            expect(function () {
                s.attribute(5);
            }).toThrow(new Error("Model: expected string argument to attribute method, but recieved 5"));
        });
    });

    describe("attributes method", function () {
        it("should return an empty array if the model has no attributes", function () {
            expect(s.attributes()).toEqual([]);
        });

        it("should return an array of Model attribute names", function () {
            s.hasA("firstName");
            s.hasA("lastName");
            s.hasAn("id");
            expect(s.attributes().length === 3);
            expect(s.attributes().indexOf("firstName") > -1).toBe(true);
            expect(s.attributes().indexOf("lastName") > -1).toBe(true);
            expect(s.attributes().indexOf("id") > -1).toBe(true);
        });


    });

    describe("methods method", function () {
        it("should return an empty array if the model has no methods", function () {
            expect(s.methods()).toEqual([]);
        });

        it("should return an array of Model method names", function () {
            s.respondsTo("runsForOffice", function () {});
            s.respondsTo("somethingElse", function () {});
            expect(s.methods().length === 2);
            expect(s.methods().indexOf("runsForOffice") > -1).toBe(true);
            expect(s.methods().indexOf("somethingElse") > -1).toBe(true);
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
            }).toThrow(new Error("Model: method isAwesome does not exist!"));
        });

        it("should throw an error if the argument is not a string", function () {
            expect(function () {
                s.method(5);
            }).toThrow(new Error("Model: expected string argument to method method, but recieved 5"));
        });
    });

    describe("isBuiltWith method", function () {
        it("should take any number of string parameters", function () {
            expect(function () {
                s.isBuiltWith("larry", "moe", 3.4);
            }).toThrow(new Error("Model: isBuiltWith parameters must be strings except for a function as the optional final parameter"));
            expect(function () {
                s.isBuiltWith("larry", 3.4, "moe", "curly");
            }).toThrow(new Error("Model: isBuiltWith parameters must be strings except for a function as the optional final parameter"));
            expect(function () {
                s.isBuiltWith("larry", "moe", "curly", "semmy", "john");
            }).not.toThrow(new Error("Model: isBuiltWith parameters must be strings except for a function as the optional final parameter"));
            s = new Model();
            expect(function () {
                s.isBuiltWith("larry", "curly", "moe", "semmy", "john", "mark", "anotherMark");
            }).not.toThrow(new Error("Model: isBuiltWith parameters must be strings except for a function as the optional final parameter"));
        });

        it("should accept a function as an optional final argument", function () {
            var f = function () {
                return true;
            },  g = function () {
                return false;
            };
            expect(function () {
                s.isBuiltWith("larry", "moe", f, g);
            }).toThrow(new Error("Model: isBuiltWith parameters must be strings except for a function as the optional final parameter"));
            expect(function () {
                s.isBuiltWith("larry", "moe", g, "curly", "semmy", "john");
            }).toThrow(new Error("Model: isBuiltWith parameters must be strings except for a function as the optional final parameter"));
            expect(function () {
                s.isBuiltWith("larry", f);
            }).not.toThrow(new Error("Model: isBuiltWith parameters must be strings except for a function as the optional final parameter"));
        });

        it("should accept strings preceded with a % as the final parameters before the optional function", function () {
            expect(function () {
                s.isBuiltWith("larry", "%moe", "curly");
            }).toThrow(new Error("Model: isBuiltWith requires parameters preceded with a % to be the final parameters before the optional function"));
            expect(function () {
                s.isBuiltWith("larry", "moe", "curly", "%semmy");
            }).not.toThrow(new Error("Model: isBuiltWith requires parameters preceded with a % to be the final parameters before the optional function"));
            expect(function () {
                s.isBuiltWith("larry", "moe", "curly", "%semmy", "%john", function () { return false; });
            }).not.toThrow(new Error("Model: isBuiltWith requires parameters preceded with a % to be the final parameters before the optional function"));
        });


    });

    describe("looksLike method", function () {
        xit("should be way more interesting than it currently is", function () {

        });
    });

    describe("validate method", function () {
        var Person,
        m;

        beforeEach(function () {
            m = new Model();
        });

        it("should throw an error if any of the strings are not defined as attributes but are specified in isBuiltWith", function () {
            m.hasA("firstName");
            m.hasA("lastName");
            m.hasAn("id");
            m.isBuiltWith("firstName","lastName","ied");
            expect(function () {
                Person = m.validate();
            }).toThrow(new Error("ied, specified in the isBuiltWith method, is not an attribute"));

            m.isBuiltWith("firstName","lastName","id");
            expect(function () {
                Person = m.validate();
            }).not.toThrow(new Error("ied, specified in the isBuiltWith method, is not an attribute"));

            m.isBuiltWith("firstName","lastName","%ied");
            expect(function () {
                Person = m.validate();
            }).toThrow(new Error("ied, specified in the isBuiltWith method, is not an attribute"));

            m.isBuiltWith("firstName","lastName","%id");
            expect(function () {
                Person = m.validate();
            }).not.toThrow(new Error("ied, specified in the isBuiltWith method, is not an attribute"));
        });

        it("should throw an error on method/attribute name collisions", function () {
            m.hasA("firstName");
            m.respondsTo("firstName", function () {});
            expect(function () {
                m.validate();
            }).toThrow(new Error("Model: invalid model specification to firstName being both an attribute and method"));
        });
    });

    describe("create method", function () {
        var s,
        Person,
        p;

        beforeEach(function () {
            s = new Model();
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
            
            Person = s;
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




        it("should require the constructor to be called with the non-% parameters", function () {
            var Person,
            p;


            s = new Model();
            s.hasA("firstName");
            s.hasA("lastName");
            s.hasAn("id");

            s.isBuiltWith("firstName", "lastName", "%id");

            Person = s.create();
            
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

        it("should set the attributes associated with the attributes to the appropriate values", function () {
            var Card,
            Thing,
            t1,
            t2,
            t3,
            c;

            s = new Model();
            s.hasA("rank");
            s.hasA("suit");
            s.isBuiltWith("rank","suit");

            Card = new Model();

            Card.hasA("rank");
            Card.hasA("suit");
            Card.isBuiltWith("rank","suit");

            c = new Card("ace", "diamonds");
            
            expect(c.rank()).toBe("ace");
            expect(c.suit()).toBe("diamonds");
            expect(c.hasA).toBe(undefined);
            expect(Card.hasA).not.toBe(undefined);

            Thing = new Model();
            Thing.hasA("thing1");
            Thing.hasA("thing2");
            Thing.hasA("thing3");
            Thing.isBuiltWith("thing1", "%thing2", "%thing3");

            t1 = new Thing(5);
            t2 = new Thing(10, 20);
            t3 = new Thing(20, 30, 40);

            expect(t1.thing1()).toBe(5);
            expect(t1.thing2()).toBe(undefined);
            expect(t1.thing3()).toBe(undefined);            
            expect(t2.thing1()).toBe(10);
            expect(t2.thing2()).toBe(20);
            expect(t2.thing3()).toBe(undefined);            
            expect(t3.thing1()).toBe(20);
            expect(t3.thing2()).toBe(30);
            expect(t3.thing3()).toBe(40);
        });

        it("should require that the resulting constructor's parameters pass the appropriate validators", function () {
            var thing1Validator = jasmine.createSpy(),
            thing2Validator = jasmine.createSpy(),
            thing3Validator = jasmine.createSpy(),
            Thing,
            t1,
            t2,
            t3;

            Thing = new Model();

            Thing.hasA("thing1").which.validatesWith(function () { thing1Validator(); return true; });
            Thing.hasA("thing2").which.validatesWith(function () { thing2Validator(); return true; });
            Thing.hasA("thing3").which.validatesWith(function () { thing3Validator(); return true; });
            Thing.isBuiltWith("thing1", "%thing2", "%thing3");

            //Thing = s.create();
            t1 = new Thing(10);
            expect(thing1Validator).toHaveBeenCalled();
            expect(thing2Validator).not.toHaveBeenCalled();
            expect(thing3Validator).not.toHaveBeenCalled();

            t2 = new Thing(10, 20);
            expect(thing1Validator).toHaveBeenCalled();
            expect(thing2Validator).toHaveBeenCalled();
            expect(thing3Validator).not.toHaveBeenCalled();

            t1 = new Thing(10, 20, 30);
            expect(thing1Validator).toHaveBeenCalled();
            expect(thing2Validator).toHaveBeenCalled();
            expect(thing3Validator).toHaveBeenCalled();
        });

        //think of the optional function as an initializer that is run after the attributes are set
        //for example, consider the Deck model. In addition to setting up the hasMany("cards") attribute,
        //we'll want to create a nested for loop that creates a card of each suit/rank combination
        //that would be the 'initializer' function
        it("should call the optional function after the attributes are set in the constructor", function () {
            var initializer = jasmine.createSpy(),
            Thing,
            t1, 
            t2,
            t3;

            Thing = new Model();
            Thing.hasA("thing1");
            Thing.hasA("thing2");
            Thing.hasA("thing3");
            Thing.isBuiltWith("thing1", "%thing2", "%thing3", initializer);

            //Thing = s.create();
            t1 = new Thing(5);
            expect(initializer).toHaveBeenCalled();

            t2 = new Thing(10, 20);
            expect(initializer).toHaveBeenCalled();

            t3 = new Thing(20, 30, 40);
            expect(initializer).toHaveBeenCalled();
        });
    });

    it("should allow for a specification function to be sent in that bootstraps the model", function () {
        var Person,
        p;

        Person = new Model(function () {
            this.hasA("firstName");
            this.hasA("lastName");
            this.hasAn("id");
            this.hasMany("friends");
            this.isBuiltWith("firstName", "lastName", "%id");
        });

        p = new Person("Mark", "Phillips");

        expect(p instanceof Person).toBe(true);
        expect(p.firstName()).toBe("Mark");
        expect(p.lastName()).toBe("Phillips");
        expect(p.id()).toBe(undefined);
        expect(Person.hasA).not.toBe(undefined);
    });

    it("should throw an error if the specification parameter is not a function", function () {
        var s;
        expect(function () {
            s = new Model(5);
        }).toThrow("Model: specification parameter must be a function");
    });


    it("should work with this example", function () {
        var Card,
        Deck,
        d,
        i,
        j,
        suits = ["clubs", "diamonds", "hearts", "spades"],
        ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];


        Card = new Model();
        Card.hasA("suit");
        Card.attribute("suit").validatesWith(function (suit) {
            return suits.indexOf(suit) > -1;
        });

        Card.isBuiltWith('rank','suit');
        
        Card.hasA("rank").whichValidatesWith(function (rank) {
                return rank.indexOf(rank) > -1;
        });

        Card.looksLike(function () {
            return this.rank() + " of " + this.suit();
        });

        var c = new Card("5", "diamonds");
        expect(c.toString()).toBe("5 of diamonds");

        Deck = new Model(function () {
            this.hasMany("cards").validatesWith(function (card) {
                return (card instanceof Card); 
            });

            this.isBuiltWith(function () {
                for (i = 0; i < suits.length; ++i) {
                    for (j = 0; j < ranks.length; ++j) {
                        this.cards().add(new Card(ranks[j], suits[i]));
                    }
                }
            });
        });

        d = new Deck();
        //for (i = 0; i < d.cards().size(); ++i) {
            //console.log(d.cards().at(i).toString());
        //}

        expect(d.cards().at(0).toString()).toEqual("2 of clubs");
        expect(d.cards().at(51).toString()).toEqual("A of spades");
    });
});