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

    describe("initializeGeometry", function () {
        var Graph = window.multigraph.core.Graph,
            Plot = window.multigraph.core.Plot,
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
            graph.paddingBox().height(100).width(100);
            graph.plotBox(new Box());
            graph.plotBox().height(100).width(100);
            plot1 = new Plot();
            plot2 = new Plot();
            plot3 = new Plot();
            plot4 = new Plot();
            plot5 = new Plot();
            plot1.legend(new PlotLegend());
            plot2.legend(new PlotLegend());
            plot3.legend(new PlotLegend());
            plot4.legend(new PlotLegend());
            plot5.legend(new PlotLegend());
            l.icon(new Icon());
        });

        it("should exist", function () {
            expect(l.initializeGeometry).not.toBeUndefined();
        });

        describe("setting the visible attribute", function () {
            it("should not change the visibility if it was explictly set", function () {
                plot1.legend().visible(true).label(new Text("foo"));
                graph.plots().add(plot1);
                l.visible(true);
                l.initializeGeometry(graph);
                expect(l.visible()).toEqual(true);

                l = new Legend();
                l.visible(false);
                l.initializeGeometry(graph);
                expect(l.visible()).toEqual(false);

                plot2.legend().visible(true).label(new Text("bar"));
                plot3.legend().visible(true).label(new Text("foobar"));
                graph.plots().add(plot2);
                graph.plots().add(plot3);
                l = new Legend();
                l.visible(false);
                l.initializeGeometry(graph);
                expect(l.visible()).toEqual(false);
            });
            it("should set visible to false if there are no plots in the graph", function () {
                l.initializeGeometry(graph);
                expect(l.visible()).toEqual(false);
            });
            it("should set visible to false if there are fewer than two plots with visible legends in the graph", function () {
                plot1.legend().visible(true).label(new Text("foo"));
                graph.plots().add(plot1);
                l.initializeGeometry(graph);
                expect(l.visible()).toEqual(false);

                plot2.legend().visible(false).label(new Text("bar"));
                plot3.legend().visible(false).label(new Text("foobar"));
                graph.plots().add(plot2);
                graph.plots().add(plot3);
                l = new Legend();
                l.initializeGeometry(graph);
                expect(l.visible()).toEqual(false);
            });
            it("should set visible to true if there is more than one plot with visible legends in the graph", function () {
                plot1.legend().visible(true).label(new Text("foo"));
                plot2.legend().visible(true).label(new Text("bar"));
                graph.plots().add(plot1);
                graph.plots().add(plot2);
                l.initializeGeometry(graph);
                expect(l.visible()).toEqual(true);

                plot3.legend().visible(false).label(new Text("foobar"));
                plot4.legend().visible(false).label(new Text("larry"));
                graph.plots().add(plot3);
                graph.plots().add(plot4);
                l = new Legend();
                l.icon(new Icon());
                l.initializeGeometry(graph);
                expect(l.visible()).toEqual(true);
            });
        });

        it("should only track plots with visible legends", function () {
            plot1.legend().visible(true).label(new Text("foo"));
            plot2.legend().visible(true).label(new Text("bar"));
            graph.plots().add(plot1);
            graph.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.plots().size()).toEqual(2);
            expect(l.plots().at(0)).toEqual(plot1);
            expect(l.plots().at(1)).toEqual(plot2);

            plot3.legend().visible(false).label(new Text("foobar"));
            plot4.legend().visible(false).label(new Text("larry"));
            graph.plots().add(plot3);
            graph.plots().add(plot4);
            l = new Legend();
            l.icon(new Icon());
            l.initializeGeometry(graph);
            expect(l.plots().size()).toEqual(2);
            expect(l.plots().at(0)).toEqual(plot1);
            expect(l.plots().at(1)).toEqual(plot2);

            plot1.legend().visible(true).label(new Text("larry"));
            plot2.legend().visible(false).label(new Text("curly"));
            plot3.legend().visible(true).label(new Text("moe"));
            plot4.legend().visible(true).label(new Text("foobar"));
            graph = new Graph();
            graph.paddingBox(new Box());
            graph.paddingBox().height(100).width(100);
            graph.plotBox(new Box());
            graph.plotBox().height(100).width(100);
            graph.plots().add(plot1);
            graph.plots().add(plot2);
            graph.plots().add(plot3);
            graph.plots().add(plot4);
            l = new Legend();
            l.icon(new Icon());
            l.initializeGeometry(graph);
            expect(l.plots().size()).toEqual(3);
            expect(l.plots().at(0)).toEqual(plot1);
            expect(l.plots().at(1)).toEqual(plot3);
            expect(l.plots().at(2)).toEqual(plot4);

        });

        it("should correctly compute the number of rows for the legend", function () {
            plot1.legend().visible(true).label(new Text("foo"));
            plot2.legend().visible(true).label(new Text("bar"));
            graph.plots().add(plot1);
            graph.plots().add(plot2);
            l.rows(3);
            l.initializeGeometry(graph);
            expect(l.rows()).toEqual(3);

            l = new Legend();
            l.icon(new Icon());
            l.initializeGeometry(graph);
            expect(l.rows()).toEqual(2);

            plot3.legend().visible(true).label(new Text("larry"));
            plot4.legend().visible(true).label(new Text("curly"));
            graph.plots().add(plot3);
            graph.plots().add(plot4);
            l = new Legend();
            l.icon(new Icon());
            l.initializeGeometry(graph);
            expect(l.rows()).toEqual(4);
            
            l = new Legend();
            l.icon(new Icon());
            l.columns(2);
            l.initializeGeometry(graph);
            expect(l.rows()).toEqual(2);
            
            l = new Legend();
            l.icon(new Icon());
            l.columns(4);
            l.initializeGeometry(graph);
            expect(l.rows()).toEqual(1);
            
            l = new Legend();
            l.icon(new Icon());
            l.columns(5);
            l.initializeGeometry(graph);
            expect(l.rows()).toEqual(1);
            
        });

        it("should correctly compute the number of columns for the legend", function () {
            plot1.legend().visible(true).label(new Text("foo"));
            plot2.legend().visible(true).label(new Text("bar"));
            graph.plots().add(plot1);
            graph.plots().add(plot2);
            l.initializeGeometry(graph);
            expect(l.columns()).toEqual(1);

            l = new Legend();
            l.icon(new Icon());
            l.rows(2);
            l.initializeGeometry(graph);
            expect(l.columns()).toEqual(1);

            l = new Legend();
            l.icon(new Icon());
            l.columns(5);
            l.initializeGeometry(graph);
            expect(l.columns()).toEqual(5);

            plot3.legend().visible(true).label(new Text("larry"));
            plot4.legend().visible(true).label(new Text("curly"));
            graph.plots().add(plot3);
            graph.plots().add(plot4);
            l = new Legend();
            l.icon(new Icon());
            l.rows(2);
            l.initializeGeometry(graph);
            expect(l.columns()).toEqual(2);
            
            l = new Legend();
            l.icon(new Icon());
            l.rows(3);
            l.initializeGeometry(graph);
            expect(l.columns()).toEqual(2);
            
            l = new Legend();
            l.icon(new Icon());
            l.rows(6);
            l.initializeGeometry(graph);
            expect(l.columns()).toEqual(1);
            
        });

        xit("should correctly compute the max label width", function () {
            // TODO: create specs for this once a method exists to correctly measure
            //       text width.
        });

        xit("should correctly compute the max label height", function () {
            // TODO: create specs for this once a method exists to correctly measure
            //       text height.
        });

        xit("should correctly compute the width of each 'block' of the legend", function () {
            // TODO: create specs for this once a method exists to correctly measure
            //       text width.
        });

        xit("should correctly compute the height of each 'block' of the legend", function () {
            // TODO: create specs for this once a method exists to correctly measure
            //       text height.
        });

        xit("should correctly compute the width of the legend", function () {
            // TODO: create specs for this once a method exists to correctly measure
            //       text width.
        });

        xit("should correctly compute the height of the legend", function () {
            // TODO: create specs for this once a method exists to correctly measure
            //       text height.
        });

        xit("should correctly compute the 'x' coordinate of the legend's lower left corner", function () {
            // TODO: create specs for this once a method exists to correctly measure
            //       text width.
        });

        xit("should correctly compute the 'y' coordinate of the legend's lower left corner", function () {
            // TODO: create specs for this once a method exists to correctly measure
            //       text height.
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
