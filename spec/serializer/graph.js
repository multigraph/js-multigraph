/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint  laxbreak:true */

describe("Graph serialization", function () {
    "use strict";

    var ArrayData = window.multigraph.core.ArrayData,
        Axis = window.multigraph.core.Axis,
        Background = window.multigraph.core.Background,
        DataPlot = window.multigraph.core.DataPlot,
        DataVariable = window.multigraph.core.DataVariable,
        Graph = window.multigraph.core.Graph,
        Icon = window.multigraph.core.Icon,
        Legend = window.multigraph.core.Legend,
        Plotarea = window.multigraph.core.Plotarea,
        Title = window.multigraph.core.Title,
        Window = window.multigraph.core.Window,
        DataValue = window.multigraph.core.DataValue,
        Displacement = window.multigraph.math.Displacement,
        Point = window.multigraph.math.Point,
        RGBColor = window.multigraph.math.RGBColor,
        xmlString,
        graph;

    beforeEach(function () {        
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize graph models", function () {
        var variables,
            i;
        
        xmlString =  ''
            + '<graph>'
            +    '<window'
            +        ' margin="1"'
            +        ' padding="10"'
            +        ' bordercolor="0x111223"'
            +        ' width="2"'
            +        ' height="97"'
            +        ' border="0"'
            +    '/>'
            +    '<background'
            +        ' color="0x123456"'
            +    '/>'
            +     '<plotarea'
            +         ' margintop="5"'
            +         ' marginleft="10"'
            +         ' marginbottom="19"'
            +         ' marginright="5"'
            +         ' bordercolor="0x111223"'
            +         ' border="0"'
            +     '/>'
            +    '<plot>'
            +        '<horizontalaxis'
            +            ' ref="x"'
            +            '>'
            +            '<variable'
            +                ' ref="x"'
            +            '/>'
            +        '</horizontalaxis>'
            +        '<verticalaxis'
            +            ' ref="y"'
            +            '>'
            +            '<variable'
            +                ' ref="y"'
            +            '/>'
            +        '</verticalaxis>'
            +    '</plot>'
            +    '<data>'
            +         '<variables>'
            +           '<variable id="x" column="0" type="number" missingop="eq"/>'
            +           '<variable id="y" column="1" type="number"/>'
            +         '</variables>'
            +         '<values>'
            +             '3,4\n'
            +             '5,6'
            +         '</values>'
            +    '</data>'
            + '</graph>';

        graph = new Graph();

        graph.window(new Window());
        graph.window().margin().set(1,1,1,1);
        graph.window().padding().set(10,10,10,10);
        graph.window().bordercolor(RGBColor.parse("0x111223"));
        graph.window().width(2);
        graph.window().height(97);
        graph.window().border(0);

        graph.background(new Background());
        graph.background().color(RGBColor.parse("0x123456"));

        graph.plotarea(new Plotarea());
        graph.plotarea().margin().bottom(19);
        graph.plotarea().margin().left(10);
        graph.plotarea().margin().top(5);
        graph.plotarea().margin().right(5);
        graph.plotarea().border(0);
        graph.plotarea().bordercolor(RGBColor.parse("0x111223"));

        graph.plots().add(new DataPlot());
        graph.plots().at(0).horizontalaxis(new Axis(Axis.HORIZONTAL));
        graph.plots().at(0).horizontalaxis().id("x");
        graph.plots().at(0).verticalaxis(new Axis(Axis.VERTICAL));
        graph.plots().at(0).verticalaxis().id("y");
        graph.plots().at(0).variable().add(new DataVariable("x"));
        graph.plots().at(0).variable().add(new DataVariable("y"));

        variables = [];
        variables.push(new DataVariable("x"));
        variables[0].column(0);
        variables[0].type("number");
        variables[0].missingop(DataValue.parseComparator("eq"));

        variables.push(new DataVariable("y"));
        variables[1].column(1);
        variables[1].type("number");

        graph.data().add(new ArrayData(variables, [["3", "4"], ["5", "6"]]));
        graph.data().at(0).stringArray([]);
        graph.data().at(0).array([
            [DataValue.parse("number", "3"), DataValue.parse("number", "4")],
            [DataValue.parse("number", "5"), DataValue.parse("number", "6")]
        ]);

        expect(graph.serialize()).toEqual(xmlString);

        xmlString = ''
            + '<graph>'
            +     '<window'
            +         ' margin="1"'
            +         ' padding="10"'
            +         ' bordercolor="0x111223"'
            +         ' width="2"'
            +         ' height="97"'
            +         ' border="0"'
            +     '/>'
            +     '<legend'
            +         ' color="0x56839c"'
            +         ' bordercolor="0x941394"'
            +         ' base="-1,-1"'
            +         ' anchor="0,0"'
            +         ' position="0,0"'
            +         ' visible="true"'
            +         ' frame="padding"'
            +         ' opacity="1"'
            +         ' border="10"'
            +         ' rows="4"'
            +         ' columns="3"'
            +         ' cornerradius="5"'
            +         ' padding="4"'
            +         '>'
            +         '<icon'
            +             ' height="30"'
            +             ' width="40"'
            +             ' border="1"'
            +         '/>'
            +     '</legend>'
            +     '<background'
            +         ' color="0x123456"'
            +     '/>'
            +     '<plotarea'
            +         ' margintop="5"'
            +         ' marginleft="10"'
            +         ' marginbottom="19"'
            +         ' marginright="5"'
            +         ' bordercolor="0x111223"'
            +         ' border="0"'
            +     '/>'
            +     '<title'
            +         ' color="0xfffaab"'
            +         ' bordercolor="0x127752"'
            +         ' border="2"'
            +         ' opacity="0"'
            +         ' padding="4"'
            +         ' cornerradius="10"'
            +         ' anchor="1,1"'
            +         ' base="0,0"'
            +         ' position="-1,1"'
            +     '>'
            +         'Graph Title'
            +     '</title>'
            +     '<horizontalaxis'
            +         ' color="0x123456"'
            +         ' id="x"'
            +         ' type="number"'
            +         ' pregap="2"'
            +         ' postgap="4"'
            +         ' anchor="1"'
            +         ' min="0"'
            +         ' minoffset="19"'
            +         ' max="10"'
            +         ' maxoffset="2"'
            +         ' tickmin="-3"'
            +         ' tickmax="3"'
            +         ' highlightstyle="bold"'
            +         ' linewidth="1"'
            +         ' length="1"'
            +         ' position="1,1"'
            +         ' base="1,-1"'
            +         ' minposition="-0.3"'
            +         ' maxposition="1"'
            +     '>'
            +         '<grid color="0xeeeeee" visible="false"/>'
            +     '</horizontalaxis>'
            +     '<horizontalaxis'
            +         ' color="0x123456"'
            +         ' id="x2"'
            +         ' type="number"'
            +         ' pregap="2"'
            +         ' postgap="4"'
            +         ' anchor="1"'
            +         ' min="0"'
            +         ' minoffset="19"'
            +         ' max="10"'
            +         ' maxoffset="2"'
            +         ' tickmin="-3"'
            +         ' tickmax="3"'
            +         ' highlightstyle="bold"'
            +         ' linewidth="1"'
            +         ' length="1"'
            +         ' position="1,1"'
            +         ' base="1,-1"'
            +         ' minposition="-0.2"'
            +         ' maxposition="1"'
            +     '>'
            +         '<grid color="0xeeeeee" visible="false"/>'
            +     '</horizontalaxis>'
            +     '<verticalaxis'
            +         ' color="0x123456"'
            +         ' id="y"'
            +         ' type="number"'
            +         ' pregap="2"'
            +         ' postgap="4"'
            +         ' anchor="1"'
            +         ' min="0"'
            +         ' minoffset="19"'
            +         ' max="10"'
            +         ' maxoffset="2"'
            +         ' tickmin="-3"'
            +         ' tickmax="3"'
            +         ' highlightstyle="bold"'
            +         ' linewidth="1"'
            +         ' length="1"'
            +         ' position="1,1"'
            +         ' base="1,-1"'
            +         ' minposition="0.2"'
            +         ' maxposition="1"'
            +     '>'
            +         '<grid color="0xeeeeee" visible="false"/>'
            +     '</verticalaxis>'
            +     '<verticalaxis'
            +         ' color="0x123456"'
            +         ' id="y2"'
            +         ' type="number"'
            +         ' pregap="2"'
            +         ' postgap="4"'
            +         ' anchor="1"'
            +         ' min="0"'
            +         ' minoffset="19"'
            +         ' max="10"'
            +         ' maxoffset="2"'
            +         ' tickmin="-3"'
            +         ' tickmax="3"'
            +         ' highlightstyle="bold"'
            +         ' linewidth="1"'
            +         ' length="1"'
            +         ' position="1,1"'
            +         ' base="1,-1"'
            +         ' minposition="1"'
            +         ' maxposition="1"'
            +     '>'
            +         '<grid color="0xeeeeee" visible="false"/>'
            +     '</verticalaxis>'
            +     '<plot>'
            +         '<horizontalaxis'
            +             ' ref="x"'
            +             '>'
            +             '<variable'
            +                 ' ref="x"'
            +             '/>'
            +         '</horizontalaxis>'
            +         '<verticalaxis'
            +             ' ref="y"'
            +             '>'
            +             '<variable'
            +                 ' ref="y"'
            +             '/>'
            +         '</verticalaxis>'
            +     '</plot>'
            +     '<plot>'
            +         '<horizontalaxis'
            +             ' ref="x"'
            +             '/>'
            +     '</plot>'
            +     '<data>'
            +         '<variables>'
            +           '<variable id="x" column="0" type="number" missingop="eq"/>'
            +           '<variable id="y" column="1" type="number"/>'
            +         '</variables>'
            +         '<values>'
            +             '3,4\n'
            +             '5,6'
            +         '</values>'
            +     '</data>'
            + '</graph>';

        graph = new Graph();

        graph.window(new Window());
        graph.window().margin().set(1,1,1,1);
        graph.window().padding().set(10,10,10,10);
        graph.window().bordercolor(RGBColor.parse("0x111223"));
        graph.window().width(2);
        graph.window().height(97);
        graph.window().border(0);

        graph.legend(new Legend());
        graph.legend().color(RGBColor.parse("0x56839c"));
        graph.legend().bordercolor(RGBColor.parse("0x941394"));
        graph.legend().base(Point.parse("-1,-1"));
        graph.legend().anchor(Point.parse("0,0"));
        graph.legend().position(Point.parse("0,0"));
        graph.legend().visible(true);
        graph.legend().frame("padding");
        graph.legend().opacity(1);
        graph.legend().border(10);
        graph.legend().rows(4);
        graph.legend().columns(3);
        graph.legend().cornerradius(5);
        graph.legend().padding(4);
        graph.legend().icon(new Icon());
        graph.legend().icon().height(30);
        graph.legend().icon().width(40);
        graph.legend().icon().border(1);

        graph.background(new Background());
        graph.background().color(RGBColor.parse("0x123456"));

        graph.plotarea(new Plotarea());
        graph.plotarea().margin().bottom(19);
        graph.plotarea().margin().left(10);
        graph.plotarea().margin().top(5);
        graph.plotarea().margin().right(5);
        graph.plotarea().border(0);
        graph.plotarea().bordercolor(RGBColor.parse("0x111223"));

        graph.title(new Title());
        graph.title().color(RGBColor.parse("0xfffaab"));
        graph.title().bordercolor(RGBColor.parse("0x127752"));
        graph.title().border("2");
        graph.title().opacity(0);
        graph.title().padding("4");
        graph.title().cornerradius("10");
        graph.title().anchor(Point.parse("1,1"));
        graph.title().base(Point.parse("0,0"));
        graph.title().position(Point.parse("-1,1"));
        graph.title().content("Graph Title");

        graph.plots().add(new DataPlot());
        graph.plots().at(0).horizontalaxis(new Axis(Axis.HORIZONTAL));
        graph.plots().at(0).horizontalaxis().id("x");
        graph.plots().at(0).verticalaxis(new Axis(Axis.VERTICAL));
        graph.plots().at(0).verticalaxis().id("y");
        graph.plots().at(0).variable().add(new DataVariable("x"));
        graph.plots().at(0).variable().add(new DataVariable("y"));

        graph.plots().add(new DataPlot());
        graph.plots().at(1).horizontalaxis(new Axis(Axis.HORIZONTAL));
        graph.plots().at(1).horizontalaxis().id("x");

        graph.axes().add(new Axis(Axis.HORIZONTAL));
        graph.axes().at(0).color(RGBColor.parse("0x123456"));
        graph.axes().at(0).id("x");
        graph.axes().at(0).type("number");
        graph.axes().at(0).pregap(2);
        graph.axes().at(0).postgap(4);
        graph.axes().at(0).anchor(1);
        graph.axes().at(0).min("0");
        graph.axes().at(0).minoffset(19);
        graph.axes().at(0).max("10");
        graph.axes().at(0).maxoffset(2);
        graph.axes().at(0).tickmin(-3);
        graph.axes().at(0).tickmax(3);
        graph.axes().at(0).highlightstyle("bold");
        graph.axes().at(0).linewidth(1);
        graph.axes().at(0).length(Displacement.parse("1"));
        graph.axes().at(0).position(Point.parse("1,1"));
        graph.axes().at(0).base(Point.parse("1,-1"));
        graph.axes().at(0).minposition(Displacement.parse("-0.3"));
        graph.axes().at(0).maxposition(Displacement.parse("1"));

        graph.axes().add(new Axis(Axis.HORIZONTAL));
        graph.axes().at(1).color(RGBColor.parse("0x123456"));
        graph.axes().at(1).id("x2");
        graph.axes().at(1).type("number");
        graph.axes().at(1).pregap(2);
        graph.axes().at(1).postgap(4);
        graph.axes().at(1).anchor(1);
        graph.axes().at(1).min("0");
        graph.axes().at(1).minoffset(19);
        graph.axes().at(1).max("10");
        graph.axes().at(1).maxoffset(2);
        graph.axes().at(1).tickmin(-3);
        graph.axes().at(1).tickmax(3);
        graph.axes().at(1).highlightstyle("bold");
        graph.axes().at(1).linewidth(1);
        graph.axes().at(1).length(Displacement.parse("1"));
        graph.axes().at(1).position(Point.parse("1,1"));
        graph.axes().at(1).base(Point.parse("1,-1"));
        graph.axes().at(1).minposition(Displacement.parse("-0.2"));
        graph.axes().at(1).maxposition(Displacement.parse("1"));

        graph.axes().add(new Axis(Axis.VERTICAL));
        graph.axes().at(2).color(RGBColor.parse("0x123456"));
        graph.axes().at(2).id("y");
        graph.axes().at(2).type("number");
        graph.axes().at(2).pregap(2);
        graph.axes().at(2).postgap(4);
        graph.axes().at(2).anchor(1);
        graph.axes().at(2).min("0");
        graph.axes().at(2).minoffset(19);
        graph.axes().at(2).max("10");
        graph.axes().at(2).maxoffset(2);
        graph.axes().at(2).tickmin(-3);
        graph.axes().at(2).tickmax(3);
        graph.axes().at(2).highlightstyle("bold");
        graph.axes().at(2).linewidth(1);
        graph.axes().at(2).length(Displacement.parse("1"));
        graph.axes().at(2).position(Point.parse("1,1"));
        graph.axes().at(2).base(Point.parse("1,-1"));
        graph.axes().at(2).minposition(Displacement.parse("0.2"));
        graph.axes().at(2).maxposition(Displacement.parse("1"));

        graph.axes().add(new Axis(Axis.VERTICAL));
        graph.axes().at(3).color(RGBColor.parse("0x123456"));
        graph.axes().at(3).id("y2");
        graph.axes().at(3).type("number");
        graph.axes().at(3).pregap(2);
        graph.axes().at(3).postgap(4);
        graph.axes().at(3).anchor(1);
        graph.axes().at(3).min("0");
        graph.axes().at(3).minoffset(19);
        graph.axes().at(3).max("10");
        graph.axes().at(3).maxoffset(2);
        graph.axes().at(3).tickmin(-3);
        graph.axes().at(3).tickmax(3);
        graph.axes().at(3).highlightstyle("bold");
        graph.axes().at(3).linewidth(1);
        graph.axes().at(3).length(Displacement.parse("1"));
        graph.axes().at(3).position(Point.parse("1,1"));
        graph.axes().at(3).base(Point.parse("1,-1"));
        graph.axes().at(3).minposition(Displacement.parse("1"));
        graph.axes().at(3).maxposition(Displacement.parse("1"));

        variables = [];
        variables.push(new DataVariable("x"));
        variables[0].column(0);
        variables[0].type("number");
        variables[0].missingop(DataValue.parseComparator("eq"));

        variables.push(new DataVariable("y"));
        variables[1].column(1);
        variables[1].type("number");

        graph.data().add(new ArrayData(variables, [["3", "4"], ["5", "6"]]));
        graph.data().at(0).stringArray([]);
        graph.data().at(0).array([
            [DataValue.parse("number", "3"), DataValue.parse("number", "4")],
            [DataValue.parse("number", "5"), DataValue.parse("number", "6")]
        ]);
        
        expect(graph.serialize()).toEqual(xmlString);

    });

});
