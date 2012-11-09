/*global xdescribe, describe, xit, beforeEach, expect, it, jasmine */
/*jshint laxbreak:true */

describe("Axis parsing", function () {
    "use strict";

    var Axis = window.multigraph.core.Axis,
        AxisBinding = window.multigraph.core.AxisBinding,
        AxisTitle = window.multigraph.core.AxisTitle,
        Labels = window.multigraph.core.Labels,
        Labeler = window.multigraph.core.Labeler,
        Grid = window.multigraph.core.Grid,
        Pan = window.multigraph.core.Pan,
        Zoom = window.multigraph.core.Zoom,
        Binding = window.multigraph.core.Binding,
        xmlString = '<horizontalaxis'
+     ' color="0x123456"'
+     ' id="x"'
+     ' type="number"'
+     ' pregap="2"'
+     ' postgap="4"'
+     ' anchor="1"'
+     ' min="0"'
+     ' minoffset="19"'
+     ' max="10"'
+     ' maxoffset="2"'
+     ' tickmin="-3"'
+     ' tickmax="3"'
+     ' highlightstyle="bold"'
+     ' linewidth="1"'
+     ' length="1"'
+     ' position="1,1"'
+     ' base="1,-1"'
+     ' minposition="-1"'
+     ' maxposition="1"'
+     '>'
+   '<labels'
+       ' start="0"'
+       ' angle="0"'
+       ' format="%1d"'
+       ' anchor="0,0"'
+       ' position="0,0"'
+       ' spacing="10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001"'
+       '/>'
+     '<grid color="0xeeeeee" visible="false"/>'
+ '</horizontalaxis>',
        $xml,
        axis;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        axis = Axis.parseXML($xml, Axis.HORIZONTAL);
    });

    it("should be able to parse an axis from XML", function () {
        expect(axis).not.toBeUndefined();
    });

    it("should be able to parse an axis from XML and read its 'id' attribute", function () {
        expect(axis.id()).toBe("x");
    });

    it("should be able to parse an axis from XML and read its 'type' attribute", function () {
        expect(axis.type()).toBe("number");
    });

    it("should be able to parse an axis from XML and read its 'length' attribute", function () {
        expect(axis.length().serialize()).toBe("1");
    });

    it("should be able to parse an axis from XML and read its 'position' attribute", function () {
        expect(axis.position().x()).toEqual(1);
        expect(axis.position().y()).toEqual(1);
    });

    it("should be able to parse an axis from XML and read its 'pregap' attribute", function () {
        expect(axis.pregap()).toBe(2);
    });

    it("should be able to parse an axis from XML and read its 'postgap' attribute", function () {
        expect(axis.postgap()).toBe(4);
    });

    it("should be able to parse an axis from XML and read its 'anchor' attribute", function () {
        expect(axis.anchor()).toEqual(1);
    });

    it("should be able to parse an axis from XML and read its 'base' attribute", function () {
        expect(axis.base().x()).toEqual(1);
        expect(axis.base().y()).toEqual(-1);
    });

    it("should be able to parse an axis from XML and read its 'min' attribute", function () {
        expect(axis.min()).toBe("0");
    });

    it("should be able to parse an axis from XML and read its 'minoffset' attribute", function () {
        expect(axis.minoffset()).toBe(19);
    });

    it("should be able to parse an axis from XML and read its 'minposition' attribute", function () {
        expect(axis.minposition().a()).toBe(-1);
        expect(axis.minposition().b()).toBe(0);
    });

    it("should be able to parse an axis from XML and read its 'max' attribute", function () {
        expect(axis.max()).toBe("10");
    });

    it("should be able to parse an axis from XML and read its 'maxoffset' attribute", function () {
        expect(axis.maxoffset()).toBe(2);
    });

    it("should be able to parse an axis from XML and read its 'maxposition' attribute", function () {
        expect(axis.maxposition().a()).toBe(1);
        expect(axis.maxposition().b()).toBe(0);
    });

    it("should be able to parse an axis from XML and read its 'color' attribute", function () {
        expect(axis.color().getHexString()).toBe("0x123456");
    });

    it("should be able to parse an axis from XML and read its 'tickmin' attribute", function () {
        expect(axis.tickmin()).toBe(-3);
    });

    it("should be able to parse an axis from XML and read its 'tickmax' attribute", function () {
        expect(axis.tickmax()).toBe(3);
    });

    it("should be able to parse an axis from XML and read its 'highlightstyle' attribute", function () {
        expect(axis.highlightstyle()).toBe("bold");
    });

    it("should be able to parse an axis from XML and read its 'linewidth' attribute", function () {
        expect(axis.linewidth()).toBe(1);
    });

    it("should be able to parse an axis from XML, then serialize it, and get the same XML as the original", function () {
        var xmlString2 = '<verticalaxis color="0x000000" id="y" type="datetime" max="10"/>';
//        b = Axis.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString2), 'vertical');
        expect(axis.serialize()).toBe(xmlString);
//        expect(b.serialize() === xmlString2).toBe(true);
    });

    describe("AxisTitle parsing", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis'
                +    ' color="0x000000"'
                +    ' id="y2"'
                +    ' type="number"'
                +    ' pregap="0"'
                +    ' postgap="0"'
                +    ' anchor="-1"'
                +    ' min="auto"'
                +    ' minoffset="0"'
                +    ' max="auto"'
                +    ' maxoffset="0"'
                +    ' tickmin="-3"'
                +    ' tickmax="3"'
                +    ' highlightstyle="axis"'
                +    ' linewidth="1"'
                +    ' length="0.9"'
                +    ' position="0,0"'
                +    ' base="-1,1"'
                +    ' minposition="-1"'
                +    ' maxposition="1"'
                +    '>'
                +   '<title'
                +      ' angle="70"'
                +      ' anchor="1,1"'
                +      ' position="-1,1"'
                +       '>'
                +     'A Title'
                +   '</title>'
                +   '<labels'
                +      ' start="0"'
                +      ' angle="0"'
                +      ' format="%1d"'
                +      ' anchor="0,0"'
                +      ' position="0,0"'
                +      ' spacing="10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001"'
                +      '/>'
                +    '<grid color="0xeeeeee" visible="false"/>'
                + '</verticalaxis>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse a axis with a AxisTitle child from XML", function () {
            axis = Axis.parseXML($xml, Axis.VERTICAL);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.title() instanceof AxisTitle).toBe(true);

        });

        it("should be able to parse a axis with a AxisTitle child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml, Axis.VERTICAL);
            expect(axis.serialize()).toBe(xmlString);
        });

    });

    describe("Labels parsing", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis'
                +   ' color="0x000000"'
                +   ' id="y1"'
                +   ' type="number"'
                +   ' pregap="0"'
                +   ' postgap="0"'
                +   ' anchor="-1"'
                +   ' min="auto"'
                +   ' minoffset="0"'
                +   ' max="auto"'
                +   ' maxoffset="0"'
                +   ' tickmin="-3"'
                +   ' tickmax="3"'
                +   ' highlightstyle="axis"'
                +   ' linewidth="1"'
                +   ' length="0.9"'
                +   ' position="0,0"'
                +   ' base="-1,1"'
                +   ' minposition="-1"'
                +   ' maxposition="1"'
                +    '>'
                +  '<labels'
                +     ' start="10"'
                +     ' angle="9"'
                +     ' format="%1d"'
                +     ' anchor="0,0"'
                +     ' position="1,1"'
                +     ' spacing="100 75 50 25 10 5 2 1 0.5 0.1"'
                +     ' densityfactor="0.5"'
                +      '/>'
                +  '<grid color="0xeeeeee" visible="false"/>'
                + '</verticalaxis>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse a axis with a Labels child from XML", function () {
            axis = Axis.parseXML($xml, Axis.VERTICAL);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);

        });

        it("should be able to parse a axis with a complex Labels child from XML", function () {
            xmlString = '<verticalaxis'
                +   ' color="0x000000"'
                +   ' id="y3"'
                +   ' type="number"'
                +   ' pregap="0"'
                +   ' postgap="0"'
                +   ' anchor="-1"'
                +   ' minoffset="0"'
                +   ' min="auto"'
                +   ' minposition="-1"'
                +   ' max="auto"'
                +   ' maxoffset="0"'
                +   ' maxposition="1"'
                +   ' tickmin="-3"'
                +   ' tickmax="3"'
                +   ' highlightstyle="axis"'
                +   ' linewidth="1"'
                +   ' length="0.9+0"'
                +   ' position="0,0"'
                +   ' base="-1,1"'
                +    '>'
                +  '<labels'
                +     ' start="10"'
                +     ' angle="9"'
                +     ' format="%1d"'
                +     ' anchor="0,0"'
                +     ' position="1,1"'
                +     ' densityfactor="0.5"'
                +      '>'
                +    '<label'
                +       ' spacing="200 100 50 10"'
                +        '/>'
                +    '<label'
                +       ' format="%2d"'
                +       ' spacing="5 2 1 .5"'
                +        '/>'
                +  '</labels>'
                +  '<grid color="0xeeeeee" visible="false"/>'
                + '</verticalaxis>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            axis = Axis.parseXML($xml, Axis.VERTICAL);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.labelers().at(0) instanceof Labeler).toBe(true);
            expect(axis.labelers().at(1) instanceof Labeler).toBe(true);
        });


        it("should be able to parse a axis with a Labels child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml, Axis.VERTICAL);
            expect(axis.serialize()).toEqual(xmlString);
        });

        it("should be able to parse a axis with a complex Labels child from XML, serialize it and get thesame XML as the original", function () {
            xmlString = '<verticalaxis'
                +   ' color="0x000000"'
                +   ' id="y2"'
                +   ' type="number"'
                +   ' pregap="0"'
                +   ' postgap="0"'
                +   ' anchor="-1"'
                +   ' min="auto"'
                +   ' minoffset="0"'
                +   ' max="auto"'
                +   ' maxoffset="0"'
                +   ' tickmin="-3"'
                +   ' tickmax="3"'
                +   ' highlightstyle="axis"'
                +   ' linewidth="1"'
                +   ' length="0.9"'
                +   ' position="0,0"'
                +   ' base="-1,1"'
                +   ' minposition="-1"'
                +   ' maxposition="1"'
                +    '>'
                +  '<labels'
                +      '>'
                +    '<label'
                +       ' start="10"'
                +       ' angle="9"'
                +       ' format="%1d"'
                +       ' anchor="0,0"'
                +       ' position="1,1"'
                +       ' spacing="200 100 50 10"'
                +       ' densityfactor="0.5"'
                +        '/>'
                +    '<label'
                +       ' start="10"'
                +       ' angle="9"'
                +       ' format="%2d"'
                +       ' anchor="0,0"'
                +       ' position="1,1"'
                +       ' spacing="5 2 1 0.5"'
                +       ' densityfactor="0.5"'
                +        '/>'
                +  '</labels>'
                +  '<grid color="0xeeeeee" visible="false"/>'
                + '</verticalaxis>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            axis = Axis.parseXML($xml, Axis.VERTICAL);
            expect(axis.serialize()).toEqual(xmlString);
        });



    });

    describe("Grid parsing", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis color="0x000000" id="y2" type="number" pregap="0" postgap="0" anchor="-1" min="auto" minoffset="0" max="auto" maxoffset="0" tickmin="-3" tickmax="3" highlightstyle="axis" linewidth="1" length="0.9" position="0,0" base="-1,1" minposition="1" maxposition="1"><labels start="0" angle="0" format="%1d" anchor="0,0" position="0,0" spacing="10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001"/><grid color="0x984545" visible="false"/></verticalaxis>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse a axis with a Grid child from XML", function () {
            axis = Axis.parseXML($xml, Axis.VERTICAL);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.grid() instanceof Grid).toBe(true);

        });

        it("should be able to parse a axis with a Grid child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml, Axis.VERTICAL);
            expect(axis.serialize()).toEqual(xmlString);
        });

    });

    describe("Pan parsing", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis color="0x000000" id="y2" type="number" pregap="0" postgap="0" anchor="-1" min="auto" minoffset="0" max="auto" maxoffset="0" tickmin="-3" tickmax="3" highlightstyle="axis" linewidth="1" length="0.9" position="0,0" base="-1,1" minposition="1" maxposition="1"><labels start="0" angle="0" format="%1d" anchor="0,0" position="0,0" spacing="10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001"/><grid color="0xeeeeee" visible="false"/><pan allowed="yes" min="0" max="5"/></verticalaxis>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse a axis with a Pan child from XML", function () {
            axis = Axis.parseXML($xml, Axis.VERTICAL);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.pan() instanceof Pan).toBe(true);

        });

        it("should be able to parse a axis with a Pan child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml, Axis.VERTICAL);
            expect(axis.serialize()).toEqual(xmlString);
        });

    });

    describe("Zoom parsing", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis color="0x000000" id="y2" type="number" pregap="0" postgap="0" anchor="-1" min="auto" minoffset="0" max="auto" maxoffset="0" tickmin="-3" tickmax="3" highlightstyle="axis" linewidth="1" length="0.9" position="0,0" base="-1,1" minposition="1" maxposition="1"><labels start="0" angle="0" format="%1d" anchor="0,0" position="0,0" spacing="10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001"/><grid color="0xeeeeee" visible="false"/><zoom allowed="yes" min="0" max="80" anchor="none"/></verticalaxis>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse a axis with a Zoom child from XML", function () {
            axis = Axis.parseXML($xml, Axis.VERTICAL);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.zoom() instanceof Zoom).toBe(true);

        });

        it("should be able to parse a axis with a Zoom child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml, Axis.VERTICAL);
            expect(axis.serialize()).toEqual(xmlString);
        });

    });

    describe("AxisBinding parsing", function () {

        beforeEach(function () {
            AxisBinding.forgetAllBindings();
            xmlString = (
                ''
                    + '<verticalaxis id="y" type="number" min="0" max="10">'
                    +   '<binding id="ybinding" min="0" max="10"/>'
                    + '</verticalaxis>'
            );
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse an axis with a <binding> tag", function () {
            axis = Axis.parseXML($xml, Axis.VERTICAL);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.binding() instanceof AxisBinding).toBe(true);
            expect(axis.binding().id()).toEqual("ybinding");
        });

        it("axes parsed with the same binding id should be properly bound to each other", function () {
            var xmlString2 = (
                ''
                    + '<verticalaxis id="y" type="number" min="0" max="10">'
                    +   '<binding id="ybinding" min="0" max="100"/>'
                    + '</verticalaxis>'
            );
            var $xml2 = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString2);
            axis = Axis.parseXML($xml, Axis.VERTICAL);
            var axis2 = Axis.parseXML($xml2, Axis.VERTICAL);

            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.binding() instanceof AxisBinding).toBe(true);
            expect(axis.binding().id()).toEqual("ybinding");


            expect(axis2).not.toBeUndefined();
            expect(axis2 instanceof Axis).toBe(true);
            expect(axis2.binding() instanceof AxisBinding).toBe(true);
            expect(axis2.binding().id()).toEqual("ybinding");

            axis.setDataRange(0,5);
            expect(axis2.dataMin().getRealValue()).toEqual(0);
            expect(axis2.dataMax().getRealValue()).toEqual(50);

        });

    });

    describe("with multiple children", function () {

        beforeEach(function () {
            xmlString = (''
                         + '<verticalaxis'
                         +    ' color="0x000000"'
                         +    ' id="y2"'
                         +    ' type="number"'
                         +    ' pregap="0"'
                         +    ' postgap="0"'
                         +    ' anchor="-1"'
                         +    ' min="auto"'
                         +    ' minoffset="0"'
                         +    ' max="auto"'
                         +    ' maxoffset="0"'
                         +    ' tickmin="-3"'
                         +    ' tickmax="3"'
                         +    ' highlightstyle="axis"'
                         +    ' linewidth="1"'
                         +    ' length="0.9"'
                         +    ' position="0,0"'
                         +    ' base="-1,1"'
                         +    ' minposition="1"'
                         +    ' maxposition="1"'
                         +    '>'
                         +    '<title'
                         +       ' angle="70"'
                         +       ' anchor="1,1"'
                         +       ' position="-1,1"'
                         +       '>'
                         +         'A Title'
                         +    '</title>'
                         +    '<labels>'
                         +      '<label'
                         +         ' start="10"'
                         +         ' angle="9"'
                         +         ' format="%1d"'
                         +         ' anchor="0,0"'
                         +         ' position="1,1"'
                         +         ' spacing="200 100 50 10"'
                         +         ' densityfactor="0.5"'
                         +         '/>'
                         +      '<label'
                         +         ' start="10"'
                         +         ' angle="9"'
                         +         ' format="%2d"'
                         +         ' anchor="0,0"'
                         +         ' position="1,1"'
                         +         ' spacing="5 2 1 0.5"'
                         +         ' densityfactor="0.5"'
                         +         '/>'
                         +    '</labels>'
                         +    '<grid'
                         +       ' color="0x984545"'
                         +       ' visible="false"/>'
                         +    '<pan'
                         +       ' allowed="yes"'
                         +       ' min="0"'
                         +       ' max="5"/>'
                         +    '<zoom'
                         +       ' allowed="yes"'
                         +       ' min="0"'
                         +       ' max="80"'
                         +       ' anchor="1"/>'
                         + '</verticalaxis>'
                        );
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse a axis with multiple children from XML", function () {
            axis = Axis.parseXML($xml, Axis.VERTICAL);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.title() instanceof AxisTitle).toBe(true);
            expect(axis.labelers().at(0) instanceof Labeler).toBe(true);
            expect(axis.labelers().at(1) instanceof Labeler).toBe(true);
            expect(axis.grid() instanceof Grid).toBe(true);
            expect(axis.pan() instanceof Pan).toBe(true);
            expect(axis.zoom() instanceof Zoom).toBe(true);
            //expect(axis.binding() instanceof Binding).toBe(true);
        });

        it("should be able to parse a axis with multiple children from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml, Axis.VERTICAL);
            expect(axis.serialize()).toEqual(xmlString);
        });

    });

    describe("dataMin/dataMax handling", function () {

        it("axis with min=\"auto\" should return false for hasDataMin()", function () {
            var axis = Axis.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj('<verticalaxis min="auto"/>'), Axis.VERTICAL);
            expect(axis.hasDataMin()).toBe(false);
        });
        it("axis with min=\"0\" should return true for hasDataMin()", function () {
            var axis = Axis.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj('<verticalaxis min="0"/>'), Axis.VERTICAL);
            expect(axis.hasDataMin()).toBe(true);
        });
        it("axis with max=\"auto\" should return false for hasDataMax()", function () {
            var axis = Axis.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj('<verticalaxis max="auto"/>'), Axis.VERTICAL);
            expect(axis.hasDataMax()).toBe(false);
        });
        it("axis with max=\"1\" should return true for hasDataMax()", function () {
            var axis = Axis.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj('<verticalaxis max="1"/>'), Axis.VERTICAL);
            expect(axis.hasDataMax()).toBe(true);
        });

    });



});
