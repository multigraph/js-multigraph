describe("AttrList", function () {
    var AttrList = window.multigraph.ModelTool.AttrList,
    al;

    beforeEach(function () {
        al = new AttrList();
    });

    it("should be an Attr object", function () {
        console.log(al);
        expect(al instanceof window.multigraph.ModelTool.Attr).toBe(true);
    });

    it("should have a pop function", function () {
        expect(al.pop).not.toBeUndefined();
    });

    describe("size method", function () {
        it("should be initialized to 0", function () {
            expect(al.size()).toEqual(0);
        });

        xit("should increase when an object is added", function () {

        });

        xit("should decrease when an object is removed", function () {

        });
    });

    describe("at method", function () {
        xit("should return the element at a given index", function () {

        });

        xit("should throw an exception if the parameter is out of bounds", function () {

        });
    });


    describe("add method", function () {
        xit("should add an element to the end of the list", function () {

        });

        xit("should call the validator function", function () {

        });

        xit("should throw an error when the object does not pass validation", function () {

        });
    });
});