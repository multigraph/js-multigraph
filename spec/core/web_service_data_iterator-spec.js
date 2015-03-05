/*global describe, it, beforeEach, expect, xit, jasmine, waitsFor, runs */

describe("WebServiceDataIterator", function () {
    "use strict";
    var WebServiceDataIterator = require('../../src/core/web_service_data_iterator.js'),
        WebServiceDataCacheNode = require('../../src/core/web_service_data_cache_node.js'),
        NumberValue = require('../../src/core/number_value.js'),
        DatetimeValue = require('../../src/core/datetime_value.js'),
        DataVariable = require('../../src/core/data_variable.js'),
        DataValue = require('../../src/core/data_value.js'),
        typeOf = require('../../src/util/validationFunctions.js').typeOf;

    it("model should be defined", function () {
        expect(WebServiceDataIterator).not.toBeUndefined();
    });

    describe("methods", function() {

        var node0,
            node1,
            node2,
            node3,
            dataVariables,
            node0dataText,
            node2dataText,
            iter;

        beforeEach(function() {
            node0 = new WebServiceDataCacheNode(new NumberValue(0),  new NumberValue(10));
            node1 = new WebServiceDataCacheNode(new NumberValue(10), new NumberValue(20));
            node2 = new WebServiceDataCacheNode(new NumberValue(20), new NumberValue(30));
            node3 = new WebServiceDataCacheNode(new NumberValue(30), new NumberValue(40));

            node1.prev(node0);
            node2.prev(node1);
            node3.prev(node2);

            node0.next(node1);
            node1.next(node2);
            node2.next(node3);

            dataVariables = [new DataVariable("x", 0, DataValue.NUMBER), new DataVariable("y", 1, DataValue.NUMBER)];

            node0dataText =
                "0,0\n" +           // index 0
                "5,50\n" +          // index 1  <---   initial value
                "10,100\n";
            node0.parseData(dataVariables, node0dataText);

            node2dataText =
                "10,200\n" +        //          <---   should omit this value
                "20,200\n" +        // index 0
                "25,250\n" +        // index 1
                "30,300\n" +        // index 2  <---   final value
                "40,400\n";
            node2.parseData(dataVariables, node2dataText);

            // node0 <--> node1 <--> node2 <--> node3
            // data                  data

        });

        it("constructor should not throw an error", function() {
            expect(function() {
                iter = new WebServiceDataIterator([0,1], node0, 1, node2, 2);
            }).not.toThrow();
        });

        it("hasNext() method should exist", function() {
            iter = new WebServiceDataIterator([0,1], node0, 1, node2, 2);
            expect(typeof(iter.hasNext)).toBe("function");
        });

        it("next() method should exist", function() {
            iter = new WebServiceDataIterator([0,1], node0, 1, node2, 2);
            expect(typeof(iter.next)).toBe("function");
        });

        it("should iterate over the correct sequence of values", function() {
            var vals;
            iter = new WebServiceDataIterator([0,1], node0, 1, node2, 2);

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

    });
});

