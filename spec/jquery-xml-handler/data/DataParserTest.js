/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data parsing", function () {
    "use strict";

    var Data = window.multigraph.Data,
        Values = window.multigraph.Data.Values,
        Variables = window.multigraph.Data.Variables,
        Variable = window.multigraph.Data.Variables.Variable,
        Service = window.multigraph.Data.Service,
        CSV = window.multigraph.Data.CSV,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<data/>',
        $xml,
        data;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
        data = Data.parseXML($xml);
    });

    it("should be able to parse a data from XML", function () {
        expect(data).not.toBeUndefined();
        expect(data instanceof Data).toBe(true);
    });

    it("should be able to parse a data from XML, then serialize it, and get the same XML as the original", function () {
        expect(data.serialize() === xmlString).toBe(true);
    });

    describe("Values parsing", function () {

        beforeEach(function () {
            xmlString = '<data><values>3,4,5,6</values></data>';
            $xml = $(xmlString);
        });

        it("should be able to parse a data with a Values child from XML", function () {
            data = Data.parseXML($xml);
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data.values() instanceof Values).toBe(true);

        });

        it("should be able to parse a data with a Values child from XML, serialize it and get the same XML as the original", function () {
            data = Data.parseXML($xml);
            expect(data.serialize() === xmlString).toBe(true);
        });

    });

    describe("Service parsing", function () {

        beforeEach(function () {
            xmlString = '<data><service location="http://example.com/CoolCats/1990/2000"/></data>';
            $xml = $(xmlString);
        });

        it("should be able to parse a data with a Service child from XML", function () {
            data = Data.parseXML($xml);
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data.service() instanceof Service).toBe(true);

        });

        it("should be able to parse a data with a Service child from XML, serialize it and get the same XML as the original", function () {
            data = Data.parseXML($xml);
            expect(data.serialize() === xmlString).toBe(true);
        });

    });

    describe("CSV parsing", function () {

        beforeEach(function () {
            xmlString = '<data><csv location="http://example.com/CoolDogs.csv"/></data>';
            $xml = $(xmlString);
        });

        it("should be able to parse a data with a CSV child from XML", function () {
            data = Data.parseXML($xml);
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data.csv() instanceof CSV).toBe(true);

        });

        it("should be able to parse a data with a CSV child from XML, serialize it and get the same XML as the original", function () {
            data = Data.parseXML($xml);
            expect(data.serialize() === xmlString).toBe(true);
        });

    });

    describe("Variables parsing", function () {

        beforeEach(function () {
            xmlString = '<data><variables missingvalue="-9000" missingop="gt"/></data>';
            $xml = $(xmlString);
        });

        it("should be able to parse a data with a Variables child from XML", function () {
            data = Data.parseXML($xml);
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data.variables() instanceof Variables).toBe(true);

        });

        it("should be able to parse a data with a complex Variables child from XML", function () {
            xmlString = '<data><variables missingop="gt"><variable id="x" column="7" type="datetime" missingvalue="1990" missingop="eq"/><variable id="y" column="2" type="number" missingvalue="19" missingop="gt"/><variable id="y1" column="2" type="datetime"/></variables></data>';
            $xml = $(xmlString);
            data = Data.parseXML($xml);
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data.variables() instanceof Variables).toBe(true);
            expect(data.variables().variable().at(0) instanceof Variable);
            expect(data.variables().variable().at(1) instanceof Variable);
            expect(data.variables().variable().at(2) instanceof Variable);
        });


        it("should be able to parse a data with a Variables child from XML, serialize it and get the same XML as the original", function () {
            data = Data.parseXML($xml);
            expect(data.serialize() === xmlString).toBe(true);
        });

        it("should be able to parse a data with a complex Variables child from XML, serialize it and get thesame XML as the original", function () {
            xmlString = '<data><variables missingop="gt"><variable id="x" column="7" type="datetime" missingvalue="1990" missingop="eq"/><variable id="y" column="2" type="number" missingvalue="19" missingop="gt"/><variable id="y1" column="2" type="datetime"/></variables></data>';
            $xml = $(xmlString);
            data = Data.parseXML($xml);
//            expect(data.serialize() === xmlString).toBe(true);
        });

    });

    describe("with multiple children", function () {
        var data2,
            data3,
            xmlString2,
            xmlString3,
            $xml2,
            $xml3;

        beforeEach(function () {
            xmlString = '<data><variables missingop="gt"><variable id="x" column="7" type="datetime" missingvalue="1990" missingop="eq"/><variable id="y" column="2" type="number" missingvalue="19" missingop="gt"/><variable id="y1" column="2" type="datetime"/></variables><values>1,2,3,4</values></data>';
            xmlString2 = '<data><variables missingop="gt"><variable id="x" column="7" type="datetime" missingvalue="1990" missingop="eq"/><variable id="y" column="2" type="number" missingvalue="19" missingop="gt"/><variable id="y1" column="2" type="datetime"/></variables><service location="http://example.com/CoolCats/1990/2000"/></data>';
            xmlString3 = '<data><variables missingop="gt"><variable id="x" column="7" type="datetime" missingvalue="1990" missingop="eq"/><variable id="y" column="2" type="number" missingvalue="19" missingop="gt"/><variable id="y1" column="2" type="datetime"/></variables><csv location="http://example.com/CoolCats.csv"/></data>';
            $xml = $(xmlString);
            $xml2 = $(xmlString2);
            $xml3 = $(xmlString3);

            data = Data.parseXML($xml);
            data2 = Data.parseXML($xml2);
            data3 = Data.parseXML($xml3);
        });

        it("should be able to parse a data with multiple children from XML", function () {
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data.variables() instanceof Variables).toBe(true);
            expect(data.variables().variable().at(0) instanceof Variable).toBe(true);
            expect(data.variables().variable().at(1) instanceof Variable).toBe(true);
            expect(data.variables().variable().at(2) instanceof Variable).toBe(true);
            expect(data.values() instanceof Values).toBe(true);

            expect(data2).not.toBeUndefined();
            expect(data2 instanceof Data).toBe(true);
            expect(data2.variables() instanceof Variables).toBe(true);
            expect(data2.variables().variable().at(0) instanceof Variable).toBe(true);
            expect(data2.variables().variable().at(1) instanceof Variable).toBe(true);
            expect(data2.variables().variable().at(2) instanceof Variable).toBe(true);
            expect(data2.service() instanceof Service).toBe(true);

            expect(data3).not.toBeUndefined();
            expect(data3 instanceof Data).toBe(true);
            expect(data3.variables() instanceof Variables).toBe(true);
            expect(data3.variables().variable().at(0) instanceof Variable).toBe(true);
            expect(data3.variables().variable().at(1) instanceof Variable).toBe(true);
            expect(data3.variables().variable().at(2) instanceof Variable).toBe(true);
            expect(data3.csv() instanceof CSV).toBe(true);
        });

        xit("should be able to parse a data with multiple children from XML, serialize it and get the sameXML as the original", function () {
            expect(data.serialize() === xmlString).toBe(true);
            expect(data2.serialize() === xmlString2).toBe(true);
            expect(data3.serialize() === xmlString3).toBe(true);
        });

    });

});
