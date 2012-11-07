/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint  laxbreak:true */

describe("Multigraph serialization", function () {
    "use strict";

    var ArrayData = window.multigraph.core.ArrayData,
        Axis = window.multigraph.core.Axis,
        Background = window.multigraph.core.Background,
        DataPlot = window.multigraph.core.DataPlot,
        DataVariable = window.multigraph.core.DataVariable,
        Graph = window.multigraph.core.Graph,
        Icon = window.multigraph.core.Icon,
        Legend = window.multigraph.core.Legend,
        Multigraph = window.multigraph.core.Multigraph,
        Plotarea = window.multigraph.core.Plotarea,
        Title = window.multigraph.core.Title,
        Window = window.multigraph.core.Window,
        DataValue = window.multigraph.core.DataValue,
        Displacement = window.multigraph.math.Displacement,
        Point = window.multigraph.math.Point,
        RGBColor = window.multigraph.math.RGBColor,
        xmlString,
        multigraph;

    beforeEach(function () {        
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize multigraph models with exactly one graph subtag", function () {
        var variables;
        
        xmlString =  ''
            + '<mugl>'
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
            +    '<plotarea'
            +        ' margintop="5"'
            +        ' marginleft="10"'
            +        ' marginbottom="19"'
            +        ' marginright="5"'
            +        ' bordercolor="0x111223"'
            +        ' border="0"'
            +    '/>'
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
            + '</mugl>';

        multigraph = new Multigraph();

        multigraph.graphs().add(new Graph());

        multigraph.graphs().at(0).window(new Window());
        multigraph.graphs().at(0).window().margin().set(1,1,1,1);
        multigraph.graphs().at(0).window().padding().set(10,10,10,10);
        multigraph.graphs().at(0).window().bordercolor(RGBColor.parse("0x111223"));
        multigraph.graphs().at(0).window().width(2);
        multigraph.graphs().at(0).window().height(97);
        multigraph.graphs().at(0).window().border(0);

        multigraph.graphs().at(0).background(new Background());
        multigraph.graphs().at(0).background().color(RGBColor.parse("0x123456"));

        multigraph.graphs().at(0).plotarea(new Plotarea());
        multigraph.graphs().at(0).plotarea().margin().bottom(19);
        multigraph.graphs().at(0).plotarea().margin().left(10);
        multigraph.graphs().at(0).plotarea().margin().top(5);
        multigraph.graphs().at(0).plotarea().margin().right(5);
        multigraph.graphs().at(0).plotarea().border(0);
        multigraph.graphs().at(0).plotarea().bordercolor(RGBColor.parse("0x111223"));

        multigraph.graphs().at(0).plots().add(new DataPlot());
        multigraph.graphs().at(0).plots().at(0).horizontalaxis(new Axis(Axis.HORIZONTAL));
        multigraph.graphs().at(0).plots().at(0).horizontalaxis().id("x");
        multigraph.graphs().at(0).plots().at(0).verticalaxis(new Axis(Axis.VERTICAL));
        multigraph.graphs().at(0).plots().at(0).verticalaxis().id("y");
        multigraph.graphs().at(0).plots().at(0).variable().add(new DataVariable("x"));
        multigraph.graphs().at(0).plots().at(0).variable().add(new DataVariable("y"));

        variables = [];
        variables.push(new DataVariable("x"));
        variables[0].column(0);
        variables[0].type("number");
        variables[0].missingop(DataValue.parseComparator("eq"));

        variables.push(new DataVariable("y"));
        variables[1].column(1);
        variables[1].type("number");

        multigraph.graphs().at(0).data().add(new ArrayData(variables, [["3", "4"], ["5", "6"]]));
        multigraph.graphs().at(0).data().at(0).stringArray([]);
        multigraph.graphs().at(0).data().at(0).array([
            [DataValue.parse("number", "3"), DataValue.parse("number", "4")],
            [DataValue.parse("number", "5"), DataValue.parse("number", "6")]
        ]);

        expect(multigraph.serialize()).toEqual(xmlString);

    });

    it("should properly serialize multigraph models with many graph submodels", function () {

        var variables;

        xmlString = ''
            + '<mugl>'
            +     '<graph>'
            +         '<window'
            +             ' margin="1"'
            +             ' padding="10"'
            +             ' bordercolor="0x111223"'
            +             ' width="2"'
            +             ' height="97"'
            +             ' border="0"'
            +         '/>'
            +         '<legend'
            +             ' color="0x56839c"'
            +             ' bordercolor="0x941394"'
            +             ' base="-1,-1"'
            +             ' anchor="0,0"'
            +             ' position="0,0"'
            +             ' visible="true"'
            +             ' frame="padding"'
            +             ' opacity="1"'
            +             ' border="10"'
            +             ' rows="4"'
            +             ' columns="3"'
            +             ' cornerradius="5"'
            +             ' padding="4"'
            +             '>'
            +             '<icon'
            +                 ' height="30"'
            +                 ' width="40"'
            +                 ' border="1"'
            +             '/>'
            +         '</legend>'
            +         '<background'
            +             ' color="0x123456"'
            +         '/>'
            +         '<plotarea'
            +             ' margintop="5"'
            +             ' marginleft="10"'
            +             ' marginbottom="19"'
            +             ' marginright="5"'
            +             ' bordercolor="0x111223"'
            +             ' border="0"'
            +         '/>'
            +         '<title'
            +             ' color="0xfffaab"'
            +             ' bordercolor="0x127752"'
            +             ' border="2"'
            +             ' opacity="0"'
            +             ' padding="4"'
            +             ' cornerradius="10"'
            +             ' anchor="1,1"'
            +             ' base="0,0"'
            +             ' position="-1,1"'
            +         '>'
            +             'Graph Title'
            +         '</title>'
            +         '<horizontalaxis'
            +             ' color="0x123456"'
            +             ' id="x"'
            +             ' type="number"'
            +             ' pregap="2"'
            +             ' postgap="4"'
            +             ' anchor="1"'
            +             ' min="0"'
            +             ' minoffset="19"'
            +             ' max="10"'
            +             ' maxoffset="2"'
            +             ' tickmin="-3"'
            +             ' tickmax="3"'
            +             ' highlightstyle="bold"'
            +             ' linewidth="1"'
            +             ' length="1"'
            +             ' position="1,1"'
            +             ' base="1,-1"'
            +             ' minposition="-0.3"'
            +             ' maxposition="1"'
            +         '>'
            +             '<grid color="0xeeeeee" visible="false"/>'
            +         '</horizontalaxis>'
            +         '<horizontalaxis'
            +             ' color="0x123456"'
            +             ' id="x2"'
            +             ' type="number"'
            +             ' pregap="2"'
            +             ' postgap="4"'
            +             ' anchor="1"'
            +             ' min="0"'
            +             ' minoffset="19"'
            +             ' max="10"'
            +             ' maxoffset="2"'
            +             ' tickmin="-3"'
            +             ' tickmax="3"'
            +             ' highlightstyle="bold"'
            +             ' linewidth="1"'
            +             ' length="1"'
            +             ' position="1,1"'
            +             ' base="1,-1"'
            +             ' minposition="-0.2"'
            +             ' maxposition="1"'
            +         '>'
            +             '<grid color="0xeeeeee" visible="false"/>'
            +         '</horizontalaxis>'
            +         '<verticalaxis'
            +             ' color="0x123456"'
            +             ' id="y"'
            +             ' type="number"'
            +             ' pregap="2"'
            +             ' postgap="4"'
            +             ' anchor="1"'
            +             ' min="0"'
            +             ' minoffset="19"'
            +             ' max="10"'
            +             ' maxoffset="2"'
            +             ' tickmin="-3"'
            +             ' tickmax="3"'
            +             ' highlightstyle="bold"'
            +             ' linewidth="1"'
            +             ' length="1"'
            +             ' position="1,1"'
            +             ' base="1,-1"'
            +             ' minposition="0.2"'
            +             ' maxposition="1"'
            +         '>'
            +             '<grid color="0xeeeeee" visible="false"/>'
            +         '</verticalaxis>'
            +         '<verticalaxis'
            +             ' color="0x123456"'
            +             ' id="y2"'
            +             ' type="number"'
            +             ' pregap="2"'
            +             ' postgap="4"'
            +             ' anchor="1"'
            +             ' min="0"'
            +             ' minoffset="19"'
            +             ' max="10"'
            +             ' maxoffset="2"'
            +             ' tickmin="-3"'
            +             ' tickmax="3"'
            +             ' highlightstyle="bold"'
            +             ' linewidth="1"'
            +             ' length="1"'
            +             ' position="1,1"'
            +             ' base="1,-1"'
            +             ' minposition="1"'
            +             ' maxposition="1"'
            +         '>'
            +             '<grid color="0xeeeeee" visible="false"/>'
            +         '</verticalaxis>'
            +         '<plot>'
            +             '<horizontalaxis'
            +                 ' ref="x"'
            +                 '>'
            +                 '<variable'
            +                     ' ref="x"'
            +                 '/>'
            +             '</horizontalaxis>'
            +             '<verticalaxis'
            +                 ' ref="y"'
            +                 '>'
            +                 '<variable'
            +                     ' ref="y"'
            +                 '/>'
            +             '</verticalaxis>'
            +         '</plot>'
            +         '<plot>'
            +             '<horizontalaxis'
            +                 ' ref="x"'
            +                 '/>'
            +         '</plot>'
            +         '<data>'
            +             '<variables>'
            +               '<variable id="x" column="0" type="number" missingop="eq"/>'
            +               '<variable id="y" column="1" type="number"/>'
            +             '</variables>'
            +             '<values>'
            +                 '3,4\n'
            +                 '5,6'
            +             '</values>'
            +         '</data>'
            +     '</graph>'
            +     '<graph>'
            +         '<window'
            +             ' margin="1"'
            +             ' padding="10"'
            +             ' bordercolor="0x111223"'
            +             ' width="2"'
            +             ' height="97"'
            +             ' border="0"'
            +         '/>'
            +         '<legend'
            +             ' color="0x56839c"'
            +             ' bordercolor="0x941394"'
            +             ' base="-1,-1"'
            +             ' anchor="0,0"'
            +             ' position="0,0"'
            +             ' visible="true"'
            +             ' frame="padding"'
            +             ' opacity="1"'
            +             ' border="10"'
            +             ' rows="4"'
            +             ' columns="3"'
            +             ' cornerradius="5"'
            +             ' padding="4"'
            +             '>'
            +             '<icon'
            +                 ' height="30"'
            +                 ' width="40"'
            +                 ' border="1"'
            +             '/>'
            +         '</legend>'
            +         '<background'
            +             ' color="0x123456"'
            +         '/>'
            +         '<plotarea'
            +             ' margintop="5"'
            +             ' marginleft="10"'
            +             ' marginbottom="19"'
            +             ' marginright="5"'
            +             ' bordercolor="0x111223"'
            +             ' border="0"'
            +         '/>'
            +         '<title'
            +             ' color="0xfffaab"'
            +             ' bordercolor="0x127752"'
            +             ' border="2"'
            +             ' opacity="0"'
            +             ' padding="4"'
            +             ' cornerradius="10"'
            +             ' anchor="1,1"'
            +             ' base="0,0"'
            +             ' position="-1,1"'
            +         '>'
            +             'Graph Title'
            +         '</title>'
            +         '<horizontalaxis'
            +             ' color="0x123456"'
            +             ' id="x"'
            +             ' type="number"'
            +             ' pregap="2"'
            +             ' postgap="4"'
            +             ' anchor="1"'
            +             ' min="0"'
            +             ' minoffset="19"'
            +             ' max="10"'
            +             ' maxoffset="2"'
            +             ' tickmin="-3"'
            +             ' tickmax="3"'
            +             ' highlightstyle="bold"'
            +             ' linewidth="1"'
            +             ' length="1"'
            +             ' position="1,1"'
            +             ' base="1,-1"'
            +             ' minposition="-0.3"'
            +             ' maxposition="1"'
            +         '>'
            +             '<grid color="0xeeeeee" visible="false"/>'
            +         '</horizontalaxis>'
            +         '<horizontalaxis'
            +             ' color="0x123456"'
            +             ' id="x2"'
            +             ' type="number"'
            +             ' pregap="2"'
            +             ' postgap="4"'
            +             ' anchor="1"'
            +             ' min="0"'
            +             ' minoffset="19"'
            +             ' max="10"'
            +             ' maxoffset="2"'
            +             ' tickmin="-3"'
            +             ' tickmax="3"'
            +             ' highlightstyle="bold"'
            +             ' linewidth="1"'
            +             ' length="1"'
            +             ' position="1,1"'
            +             ' base="1,-1"'
            +             ' minposition="-0.2"'
            +             ' maxposition="1"'
            +         '>'
            +             '<grid color="0xeeeeee" visible="false"/>'
            +         '</horizontalaxis>'
            +         '<verticalaxis'
            +             ' color="0x123456"'
            +             ' id="y"'
            +             ' type="number"'
            +             ' pregap="2"'
            +             ' postgap="4"'
            +             ' anchor="1"'
            +             ' min="0"'
            +             ' minoffset="19"'
            +             ' max="10"'
            +             ' maxoffset="2"'
            +             ' tickmin="-3"'
            +             ' tickmax="3"'
            +             ' highlightstyle="bold"'
            +             ' linewidth="1"'
            +             ' length="1"'
            +             ' position="1,1"'
            +             ' base="1,-1"'
            +             ' minposition="0.2"'
            +             ' maxposition="1"'
            +         '>'
            +             '<grid color="0xeeeeee" visible="false"/>'
            +         '</verticalaxis>'
            +         '<verticalaxis'
            +             ' color="0x123456"'
            +             ' id="y2"'
            +             ' type="number"'
            +             ' pregap="2"'
            +             ' postgap="4"'
            +             ' anchor="1"'
            +             ' min="0"'
            +             ' minoffset="19"'
            +             ' max="10"'
            +             ' maxoffset="2"'
            +             ' tickmin="-3"'
            +             ' tickmax="3"'
            +             ' highlightstyle="bold"'
            +             ' linewidth="1"'
            +             ' length="1"'
            +             ' position="1,1"'
            +             ' base="1,-1"'
            +             ' minposition="1"'
            +             ' maxposition="1"'
            +         '>'
            +             '<grid color="0xeeeeee" visible="false"/>'
            +         '</verticalaxis>'
            +        '<plot>'
            +            '<horizontalaxis'
            +                ' ref="x"'
            +                '>'
            +                '<variable'
            +                    ' ref="x"'
            +                '/>'
            +            '</horizontalaxis>'
            +            '<verticalaxis'
            +                ' ref="y"'
            +                '>'
            +                '<variable'
            +                    ' ref="y"'
            +                '/>'
            +            '</verticalaxis>'
            +        '</plot>'
            +        '<plot>'
            +            '<horizontalaxis'
            +                ' ref="x"'
            +                '/>'
            +        '</plot>'
            +         '<data>'
            +             '<variables>'
            +               '<variable id="x" column="0" type="number" missingop="eq"/>'
            +               '<variable id="y" column="1" type="number"/>'
            +             '</variables>'
            +             '<values>'
            +                 '3,4\n'
            +                 '5,6'
            +             '</values>'
            +         '</data>'
            +     '</graph>'
            + '</mugl>';

        multigraph = new Multigraph();

        multigraph.graphs().add(new Graph());

        multigraph.graphs().at(0).window(new Window());
        multigraph.graphs().at(0).window().margin().set(1,1,1,1);
        multigraph.graphs().at(0).window().padding().set(10,10,10,10);
        multigraph.graphs().at(0).window().bordercolor(RGBColor.parse("0x111223"));
        multigraph.graphs().at(0).window().width(2);
        multigraph.graphs().at(0).window().height(97);
        multigraph.graphs().at(0).window().border(0);

        multigraph.graphs().at(0).legend(new Legend());
        multigraph.graphs().at(0).legend().color(RGBColor.parse("0x56839c"));
        multigraph.graphs().at(0).legend().bordercolor(RGBColor.parse("0x941394"));
        multigraph.graphs().at(0).legend().base(Point.parse("-1,-1"));
        multigraph.graphs().at(0).legend().anchor(Point.parse("0,0"));
        multigraph.graphs().at(0).legend().position(Point.parse("0,0"));
        multigraph.graphs().at(0).legend().visible(true);
        multigraph.graphs().at(0).legend().frame("padding");
        multigraph.graphs().at(0).legend().opacity(1);
        multigraph.graphs().at(0).legend().border(10);
        multigraph.graphs().at(0).legend().rows(4);
        multigraph.graphs().at(0).legend().columns(3);
        multigraph.graphs().at(0).legend().cornerradius(5);
        multigraph.graphs().at(0).legend().padding(4);
        multigraph.graphs().at(0).legend().icon(new Icon());
        multigraph.graphs().at(0).legend().icon().height(30);
        multigraph.graphs().at(0).legend().icon().width(40);
        multigraph.graphs().at(0).legend().icon().border(1);

        multigraph.graphs().at(0).background(new Background());
        multigraph.graphs().at(0).background().color(RGBColor.parse("0x123456"));

        multigraph.graphs().at(0).plotarea(new Plotarea());
        multigraph.graphs().at(0).plotarea().margin().bottom(19);
        multigraph.graphs().at(0).plotarea().margin().left(10);
        multigraph.graphs().at(0).plotarea().margin().top(5);
        multigraph.graphs().at(0).plotarea().margin().right(5);
        multigraph.graphs().at(0).plotarea().border(0);
        multigraph.graphs().at(0).plotarea().bordercolor(RGBColor.parse("0x111223"));

        multigraph.graphs().at(0).title(new Title());
        multigraph.graphs().at(0).title().color(RGBColor.parse("0xfffaab"));
        multigraph.graphs().at(0).title().bordercolor(RGBColor.parse("0x127752"));
        multigraph.graphs().at(0).title().border("2");
        multigraph.graphs().at(0).title().opacity(0);
        multigraph.graphs().at(0).title().padding("4");
        multigraph.graphs().at(0).title().cornerradius("10");
        multigraph.graphs().at(0).title().anchor(Point.parse("1,1"));
        multigraph.graphs().at(0).title().base(Point.parse("0,0"));
        multigraph.graphs().at(0).title().position(Point.parse("-1,1"));
        multigraph.graphs().at(0).title().content("Graph Title");

        multigraph.graphs().at(0).plots().add(new DataPlot());
        multigraph.graphs().at(0).plots().at(0).horizontalaxis(new Axis(Axis.HORIZONTAL));
        multigraph.graphs().at(0).plots().at(0).horizontalaxis().id("x");
        multigraph.graphs().at(0).plots().at(0).verticalaxis(new Axis(Axis.VERTICAL));
        multigraph.graphs().at(0).plots().at(0).verticalaxis().id("y");
        multigraph.graphs().at(0).plots().at(0).variable().add(new DataVariable("x"));
        multigraph.graphs().at(0).plots().at(0).variable().add(new DataVariable("y"));

        multigraph.graphs().at(0).plots().add(new DataPlot());
        multigraph.graphs().at(0).plots().at(1).horizontalaxis(new Axis(Axis.HORIZONTAL));
        multigraph.graphs().at(0).plots().at(1).horizontalaxis().id("x");

        multigraph.graphs().at(0).axes().add(new Axis(Axis.HORIZONTAL));
        multigraph.graphs().at(0).axes().at(0).color(RGBColor.parse("0x123456"));
        multigraph.graphs().at(0).axes().at(0).id("x");
        multigraph.graphs().at(0).axes().at(0).type("number");
        multigraph.graphs().at(0).axes().at(0).pregap(2);
        multigraph.graphs().at(0).axes().at(0).postgap(4);
        multigraph.graphs().at(0).axes().at(0).anchor(1);
        multigraph.graphs().at(0).axes().at(0).min("0");
        multigraph.graphs().at(0).axes().at(0).minoffset(19);
        multigraph.graphs().at(0).axes().at(0).max("10");
        multigraph.graphs().at(0).axes().at(0).maxoffset(2);
        multigraph.graphs().at(0).axes().at(0).tickmin(-3);
        multigraph.graphs().at(0).axes().at(0).tickmax(3);
        multigraph.graphs().at(0).axes().at(0).highlightstyle("bold");
        multigraph.graphs().at(0).axes().at(0).linewidth(1);
        multigraph.graphs().at(0).axes().at(0).length(Displacement.parse("1"));
        multigraph.graphs().at(0).axes().at(0).position(Point.parse("1,1"));
        multigraph.graphs().at(0).axes().at(0).base(Point.parse("1,-1"));
        multigraph.graphs().at(0).axes().at(0).minposition(Displacement.parse("-0.3"));
        multigraph.graphs().at(0).axes().at(0).maxposition(Displacement.parse("1"));

        multigraph.graphs().at(0).axes().add(new Axis(Axis.HORIZONTAL));
        multigraph.graphs().at(0).axes().at(1).color(RGBColor.parse("0x123456"));
        multigraph.graphs().at(0).axes().at(1).id("x2");
        multigraph.graphs().at(0).axes().at(1).type("number");
        multigraph.graphs().at(0).axes().at(1).pregap(2);
        multigraph.graphs().at(0).axes().at(1).postgap(4);
        multigraph.graphs().at(0).axes().at(1).anchor(1);
        multigraph.graphs().at(0).axes().at(1).min("0");
        multigraph.graphs().at(0).axes().at(1).minoffset(19);
        multigraph.graphs().at(0).axes().at(1).max("10");
        multigraph.graphs().at(0).axes().at(1).maxoffset(2);
        multigraph.graphs().at(0).axes().at(1).tickmin(-3);
        multigraph.graphs().at(0).axes().at(1).tickmax(3);
        multigraph.graphs().at(0).axes().at(1).highlightstyle("bold");
        multigraph.graphs().at(0).axes().at(1).linewidth(1);
        multigraph.graphs().at(0).axes().at(1).length(Displacement.parse("1"));
        multigraph.graphs().at(0).axes().at(1).position(Point.parse("1,1"));
        multigraph.graphs().at(0).axes().at(1).base(Point.parse("1,-1"));
        multigraph.graphs().at(0).axes().at(1).minposition(Displacement.parse("-0.2"));
        multigraph.graphs().at(0).axes().at(1).maxposition(Displacement.parse("1"));

        multigraph.graphs().at(0).axes().add(new Axis(Axis.VERTICAL));
        multigraph.graphs().at(0).axes().at(2).color(RGBColor.parse("0x123456"));
        multigraph.graphs().at(0).axes().at(2).id("y");
        multigraph.graphs().at(0).axes().at(2).type("number");
        multigraph.graphs().at(0).axes().at(2).pregap(2);
        multigraph.graphs().at(0).axes().at(2).postgap(4);
        multigraph.graphs().at(0).axes().at(2).anchor(1);
        multigraph.graphs().at(0).axes().at(2).min("0");
        multigraph.graphs().at(0).axes().at(2).minoffset(19);
        multigraph.graphs().at(0).axes().at(2).max("10");
        multigraph.graphs().at(0).axes().at(2).maxoffset(2);
        multigraph.graphs().at(0).axes().at(2).tickmin(-3);
        multigraph.graphs().at(0).axes().at(2).tickmax(3);
        multigraph.graphs().at(0).axes().at(2).highlightstyle("bold");
        multigraph.graphs().at(0).axes().at(2).linewidth(1);
        multigraph.graphs().at(0).axes().at(2).length(Displacement.parse("1"));
        multigraph.graphs().at(0).axes().at(2).position(Point.parse("1,1"));
        multigraph.graphs().at(0).axes().at(2).base(Point.parse("1,-1"));
        multigraph.graphs().at(0).axes().at(2).minposition(Displacement.parse("0.2"));
        multigraph.graphs().at(0).axes().at(2).maxposition(Displacement.parse("1"));

        multigraph.graphs().at(0).axes().add(new Axis(Axis.VERTICAL));
        multigraph.graphs().at(0).axes().at(3).color(RGBColor.parse("0x123456"));
        multigraph.graphs().at(0).axes().at(3).id("y2");
        multigraph.graphs().at(0).axes().at(3).type("number");
        multigraph.graphs().at(0).axes().at(3).pregap(2);
        multigraph.graphs().at(0).axes().at(3).postgap(4);
        multigraph.graphs().at(0).axes().at(3).anchor(1);
        multigraph.graphs().at(0).axes().at(3).min("0");
        multigraph.graphs().at(0).axes().at(3).minoffset(19);
        multigraph.graphs().at(0).axes().at(3).max("10");
        multigraph.graphs().at(0).axes().at(3).maxoffset(2);
        multigraph.graphs().at(0).axes().at(3).tickmin(-3);
        multigraph.graphs().at(0).axes().at(3).tickmax(3);
        multigraph.graphs().at(0).axes().at(3).highlightstyle("bold");
        multigraph.graphs().at(0).axes().at(3).linewidth(1);
        multigraph.graphs().at(0).axes().at(3).length(Displacement.parse("1"));
        multigraph.graphs().at(0).axes().at(3).position(Point.parse("1,1"));
        multigraph.graphs().at(0).axes().at(3).base(Point.parse("1,-1"));
        multigraph.graphs().at(0).axes().at(3).minposition(Displacement.parse("1"));
        multigraph.graphs().at(0).axes().at(3).maxposition(Displacement.parse("1"));

        variables = [];
        variables.push(new DataVariable("x"));
        variables[0].column(0);
        variables[0].type("number");
        variables[0].missingop(DataValue.parseComparator("eq"));

        variables.push(new DataVariable("y"));
        variables[1].column(1);
        variables[1].type("number");

        multigraph.graphs().at(0).data().add(new ArrayData(variables, [["3", "4"], ["5", "6"]]));
        multigraph.graphs().at(0).data().at(0).stringArray([]);
        multigraph.graphs().at(0).data().at(0).array([
            [DataValue.parse("number", "3"), DataValue.parse("number", "4")],
            [DataValue.parse("number", "5"), DataValue.parse("number", "6")]
        ]);
        
        multigraph.graphs().add(new Graph());

        multigraph.graphs().at(1).window(new Window());
        multigraph.graphs().at(1).window().margin().set(1,1,1,1);
        multigraph.graphs().at(1).window().padding().set(10,10,10,10);
        multigraph.graphs().at(1).window().bordercolor(RGBColor.parse("0x111223"));
        multigraph.graphs().at(1).window().width(2);
        multigraph.graphs().at(1).window().height(97);
        multigraph.graphs().at(1).window().border(0);

        multigraph.graphs().at(1).legend(new Legend());
        multigraph.graphs().at(1).legend().color(RGBColor.parse("0x56839c"));
        multigraph.graphs().at(1).legend().bordercolor(RGBColor.parse("0x941394"));
        multigraph.graphs().at(1).legend().base(Point.parse("-1,-1"));
        multigraph.graphs().at(1).legend().anchor(Point.parse("0,0"));
        multigraph.graphs().at(1).legend().position(Point.parse("0,0"));
        multigraph.graphs().at(1).legend().visible(true);
        multigraph.graphs().at(1).legend().frame("padding");
        multigraph.graphs().at(1).legend().opacity(1);
        multigraph.graphs().at(1).legend().border(10);
        multigraph.graphs().at(1).legend().rows(4);
        multigraph.graphs().at(1).legend().columns(3);
        multigraph.graphs().at(1).legend().cornerradius(5);
        multigraph.graphs().at(1).legend().padding(4);
        multigraph.graphs().at(1).legend().icon(new Icon());
        multigraph.graphs().at(1).legend().icon().height(30);
        multigraph.graphs().at(1).legend().icon().width(40);
        multigraph.graphs().at(1).legend().icon().border(1);

        multigraph.graphs().at(1).background(new Background());
        multigraph.graphs().at(1).background().color(RGBColor.parse("0x123456"));
        multigraph.
        graphs().at(1).plotarea(new Plotarea());
        multigraph.graphs().at(1).plotarea().margin().bottom(19);
        multigraph.graphs().at(1).plotarea().margin().left(10);
        multigraph.graphs().at(1).plotarea().margin().top(5);
        multigraph.graphs().at(1).plotarea().margin().right(5);
        multigraph.graphs().at(1).plotarea().border(0);
        multigraph.graphs().at(1).plotarea().bordercolor(RGBColor.parse("0x111223"));

        multigraph.graphs().at(1).title(new Title());
        multigraph.graphs().at(1).title().color(RGBColor.parse("0xfffaab"));
        multigraph.graphs().at(1).title().bordercolor(RGBColor.parse("0x127752"));
        multigraph.graphs().at(1).title().border("2");
        multigraph.graphs().at(1).title().opacity(0);
        multigraph.graphs().at(1).title().padding("4");
        multigraph.graphs().at(1).title().cornerradius("10");
        multigraph.graphs().at(1).title().anchor(Point.parse("1,1"));
        multigraph.graphs().at(1).title().base(Point.parse("0,0"));
        multigraph.graphs().at(1).title().position(Point.parse("-1,1"));
        multigraph.graphs().at(1).title().content("Graph Title");

        multigraph.graphs().at(1).plots().add(new DataPlot());
        multigraph.graphs().at(1).plots().at(0).horizontalaxis(new Axis(Axis.HORIZONTAL));
        multigraph.graphs().at(1).plots().at(0).horizontalaxis().id("x");
        multigraph.graphs().at(1).plots().at(0).verticalaxis(new Axis(Axis.VERTICAL));
        multigraph.graphs().at(1).plots().at(0).verticalaxis().id("y");
        multigraph.graphs().at(1).plots().at(0).variable().add(new DataVariable("x"));
        multigraph.graphs().at(1).plots().at(0).variable().add(new DataVariable("y"));

        multigraph.graphs().at(1).plots().add(new DataPlot());
        multigraph.graphs().at(1).plots().at(1).horizontalaxis(new Axis(Axis.HORIZONTAL));
        multigraph.graphs().at(1).plots().at(1).horizontalaxis().id("x");

        multigraph.graphs().at(1).axes().add(new Axis(Axis.HORIZONTAL));
        multigraph.graphs().at(1).axes().at(0).color(RGBColor.parse("0x123456"));
        multigraph.graphs().at(1).axes().at(0).id("x");
        multigraph.graphs().at(1).axes().at(0).type("number");
        multigraph.graphs().at(1).axes().at(0).pregap(2);
        multigraph.graphs().at(1).axes().at(0).postgap(4);
        multigraph.graphs().at(1).axes().at(0).anchor(1);
        multigraph.graphs().at(1).axes().at(0).min("0");
        multigraph.graphs().at(1).axes().at(0).minoffset(19);
        multigraph.graphs().at(1).axes().at(0).max("10");
        multigraph.graphs().at(1).axes().at(0).maxoffset(2);
        multigraph.graphs().at(1).axes().at(0).tickmin(-3);
        multigraph.graphs().at(1).axes().at(0).tickmax(3);
        multigraph.graphs().at(1).axes().at(0).highlightstyle("bold");
        multigraph.graphs().at(1).axes().at(0).linewidth(1);
        multigraph.graphs().at(1).axes().at(0).length(Displacement.parse("1"));
        multigraph.graphs().at(1).axes().at(0).position(Point.parse("1,1"));
        multigraph.graphs().at(1).axes().at(0).base(Point.parse("1,-1"));
        multigraph.graphs().at(1).axes().at(0).minposition(Displacement.parse("-0.3"));
        multigraph.graphs().at(1).axes().at(0).maxposition(Displacement.parse("1"));

        multigraph.graphs().at(1).axes().add(new Axis(Axis.HORIZONTAL));
        multigraph.graphs().at(1).axes().at(1).color(RGBColor.parse("0x123456"));
        multigraph.graphs().at(1).axes().at(1).id("x2");
        multigraph.graphs().at(1).axes().at(1).type("number");
        multigraph.graphs().at(1).axes().at(1).pregap(2);
        multigraph.graphs().at(1).axes().at(1).postgap(4);
        multigraph.graphs().at(1).axes().at(1).anchor(1);
        multigraph.graphs().at(1).axes().at(1).min("0");
        multigraph.graphs().at(1).axes().at(1).minoffset(19);
        multigraph.graphs().at(1).axes().at(1).max("10");
        multigraph.graphs().at(1).axes().at(1).maxoffset(2);
        multigraph.graphs().at(1).axes().at(1).tickmin(-3);
        multigraph.graphs().at(1).axes().at(1).tickmax(3);
        multigraph.graphs().at(1).axes().at(1).highlightstyle("bold");
        multigraph.graphs().at(1).axes().at(1).linewidth(1);
        multigraph.graphs().at(1).axes().at(1).length(Displacement.parse("1"));
        multigraph.graphs().at(1).axes().at(1).position(Point.parse("1,1"));
        multigraph.graphs().at(1).axes().at(1).base(Point.parse("1,-1"));
        multigraph.graphs().at(1).axes().at(1).minposition(Displacement.parse("-0.2"));
        multigraph.graphs().at(1).axes().at(1).maxposition(Displacement.parse("1"));

        multigraph.graphs().at(1).axes().add(new Axis(Axis.VERTICAL));
        multigraph.graphs().at(1).axes().at(2).color(RGBColor.parse("0x123456"));
        multigraph.graphs().at(1).axes().at(2).id("y");
        multigraph.graphs().at(1).axes().at(2).type("number");
        multigraph.graphs().at(1).axes().at(2).pregap(2);
        multigraph.graphs().at(1).axes().at(2).postgap(4);
        multigraph.graphs().at(1).axes().at(2).anchor(1);
        multigraph.graphs().at(1).axes().at(2).min("0");
        multigraph.graphs().at(1).axes().at(2).minoffset(19);
        multigraph.graphs().at(1).axes().at(2).max("10");
        multigraph.graphs().at(1).axes().at(2).maxoffset(2);
        multigraph.graphs().at(1).axes().at(2).tickmin(-3);
        multigraph.graphs().at(1).axes().at(2).tickmax(3);
        multigraph.graphs().at(1).axes().at(2).highlightstyle("bold");
        multigraph.graphs().at(1).axes().at(2).linewidth(1);
        multigraph.graphs().at(1).axes().at(2).length(Displacement.parse("1"));
        multigraph.graphs().at(1).axes().at(2).position(Point.parse("1,1"));
        multigraph.graphs().at(1).axes().at(2).base(Point.parse("1,-1"));
        multigraph.graphs().at(1).axes().at(2).minposition(Displacement.parse("0.2"));
        multigraph.graphs().at(1).axes().at(2).maxposition(Displacement.parse("1"));

        multigraph.graphs().at(1).axes().add(new Axis(Axis.VERTICAL));
        multigraph.graphs().at(1).axes().at(3).color(RGBColor.parse("0x123456"));
        multigraph.graphs().at(1).axes().at(3).id("y2");
        multigraph.graphs().at(1).axes().at(3).type("number");
        multigraph.graphs().at(1).axes().at(3).pregap(2);
        multigraph.graphs().at(1).axes().at(3).postgap(4);
        multigraph.graphs().at(1).axes().at(3).anchor(1);
        multigraph.graphs().at(1).axes().at(3).min("0");
        multigraph.graphs().at(1).axes().at(3).minoffset(19);
        multigraph.graphs().at(1).axes().at(3).max("10");
        multigraph.graphs().at(1).axes().at(3).maxoffset(2);
        multigraph.graphs().at(1).axes().at(3).tickmin(-3);
        multigraph.graphs().at(1).axes().at(3).tickmax(3);
        multigraph.graphs().at(1).axes().at(3).highlightstyle("bold");
        multigraph.graphs().at(1).axes().at(3).linewidth(1);
        multigraph.graphs().at(1).axes().at(3).length(Displacement.parse("1"));
        multigraph.graphs().at(1).axes().at(3).position(Point.parse("1,1"));
        multigraph.graphs().at(1).axes().at(3).base(Point.parse("1,-1"));
        multigraph.graphs().at(1).axes().at(3).minposition(Displacement.parse("1"));
        multigraph.graphs().at(1).axes().at(3).maxposition(Displacement.parse("1"));

        variables = [];
        variables.push(new DataVariable("x"));
        variables[0].column(0);
        variables[0].type("number");
        variables[0].missingop(DataValue.parseComparator("eq"));

        variables.push(new DataVariable("y"));
        variables[1].column(1);
        variables[1].type("number");

        multigraph.graphs().at(1).data().add(new ArrayData(variables, [["3", "4"], ["5", "6"]]));
        multigraph.graphs().at(1).data().at(0).stringArray([]);
        multigraph.graphs().at(1).data().at(0).array([
            [DataValue.parse("number", "3"), DataValue.parse("number", "4")],
            [DataValue.parse("number", "5"), DataValue.parse("number", "6")]
        ]);
        
        expect(multigraph.serialize()).toEqual(xmlString);

    });

});
