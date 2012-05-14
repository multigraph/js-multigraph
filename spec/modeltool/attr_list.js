describe("AttrList", function () {
    var AttrList = window.multigraph.ModelTool.AttrList,
        al;

    beforeEach(function () {
        al = new AttrList();
    });

    it('should have a pop function', function () {
        console.log(al);
        expect(al.pop).not.toBeUndefined();
    });
});