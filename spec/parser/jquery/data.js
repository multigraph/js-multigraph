/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data parsing", function () {
    "use strict";

    var Data = window.multigraph.core.Data,
        NumberValue = window.multigraph.core.NumberValue,
        Values = window.multigraph.core.Values,
        Variables = window.multigraph.core.Variables,
        DataVariable = window.multigraph.core.DataVariable,
        Service = window.multigraph.core.Service,
        CSV = window.multigraph.core.CSV,
        xmlString = '<data/>',
        $xml,
        data;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
	$xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        data = Data.parseXML($xml);
    });

    it("should be able to parse a data from XML", function () {
        expect(data).not.toBeUndefined();
        expect(data instanceof Data).toBe(true);
    });

    it("should be able to parse a data from XML, then serialize it, and get the same XML as the original", function () {
        expect(data.serialize()).toBe(xmlString);
    });

    describe("Values parsing", function () {

        beforeEach(function () {
            xmlString = '<data><values>3,4,5,6</values></data>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse a data with a Values child from XML", function () {
            data = Data.parseXML($xml);
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data.values() instanceof Values).toBe(true);

        });

        it("should be able to parse a data with a Values child from XML, serialize it and get the same XML as the original", function () {
            data = Data.parseXML($xml);
            expect(data.serialize()).toBe(xmlString);
        });

    });

    describe("Service parsing", function () {

        beforeEach(function () {
            xmlString = '<data><service location="http://example.com/CoolCats/1990/2000"/></data>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse a data with a Service child from XML", function () {
            data = Data.parseXML($xml);
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data.service() instanceof Service).toBe(true);

        });

        it("should be able to parse a data with a Service child from XML, serialize it and get the same XML as the original", function () {
            data = Data.parseXML($xml);
            expect(data.serialize()).toBe(xmlString);
        });

    });

    describe("CSV parsing", function () {

        beforeEach(function () {
            xmlString = '<data><csv location="http://example.com/CoolDogs.csv"/></data>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse a data with a CSV child from XML", function () {
            data = Data.parseXML($xml);
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data.csv() instanceof CSV).toBe(true);

        });

        it("should be able to parse a data with a CSV child from XML, serialize it and get the same XML as the original", function () {
            data = Data.parseXML($xml);
            expect(data.serialize()).toBe(xmlString);
        });

    });

    describe("Variables parsing", function () {

        beforeEach(function () {
            xmlString = '<data><variables missingvalue="-9000" missingop="gt"/></data>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse a data with a Variables child from XML", function () {
            data = Data.parseXML($xml);
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data.variables() instanceof Variables).toBe(true);

        });

        it("should be able to parse a data with a complex Variables child from XML", function () {
            xmlString = '<data><variables missingop="gt"><variable id="x" column="7" type="number" missingvalue="1990" missingop="eq"/><variable id="y" column="2" type="number" missingvalue="19" missingop="gt"/><variable id="y1" column="2" type="number"/></variables></data>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            data = Data.parseXML($xml);
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data.variables() instanceof Variables).toBe(true);
            expect(data.variables().variable().at(0) instanceof DataVariable);
            expect(data.variables().variable().at(1) instanceof DataVariable);
            expect(data.variables().variable().at(2) instanceof DataVariable);
        });


        it("should be able to parse a data with a Variables child from XML, serialize it and get the same XML as the original", function () {
            data = Data.parseXML($xml);
            expect(data.serialize()).toBe(xmlString);
        });

        it("should be able to parse a data with a complex Variables child from XML, serialize it and get thesame XML as the original", function () {
            xmlString = '<data><variables missingop="gt"><variable id="x" column="7" type="number" missingvalue="1990" missingop="eq"/><variable id="y" column="2" type="number" missingvalue="19" missingop="gt"/><variable id="y1" column="2" type="number"/></variables></data>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
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
            xmlString = '<data><variables missingop="gt"><variable id="x" column="7" type="number" missingvalue="1990" missingop="eq"/><variable id="y" column="2" type="number" missingvalue="19" missingop="gt"/><variable id="y1" column="2" type="number"/></variables><values>1,2,3,4</values></data>';
            xmlString2 = '<data><variables missingop="gt"><variable id="x" column="7" type="number" missingvalue="1990" missingop="eq"/><variable id="y" column="2" type="number" missingvalue="19" missingop="gt"/><variable id="y1" column="2" type="number"/></variables><service location="http://example.com/CoolCats/1990/2000"/></data>';
            xmlString3 = '<data><variables missingop="gt"><variable id="x" column="7" type="number" missingvalue="1990" missingop="eq"/><variable id="y" column="2" type="number" missingvalue="19" missingop="gt"/><variable id="y1" column="2" type="number"/></variables><csv location="http://example.com/CoolCats.csv"/></data>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            $xml2 = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString2);
            $xml3 = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString3);

            data = Data.parseXML($xml);
            data2 = Data.parseXML($xml2);
            data3 = Data.parseXML($xml3);
        });

        it("should be able to parse a data with multiple children from XML", function () {
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data.variables() instanceof Variables).toBe(true);
            expect(data.variables().variable().at(0) instanceof DataVariable).toBe(true);
            expect(data.variables().variable().at(1) instanceof DataVariable).toBe(true);
            expect(data.variables().variable().at(2) instanceof DataVariable).toBe(true);
            expect(data.values() instanceof Values).toBe(true);

            expect(data2).not.toBeUndefined();
            expect(data2 instanceof Data).toBe(true);
            expect(data2.variables() instanceof Variables).toBe(true);
            expect(data2.variables().variable().at(0) instanceof DataVariable).toBe(true);
            expect(data2.variables().variable().at(1) instanceof DataVariable).toBe(true);
            expect(data2.variables().variable().at(2) instanceof DataVariable).toBe(true);
            expect(data2.service() instanceof Service).toBe(true);

            expect(data3).not.toBeUndefined();
            expect(data3 instanceof Data).toBe(true);
            expect(data3.variables() instanceof Variables).toBe(true);
            expect(data3.variables().variable().at(0) instanceof DataVariable).toBe(true);
            expect(data3.variables().variable().at(1) instanceof DataVariable).toBe(true);
            expect(data3.variables().variable().at(2) instanceof DataVariable).toBe(true);
            expect(data3.csv() instanceof CSV).toBe(true);
        });

        xit("should be able to parse a data with multiple children from XML, serialize it and get the sameXML as the original", function () {
            expect(data.serialize()).toBe(xmlString);
            expect(data2.serialize()).toBe(xmlString2);
            expect(data3.serialize()).toBe(xmlString3);
        });

    });


    describe("isMissing stuff", function () {

        beforeEach(function () {
            xmlString = (''
                         + '<data>'
                         +   '<variables missingvalue="-9000" missingop="le">'
                         +     '<variable missingvalue="-9000" missingop="le" id="x" column="0"/>'
                         +     '<variable missingvalue="-9000" missingop="le" id="y" column="1"/>'
                         +     '<variable missingvalue="-9000" missingop="le" id="z" column="2"/>'
                         +   '</variables>'
                         +   '<values>'
                         +    ' 0,0\n'
                         +    ' 1,-9000\n'
                         +    ' 2,0\n'
                         +   '</values>'
                         + '</data>'
                        );
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse a data with a Variables child from XML", function () {
            data = Data.parseXML($xml);
            expect(data).not.toBeUndefined();
            expect(data instanceof Data).toBe(true);
            expect(data.isMissing(new NumberValue(-9000),1)).toBe(true);
            expect(data.isMissing(new NumberValue(-8999),2)).toBe(false);
        });

    });


});
