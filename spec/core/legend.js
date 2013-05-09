/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Legend", function () {
    "use strict";

    var Legend = window.multigraph.core.Legend,
        Point = window.multigraph.math.Point,
        Text = window.multigraph.core.Text,
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
        l.columns(12);
        expect(l.columns()).toBe(12);
    });

    it("should be able to set/get the cornerradius attribute", function () {
        l.cornerradius(25);
        expect(l.cornerradius()).toBe(25);
    });

    it("should be able to set/get the padding attribute", function () {
        l.padding(3);
        expect(l.padding()).toBe(3);
    });

    describe("determineVisibility method", function () {
        var DataPlot = window.multigraph.core.DataPlot,
            PlotLegend = window.multigraph.core.PlotLegend;

        it("should return true if the 'visible' attr was set to true", function () {
            l.visible(true);
            expect(l.determineVisibility()).toEqual(true);
        });

        it("should return false if the 'visible' attr was set to false", function () {
            l.visible(false);
            expect(l.determineVisibility()).toEqual(false);
        });

        it("should return false if the 'visible' attr is set to null and there are fewer than two plots with visible legends in the graph", function () {
            expect(l.visible()).toBe(null);
            expect(l.plots().size()).toEqual(0);
            expect(l.determineVisibility()).toEqual(false);

            l.plots().add(new DataPlot());
            l.plots().at(0).legend(new PlotLegend());
            l.plots().at(0).legend().visible(true).label(new Text("foo"));
            expect(l.visible()).toBe(null);
            expect(l.plots().size()).toEqual(1);
            expect(l.determineVisibility()).toEqual(false);
        });

        it("should return true if the 'visible' attr is set to null and there is more than one plot with visible legends in the graph", function () {
            l.plots().add(new DataPlot());
            l.plots().at(0).legend(new PlotLegend());
            l.plots().at(0).legend().visible(true).label(new Text("foo"));
            l.plots().add(new DataPlot());
            l.plots().at(1).legend(new PlotLegend());
            l.plots().at(1).legend().visible(true).label(new Text("bar"));
            expect(l.visible()).toBe(null);
            expect(l.plots().size()).toEqual(2);
            expect(l.determineVisibility()).toEqual(true);

            l = new Legend();
            l.plots().add(new DataPlot());
            l.plots().at(0).legend(new PlotLegend());
            l.plots().at(0).legend().visible(true).label(new Text("fizz"));
            l.plots().add(new DataPlot());
            l.plots().at(1).legend(new PlotLegend());
            l.plots().at(1).legend().visible(true).label(new Text("buzz"));
            l.plots().add(new DataPlot());
            l.plots().at(2).legend(new PlotLegend());
            l.plots().at(2).legend().visible(true).label(new Text("bang"));
            expect(l.visible()).toBe(null);
            expect(l.plots().size()).toEqual(3);
            expect(l.determineVisibility()).toEqual(true);
        });

        it("should return the value of the 'visible' attr if it is set to true or false regardless of the number of plots", function () {
            l.visible(true);
            expect(l.visible()).toBe(true);
            expect(l.plots().size()).toEqual(0);
            expect(l.determineVisibility()).toEqual(true);

            l.visible(false);
            l.plots().add(new DataPlot());
            l.plots().at(0).legend(new PlotLegend());
            l.plots().at(0).legend().visible(true).label(new Text("foo"));
            l.plots().add(new DataPlot());
            l.plots().at(1).legend(new PlotLegend());
            l.plots().at(1).legend().visible(true).label(new Text("bar"));
            expect(l.visible()).toBe(false);
            expect(l.plots().size()).toEqual(2);
            expect(l.determineVisibility()).toEqual(false);
        });
    });

    describe("initializeGeometry", function () {
        var Graph = window.multigraph.core.Graph,
            DataPlot = window.multigraph.core.DataPlot,
            PlotLegend = window.multigraph.core.PlotLegend,
            Icon = window.multigraph.core.Icon,
            Box = window.multigraph.math.Box,
            graph,
            plot1,
            plot2,
            plot3,
            plot4,
            plot5;
        
        beforeEach(function () {
            graph = new Graph();
            graph.paddingBox(new Box());
            graph.paddingBox().height(500).width(500);
            graph.plotBox(new Box());
            graph.plotBox().height(400).width(400);
            plot1 = new DataPlot();
            plot2 = new DataPlot();
            plot3 = new DataPlot();
            plot4 = new DataPlot();
            plot5 = new DataPlot();
            plot1.legend(new PlotLegend());
            plot2.legend(new PlotLegend());
            plot3.legend(new PlotLegend());
            plot4.legend(new PlotLegend());
            plot5.legend(new PlotLegend());
        });

        it("should exist", function () {
            expect(l.initializeGeometry).not.toBeUndefined();
        });

        // These figures were calculated by hand using the formula:
        // multiply the number of characters on the longest line in the label by 15
        it("should correctly compute the max label width", function () {
            plot1.legend().visible(true).label(new Text("foo"));
            plot2.legend().visible(true).label(new Text("bar"));
            plot3.legend().visible(true).label(new Text("a long string\nwith newlines"));
            plot4.legend().visible(true).label(new Text("a long string without newlines"));

            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.maxLabelWidth()).toEqual(45);

            l = new Legend();
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.plots().add(plot3);
            l.initializeGeometry(graph);
            expect(l.maxLabelWidth()).toEqual(195);

            l = new Legend();
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.plots().add(plot3);
            l.plots().add(plot4);
            l.initializeGeometry(graph);
            expect(l.maxLabelWidth()).toEqual(450);
        });

        it("should use the height of the icon as the max label height if all labels are shorter than it", function () {
            plot1.legend().visible(true).label(new Text("foo"));
            plot2.legend().visible(true).label(new Text("bar"));
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);

            var i;
            for (i = 0; i < l.plots().size(); i++) {
                expect(l.plots().at(i).legend().label().origHeight()).toBeLessThan(l.icon().height());
            }

            expect(l.maxLabelHeight()).toEqual(l.icon().height());
        });

        // These figures were calculated by hand using the formula:
        // Take the max of multiplying the number of lines in the label by 12, and the height of the icon
        it("should correctly compute the max label height", function () {
            plot1.legend().visible(true).label(new Text("foo"));
            plot2.legend().visible(true).label(new Text("bar"));
            plot3.legend().visible(true).label(new Text("a long string\nwith newlines"));
            plot4.legend().visible(true).label(new Text("a long string many\nmany\nmany\nnewlines"));

            l = new Legend();
            l.icon((new Icon()).height(2));
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.maxLabelHeight()).toEqual(12);

            l = new Legend();
            l.icon((new Icon()).height(10));
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.plots().add(plot3);
            l.initializeGeometry(graph);
            expect(l.maxLabelHeight()).toEqual(24);

            l = new Legend();
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.plots().add(plot3);
            l.plots().add(plot4);
            l.initializeGeometry(graph);
            expect(l.maxLabelHeight()).toEqual(48);
        });

        // These figures were calculated by hand using the formula:
        // this.iconOffset() + this.icon().width() + this.labelOffset() + this.maxLabelWidth() + this.labelEnding()
        it("should correctly compute the width of each 'block' of the legend", function () {
            plot1.legend().visible(true).label(new Text("foo"));
            plot2.legend().visible(true).label(new Text("bar"));
            plot3.legend().visible(true).label(new Text("a long string\nwith newlines"));
            plot4.legend().visible(true).label(new Text("this is a far longer string than anyone should ever use"));

            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.blockWidth()).toEqual(110);

            l = new Legend();
            l.icon((new Icon()).width(2));
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.blockWidth()).toEqual(72);

            l = new Legend();
            l.icon((new Icon()).width(70));
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.blockWidth()).toEqual(140);

            l = new Legend();
            l.icon((new Icon()).height(10));
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.plots().add(plot3);
            l.initializeGeometry(graph);
            expect(l.blockWidth()).toEqual(260);

            l = new Legend();
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.plots().add(plot3);
            l.plots().add(plot4);
            l.initializeGeometry(graph);
            expect(l.blockWidth()).toEqual(890);            
        });

        // These figures were calculated by hand using the formula:
        // this.iconOffset() + this.maxLabelHeight()
        it("should correctly compute the height of each 'block' of the legend", function () {
            plot1.legend().visible(true).label(new Text("foo"));
            plot2.legend().visible(true).label(new Text("this is a far longer string than anyone should ever use"));
            plot3.legend().visible(true).label(new Text("a long string\nwith newlines"));
            plot4.legend().visible(true).label(new Text("this is a far\n longer\n string\n than anyone\n should ever use and \n with \n newlines"));

            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.blockHeight()).toEqual(35);

            l = new Legend();
            l.icon((new Icon()).height(2));
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.blockHeight()).toEqual(17);

            l = new Legend();
            l.icon((new Icon()).height(70));
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.blockHeight()).toEqual(75);

            l = new Legend();
            l.icon((new Icon()).height(10).width(5));
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.plots().add(plot3);
            l.initializeGeometry(graph);
            expect(l.blockHeight()).toEqual(29);

            l = new Legend();
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.plots().add(plot3);
            l.plots().add(plot4);
            l.initializeGeometry(graph);
            expect(l.blockHeight()).toEqual(89);
        });


        // These figures were calculated by hand using the formula:
        // (2 * this.border()) + (this.columns() * this.blockWidth())
        it("should correctly compute the width of the legend", function () {
            plot1.legend().visible(true).label(new Text("foo"));
            plot2.legend().visible(true).label(new Text("foobar"));
            plot3.legend().visible(true).label(new Text("a long string\nwith newlines"));
            plot4.legend().visible(true).label(new Text("this is a far longer string than anyone should ever use"));

            l.columns(1);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.width()).toEqual(157);

            l = new Legend();
            l.columns(3);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.width()).toEqual(467);

            l.columns(1);
            l.border(0);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.width()).toEqual(155);

            l = new Legend();
            l.columns(1);
            l.rows(5);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.width()).toEqual(157);

            l = new Legend();
            l.columns(5);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.width()).toEqual(777);

            l = new Legend();
            l.columns(1);
            l.icon((new Icon()).height(70).width(78));
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.width()).toEqual(195);

            l = new Legend();
            l.columns(1);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.plots().add(plot3);
            l.initializeGeometry(graph);
            expect(l.width()).toEqual(262);

            l = new Legend();
            l.columns(1);
            l.icon((new Icon()).height(10).width(5));
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.plots().add(plot3);
            l.initializeGeometry(graph);
            expect(l.width()).toEqual(227);

            l = new Legend();
            l.columns(1);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.plots().add(plot3);
            l.plots().add(plot4);
            l.initializeGeometry(graph);
            expect(l.width()).toEqual(892);
        });

        // These figures were calculated by hand using the formula:
        // (2 * this.border()) + (this.rows() * this.blockHeight()) + this.iconOffset()
        it("should correctly compute the height of the legend", function () {
            plot1.legend().visible(true).label(new Text("foo"));
            plot2.legend().visible(true).label(new Text("foobar"));
            plot3.legend().visible(true).label(new Text("a long string\nwith newlines"));
            plot4.legend().visible(true).label(new Text("this is a\n far\n longer\n string\n than anyone\n should\n ever use with \nnewlines"));

            l.rows(2);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.height()).toEqual(77);

            l = new Legend();
            l.border(0);
            l.rows(2);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.height()).toEqual(75);

            l = new Legend();
            l.rows(5);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.height()).toEqual(182);

            l = new Legend();
            l.columns(5);
            l.rows(1);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.height()).toEqual(42);

            l = new Legend();
            l.rows(2);
            l.icon((new Icon()).height(70).width(78));
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.height()).toEqual(157);

            l = new Legend();
            l.rows(2);
            l.icon((new Icon()).height(7).width(78));
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.height()).toEqual(41);

            l = new Legend();
            l.rows(3);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.plots().add(plot3);
            l.initializeGeometry(graph);
            expect(l.height()).toEqual(112);

            l = new Legend();
            l.rows(3);
            l.icon((new Icon()).height(10).width(5));
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.plots().add(plot3);
            l.initializeGeometry(graph);
            expect(l.height()).toEqual(94);

            l = new Legend();
            l.rows(4);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.plots().add(plot3);
            l.plots().add(plot4);
            l.initializeGeometry(graph);
            expect(l.height()).toEqual(411);
        });

        it("should correctly compute the 'x' coordinate of the legend's lower left corner", function () {
            plot1.legend().visible(true).label(new Text("foo"));
            plot2.legend().visible(true).label(new Text("foobar"));

            l.columns(1);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.x()).toEqual(243);

            l = new Legend();
            l.columns(1);
            l.frame("padding");
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.x()).toEqual(343);

            l = new Legend();
            l.columns(1);
            l.frame("padding").position().x(-10);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.x()).toEqual(333);

            l = new Legend();
            l.columns(1);
            l.base().x(-1);
            l.anchor().x(-1);
            l.frame("padding");
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.x()).toEqual(0);

            l = new Legend();
            l.columns(1);
            l.base().x(-1);
            l.anchor().x(-1);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.x()).toEqual(0);

            l = new Legend();
            l.columns(1);
            l.base().x(-1);
            l.anchor().x(0);
            l.frame("padding");
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.x()).toEqual(-78.5);

            l = new Legend();
            l.columns(1);
            l.base().x(0);
            l.anchor().x(-1);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.x()).toEqual(200);
        });

        it("should correctly compute the 'y' coordinate of the legend's lower left corner", function () {
            plot1.legend().visible(true).label(new Text("foo"));
            plot2.legend().visible(true).label(new Text("foobar"));

            l.rows(2);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.y()).toEqual(323);

            l = new Legend();
            l.rows(2);
            l.frame("padding");
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.y()).toEqual(423);

            l = new Legend();
            l.rows(2);
            l.frame("padding").position().y(-10);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.y()).toEqual(413);

            l = new Legend();
            l.rows(2);
            l.base().y(-1);
            l.anchor().y(-1);
            l.frame("padding");
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.y()).toEqual(0);

            l = new Legend();
            l.rows(2);
            l.base().y(-1);
            l.anchor().y(-1);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.y()).toEqual(0);

            l = new Legend();
            l.rows(2);
            l.base().y(-1);
            l.anchor().y(0);
            l.frame("padding");
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.y()).toEqual(-38.5);

            l = new Legend();
            l.rows(2);
            l.base().y(0);
            l.anchor().y(-1);
            l.plots().add(plot1);
            l.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.y()).toEqual(200);
        });

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
