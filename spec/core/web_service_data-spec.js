/*global describe, it, beforeEach, expect, xit, jasmine, waitsFor, runs */

describe("WebServiceData", function () {
    "use strict";
    var WebServiceData,
        WebServiceDataCacheNode = require('../../src/core/web_service_data_cache_node.js'),
        WebServiceDataIterator = require('../../src/core/web_service_data_iterator.js'),
        NumberValue = require('../../src/core/number_value.js'),
        DatetimeValue = require('../../src/core/datetime_value.js'),
        Data = require('../../src/core/data.js'),
        DataVariable = require('../../src/core/data_variable.js'),
        DataValue = require('../../src/core/data_value.js'),
        typeOf = require('../../src/util/validationFunctions.js').typeOf;

    var $, jqw = require('../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    beforeEach(function() {
        WebServiceData = require('../../src/core/web_service_data.js')($);
    });


    describe("model", function () {

        it("should not be undefined", function () {
            expect(WebServiceData).not.toBeUndefined();
        });

    });


    describe("constructor", function () {
        var wsd;

        beforeEach(function () {
            wsd = new WebServiceData();
        });

        it("should be able to create a WebServiceData instance", function () {
            expect(wsd).not.toBeUndefined();
        });

        it("instance should have WebServiceData methods", function () {
            expect(typeof(wsd.getIterator)).toBe("function");
        });

        it("instance should have a serviceaddress", function () {
            expect(typeof(wsd.serviceaddress)).toBe("function");
        });

        it("instance of WebServiceData should also be instance of Data", function () {
            expect(wsd instanceof Data).toBe(true);
        });

    });

    describe("serviceaddress attribute", function () {
        var wsd;

        beforeEach(function () {
            wsd = new WebServiceData();
        });

        it("should be able to be set and retrieved", function () {
            wsd.serviceaddress("my service address");
            expect(wsd.serviceaddress()).toEqual("my service address");
        });

        it("should throw an error if the value assigned is not a string", function () {
            expect(function() {
                wsd.serviceaddress(0);
            }).toThrow();
            expect(function() {
                wsd.serviceaddress(function(){});
            }).toThrow();
        });

    });

    describe("constructRequestURL() method", function () {
        var wsd;

        beforeEach(function () {
            wsd = new WebServiceData();
        });

        it("should exist", function() {
            expect(typeof(wsd.constructRequestURL)).toBe("function");
        });

        it("should throw an error if called with no service address defined", function() {
            expect(function() {
                wsd.constructRequestURL();
            }).toThrow();
        });

        it("should throw an error if called with no columns defined", function() {
            wsd.serviceaddress("http://www.example.com/foo/bar/");
            expect(function() {
                wsd.constructRequestURL();
            }).toThrow();
        });

        it("should work correctly when used with DatetimeValues", function() {
            var dataVariables = [
                new DataVariable("datetime", 0, DataValue.DATETIME),
                new DataVariable("maxt", 1, DataValue.NUMBER)
            ];
            wsd = new WebServiceData(dataVariables, "http://www.example.com/foo/bar/");
            var requestURL = wsd.constructRequestURL(DatetimeValue.parse("20120924"),
                                                     DatetimeValue.parse("20120925"), 1);
            expect(requestURL).toEqual("http://www.example.com/foo/bar/20120924000000,20120925000000");
        });

        it("should work correctly when used with NumberValues", function() {
            var dataVariables = [
                new DataVariable("column0", 0, DataValue.NUMBER),
                new DataVariable("maxt",    1, DataValue.NUMBER)
            ];
            wsd = new WebServiceData(dataVariables, "http://www.example.com/foo/bar/");
            var requestURL = wsd.constructRequestURL(new NumberValue(2.3), new NumberValue(4.5), 1);
            expect(requestURL).toEqual("http://www.example.com/foo/bar/2.3,4.5");
        });

    });


    describe("data cache", function() {

        var node0,
            node1,
            node2,
            node3,
            dataVariables,
            node0dataText,
            node2dataText,
            wsd;

        beforeEach(function() {
            node0 = new WebServiceDataCacheNode(new NumberValue(0),  new NumberValue(10));
            node1 = new WebServiceDataCacheNode(new NumberValue(10), new NumberValue(20));
            node2 = new WebServiceDataCacheNode(new NumberValue(20), new NumberValue(30));
            node3 = new WebServiceDataCacheNode(new NumberValue(30), new NumberValue(40));

            dataVariables = [new DataVariable("x", 0, DataValue.NUMBER), new DataVariable("y", 1, DataValue.NUMBER)];

            wsd = new WebServiceData(dataVariables, "http://www.example.com/foo/bar/");

            node0dataText =
                "0,0\n" +
                "5,50\n" +
                "10,100\n";

            node2dataText =
                "10,200\n" +
                "20,200\n" +
                "25,250\n" +
                "30,300\n" +
                "40,400\n";
            //node2.parseData(dataVariables, node2dataText);

            // node0 <--> node1 <--> node2 <--> node3
            // data                  data
        });

        it("cacheHead attribute should exist", function() {
            expect(typeof(wsd.cacheHead)).toBe("function");
        });
        it("cacheTail attribute should exist", function() {
            expect(typeof(wsd.cacheTail)).toBe("function");
        });

        it("insertCacheNode() method should insert the first node", function() {
            expect(function() {
                wsd.insertCacheNode(node0);
            }).not.toThrow();
            expect(wsd.cacheHead()).toEqual(node0);
            expect(wsd.cacheTail()).toEqual(node0);
            expect(wsd.dataHead()).toEqual(null); // no data yet
            expect(wsd.dataTail()).toEqual(null); // no data yet
        });

        it("insertCacheNode() method should insert serveral nodes", function() {
            expect(function() {
                wsd.insertCacheNode(node0);
                wsd.insertCacheNode(node1);
                wsd.insertCacheNode(node2);
                wsd.insertCacheNode(node3);
            }).not.toThrow();
            expect(wsd.cacheHead()).toEqual(node0);
            expect(wsd.cacheTail()).toEqual(node3);
            expect(wsd.dataHead()).toEqual(null); // no data yet
            expect(wsd.dataTail()).toEqual(null); // no data yet
        });

        it("node linkages should be correct after inserting serveral nodes", function() {
            expect(function() {
                wsd.insertCacheNode(node0);
                wsd.insertCacheNode(node1);
                wsd.insertCacheNode(node2);
                wsd.insertCacheNode(node3);
            }).not.toThrow();
            expect(wsd.cacheHead()).toEqual(node0);
            expect(wsd.cacheTail()).toEqual(node3);
            expect(node0.next()).toBe(node1);
            expect(node1.next()).toBe(node2);
            expect(node2.next()).toBe(node3);
            expect(node3.next()).toBe(null);
            expect(node0.prev()).toBe(null);
            expect(node1.prev()).toBe(node0);
            expect(node2.prev()).toBe(node1);
            expect(node3.prev()).toBe(node2);
        });

        it("dataHead() and dataTail() methods should work after populating the first node with data", function() {
            expect(function() {
                wsd.insertCacheNode(node0);
            }).not.toThrow();
            expect(wsd.cacheHead()).toEqual(node0);
            expect(wsd.cacheTail()).toEqual(node0);
            node0.parseData(dataVariables, node0dataText);
            expect(wsd.dataHead()).toEqual(node0);
            expect(wsd.dataTail()).toEqual(node0);
        });

        it("dataHead() and dataTail() methods should work after populating a couple nodes with data", function() {
            expect(function() {
                wsd.insertCacheNode(node0);
                wsd.insertCacheNode(node1);
                wsd.insertCacheNode(node2);
                wsd.insertCacheNode(node3);
            }).not.toThrow();
            expect(wsd.cacheHead()).toEqual(node0);
            expect(wsd.cacheTail()).toEqual(node3);
            node0.parseData(dataVariables, node0dataText);
            node2.parseData(dataVariables, node2dataText);
            expect(wsd.dataHead()).toEqual(node0);
            expect(wsd.dataTail()).toEqual(node2);
        });


    });


    describe("getIterator method", function () {
        var node0,
            node1,
            node2,
            node3,
            dataVariables,
            node0dataText,
            node2dataText,
            wsd;

        beforeEach(function() {
            node0 = new WebServiceDataCacheNode(new NumberValue(0),  new NumberValue(10));
            node1 = new WebServiceDataCacheNode(new NumberValue(10), new NumberValue(20));
            node2 = new WebServiceDataCacheNode(new NumberValue(20), new NumberValue(30));
            node3 = new WebServiceDataCacheNode(new NumberValue(30), new NumberValue(40));

            dataVariables = [new DataVariable("x", 0, DataValue.NUMBER), new DataVariable("y", 1, DataValue.NUMBER)];

            wsd = new WebServiceData(dataVariables, "http://www.example.com/foo/bar/");
            wsd.insertCacheNode(node0);
            wsd.insertCacheNode(node1);
            wsd.insertCacheNode(node2);
            wsd.insertCacheNode(node3);

            node0dataText =
                "0,0\n" +    // <-- initial when buffer=1
                "5,50\n" +   // <-- initial when buffer=0
                "10,100\n";
            node0.parseData(dataVariables, node0dataText);

            node2dataText =
                "10,200\n" +
                "20,200\n" +
                "25,250\n" +
                "30,300\n" + // <-- final when buffer=0
                "40,400\n";  // <-- final when buffer=1
            node2.parseData(dataVariables, node2dataText);

            // node0 <--> node1 <--> node2 <--> node3
            // data                  data
        });

        // http://acis.multigraph.org/acisdata/13881-1/maxt/20120917000000,20120924000000/1,1

        it("should exist", function () {
            expect(typeof(wsd.getIterator)).toBe("function");
        });

        it("should not throw an error", function () {
            expect(function() {
                wsd.getIterator(["x","y"], new NumberValue(5), new NumberValue(30), 0);
            }).not.toThrow();
        });

        it("should return a WebServiceDataIterator instance", function () {
            var iter = wsd.getIterator(["x","y"], new NumberValue(5), new NumberValue(30), 0);
            expect(iter).not.toBeUndefined();
            expect(iter instanceof WebServiceDataIterator).toBe(true);
        });

        it("should return an iterator that iterates over the correct values when buffer=0", function () {
            var iter = wsd.getIterator(["x","y"], new NumberValue(5), new NumberValue(30), 0),
                vals;

            expect(iter.hasNext()).toBe(true);
            vals = iter.next();
            expect(vals).not.toBeUndefined();
            expect(typeOf(vals)).toBe("array");
            expect(vals.length).toBe(2);
            expect(vals[0].getRealValue()).toEqual(5);
            expect(vals[1].getRealValue()).toEqual(50);

            expect(iter.hasNext()).toBe(true);
            vals = iter.next();
            expect(vals).not.toBeUndefined();
            expect(typeOf(vals)).toBe("array");
            expect(vals.length).toBe(2);
            expect(vals[0].getRealValue()).toEqual(10);
            expect(vals[1].getRealValue()).toEqual(100);

            expect(iter.hasNext()).toBe(true);
            vals = iter.next();
            expect(vals).not.toBeUndefined();
            expect(typeOf(vals)).toBe("array");
            expect(vals.length).toBe(2);
            expect(vals[0].getRealValue()).toEqual(20);
            expect(vals[1].getRealValue()).toEqual(200);

            expect(iter.hasNext()).toBe(true);
            vals = iter.next();
            expect(vals).not.toBeUndefined();
            expect(typeOf(vals)).toBe("array");
            expect(vals.length).toBe(2);
            expect(vals[0].getRealValue()).toEqual(25);
            expect(vals[1].getRealValue()).toEqual(250);

            expect(iter.hasNext()).toBe(true);
            vals = iter.next();
            expect(vals).not.toBeUndefined();
            expect(typeOf(vals)).toBe("array");
            expect(vals.length).toBe(2);
            expect(vals[0].getRealValue()).toEqual(30);
            expect(vals[1].getRealValue()).toEqual(300);

            expect(iter.hasNext()).toBe(false);
            expect(iter.next()).toBe(null);

        });


        it("should return an iterator that iterates over the correct values when buffer=1", function () {
            var iter = wsd.getIterator(["x","y"], new NumberValue(5), new NumberValue(30), 1),
                vals;

            expect(iter.hasNext()).toBe(true);
            vals = iter.next();
            expect(vals).not.toBeUndefined();
            expect(typeOf(vals)).toBe("array");
            expect(vals.length).toBe(2);
            expect(vals[0].getRealValue()).toEqual(0);
            expect(vals[1].getRealValue()).toEqual(0);

            expect(iter.hasNext()).toBe(true);
            vals = iter.next();
            expect(vals).not.toBeUndefined();
            expect(typeOf(vals)).toBe("array");
            expect(vals.length).toBe(2);
            expect(vals[0].getRealValue()).toEqual(5);
            expect(vals[1].getRealValue()).toEqual(50);

            expect(iter.hasNext()).toBe(true);
            vals = iter.next();
            expect(vals).not.toBeUndefined();
            expect(typeOf(vals)).toBe("array");
            expect(vals.length).toBe(2);
            expect(vals[0].getRealValue()).toEqual(10);
            expect(vals[1].getRealValue()).toEqual(100);

            expect(iter.hasNext()).toBe(true);
            vals = iter.next();
            expect(vals).not.toBeUndefined();
            expect(typeOf(vals)).toBe("array");
            expect(vals.length).toBe(2);
            expect(vals[0].getRealValue()).toEqual(20);
            expect(vals[1].getRealValue()).toEqual(200);

            expect(iter.hasNext()).toBe(true);
            vals = iter.next();
            expect(vals).not.toBeUndefined();
            expect(typeOf(vals)).toBe("array");
            expect(vals.length).toBe(2);
            expect(vals[0].getRealValue()).toEqual(25);
            expect(vals[1].getRealValue()).toEqual(250);

            expect(iter.hasNext()).toBe(true);
            vals = iter.next();
            expect(vals).not.toBeUndefined();
            expect(typeOf(vals)).toBe("array");
            expect(vals.length).toBe(2);
            expect(vals[0].getRealValue()).toEqual(30);
            expect(vals[1].getRealValue()).toEqual(300);

            expect(iter.hasNext()).toBe(true);
            vals = iter.next();
            expect(vals).not.toBeUndefined();
            expect(typeOf(vals)).toBe("array");
            expect(vals.length).toBe(2);
            expect(vals[0].getRealValue()).toEqual(40);
            expect(vals[1].getRealValue()).toEqual(400);

            expect(iter.hasNext()).toBe(false);
            expect(iter.next()).toBe(null);

        });

    });

});
