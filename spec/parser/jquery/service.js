/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data Service parsing", function () {
    "use strict";

    var Service = window.multigraph.core.Service,
        xmlString = '<service location="http://example.com/CoolnessOfCats/1990/2000"/>',
        $xml,
        service;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        $xml = $(xmlString);
        service = Service.parseXML($xml);
    });

    it("should be able to parse a Service from XML", function () {
        expect(service).not.toBeUndefined();
        expect(service instanceof Service).toBe(true);
    });

    it("should be able to parse a service from XML and read its 'location' attribute", function () {
        expect(service.location()).toBe("http://example.com/CoolnessOfCats/1990/2000");
    });

    it("should be able to parse a service from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<service location="http://example.com/CoolnessOfFerrets/2000/2005"/>';
        expect(service.serialize()).toBe(xmlString);
        service = Service.parseXML($(xmlString2));
        expect(service.serialize()).toBe(xmlString2);
    });

});
