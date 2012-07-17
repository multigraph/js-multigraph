/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Multigraph parsing", function () {
    "use strict";

    var Graph = window.multigraph.Graph,
        Multigraph = window.multigraph.Multigraph,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        mg,
        xmlString = '<mugl><window margin="1" padding="10" bordercolor="0x111223" width="2" height="97" border="0"/><ui eventhandler="error"/><networkmonitor visible="yes" fixed="no"/><debugger visible="yes" fixed="no"/><legend color="0x56839c" bordercolor="0x941394" visible="true" base="-1 -1" anchor="0 0" position="0 0" frame="padding" opacity="1" border="10" rows="4" columns="3" cornerradius="5" padding="4"/><background color="0x123456"/><plotarea margintop="5" marginleft="10" marginbottom="19" marginright="5" bordercolor="0x111223" border="0"/><title color="0xfffaab" bordercolor="0x127752" border="2" opacity="0" padding="4" cornerradius="10" base="0 0" position="-1 1" anchor="1 1">Cool Cats</title><horizontalaxis color="0x123456" id="x" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/><horizontalaxis id="x2" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/><verticalaxis color="0x123456" id="y" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/><verticalaxis color="0x123456" id="y2" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/><plot><horizontalaxis ref="x"/><verticalaxis ref="y"/></plot><plot><horizontalaxis ref="x2"/><verticalaxis ref="y2"/></plot><data><values>3,4,5,6</values></data></mugl>',
    xmlString2 = '<mugl><graph><window margin="2" padding="5" bordercolor="0x000000" border="2"/><ui eventhandler="error"/><networkmonitor visible="yes" fixed="no"/><debugger visible="yes" fixed="no"/><legend color="0x56839c" bordercolor="0x941394" visible="true" base="-1 -1" anchor="0 0" position="0 0" frame="padding" opacity="1" border="10" rows="4" columns="3" cornerradius="5" padding="4"/><background color="0x123456"/><plotarea margintop="5" marginleft="10" marginbottom="19" marginright="5" bordercolor="0x111223" border="0"/><title color="0xfffaab" bordercolor="0x127752" border="2" opacity="0" padding="4" cornerradius="10" base="0 0" position="-1 1" anchor="1 1">Cool Cats</title><horizontalaxis color="0x123456" id="x" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/><horizontalaxis color="0x123456" id="x2" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/><verticalaxis id="y" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/><verticalaxis color="0x1aa456" id="y2" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/><data><values>3,4,5,6</values></data></graph><graph><window margin="2" padding="5" bordercolor="0x000000" border="2"/><ui eventhandler="error"/><networkmonitor visible="yes" fixed="no"/><debugger visible="yes" fixed="no"/><legend color="0x56839c" bordercolor="0x941394" visible="true" base="-1 -1" anchor="0 0" position="0 0" frame="padding" opacity="1" border="10" rows="4" columns="3" cornerradius="5" padding="4"/><background color="0x123456"/><plotarea margintop="5" marginleft="10" marginbottom="19" marginright="5" bordercolor="0x111223" border="0"/><title bordercolor="0x127752" border="2" opacity="0" padding="4" cornerradius="10" base="0 0" position="-1 1" anchor="1 1">Cool Cats</title><horizontalaxis color="0x123456" id="x" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/><horizontalaxis color="0x1234bb" id="x2" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/><verticalaxis color="0x123456" id="y" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/><verticalaxis color="0xa23ff6" id="y2" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/><data><values>3,4,5,6</values></data></graph></mugl>',
        $xml;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
        mg = Multigraph.parseXML($xml);
    });

    it("should be able to parse a multigraph from XML", function () {
        expect(mg).not.toBeUndefined();
        expect(mg instanceof Multigraph).toBe(true);
    });

    it("should be able to parse a multigraph from XML, then serialize it, and get the same XML as the original", function () {
        expect(mg.serialize()).toBe(xmlString);
	$xml = $(xmlString2);
        mg = Multigraph.parseXML($xml);
        expect(mg.serialize()).toBe(xmlString2);
    });

    it("should not contain a 'graph' tag if only one 'graph' exists", function () {
        expect($(mg).find('>graph').length === 0).toBe(true);
    });

});
