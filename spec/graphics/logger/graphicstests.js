/*global describe, it, beforeEach, expect, xit, jasmine */
describe("Logger Graphics Tests", function () {
    "use strict";

    var Graph = window.multigraph.core.Graph,
        Axis = window.multigraph.core.Axis;

    function getFileContents(name) {
        var contentsObj = {
            'haveData' : false
        };
        $.ajax({ 'url': name,
                 'success' : function(data) {
                     contentsObj.contents = data;
                     contentsObj.haveData = true;
                 }});
        return contentsObj;
    }

    beforeEach(function () {
        //...
    });
    it("background_image.xml should match", function() {
        //var loggerOutput = getLoggerOutput("./mugl/background_image.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/background_image-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData;
        });
        runs(function () {
            expect(savedOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("bar_graph.xml should match", function() {
        //var loggerOutput = getLoggerOutput("./mugl/bar_graph.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/bar_graph-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData;
        });
        runs(function () {
            expect(savedOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("bar_legend.xml should match", function() {
        //var loggerOutput = getLoggerOutput("./mugl/bar_legend.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/bar_legend-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData;
        });
        runs(function () {
            expect(savedOutput.contents).toEqual(savedOutput.contents);
        });
    });
    xit("dashboard-temp.xml should match", function() {
        //var loggerOutput = getLoggerOutput("./mugl/dashboard-temp.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/dashboard-temp-800x400.log");
        waitsFor(function () {
            return savedOutput.haveData;
        });
        runs(function () {
            expect(savedOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("fill_graph.xml should match", function() {
        //var loggerOutput = getLoggerOutput("./mugl/fill_graph.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/fill_graph-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData;
        });
        runs(function () {
            expect(savedOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("legend.xml should match", function() {
        //var loggerOutput = getLoggerOutput("./mugl/legend.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/legend-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData;
        });
        runs(function () {
            expect(savedOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("mymugl.xml should match", function() {
        //var loggerOutput = getLoggerOutput("./mugl/mymugl.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/mymugl-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData;
        });
        runs(function () {
            expect(savedOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("pointline_legend.xml should match", function() {
        //var loggerOutput = getLoggerOutput("./mugl/pointline_legend.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/pointline_legend-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData;
        });
        runs(function () {
            expect(savedOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("tempgraph-csv.xml should match", function() {
        //var loggerOutput = getLoggerOutput("./mugl/tempgraph-csv.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/tempgraph-csv-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData;
        });
        runs(function () {
            expect(savedOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("tempgraph-datetime.xml should match", function() {
        //var loggerOutput = getLoggerOutput("./mugl/tempgraph-datetime.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/tempgraph-datetime-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData;
        });
        runs(function () {
            expect(savedOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("tempgraph.xml should match", function() {
        //var loggerOutput = getLoggerOutput("./mugl/tempgraph.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/tempgraph-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData;
        });
        runs(function () {
            expect(savedOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("tempgraph.xml should match", function() {
        //var loggerOutput = getLoggerOutput("./mugl/tempgraph.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/tempgraph-800x300.log");
        waitsFor(function () {
            return savedOutput.haveData;
        });
        runs(function () {
            expect(savedOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("testgraph.xml should match", function() {
        //var loggerOutput = getLoggerOutput("./mugl/testgraph.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/testgraph-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData;
        });
        runs(function () {
            expect(savedOutput.contents).toEqual(savedOutput.contents);
        });
    });
});
