/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Legend", function () {
    "use strict";

    var Legend = window.multigraph.Legend,
        l;

    beforeEach(function () {
        l = new Legend();
    }); 

    it("should be able to create a Legend", function () {
        expect(l instanceof Legend).toBe(true);
    });

    it("should be able to set/get the visible attribute", function () {
        l.visible("true");
        expect(l.visible() === "true").toBe(true);
    });

    it("should be able to set/get the base attribute", function () {
        l.base("1 1");
        expect(l.base() === "1 1").toBe(true);
    });

    it("should be able to set/get the anchor attribute", function () {
        l.anchor("-1 1");
        expect(l.anchor() === "-1 1").toBe(true);
    });

    it("should be able to set/get the position attribute", function () {
        l.position("1 -1");
        expect(l.position() === "1 -1").toBe(true);
    });

    it("should be able to set/get the frame attribute", function () {
        l.frame("padding");
        expect(l.frame() === "padding").toBe(true);
    });

    it("should be able to set/get the color attribute", function () {
        l.color("0x121756");
        expect(l.color() === "0x121756").toBe(true);
    });

    it("should be able to set/get the bordercolor attribute", function () {
        l.bordercolor("0x121756");
        expect(l.bordercolor() === "0x121756").toBe(true);
    });

    it("should be able to set/get the opacity attribute", function () {
        l.opacity("0.1");
        expect(l.opacity() === "0.1").toBe(true);
    });

    it("should be able to set/get the border attribute", function () {
        l.border("2");
        expect(l.border() === "2").toBe(true);
    });

    it("should be able to set/get the rows attribute", function () {
        l.rows("6");
        expect(l.rows() === "6").toBe(true);
    });

    it("should be able to set/get the columns attribute", function () {
        l.columns("13");
        expect(l.columns() === "13").toBe(true);
    });

    it("should be able to set/get the cornerradius attribute", function () {
        l.cornerradius("25");
        expect(l.cornerradius() === "25").toBe(true);
    });

    it("should be able to set/get the padding attribute", function () {
        l.padding("0x121756");
        expect(l.padding() === "0x121756").toBe(true);
    });

    describe("Icon", function () {
        var Icon = window.multigraph.Legend.Icon,
            icon;

        beforeEach(function () {
            icon = new Icon();
        });

        it("should be able to add a Icon to a Legend", function () {
            l.icon(icon);
            expect(l.icon() === icon).toBe(true);
        });

        it("should be able to add an Icon with attributes to a Legend", function () {
            icon.height("13");
            icon.width("100");
            l.icon(icon);
            expect(l.icon() === icon).toBe(true);
        });

        it("should be able to set/get attributes of an Icon added to a Legend", function () {
            l.icon(icon);
            l.icon().height("13");
            l.icon().width("100");
            expect(l.icon().height() === "13").toBe(true);
            expect(l.icon().width() === "100").toBe(true);
        });

        it("should not keep old data around when an Icon is replaced", function () {
            var icon2 = new Icon();
            icon2.border("5");
            l.icon(icon);
            l.icon().height("4");
            l.icon().width("28");
            l.icon(icon2);
            expect(l.icon().border() === "5").toBe(true);
        });

    });

});
