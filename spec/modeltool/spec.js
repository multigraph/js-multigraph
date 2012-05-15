describe("Spec", function () {
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
        xit("should create a new AttrList object with the specified name", function () {

        });

        xit("should add the AttrList to the Spec object", function () {

        });

        xit("should return the AttrList so it can be cascaded", function () {

        });

        xit("should throw an error if the parameter is not a string", function () {

        });
    });

    describe("looksLike method", function () {
        xit("should be way more interesting than it currently is", function () {

        });
    });

    describe("create method", function () {
        var Card,
        c;
        beforeEach(function () {
            s.hasA("suit").whichValidatesWith(function (suit) {
                return ["clubs", "diamonds", "hearts", "spades"].indexOf(suit) > -1;
            });

            s.hasA("rank").whichValidatesWith(function (rank) {
                return ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"].indexOf(rank) > -1;
            });
        });
        it("should return a constructor function that creates an object with all attributes", function () {
            Card = s.create();
            c = new Card();
            expect(c.suit).not.toBeUndefined();
            expect(c.rank).not.toBeUndefined();
        });

        it("should not add any additional Attr methods", function () {
            Card = s.create();
            c = new Card();
            expect(c.suit).not.toBeUndefined();
            expect(c.rank).not.toBeUndefined();
            expect(Card.validator).toBeUndefined();
            expect(c.validator).toBeUndefined();
            expect(c.validatesWith).toBeUndefined();
            expect(c.whichValidatesWith).toBeUndefined();
        });
    });
});