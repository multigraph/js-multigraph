/*global xdescribe, describe, xit, beforeEach, expect, it, jasmine */
/*jshint laxbreak:true */

describe("Axis parsing", function () {
    "use strict";

    var Axis = window.multigraph.Axis,
        Title = window.multigraph.Axis.Title,
        Labels = window.multigraph.Axis.Labels,
        Labeler = window.multigraph.Axis.Labeler,
        Grid = window.multigraph.Axis.Grid,
        Pan = window.multigraph.Axis.Pan,
        Zoom = window.multigraph.Axis.Zoom,
        Binding = window.multigraph.Axis.Binding,
        AxisControls = window.multigraph.Axis.AxisControls,
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
+     ' positionbase="0 0"'
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
+ '</horizontalaxis>',
        $xml,
        axis;

    beforeEach(function () {
        window.multigraph.jQueryXMLMixin.apply(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
        axis = Axis.parseXML($xml);
    });

    it("should be able to parse an axis from XML", function () {
        expect(axis).not.toBeUndefined();
    });

    it("should be able to parse an axis from XML and read its 'id' attribute", function () {
        expect(axis.id() === 'x').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'type' attribute", function () {
        expect(axis.type() === 'number').toBe(true);
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

    it("should be able to parse an axis from XML and read its 'positionbase' attribute", function () {
        expect(axis.positionbase() === '0 0').toBe(true);
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
        expect(axis.highlightstyle() === 'bold').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'linewidth' attribute", function () {
        expect(axis.linewidth()).toBe(1);
    });

    it("should be able to parse an axis from XML, then serialize it, and get the same XML as the original", function () {
        var xmlString2 = '<verticalaxis color="0x000000" id="y" type="datetime" max="10"/>';
//        b = Axis.parseXML($(xmlString2), 'vertical');
        expect(axis.serialize()).toBe(xmlString);
//        expect(b.serialize() === xmlString2).toBe(true);
    });

    describe("Title parsing", function () {

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
                +      ' position="-1 1"'
                +      ' anchor="1 1"'
                +      ' angle="70"'
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
                + '</verticalaxis>';
            $xml = $(xmlString);
        });

        it("should be able to parse a axis with a Title child from XML", function () {
            axis = Axis.parseXML($xml);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.title() instanceof Title).toBe(true);

        });

        it("should be able to parse a axis with a Title child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml);
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
                +     ' densityfactor="0.5"'
                +     ' format="%1d"'
                +     ' anchor="0,0"'
                +     ' position="1,1"'
                +     ' spacing="100 75 50 25 10 5 2 1 0.5 0.1"'
                +      '/>'
                + '</verticalaxis>';
            $xml = $(xmlString);
        });

        it("should be able to parse a axis with a Labels child from XML", function () {
            axis = Axis.parseXML($xml);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.labels() instanceof Labels).toBe(true);

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
                +     ' densityfactor="0.5"'
                +     ' format="%1d"'
                +     ' anchor="0,0"'
                +     ' position="1,1"'
                +      '>'
                +    '<label'
                +       ' spacing="200 100 50 10"'
                +        '/>'
                +    '<label'
                +       ' format="%2d"'
                +       ' spacing="5 2 1 .5"'
                +        '/>'
                +  '</labels>'
                + '</verticalaxis>';
            $xml = $(xmlString);
            axis = Axis.parseXML($xml);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.labels() instanceof Labels).toBe(true);
            expect(axis.labelers().at(0) instanceof Labeler).toBe(true);
            expect(axis.labelers().at(1) instanceof Labeler).toBe(true);
        });


        it("should be able to parse a axis with a Labels child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml);
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
                +     ' start="10"'
                +     ' angle="9"'
                +     ' densityfactor="0.5"'
                +     ' format="%1d"'
                +     ' anchor="0,0"'
                +     ' position="1,1"'
                +      '>'
                +    '<label'
                +       ' start="10"'
                +       ' angle="9"'
                +       ' densityfactor="0.5"'
                +       ' spacing="200"'
                +       ' format="%1d"'
                +       ' anchor="0,0"'
                +       ' position="1,1"'
                +        '/>'
                +    '<label'
                +       ' start="10"'
                +       ' angle="9"'
                +       ' densityfactor="0.5"'
                +       ' spacing="100"'
                +       ' format="%1d"'
                +       ' anchor="0,0"'
                +       ' position="1,1"'
                +        '/>'
                +    '<label'
                +       ' start="10"'
                +       ' angle="9"'
                +       ' densityfactor="0.5"'
                +       ' spacing="50"'
                +       ' format="%1d"'
                +       ' anchor="0,0"'
                +       ' position="1,1"'
                +        '/>'
                +    '<label'
                +       ' start="10"'
                +       ' angle="9"'
                +       ' densityfactor="0.5"'
                +       ' spacing="10"'
                +       ' format="%1d"'
                +       ' anchor="0,0"'
                +       ' position="1,1"'
                +        '/>'
                +    '<label'
                +       ' start="10"'
                +       ' angle="9"'
                +       ' densityfactor="0.5"'
                +       ' spacing="5"'
                +       ' format="%2d"'
                +       ' anchor="0,0"'
                +       ' position="1,1"'
                +        '/>'
                +    '<label'
                +       ' start="10"'
                +       ' angle="9"'
                +       ' densityfactor="0.5"'
                +       ' spacing="2"'
                +       ' format="%2d"'
                +       ' anchor="0,0"'
                +       ' position="1,1"'
                +        '/>'
                +    '<label'
                +       ' start="10"'
                +       ' angle="9"'
                +       ' densityfactor="0.5"'
                +       ' spacing="1"'
                +       ' format="%2d"'
                +       ' anchor="0,0"'
                +       ' position="1,1"'
                +        '/>'
                +    '<label'
                +       ' start="10"'
                +       ' angle="9"'
                +       ' densityfactor="0.5"'
                +       ' spacing=".5"'
                +       ' format="%2d"'
                +       ' anchor="0,0"'
                +       ' position="1,1"'
                +        '/>'
                +  '</labels>'
                + '</verticalaxis>';
            $xml = $(xmlString);
            axis = Axis.parseXML($xml);
            expect(axis.serialize()).toEqual(xmlString);
        });



    });

    describe("Grid parsing", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis color="0x000000" id="y2" type="number" pregap="0" postgap="0" anchor="-1" min="auto" minoffset="0" max="auto" maxoffset="0" tickmin="-3" tickmax="3" highlightstyle="axis" linewidth="1" length="0.9" position="0,0" base="-1,1" minposition="1" maxposition="1"><labels start="0" angle="0" format="%1d" anchor="0,0" position="0,0" spacing="10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001"/><grid color="0x984545" visible="false"/></verticalaxis>';
            $xml = $(xmlString);
        });

        it("should be able to parse a axis with a Grid child from XML", function () {
            axis = Axis.parseXML($xml);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.grid() instanceof Grid).toBe(true);

        });

        it("should be able to parse a axis with a Grid child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml);
            expect(axis.serialize()).toEqual(xmlString);
        });

    });

    describe("Pan parsing", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis color="0x000000" id="y2" type="number" pregap="0" postgap="0" anchor="-1" min="auto" minoffset="0" max="auto" maxoffset="0" tickmin="-3" tickmax="3" highlightstyle="axis" linewidth="1" length="0.9" position="0,0" base="-1,1" minposition="1" maxposition="1"><labels start="0" angle="0" format="%1d" anchor="0,0" position="0,0" spacing="10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001"/><pan allowed="yes" min="0" max="5"/></verticalaxis>';
            $xml = $(xmlString);
        });

        it("should be able to parse a axis with a Pan child from XML", function () {
            axis = Axis.parseXML($xml);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.pan() instanceof Pan).toBe(true);

        });

        it("should be able to parse a axis with a Pan child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml);
            expect(axis.serialize()).toEqual(xmlString);
        });

    });

    describe("Zoom parsing", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis color="0x000000" id="y2" type="number" pregap="0" postgap="0" anchor="-1" min="auto" minoffset="0" max="auto" maxoffset="0" tickmin="-3" tickmax="3" highlightstyle="axis" linewidth="1" length="0.9" position="0,0" base="-1,1" minposition="1" maxposition="1"><labels start="0" angle="0" format="%1d" anchor="0,0" position="0,0" spacing="10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001"/><zoom allowed="yes" min="0" max="80" anchor="1 1"/></verticalaxis>';
            $xml = $(xmlString);
        });

        it("should be able to parse a axis with a Zoom child from XML", function () {
            axis = Axis.parseXML($xml);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.zoom() instanceof Zoom).toBe(true);

        });

        it("should be able to parse a axis with a Zoom child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml);
            expect(axis.serialize()).toEqual(xmlString);
        });

    });

    describe("Binding parsing", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis color="0x000000" id="y2" type="number" pregap="0" postgap="0" anchor="-1" min="auto" minoffset="0" max="auto" maxoffset="0" tickmin="-3" tickmax="3" highlightstyle="axis" linewidth="1" length="0.9" position="0,0" base="-1,1" minposition="1" maxposition="1"><labels start="0" angle="0" format="%1d" anchor="0,0" position="0,0" spacing="10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001"/><binding id="y" min="-10" max="50"/></verticalaxis>';
            $xml = $(xmlString);
        });

        it("should be able to parse a axis with a Binding child from XML", function () {
            axis = Axis.parseXML($xml);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.binding() instanceof Binding).toBe(true);

        });

        it("should be able to parse a axis with a Binding child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml);
            expect(axis.serialize()).toEqual(xmlString);
        });

    });

    describe("AxisControls parsing", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis color="0x000000" id="y2" type="number" pregap="0" postgap="0" anchor="-1" min="auto" minoffset="0" max="auto" maxoffset="0" tickmin="-3" tickmax="3" highlightstyle="axis" linewidth="1" length="0.9" position="0,0" base="-1,1" minposition="1" maxposition="1"><labels start="0" angle="0" format="%1d" anchor="0,0" position="0,0" spacing="10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001"/><axiscontrols visible="false"/></verticalaxis>';
            $xml = $(xmlString);
        });

        it("should be able to parse a axis with a Axiscontrols child from XML", function () {
            axis = Axis.parseXML($xml);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.axiscontrols() instanceof AxisControls).toBe(true);

        });

        it("should be able to parse a axis with a Axiscontrols child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml);
            expect(axis.serialize()).toEqual(xmlString);
        });

    });

    xdescribe("with multiple children", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis color="0x000000" id="y2" type="number" pregap="0" postgap="0" anchor="-1" min="auto" minoffset="0" max="auto" maxoffset="0" tickmin="-3" tickmax="3" highlightstyle="axis" linewidth="1" length="0.9" position="0,0" base="-1,1" minposition="1" maxposition="1"><title position="-1 1" anchor="1 1" angle="70">A Title</title><labels format="%1d" start="10" angle="9" position="1 1" anchor="0 0" densityfactor=".5" function="fun"><label spacing="200 100 50 10"/><label format="%2d" spacing="5 2 1 .5"/></labels><grid color="0x984545" visible="false"/><pan allowed="yes" min="0" max="5"/><zoom allowed="yes" min="0" max="80" anchor="1 1"/><binding id="y" min="-10" max="50"/><axiscontrols visible="false"/></verticalaxis>';
            $xml = $(xmlString);
        });

        it("should be able to parse a axis with multiple children from XML", function () {
            axis = Axis.parseXML($xml);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.title() instanceof Title).toBe(true);
            expect(axis.labels() instanceof Labels).toBe(true);
            expect(axis.labels().label().at(0) instanceof Label).toBe(true);
            expect(axis.labels().label().at(1) instanceof Label).toBe(true);
            expect(axis.grid() instanceof Grid).toBe(true);
            expect(axis.pan() instanceof Pan).toBe(true);
            expect(axis.zoom() instanceof Zoom).toBe(true);
            expect(axis.binding() instanceof Binding).toBe(true);
            expect(axis.axiscontrols() instanceof AxisControls).toBe(true);
        });

        it("should be able to parse a axis with multiple children from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml);
            expect(axis.serialize()).toEqual(xmlString);
        });

    });

    describe("dataMin/dataMax handling", function () {

        it("axis with min=\"auto\" should return false for hasDataMin()", function() {
            var axis = Axis.parseXML($('<verticalaxis min="auto"/>'));
            expect(axis.hasDataMin()).toBe(false);
        });
        it("axis with min=\"0\" should return true for hasDataMin()", function() {
            var axis = Axis.parseXML($('<verticalaxis min="0"/>'));
            expect(axis.hasDataMin()).toBe(true);
        });
        it("axis with max=\"auto\" should return false for hasDataMax()", function() {
            var axis = Axis.parseXML($('<verticalaxis max="auto"/>'));
            expect(axis.hasDataMax()).toBe(false);
        });
        it("axis with max=\"1\" should return true for hasDataMax()", function() {
            var axis = Axis.parseXML($('<verticalaxis max="1"/>'));
            expect(axis.hasDataMax()).toBe(true);
        });

    });



});
