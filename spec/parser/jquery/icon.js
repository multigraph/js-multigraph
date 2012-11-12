/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Legend Icon parsing", function () {
    "use strict";

    var Icon = window.multigraph.core.Icon,
        xmlString,
        $xml,
        icon,
        heightString = "12",
        widthString = "59",
        borderString = "7";

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML");
        xmlString = ''
            + '<icon'
            +    ' height="' + heightString + '"'
            +    ' width="' + widthString + '"'
            +    ' border="' + borderString + '"'
            +    '/>',
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        icon = Icon.parseXML($xml);
    });

    it("should be able to parse a icon from XML", function () {
        expect(icon).not.toBeUndefined();
        expect(icon instanceof Icon).toBe(true);
    });

    it("should be able to parse a icon from XML and read its 'height' attribute", function () {
        expect(icon.height()).toEqual(parseInt(heightString, 10));
    });

    it("should be able to parse a icon from XML and read its 'width' attribute", function () {
        expect(icon.width()).toEqual(parseInt(widthString, 10));
    });

    it("should be able to parse a icon from XML and read its 'border' attribute", function () {
        expect(icon.border()).toEqual(parseInt(borderString, 10));
    });

});
