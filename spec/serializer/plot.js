/*global describe, it, beforeEach, expect, xit, xdescribe, jasmine */
/*jshint laxbreak:true */

describe("DataPlot serialization", function () {
    "use strict";

    var Plot = window.multigraph.core.Plot,
        DataPlot = window.multigraph.core.DataPlot,
        Axis = window.multigraph.core.Axis,
        Datatips = window.multigraph.core.Datatips,
        DataVariable = window.multigraph.core.DataVariable,
        Filter = window.multigraph.core.Filter,
        PlotLegend = window.multigraph.core.PlotLegend,
        Renderer = window.multigraph.core.Renderer,
        Text = window.multigraph.core.Text,
        RGBColor = window.multigraph.math.RGBColor,
        xmlString,
        plot;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    describe("with Horizontal Axis tags", function () {

        it("should properly serialize plot models with a horizontal axis submodel and no data variable submodels", function () {
            xmlString = '<plot><horizontalaxis ref="x"/></plot>';
            plot = new DataPlot();
            plot.horizontalaxis(new Axis(Axis.HORIZONTAL));
            plot.horizontalaxis().id("x");
            expect(plot.serialize()).toEqual(xmlString);

            xmlString = '<plot><horizontalaxis/></plot>';
            plot = new DataPlot();
            plot.horizontalaxis(new Axis(Axis.HORIZONTAL));
            expect(plot.serialize()).toEqual(xmlString);
        });

        // TODO : enable this test once a possible bug in plot serialization has been fixed
        xit("should properly serialize plot models without a horizontal axis submodel and a data variable submodel", function () {
            xmlString = ''
                + '<plot>'
                +     '<horizontalaxis>'
                +         '<variable'
                +             ' ref="x"'
                +         '/>'
                +     '</horizontalaxis>'
                + '</plot>';
            plot = new DataPlot();
            plot.variable().add(new DataVariable("x"));
            expect(plot.serialize()).toEqual(xmlString);
        });

        it("should properly serialize plot models with a horizontal axis submodel and a data variable submodels", function () {
            xmlString = ''
                + '<plot>'
                +     '<horizontalaxis'
                +         ' ref="x"'
                +     '>'
                +         '<variable'
                +             ' ref="x"'
                +         '/>'
                +     '</horizontalaxis>'
                + '</plot>';
            plot = new DataPlot();
            plot.horizontalaxis(new Axis(Axis.HORIZONTAL));
            plot.horizontalaxis().id("x");
            plot.variable().add(new DataVariable("x"));
            expect(plot.serialize()).toEqual(xmlString);

            xmlString = ''
                + '<plot>'
                +     '<horizontalaxis>'
                +         '<variable'
                +             ' ref="x"'
                +         '/>'
                +     '</horizontalaxis>'
                + '</plot>';
            plot = new DataPlot();
            plot.horizontalaxis(new Axis(Axis.HORIZONTAL));
            plot.variable().add(new DataVariable("x"));
            expect(plot.serialize()).toEqual(xmlString);
        });

    });

    describe("with Vertical Axis tags", function () {

        it("should properly serialize plot models with a vertical axis submodel and no data variable submodels", function () {
            xmlString = '<plot><verticalaxis ref="y"/></plot>';
            plot = new DataPlot();
            plot.verticalaxis(new Axis(Axis.VERTICAL));
            plot.verticalaxis().id("y");
            expect(plot.serialize()).toEqual(xmlString);

            xmlString = '<plot><verticalaxis/></plot>';
            plot = new DataPlot();
            plot.verticalaxis(new Axis(Axis.VERTICAL));
            expect(plot.serialize()).toEqual(xmlString);
        });

        it("should properly serialize plot models without a vertical axis submodel and many data variable submodels", function () {
            xmlString = ''
                + '<plot>'
                +     '<horizontalaxis>'
                +         '<variable'
                +             ' ref="x"'
                +         '/>'
                +     '</horizontalaxis>'
                +     '<verticalaxis>'
                +         '<variable'
                +             ' ref="y"'
                +         '/>'
                +     '</verticalaxis>'
                + '</plot>';
            plot = new DataPlot();
            plot.variable().add(new DataVariable("x"));
            plot.variable().add(new DataVariable("y"));
            expect(plot.serialize()).toEqual(xmlString);
        });

        it("should properly serialize plot models with a vertical axis submodel and many data variable submodels", function () {
            xmlString = ''
                + '<plot>'
                +     '<horizontalaxis>'
                +         '<variable'
                +             ' ref="x"'
                +         '/>'
                +     '</horizontalaxis>'
                +     '<verticalaxis'
                +         ' ref="y"'
                +     '>'
                +         '<variable'
                +             ' ref="y"'
                +         '/>'
                +     '</verticalaxis>'
                + '</plot>';
            plot = new DataPlot();
            plot.verticalaxis(new Axis(Axis.VERTICAL));
            plot.verticalaxis().id("y");
            plot.variable().add(new DataVariable("x"));
            plot.variable().add(new DataVariable("y"));
            expect(plot.serialize()).toEqual(xmlString);

            xmlString = ''
                + '<plot>'
                +     '<horizontalaxis>'
                +         '<variable'
                +             ' ref="x"'
                +         '/>'
                +     '</horizontalaxis>'
                +     '<verticalaxis>'
                +         '<variable'
                +             ' ref="y"'
                +         '/>'
                +     '</verticalaxis>'
                + '</plot>';
            plot = new DataPlot();
            plot.verticalaxis(new Axis(Axis.VERTICAL));
            plot.variable().add(new DataVariable("x"));
            plot.variable().add(new DataVariable("y"));
            expect(plot.serialize()).toEqual(xmlString);
        });

    });

    describe("with Plot Legend tags", function () {

        it("should properly serialize plot models with Plot Legend submodels", function () {
            xmlString = '<plot><legend visible="true" label="curly"/></plot>';
            plot = new DataPlot();
            plot.legend(new PlotLegend());
            plot.legend().visible(true).label(new Text("curly"));
            expect(plot.serialize()).toEqual(xmlString);
        });

    });

    describe("with Renderer tags", function () {

        it("should properly serialize plot models with Renderer submodels", function () {
            xmlString = '<plot><renderer type="pointline"/></plot>';
            plot = new DataPlot();
            plot.renderer(Renderer.create(Renderer.POINTLINE));
            expect(plot.serialize()).toEqual(xmlString);
        });

    });

    describe("with Filter tags", function () {

        it("should properly serialize plot models with Filter submodels", function () {
            xmlString = '<plot><filter type="foo"/></plot>';
            plot = new DataPlot();
            plot.filter(new Filter());
            plot.filter().type("foo");
            expect(plot.serialize()).toEqual(xmlString);
        });

    });

    describe("with Datatips tags", function () {

        it("should properly serialize plot models with Datatips submodels", function () {
            xmlString = '<plot><datatips bgcolor="0x123456" bordercolor="0xfffbbb" format="number" bgalpha="1" border="2" pad="1"/></plot>';
            plot = new DataPlot();
            plot.datatips(new Datatips());
            plot.datatips().format("number");
            plot.datatips().bgcolor(RGBColor.parse("0x123456"));
            plot.datatips().bgalpha("1");
            plot.datatips().border(2);
            plot.datatips().bordercolor(RGBColor.parse("0xfffbbb"));
            plot.datatips().pad(1);
            expect(plot.serialize()).toEqual(xmlString);
        });

    });

    describe("with all child tags", function () {

        it("should properly serialize plot models with all possible submodels", function () {
            xmlString = ''
                + '<plot>'
                +     '<horizontalaxis'
                +         ' ref="x"'
                +     '>'
                +         '<variable'
                +             ' ref="x"'
                +         '/>'
                +     '</horizontalaxis>'
                +     '<verticalaxis'
                +         ' ref="y"'
                +     '>'
                +         '<variable'
                +             ' ref="y"'
                +         '/>'
                +     '</verticalaxis>'
                +     '<legend'
                +         ' visible="true"'
                +         ' label="curly"'
                +     '/>'
                +     '<renderer'
                +         ' type="pointline"'
                +     '/>'
                +     '<filter'
                +         ' type="foo"'
                +     '/>'
                +     '<datatips'
                +         ' bgcolor="0x123456"'
                +         ' bordercolor="0xfffbbb"'
                +         ' format="number"'
                +         ' bgalpha="1"'
                +         ' border="2"'
                +         ' pad="1"'
                +     '/>'
                + '</plot>';

            plot = new DataPlot();
            plot.horizontalaxis(new Axis(Axis.HORIZONTAL));
            plot.horizontalaxis().id("x");
            plot.verticalaxis(new Axis(Axis.VERTICAL));
            plot.verticalaxis().id("y");
            plot.variable().add(new DataVariable("x"));
            plot.variable().add(new DataVariable("y"));
            plot.legend(new PlotLegend());
            plot.legend().visible(true).label(new Text("curly"));
            plot.renderer(Renderer.create(Renderer.POINTLINE));
            plot.filter(new Filter());
            plot.filter().type("foo");
            plot.datatips(new Datatips());
            plot.datatips().format("number");
            plot.datatips().bgcolor(RGBColor.parse("0x123456"));
            plot.datatips().bgalpha("1");
            plot.datatips().border(2);
            plot.datatips().bordercolor(RGBColor.parse("0xfffbbb"));
            plot.datatips().pad(1);
            expect(plot.serialize()).toEqual(xmlString);
        });

    });

});

// TODO : re-implement this once constant plot serialization has been fixed
xdescribe("Constant Plot serialization", function () {
    "use strict";

    var ConstantPlot = window.multigraph.core.ConstantPlot,
        DataValue = window.multigraph.core.DataValue,
        Axis = window.multigraph.core.Axis,
        xmlString,
        plot;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize plot models with a horizontal axis submodel and no data variable submodels", function () {
        xmlString = ''
            + '<plot>'
            +     '<verticalaxis'
            +         ' ref="y"'
            +     '>'
            +         '<constant'
            +             ' value="30"'
            +         '/>'
            +     '</verticalaxis>'
            + '</plot>';
        plot = new ConstantPlot(DataValue.parse("number", "30"));
        plot.verticalaxis(new Axis(Axis.VERTICAL));
        plot.verticalaxis().id("y");
        expect(plot.serialize()).toEqual(xmlString);
    });

});
