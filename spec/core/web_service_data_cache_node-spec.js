/*global describe, it, beforeEach, expect, xit, jasmine, waitsFor, runs */

describe("WebServiceDataCacheNode", function () {
    "use strict";
    var WebServiceDataCacheNode = require('../../src/core/web_service_data_cache_node.js'),
        NumberValue = require('../../src/core/number_value.js'),
        DatetimeValue = require('../../src/core/datetime_value.js'),
        DataVariable = require('../../src/core/data_variable.js'),
        DataValue = require('../../src/core/data_value.js'),
        typeOf = require('../../src/util/validationFunctions.js').typeOf;

    describe("model", function () {

        it("should not be undefined", function () {
            expect(WebServiceDataCacheNode).not.toBeUndefined();
        });

    });


    describe("constructor", function () {

        it("should not throw an error if called with two DataValue arguments", function() {
            expect(function() {
                new WebServiceDataCacheNode(new NumberValue(0), new NumberValue(1));
            }).not.toThrow();
            expect(function() {
                new WebServiceDataCacheNode(DatetimeValue.parse("20120925"),
                                            DatetimeValue.parse("20120926"));
            }).not.toThrow();
        });

        it("should throw an error if called with anything other than two DataValue arguments", function() {
            expect(function() {
                new WebServiceDataCacheNode(new NumberValue(0));
            }).toThrow();
            expect(function() {
                new WebServiceDataCacheNode(new NumberValue(0), new NumberValue(0), new NumberValue(0));
            }).toThrow();
            expect(function() {
                new WebServiceDataCacheNode(0);
            }).toThrow();
            expect(function() {
                new WebServiceDataCacheNode(0,0);
            }).toThrow();

        });

    });

    describe("attributes", function() {

        var node;

        beforeEach(function() {
            node = new WebServiceDataCacheNode(new NumberValue(0), new NumberValue(1));
        });

        describe("data attribute", function() {
            it("should throw an error if set to something that is not an Array of DataValue Arrays", function() {
                expect(function() {
                    node.data("badvalue");
                }).toThrow();
                expect(function() {
                    node.data([]); // empty array allowed!
                }).not.toThrow();
                expect(function() {
                    node.data([[0,1],[2,3]]);
                }).toThrow();
            });
            it("should be able to set and get the data attribute", function() {
                var data;
                expect(function() {
                    node.data([[new NumberValue(0),new NumberValue(1)],[new NumberValue(2),new NumberValue(3)]]);
                }).not.toThrow();
                expect(function() {
                    data = node.data();
                }).not.toThrow();
                expect(data[0][0].getRealValue()).toEqual(0);
                expect(data[0][1].getRealValue()).toEqual(1);
                expect(data[1][0].getRealValue()).toEqual(2);
                expect(data[1][1].getRealValue()).toEqual(3);
            });
        });

        describe("next attribute", function() {
            it("should be able to set and get the next attribute", function() {
                var otherNode = new WebServiceDataCacheNode(new NumberValue(2), new NumberValue(3));
                expect(function() {
                    node.next(otherNode);
                }).not.toThrow();
                expect(node.next()).toEqual(otherNode);
            });
            it("should be able to set the next attribute to null", function() {
                expect(function() {
                    node.next(null);
                }).not.toThrow();
                expect(node.next()).toBe(null);
            });
            it("should throw an error if the next attribute is set to something other than null or a WebServiceDataCacheNode", function() {
                expect(function() {
                    node.next(0);
                }).toThrow();
                expect(function() {
                    node.next("badvalue");
                }).toThrow();
            });
        });

        describe("prev attribute", function() {
            it("should be able to set and get the prev attribute", function() {
                var otherNode = new WebServiceDataCacheNode(new NumberValue(2), new NumberValue(3));
                expect(function() {
                    node.prev(otherNode);
                }).not.toThrow();
                expect(node.prev()).toEqual(otherNode);
            });
            it("should be able to set the prev attribute to null", function() {
                expect(function() {
                    node.prev(null);
                }).not.toThrow();
                expect(node.prev()).toBe(null);
            });
            it("should throw an error if the prev attribute is set to something other than null or a WebServiceDataCacheNode", function() {
                expect(function() {
                    node.prev(0);
                }).toThrow();
                expect(function() {
                    node.prev("badvalue");
                }).toThrow();
            });
        });

    });

    describe("methods", function() {

        var n_node,
            d_node,
            d_coveredMin,
            d_coveredMax,
            node0,
            node1,
            node2,
            node3;


        beforeEach(function() {
            n_node = new WebServiceDataCacheNode(new NumberValue(0), new NumberValue(1));
            d_coveredMin = DatetimeValue.parse("20120925");
            d_coveredMax = DatetimeValue.parse("20120926");
            d_node = new WebServiceDataCacheNode(d_coveredMin, d_coveredMax);

            node0 = new WebServiceDataCacheNode(new NumberValue(0), new NumberValue(1));
            node1 = new WebServiceDataCacheNode(new NumberValue(1), new NumberValue(2));
            node2 = new WebServiceDataCacheNode(new NumberValue(2), new NumberValue(3));
            node3 = new WebServiceDataCacheNode(new NumberValue(3), new NumberValue(4));

            node1.prev(node0);
            node2.prev(node1);
            node3.prev(node2);

            node0.next(node1);
            node1.next(node2);
            node2.next(node3);

            node0.data([[new NumberValue(0),new NumberValue(1)],[new NumberValue(1),new NumberValue(1)]]);
            node2.data([[new NumberValue(2),new NumberValue(1)],[new NumberValue(3),new NumberValue(1)]]);

            // node0 <--> node1 <--> node2 <--> node3
            // data                  data
        });

        describe("coveredMin() method", function() {
            it("should exist", function() {
                expect(typeof(n_node.coveredMin)).toBe("function");
            });
            it("should return the correct NumberValue value", function() {
                expect(n_node.coveredMin().getRealValue()).toEqual(0);
            });
            it("should return the correct DatetimeValue value", function() {
                expect(d_node.coveredMin().getRealValue()).toEqual(d_coveredMin.getRealValue());
            });
        });

        describe("coveredMax() method", function() {
            it("should exist", function() {
                expect(typeof(n_node.coveredMax)).toBe("function");
            });
            it("should return the correct NumberValue value", function() {
                expect(n_node.coveredMax().getRealValue()).toEqual(1);
            });
            it("should return the correct DatetimeValue value", function() {
                expect(d_node.coveredMax().getRealValue()).toEqual(d_coveredMax.getRealValue());
            });
        });

        describe("dataNext() method", function() {
            it("should exist", function() {
                expect(typeof(n_node.dataNext)).toBe("function");
            });
            it("should work correctly", function() {
                expect(node0.dataNext()).toEqual(node2);
                expect(node1.dataNext()).toEqual(node2);
                expect(node2.dataNext()).toEqual(null);
                expect(node3.dataNext()).toEqual(null);
            });
        });

        describe("dataPrev() method", function() {
            it("should exist", function() {
                expect(typeof(n_node.dataPrev)).toBe("function");
            });
            it("should work correctly", function() {
                expect(node3.dataPrev()).toEqual(node2);
                expect(node2.dataPrev()).toEqual(node0);
                expect(node1.dataPrev()).toEqual(node0);
                expect(node0.dataPrev()).toEqual(null);
            });
        });


        describe("dataMin() method", function() {
            it("should exist", function() {
                expect(typeof(n_node.dataMin)).toBe("function");
            });
            it("should return the correct value", function() {
                expect(node0.dataMin().getRealValue()).toEqual(0);
                expect(node2.dataMin().getRealValue()).toEqual(2);
            });
        });

        describe("dataMax() method", function() {
            it("should exist", function() {
                expect(typeof(n_node.dataMax)).toBe("function");
            });
            it("should return the correct value", function() {
                expect(node0.dataMax().getRealValue()).toEqual(1);
                expect(node2.dataMax().getRealValue()).toEqual(3);
            });
        });


        describe("hasData() method", function() {
            it("should exist", function() {
                expect(typeof(n_node.hasData)).toBe("function");
            });
            it("should return the correct value", function() {
                expect(node0.hasData()).toBe(true);
                expect(node1.hasData()).toBe(false);
                expect(node2.hasData()).toBe(true);
                expect(node3.hasData()).toBe(false);
            });
        });

    });

    describe("parseData() method", function() {

        var node0,
            node1,
            node2,
            node3,
            dataVariables,
            node0dataText,
            node2dataText;

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
                "0,0\n" +
                "5,50\n" +
                "10,100\n";

            node2dataText =
                "10,200\n" +
                "20,200\n" +
                "25,250\n" +
                "30,300\n" +
                "40,400\n";

            // node0 <--> node1 <--> node2 <--> node3
            // data                  data
        });

        it("should exist", function() {
            expect(typeof(node0.parseData)).toBe("function");
        });

        it("not throw an error", function() {
            expect(function() {
                node0.parseData(dataVariables, node0dataText);
            }).not.toThrow();
        });

        it("should populate node0 correctly", function() {
            node0.parseData(dataVariables, node0dataText);
            var data = node0.data();
            expect(typeOf(data)).toBe("array");
            expect(typeOf(data[0])).toBe("array");
            expect(data[0][0].getRealValue()).toEqual(0);
            expect(data[0][1].getRealValue()).toEqual(0);
            expect(data[1][0].getRealValue()).toEqual(5);
            expect(data[1][1].getRealValue()).toEqual(50);
            expect(data[2][0].getRealValue()).toEqual(10);
            expect(data[2][1].getRealValue()).toEqual(100);
            expect(data.length).toBe(3);
            expect(node0.coveredMin().getRealValue()).toEqual(0);
            expect(node0.coveredMax().getRealValue()).toEqual(10);
        });

        it("should populate node2 correctly", function() {
            node0.parseData(dataVariables, node0dataText);
            node2.parseData(dataVariables, node2dataText);
            var data = node2.data();
            expect(typeOf(data)).toBe("array");
            expect(typeOf(data[0])).toBe("array");
            expect(data[0][0].getRealValue()).toEqual(20);
            expect(data[0][1].getRealValue()).toEqual(200);
            expect(data[1][0].getRealValue()).toEqual(25);
            expect(data[1][1].getRealValue()).toEqual(250);
            expect(data[2][0].getRealValue()).toEqual(30);
            expect(data[2][1].getRealValue()).toEqual(300);
            expect(data[3][0].getRealValue()).toEqual(40);
            expect(data[3][1].getRealValue()).toEqual(400);
            expect(data.length).toBe(4);
            expect(node2.coveredMin().getRealValue()).toEqual(20);
            expect(node2.coveredMax().getRealValue()).toEqual(40);
        });
    });


});
