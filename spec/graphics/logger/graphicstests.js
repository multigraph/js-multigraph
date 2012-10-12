/*global describe, it, beforeEach, expect, xit, jasmine, waitsFor, runs */
describe("Logger Graphics Tests", function () {
    "use strict";

    var getLoggerOutput = function (muglUrl, width, height) {
        var contentsObj = {
            "haveData" : false
        };
        window.multigraph.jQuery.ajax({ "url": muglUrl,
                 "dataType" : "text",
                 "success" : function (data) {
                     var multigraph = window.multigraph.core.Multigraph.parseXML( window.multigraph.parser.jquery.stringToJQueryXMLObj(data) );
                     multigraph.width(width);
                     multigraph.height(height);
                     multigraph.render();
                     contentsObj.contents = multigraph.dumpLog();
                     contentsObj.haveData = true;
                 }});
        return contentsObj;
    };

    var getFileContents = function (name) {
        var contentsObj = {
            "haveData" : false
        };
        window.multigraph.jQuery.ajax({ "url": name,
                 "success" : function (data) {
                     contentsObj.contents = data;
                     contentsObj.haveData = true;
                 }});
        return contentsObj;
    };

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        window.multigraph.graphics.logger.mixin.apply(window.multigraph.core);
    });
    xit("acis-webservice.xml should match with a width of '1000' and a height of '400'", function () {
        var loggerOutput = getLoggerOutput("./mugl/acis-webservice.xml", 1000, 400);
        var savedOutput = getFileContents("./graphics/logger/fixtures/acis-webservice-1000x400.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("background_image.xml should match with a width of '800' and a height of '500'", function () {
        var loggerOutput = getLoggerOutput("./mugl/background_image.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/background_image-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    xit("band_graph.xml should match with a width of '800' and a height of '500'", function () {
        var loggerOutput = getLoggerOutput("./mugl/band_graph.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/band_graph-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("bar_graph.xml should match with a width of '800' and a height of '500'", function () {
        var loggerOutput = getLoggerOutput("./mugl/bar_graph.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/bar_graph-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("bar_legend.xml should match with a width of '800' and a height of '500'", function () {
        var loggerOutput = getLoggerOutput("./mugl/bar_legend.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/bar_legend-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    xit("constant-plot.xml should match with a width of '800' and a height of '500'", function () {
        var loggerOutput = getLoggerOutput("./mugl/constant-plot.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/constant-plot-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("crn-webservice.xml should match with a width of '1000' and a height of '400'", function () {
        var loggerOutput = getLoggerOutput("./mugl/crn-webservice.xml", 1000, 400);
        var savedOutput = getFileContents("./graphics/logger/fixtures/crn-webservice-1000x400.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    xit("dashboard-aoi.xml should match with a width of '800' and a height of '400'", function () {
        var loggerOutput = getLoggerOutput("./mugl/dashboard-aoi.xml", 800, 400);
        var savedOutput = getFileContents("./graphics/logger/fixtures/dashboard-aoi-800x400.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("dashboard-asi.xml should match with a width of '800' and a height of '400'", function () {
        var loggerOutput = getLoggerOutput("./mugl/dashboard-asi.xml", 800, 400);
        var savedOutput = getFileContents("./graphics/logger/fixtures/dashboard-asi-800x400.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("dashboard-co2.xml should match with a width of '800' and a height of '400'", function () {
        var loggerOutput = getLoggerOutput("./mugl/dashboard-co2.xml", 800, 400);
        var savedOutput = getFileContents("./graphics/logger/fixtures/dashboard-co2-800x400.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("dashboard-ghouse.xml should match with a width of '800' and a height of '400'", function () {
        var loggerOutput = getLoggerOutput("./mugl/dashboard-ghouse.xml", 800, 400);
        var savedOutput = getFileContents("./graphics/logger/fixtures/dashboard-ghouse-800x400.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("dashboard-glacier.xml should match with a width of '800' and a height of '400'", function () {
        var loggerOutput = getLoggerOutput("./mugl/dashboard-glacier.xml", 800, 400);
        var savedOutput = getFileContents("./graphics/logger/fixtures/dashboard-glacier-800x400.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    xit("dashboard-naoi.xml should match with a width of '800' and a height of '400'", function () {
        var loggerOutput = getLoggerOutput("./mugl/dashboard-naoi.xml", 800, 400);
        var savedOutput = getFileContents("./graphics/logger/fixtures/dashboard-naoi-800x400.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("dashboard-ocean.xml should match with a width of '800' and a height of '400'", function () {
        var loggerOutput = getLoggerOutput("./mugl/dashboard-ocean.xml", 800, 400);
        var savedOutput = getFileContents("./graphics/logger/fixtures/dashboard-ocean-800x400.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    xit("dashboard-oni.xml should match with a width of '800' and a height of '400'", function () {
        var loggerOutput = getLoggerOutput("./mugl/dashboard-oni.xml", 800, 400);
        var savedOutput = getFileContents("./graphics/logger/fixtures/dashboard-oni-800x400.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    xit("dashboard-pnap.xml should match with a width of '800' and a height of '400'", function () {
        var loggerOutput = getLoggerOutput("./mugl/dashboard-pnap.xml", 800, 400);
        var savedOutput = getFileContents("./graphics/logger/fixtures/dashboard-pnap-800x400.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    xit("dashboard-projections.xml should match with a width of '800' and a height of '400'", function () {
        var loggerOutput = getLoggerOutput("./mugl/dashboard-projections.xml", 800, 400);
        var savedOutput = getFileContents("./graphics/logger/fixtures/dashboard-projections-800x400.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("dashboard-sea.xml should match with a width of '800' and a height of '400'", function () {
        var loggerOutput = getLoggerOutput("./mugl/dashboard-sea.xml", 800, 400);
        var savedOutput = getFileContents("./graphics/logger/fixtures/dashboard-sea-800x400.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("dashboard-snow.xml should match with a width of '800' and a height of '400'", function () {
        var loggerOutput = getLoggerOutput("./mugl/dashboard-snow.xml", 800, 400);
        var savedOutput = getFileContents("./graphics/logger/fixtures/dashboard-snow-800x400.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    xit("dashboard-soi.xml should match with a width of '800' and a height of '400'", function () {
        var loggerOutput = getLoggerOutput("./mugl/dashboard-soi.xml", 800, 400);
        var savedOutput = getFileContents("./graphics/logger/fixtures/dashboard-soi-800x400.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("dashboard-sun.xml should match with a width of '800' and a height of '400'", function () {
        var loggerOutput = getLoggerOutput("./mugl/dashboard-sun.xml", 800, 400);
        var savedOutput = getFileContents("./graphics/logger/fixtures/dashboard-sun-800x400.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("dashboard-temp.xml should match with a width of '800' and a height of '400'", function () {
        var loggerOutput = getLoggerOutput("./mugl/dashboard-temp.xml", 800, 400);
        var savedOutput = getFileContents("./graphics/logger/fixtures/dashboard-temp-800x400.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    xit("fcav.xml should match with a width of '800' and a height of '500'", function () {
        var loggerOutput = getLoggerOutput("./mugl/fcav.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/fcav-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("fill_graph.xml should match with a width of '800' and a height of '500'", function () {
        var loggerOutput = getLoggerOutput("./mugl/fill_graph.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/fill_graph-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    xit("fotos-sst.xml should match with a width of '800' and a height of '500'", function () {
        var loggerOutput = getLoggerOutput("./mugl/fotos-sst.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/fotos-sst-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("legend.xml should match with a width of '800' and a height of '500'", function () {
        var loggerOutput = getLoggerOutput("./mugl/legend.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/legend-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("mymugl.xml should match with a width of '800' and a height of '500'", function () {
        var loggerOutput = getLoggerOutput("./mugl/mymugl.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/mymugl-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("pointline_legend.xml should match with a width of '800' and a height of '500'", function () {
        var loggerOutput = getLoggerOutput("./mugl/pointline_legend.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/pointline_legend-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    xit("rangebar_graph.xml should match with a width of '800' and a height of '500'", function () {
        var loggerOutput = getLoggerOutput("./mugl/rangebar_graph.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/rangebar_graph-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("tempgraph-acis-maxt-webservice.xml should match with a width of '800' and a height of '500'", function () {
        var loggerOutput = getLoggerOutput("./mugl/tempgraph-acis-maxt-webservice.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/tempgraph-acis-maxt-webservice-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("tempgraph-csv.xml should match with a width of '800' and a height of '500'", function () {
        var loggerOutput = getLoggerOutput("./mugl/tempgraph-csv.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/tempgraph-csv-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("tempgraph-datetime.xml should match with a width of '800' and a height of '500'", function () {
        var loggerOutput = getLoggerOutput("./mugl/tempgraph-datetime.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/tempgraph-datetime-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("tempgraph.xml should match with a width of '800' and a height of '500'", function () {
        var loggerOutput = getLoggerOutput("./mugl/tempgraph.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/tempgraph-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("tempgraph.xml should match with a width of '800' and a height of '300'", function () {
        var loggerOutput = getLoggerOutput("./mugl/tempgraph.xml", 800, 300);
        var savedOutput = getFileContents("./graphics/logger/fixtures/tempgraph-800x300.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
    it("testgraph.xml should match with a width of '800' and a height of '500'", function () {
        var loggerOutput = getLoggerOutput("./mugl/testgraph.xml", 800, 500);
        var savedOutput = getFileContents("./graphics/logger/fixtures/testgraph-800x500.log");
        waitsFor(function () {
            return savedOutput.haveData && loggerOutput.haveData;
        });
        runs(function () {
            expect(loggerOutput.contents).toEqual(savedOutput.contents);
        });
    });
});
