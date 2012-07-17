/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis parsing", function () {
    "use strict";

    var Axis = window.multigraph.Axis,
        Title = window.multigraph.Axis.Title,
        Labels = window.multigraph.Axis.Labels,
        Label = window.multigraph.Axis.Labels.Label,
        Grid = window.multigraph.Axis.Grid,
        Pan = window.multigraph.Axis.Pan,
        Zoom = window.multigraph.Axis.Zoom,
        Binding = window.multigraph.Axis.Binding,
        AxisControls = window.multigraph.Axis.AxisControls,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<horizontalaxis color="0x123456" id="x" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/>',
        $xml,
        axis;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
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
        expect(axis.length().serialize()).toBe("1+0");
    });

    it("should be able to parse an axis from XML and read its 'position' attribute", function () {
        expect(axis.position() === '1 1').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'pregap' attribute", function () {
        expect(axis.pregap() === '2').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'postgap' attribute", function () {
        expect(axis.postgap() === '4').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'anchor' attribute", function () {
        expect(axis.anchor() === '0 1').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'base' attribute", function () {
        expect(axis.base() === '1 -1').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'min' attribute", function () {
        expect(axis.min() === '0').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'minoffset' attribute", function () {
        expect(axis.minoffset() === '19').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'minposition' attribute", function () {
        expect(axis.minposition() === '0 0').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'max' attribute", function () {
        expect(axis.max() === '10').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'maxoffset' attribute", function () {
        expect(axis.maxoffset() === '2').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'maxposition' attribute", function () {
        expect(axis.maxposition() === '0 1').toBe(true);
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
        var xmlString2 = '<verticalaxis id="y" type="datetime" max="10"/>',
        b = Axis.parseXML($(xmlString2), 'vertical');
        expect(axis.serialize()).toBe(xmlString);
//        expect(b.serialize() === xmlString2).toBe(true);
    });

    describe("Title parsing", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis id="y2" type="number" length=".90"><title position="-1 1" anchor="1 1" angle="70">A Title</title></verticalaxis>';
            $xml = $(xmlString);
        });

        it("should be able to parse a axis with a Title child from XML", function () {
            axis = Axis.parseXML($xml);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.title() instanceof Title).toBe(true);

        });

        xit("should be able to parse a axis with a Title child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml);
            expect(axis.serialize()).toBe(xmlString);
        });

    });

    describe("Labels parsing", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis id="y2" type="number" length=".90"><labels format="%1d" start="10" angle="9" position="1 1" anchor="0 0" densityfactor=".5" function="fun" spacing="100 75 50 25 10 5 2 1 0.5 0.1"/></verticalaxis>';
            $xml = $(xmlString);
        });

        it("should be able to parse a axis with a Labels child from XML", function () {
            axis = Axis.parseXML($xml);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.labels() instanceof Labels).toBe(true);

        });

        it("should be able to parse a axis with a complex Labels child from XML", function () {
            xmlString = '<verticalaxis id="y2" type="number" length=".90"><labels format="%1d" start="10" angle="9" position="1 1" anchor="0 0" densityfactor=".5" function="fun"><label spacing="200 100 50 10"/><label format="%2d" spacing="5 2 1 .5"/></labels></verticalaxis>';
            $xml = $(xmlString);
            axis = Axis.parseXML($xml);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.labels() instanceof Labels).toBe(true);
            expect(axis.labels().label().at(0) instanceof Label);
            expect(axis.labels().label().at(1) instanceof Label);
        });


        xit("should be able to parse a axis with a Labels child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml);
            expect(axis.serialize() === xmlString).toBe(true);
        });

        it("should be able to parse a axis with a complex Labels child from XML, serialize it and get thesame XML as the original", function () {
            xmlString = '<verticalaxis id="y2" type="number" length=".90"><labels format="%1d" start="10" angle="9" position="1 1" anchor="0 0" densityfactor=".5" function="fun"><label spacing="200 100 50 10"/><label format="%2d" spacing="5 2 1 .5"/></labels></verticalaxis>';
            $xml = $(xmlString);
            axis = Axis.parseXML($xml);
            //expect(axis.serialize() === xmlString).toBe(true);
        });



    });

    describe("Grid parsing", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis id="y2" type="number" length=".90"><grid color="0x984545" visible="false"/></verticalaxis>';
            $xml = $(xmlString);
        });

        it("should be able to parse a axis with a Grid child from XML", function () {
            axis = Axis.parseXML($xml);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.grid() instanceof Grid).toBe(true);

        });

        xit("should be able to parse a axis with a Grid child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml);
            expect(axis.serialize() === xmlString).toBe(true);
        });

    });

    describe("Pan parsing", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis id="y2" type="number" length=".90"><pan allowed="yes" min="0" max="5"/></verticalaxis>';
            $xml = $(xmlString);
        });

        it("should be able to parse a axis with a Pan child from XML", function () {
            axis = Axis.parseXML($xml);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.pan() instanceof Pan).toBe(true);

        });

        xit("should be able to parse a axis with a Pan child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml);
            expect(axis.serialize() === xmlString).toBe(true);
        });

    });

    describe("Zoom parsing", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis id="y2" type="number" length=".90"><zoom allowed="yes" min="0" max="80" anchor="1 1"/></verticalaxis>';
            $xml = $(xmlString);
        });

        it("should be able to parse a axis with a Zoom child from XML", function () {
            axis = Axis.parseXML($xml);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.zoom() instanceof Zoom).toBe(true);

        });

        xit("should be able to parse a axis with a Zoom child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml);
            expect(axis.serialize() === xmlString).toBe(true);
        });

    });

    describe("Binding parsing", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis id="y2" type="number" length=".90"><binding id="y" min="-10" max="50"/></verticalaxis>';
            $xml = $(xmlString);
        });

        it("should be able to parse a axis with a Binding child from XML", function () {
            axis = Axis.parseXML($xml);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.binding() instanceof Binding).toBe(true);

        });

        xit("should be able to parse a axis with a Binding child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml);
            expect(axis.serialize() === xmlString).toBe(true);
        });

    });

    describe("AxisControls parsing", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis id="y2" type="number" length=".90"><axiscontrols visible="false"/></verticalaxis>';
            $xml = $(xmlString);
        });

        it("should be able to parse a axis with a Axiscontrols child from XML", function () {
            axis = Axis.parseXML($xml);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.axiscontrols() instanceof AxisControls).toBe(true);

        });

        xit("should be able to parse a axis with a Axiscontrols child from XML, serialize it and get the same XML as the original", function () {
            axis = Axis.parseXML($xml);
            expect(axis.serialize() === xmlString).toBe(true);
        });

    });

    describe("with multiple children", function () {

        beforeEach(function () {
            xmlString = '<verticalaxis id="y2" type="number" length=".90"><title position="-1 1" anchor="1 1" angle="70">A Title</title><labels format="%1d" start="10" angle="9" position="1 1" anchor="0 0" densityfactor=".5" function="fun"><label spacing="200 100 50 10"/><label format="%2d" spacing="5 2 1 .5"/></labels><grid color="0x984545" visible="false"/><pan allowed="yes" min="0" max="5"/><zoom allowed="yes" min="0" max="80" anchor="1 1"/><binding id="y" min="-10" max="50"/><axiscontrols visible="false"/></verticalaxis>';
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

        xit("should be able to parse a axis with multiple children from XML, serialize it and get the sameXML as the original", function () {
            axis = Axis.parseXML($xml);
            expect(axis.serialize() === xmlString).toBe(true);
        });

    });

});
