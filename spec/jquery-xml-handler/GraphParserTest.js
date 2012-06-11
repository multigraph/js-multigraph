/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis parsing", function () {
    "use strict";

    var Axis = window.multigraph.Axis,
        Plot = window.multigraph.Plot,
        Window = window.multigraph.Window,
        UI = window.multigraph.UI,
        NetworkMonitor = window.multigraph.NetworkMonitor,
        Debugger = window.multigraph.Debugger,
        Legend = window.multigraph.Legend,
        Background = window.multigraph.Background,
        Plotarea = window.multigraph.Plotarea,
        Data = window.multigraph.Data,
        Graph = window.multigraph.Graph,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        g,
        h,
        v,
        w,
        p,
        ui,
        debug,
        legend,
        background,
        plotarea,
        data,
        xmlString = '<graph><window width="2" height="97" border="0" margin="1" padding="10" bordercolor="0x111223"/><ui eventhandler="error"/><networkmonitor visible="yes" fixed="no"/><debugger visible="yes" fixed="no"/><legend visible="true" base="-1 -1" anchor="0 0" position="0 0" frame="padding" color="0x56839c" bordercolor="0x941394" opacity="1" border="10" rows="4" columns="3" cornerradius="5" padding="4"/><background color="0x123456"/><plotarea marginbottom="19" marginleft="10" margintop="5" marginright="5" border="0" bordercolor="0x111223"/><title border="2" color="0xfffaab" bordercolor="0x127752" opacity="0" padding="4" cornerradius="10" base="0 0" position="-1 1" anchor="1 1">Cool Cats</title><horizontalaxis id="x" type="number" length="1.0" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" color="0x123456" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1"/><horizontalaxis id="x2" type="number" length="1.0" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" color="0x123456" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1"/><verticalaxis id="y" type="number" length="1.0" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" color="0x123456" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1"/><verticalaxis id="y2" type="number" length="1.0" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" color="0x123456" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1"/><plot><horizontalaxis ref="x"/><verticalaxis ref="y"/></plot><plot><horizontalaxis ref="x2"/><verticalaxis ref="y2"/></plot><data><values>3,4,5,6</values></data></graph>',
        xmlString2 = '<graph><ui eventhandler="error"/><networkmonitor visible="yes" fixed="no"/><debugger visible="yes" fixed="no"/><legend visible="true" base="-1 -1" anchor="0 0" position="0 0" frame="padding" color="0x56839c" bordercolor="0x941394" opacity="1" border="10" rows="4" columns="3" cornerradius="5" padding="4"/><background color="0x123456"/><plotarea marginbottom="19" marginleft="10" margintop="5" marginright="5" border="0" bordercolor="0x111223"/><title border="2" color="0xfffaab" bordercolor="0x127752" opacity="0" padding="4" cornerradius="10" base="0 0" position="-1 1" anchor="1 1">Cool Cats</title><horizontalaxis id="x" type="number" length="1.0" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" color="0x123456" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1"/><horizontalaxis id="x2" type="number" length="1.0" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" color="0x123456" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1"/><verticalaxis id="y" type="number" length="1.0" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" color="0x123456" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1"/><verticalaxis id="y2" type="number" length="1.0" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" color="0x123456" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1"/><data><values>3,4,5,6</values></data></graph>',
        $xml;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
        g = Graph.parseXML($xml);
    });

    it("should be able to parse a graph from XML", function () {
        expect(g).not.toBeUndefined();
        expect(g instanceof Graph).toBe(true);
    });

    it("should be able to parse an axis from XML, then serialize it, and get the same XML as the original", function () {
        expect(g.serialize() === xmlString).toBe(true);
	$xml = $(xmlString2);
        g = Graph.parseXML($xml);
        expect(g.serialize() === xmlString2).toBe(true);
    });

});
