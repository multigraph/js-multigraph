/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Legend", function () {
    "use strict";

    var Legend = window.multigraph.core.Legend,
        Point = window.multigraph.math.Point,
        l;

    beforeEach(function () {
        l = new Legend();
    }); 

    it("should be able to create a Legend", function () {
        expect(l instanceof Legend).toBe(true);
    });

    it("should be able to set/get the visible attribute", function () {
        l.visible(true);
        expect(l.visible()).toBe(true);
    });

    it("should be able to set/get the base attribute", function () {
        l.base(new Point(1,1));
        expect(l.base().x()).toEqual(1);
        expect(l.base().y()).toEqual(1);
    });

    it("should be able to set/get the anchor attribute", function () {
        l.anchor(new Point(-1,1));
        expect(l.anchor().x()).toEqual(-1);
        expect(l.anchor().y()).toEqual(1);
    });

    it("should be able to set/get the position attribute", function () {
        l.position(new Point(1,-1));
        expect(l.position().x()).toEqual(1);
        expect(l.position().y()).toEqual(-1);
    });

    it("should be able to set/get the frame attribute", function () {
        l.frame("padding");
        expect(l.frame()).toBe("padding");
    });

    it("should be able to set/get the color attribute", function () {
        l.color(window.multigraph.math.RGBColor.parse("0x121756"));
        expect(l.color().getHexString()).toBe("0x121756");
    });

    it("should be able to set/get the bordercolor attribute", function () {
        l.bordercolor(window.multigraph.math.RGBColor.parse("0x121756"));
        expect(l.bordercolor().getHexString()).toBe("0x121756");
    });

    it("should be able to set/get the opacity attribute", function () {
        l.opacity(0.1);
        expect(l.opacity()).toBe(0.1);
    });

    it("should be able to set/get the border attribute", function () {
        l.border(2);
        expect(l.border()).toBe(2);
    });

    it("should be able to set/get the rows attribute", function () {
        l.rows(6);
        expect(l.rows()).toBe(6);
    });

    it("should be able to set/get the columns attribute", function () {
        l.columns(13);
        expect(l.columns()).toBe(13);
    });

    it("should be able to set/get the cornerradius attribute", function () {
        l.cornerradius(25);
        expect(l.cornerradius()).toBe(25);
    });

    it("should be able to set/get the padding attribute", function () {
        l.padding(3);
        expect(l.padding()).toBe(3);
    });

    describe("Icon", function () {
        var Icon = window.multigraph.core.Icon,
            icon;

        beforeEach(function () {
            icon = new Icon();
        });

        it("should be able to add a Icon to a Legend", function () {
            l.icon(icon);
            expect(l.icon()).toBe(icon);
        });

        it("should be able to add an Icon with attributes to a Legend", function () {
            icon.height(26);
            icon.width(10);
            l.icon(icon);
            expect(l.icon()).toBe(icon);
        });

        it("should be able to set/get attributes of an Icon added to a Legend", function () {
            l.icon(icon);
            l.icon().height(13);
            l.icon().width(100);
            expect(l.icon().height()).toBe(13);
            expect(l.icon().width()).toBe(100);
        });

        it("should not keep old data around when an Icon is replaced", function () {
            var icon2 = new Icon();
            icon2.border(5);
            l.icon(icon);
            l.icon().height(4);
            l.icon().width(28);
            l.icon(icon2);
            expect(l.icon().border()).toBe(5);
            expect(l.icon().height()).not.toBe(4);
        });

    });

});
