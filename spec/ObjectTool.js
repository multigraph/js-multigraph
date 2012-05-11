describe("ObjectTool", function() {
    var ObjectTool = window.multigraph.ObjectTool;

    it("should have an attr function", function() {
        expect(ObjectTool.attr).not.toBeUndefined();
    });

    describe("attr function", function() {
        it("should throw an error on no arguments", function() {
            var badCall = function() {
                ObjectTool.attr();
            }
            expect(badCall).toThrow(new Error("attr requires at least two parameters"));
        });


        xit("should throw an error on one argument", function() {
            var badCall = function() {
                ObjectTool.attr({});
            }
            expect(badCall).toThrow(new Error("attr requires at least two parameters"));
        });

    });
});