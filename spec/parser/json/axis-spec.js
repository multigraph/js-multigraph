/*global xdescribe, describe, xit, beforeEach, expect, it, jasmine */
/*jshint laxbreak:true */

describe("Axis JSON parsing", function () {
    "use strict";

    var Axis = require('../../../src/core/axis.js'),
        AxisBinding = require('../../../src/core/axis_binding.js'),
        AxisTitle = require('../../../src/core/axis_title.js'),
        Labeler = require('../../../src/core/labeler.js'),
        Grid = require('../../../src/core/grid.js'),
        Pan = require('../../../src/core/pan.js'),
        Zoom = require('../../../src/core/zoom.js'),
        DataFormatter = require('../../../src/core/data_formatter.js'),
        DataMeasure = require('../../../src/core/data_measure.js'),
        DataValue = require('../../../src/core/data_value.js'),
        Text = require('../../../src/core/text.js'),
        utiltityFunctions = require('../../../src/util/utilityFunctions.js'),
        Displacement = require('../../../src/math/displacement.js'),
        Point = require('../../../src/math/point.js'),
        RGBColor = require('../../../src/math/rgb_color.js'),
        axis;

    require('../../../src/parser/json/axis.js');

    describe("without child tags", function () {
        var color = "0x123456",
            id = "x",
            type = "number",
            pregap = 2,
            postgap = 4,
            anchor = 1,
            min = 0,
            minoffset = 19,
            max = 10,
            maxoffset = 2,
            tickmin = -3,
            tickmax = 3,
            highlightstyle = "bold",
            linewidth = 1,
            length = 1,
            position = [1,1],
            base = [1,-1],
            tickcolor = "0xf2aa56",
            minposition = -1,
            maxposition = 1,
            json;


        beforeEach(function () {
            json = {
                "color"           : color,
                "id"              : id,
                "type"            : type,
                "pregap"          : pregap,
                "postgap"         : postgap,
                "anchor"          : anchor,
                "min"             : min,
                "minoffset"       : minoffset,
                "max"             : max,
                "maxoffset"       : maxoffset,
                "tickmin"         : tickmin,
                "tickmax"         : tickmax,
                "highlightstyle"  : highlightstyle,
                "linewidth"       : linewidth,
                "length"          : length,
                "position"        : position,
                "base"            : base,
                "tickcolor"       : tickcolor,
                "minposition"     : minposition,
                "maxposition"     : maxposition
            };
            axis = Axis.parseJSON(json, Axis.HORIZONTAL);
        });

        it("should be able to parse an axis from JSON", function () {
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
        });

        it("should be able to parse an axis from JSON and read its 'id' attribute", function () {
            expect(axis.id()).toEqual(id);
        });

        it("should be able to parse an axis from JSON and read its 'type' attribute", function () {
            expect(axis.type()).toEqual(DataValue.parseType(type));
        });

        it("should be able to parse an axis from JSON and read its 'length' attribute", function () {
            expect(axis.length().a()).toEqual((Displacement.parse(length)).a());
            expect(axis.length().b()).toEqual((Displacement.parse(length)).b());
        });

        it("should be able to parse an axis from JSON and read its 'position' attribute", function () {
            expect(axis.position().x()).toEqual(position[0]);
            expect(axis.position().y()).toEqual(position[1]);
        });

        it("should be able to parse an axis from JSON and read its 'pregap' attribute", function () {
            expect(axis.pregap()).toEqual(pregap);
        });

        it("should be able to parse an axis from JSON and read its 'postgap' attribute", function () {
            expect(axis.postgap()).toEqual(postgap);
        });

        it("should be able to parse an axis from JSON and read its 'anchor' attribute", function () {
            expect(axis.anchor()).toEqual(anchor);
        });

        it("should be able to parse an axis from JSON and read its 'base' attribute", function () {
            expect(axis.base().x()).toEqual(base[0]);
            expect(axis.base().y()).toEqual(base[1]);
        });

        it("should be able to parse an axis from JSON and read its 'min' attribute", function () {
            expect(axis.min()).toEqual(String(min));
        });

        it("should be able to parse an axis from JSON and read its 'minoffset' attribute", function () {
            expect(axis.minoffset()).toEqual(minoffset);
        });

        it("should be able to parse an axis from JSON and read its 'minposition' attribute", function () {
            expect(axis.minposition().a()).toEqual((Displacement.parse(minposition)).a());
            expect(axis.minposition().b()).toEqual((Displacement.parse(minposition)).b());
        });

        it("should be able to parse an axis from JSON and read its 'max' attribute", function () {
            expect(axis.max()).toEqual(String(max));
        });

        it("should be able to parse an axis from JSON and read its 'maxoffset' attribute", function () {
            expect(axis.maxoffset()).toEqual(maxoffset);
        });

        it("should be able to parse an axis from JSON and read its 'maxposition' attribute", function () {
            expect(axis.maxposition().a()).toEqual((Displacement.parse(maxposition)).a());
            expect(axis.maxposition().b()).toEqual((Displacement.parse(maxposition)).b());
        });

        it("should be able to parse an axis from JSON and read its 'color' attribute", function () {
            expect(axis.color().getHexString("0x")).toEqual((RGBColor.parse(color)).getHexString("0x"));
        });

        it("should be able to parse an axis from JSON and read its 'tickcolor' attribute", function () {
            expect(axis.tickcolor().getHexString("0x")).toEqual((RGBColor.parse(tickcolor)).getHexString("0x"));
        });

        it("should be able to parse an axis from JSON and read its 'tickmin' attribute", function () {
            expect(axis.tickmin()).toEqual(tickmin);
        });

        it("should be able to parse an axis from JSON and read its 'tickmax' attribute", function () {
            expect(axis.tickmax()).toEqual(tickmax);
        });

        it("should be able to parse an axis from JSON and read its 'highlightstyle' attribute", function () {
            expect(axis.highlightstyle()).toEqual(highlightstyle);
        });

        it("should be able to parse an axis from JSON and read its 'linewidth' attribute", function () {
            expect(axis.linewidth()).toEqual(linewidth);
        });

    });

    describe("AxisTitle parsing", function () {
        var angle = 70,
            anchor = [1,1],
            base = 0,
            position = [-1,1],
            content = "A Title",
            json;

        beforeEach(function () {
            json = {
                "color"           : "0x000000",
                "id"              : "y2",
                "type"            : "number",
                "pregap"          : 0,
                "postgap"         : 0,
                "anchor"          : -1,
                "min"             : "auto",
                "minoffset"       : 0,
                "max"             : "auto",
                "maxoffset"       : 0,
                "tickmin"         : -3,
                "tickmax"         : 3,
                "highlightstyle"  : "axis",
                "linewidth"       : 1,
                "length"          : 0.9,
                "position"        : [0,0],
                "base"            : [-1,1],
                "minposition"     : -1,
                "maxposition"     : 1,
                "title"           : {
                    "angle"    : angle,
                    "anchor"   : anchor,
                    "base"     : base,
                    "position" : position,
                    "text"     : content
                }
            };
            axis = Axis.parseJSON(json, Axis.VERTICAL);
        });

        it("should be able to parse a axis with a AxisTitle child from XML", function () {
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.title() instanceof AxisTitle).toBe(true);
        });

        it("should properly parse axis models from XML with axistitle child tags", function () {
            expect(axis.title().axis()).toEqual(axis);

            expect(axis.title().content().string()).toEqual(new Text(content).string());

            expect(axis.title().angle()).toEqual(angle);

            expect(axis.title().anchor().x()).toEqual(anchor[0]);
            expect(axis.title().anchor().y()).toEqual(anchor[1]);

            expect(axis.title().base()).toEqual(base);

            expect(axis.title().position().x()).toEqual(position[0]);
            expect(axis.title().position().y()).toEqual(position[1]);
        });

    });

    describe("Labeler parsing", function () {

        describe("with a labels tag and no label tags", function () {
            var spacings = [100, 75, 50, 25, 10, 5, 2, 1, 0.5, 0.1],
                start = 10,
                angle = 9,
                format = "%1d",
                anchor = [0,0],
                position = [1,1],
                densityfactor = 0.5,
                i,
                json;

            beforeEach(function () {

                json = {
                    "color"          : "0x000000",
                    "id"             : "y1",
                    "type"           : "number",
                    "pregap"         : 0,
                    "postgap"        : 0,
                    "anchor"         : -1,
                    "min"            : "auto",
                    "minoffset"      : 0,
                    "max"            : "auto",
                    "maxoffset"      : 0,
                    "tickmin"        : -3,
                    "tickmax"        : 3,
                    "highlightstyle" : "axis",
                    "linewidth"      : 1,
                    "length"         : 0.9,
                    "position"       : [0,0],
                    "base"           : [-1,1],
                    "minposition"    : -1,
                    "maxposition"    : 1,
                    "labels"         : {
                        "start"         :  start,
                        "angle"         :  angle,
                        "format"        :  format,
                        "anchor"        :  anchor,
                        "position"      :  position,
                        "spacing"       :  spacings,
                        "densityfactor" :  densityfactor
                    }
                };

                axis = Axis.parseJSON(json, Axis.VERTICAL);
            });

            it("should be able to parse a axis with a Labels child from XML", function () {
                expect(axis).not.toBeUndefined();
                expect(axis instanceof Axis).toBe(true);
                expect(axis.labelers().size()).toEqual(spacings.length);

                for (i = 0; i < axis.labelers().size(); i++) {
                    expect(axis.labelers().at(i) instanceof Labeler).toBe(true);
                }
            });

            it("should properly parse axis models from XML with a labels child tag and no label child tags", function () {
                for (i = 0; i < axis.labelers().size(); i++) {
                    expect(axis.labelers().at(i).formatter().getFormatString()).toEqual((DataFormatter.create(axis.type(), format)).getFormatString());
                    expect(axis.labelers().at(i).start()).toEqual((DataValue.parse(axis.type(), start)));
                    expect(axis.labelers().at(i).angle()).toEqual(angle);
                    expect(axis.labelers().at(i).position().x()).toEqual(position[0]);
                    expect(axis.labelers().at(i).position().y()).toEqual(position[1]);
                    expect(axis.labelers().at(i).anchor().x()).toEqual(anchor[0]);
                    expect(axis.labelers().at(i).anchor().y()).toEqual(anchor[1]);
                    expect(axis.labelers().at(i).spacing().getRealValue()).toEqual((DataMeasure.parse(axis.type(), spacings[i])).getRealValue());
                    expect(axis.labelers().at(i).densityfactor()).toEqual(densityfactor);
                }
            });

            it("should properly parse axis models from XML with a labels child tag, a type of 'number' and no spacing attribute", function () {
                var defaultValues = (utilityFunctions.getDefaultValuesFromXSD()).horizontalaxis.labels,
                    spacings   = defaultValues.defaultNumberSpacing;

                    json = {
                        "type"   : "number",
                        "labels" : {
                            "start"         :  start,
                            "angle"         :  angle,
                            "format"        :  format,
                            "anchor"        :  anchor,
                            "position"      :  position,
                            "densityfactor" :  densityfactor
                        }
                    };

                axis = Axis.parseJSON(json, Axis.VERTICAL);

                for (i = 0; i < axis.labelers().size(); i++) {
                    expect(axis.labelers().at(i).formatter().getFormatString()).toEqual((DataFormatter.create(axis.type(), format)).getFormatString());
                    expect(axis.labelers().at(i).start()).toEqual((DataValue.parse(axis.type(), start)));
                    expect(axis.labelers().at(i).angle()).toEqual(angle);
                    expect(axis.labelers().at(i).position().x()).toEqual(position[0]);
                    expect(axis.labelers().at(i).position().y()).toEqual(position[1]);
                    expect(axis.labelers().at(i).anchor().x()).toEqual(anchor[0]);
                    expect(axis.labelers().at(i).anchor().y()).toEqual(anchor[1]);
                    expect(axis.labelers().at(i).densityfactor()).toEqual(densityfactor);
                    expect(axis.labelers().at(i).spacing().getRealValue()).toEqual((DataMeasure.parse(axis.type(), spacings[i])).getRealValue());
                }
            });

            it("should properly parse axis models from XML with a labels child tag, a type of 'datetime' and no spacing attribute", function () {
                var defaultValues = (utilityFunctions.getDefaultValuesFromXSD()).horizontalaxis.labels,
                    spacings = defaultValues.defaultDatetimeSpacing,
                    datetimeFormat = "%Y-%M-%D %H:%i",
                    datetimeStart = "0";

                json = {
                    "type"   : "datetime",
                    "labels" : {
                        "start"         :  datetimeStart,
                        "angle"         :  angle,
                        "format"        :  datetimeFormat,
                        "anchor"        :  anchor,
                        "position"      :  position,
                        "densityfactor" :  densityfactor
                    }
                };

                axis = Axis.parseJSON(json, Axis.VERTICAL);

                for (i = 0; i < axis.labelers().size(); i++) {
                    expect(axis.labelers().at(i).formatter().getFormatString()).toEqual((DataFormatter.create(axis.type(), datetimeFormat)).getFormatString());
                    expect(axis.labelers().at(i).start()).toEqual((DataValue.parse(axis.type(), datetimeStart)));
                    expect(axis.labelers().at(i).angle()).toEqual(angle);
                    expect(axis.labelers().at(i).position().x()).toEqual(position[0]);
                    expect(axis.labelers().at(i).position().y()).toEqual(position[1]);
                    expect(axis.labelers().at(i).anchor().x()).toEqual(anchor[0]);
                    expect(axis.labelers().at(i).anchor().y()).toEqual(anchor[1]);
                    expect(axis.labelers().at(i).densityfactor()).toEqual(densityfactor);
                    expect(axis.labelers().at(i).spacing().getRealValue()).toEqual((DataMeasure.parse(axis.type(), spacings[i])).getRealValue());
                }
            });

        });

        describe("with label tags", function () {
            var labelsStart = 10,
                labelsAngle = 9,
                labelsFormat = "%1d",
                labelsAnchor = [0,0],
                labelsPosition = [1,1],
                labelsDensityfactor = 0.5,
                label1Spacings = [200, 100, 50, 10],
                label2Format = "%2d",
                label2Spacings = [5, 2, 1, .5],
                i,
                j,
                json;

            beforeEach(function () {
                json = {
                    "color"          : "0x000000",
                    "id"             : "y3",
                    "type"           : "number",
                    "pregap"         : 0,
                    "postgap"        : 0,
                    "anchor"         : -1,
                    "minoffset"      : 0,
                    "min"            : "auto",
                    "minposition"    : -1,
                    "max"            : "auto",
                    "maxoffset"      : 0,
                    "maxposition"    : 1,
                    "tickmin"        : -3,
                    "tickmax"        : 3,
                    "highlightstyle" : "axis",
                    "linewidth"      : 1,
                    "length"         : "0.9+0",
                    "position"       : [0,0],
                    "base"           : [-1,1],
                    "labels"         : {
                        "start"         :  labelsStart,
                        "angle"         :  labelsAngle,
                        "format"        :  labelsFormat,
                        "anchor"        :  labelsAnchor,
                        "position"      :  labelsPosition,
                        "densityfactor" :  labelsDensityfactor,
                        "label"         : [
                            { "spacing" :  label1Spacings },
                            { "format" :  label2Format, "spacing" :  label2Spacings }
                        ]
                    }
                };
                axis = Axis.parseJSON(json, Axis.VERTICAL);
            });

            it("should be able to parse a axis tag with a labels child tag and label child tags from XML", function () {
                expect(axis).not.toBeUndefined();
                expect(axis instanceof Axis).toBe(true);
                expect(axis.labelers().size()).toEqual(label1Spacings.length + label2Spacings.length);

                for (i = 0; i < axis.labelers().size(); i++) {
                    expect(axis.labelers().at(i) instanceof Labeler).toBe(true);
                }
            });

            it("should properly parse axis models from XML with a labels child tag and label child tags", function () {
                for (i = 0; i < label1Spacings.length; i++) {
                    expect(axis.labelers().at(i).formatter().getFormatString()).toEqual((DataFormatter.create(axis.type(), labelsFormat)).getFormatString());
                    expect(axis.labelers().at(i).start()).toEqual((DataValue.parse(axis.type(), labelsStart)));
                    expect(axis.labelers().at(i).angle()).toEqual(labelsAngle);
                    expect(axis.labelers().at(i).position().x()).toEqual(labelsPosition[0]);
                    expect(axis.labelers().at(i).position().y()).toEqual(labelsPosition[1]);
                    expect(axis.labelers().at(i).anchor().x()).toEqual(labelsAnchor[0]);
                    expect(axis.labelers().at(i).anchor().y()).toEqual(labelsAnchor[1]);
                    expect(axis.labelers().at(i).spacing().getRealValue()).toEqual((DataMeasure.parse(axis.type(), label1Spacings[i])).getRealValue());
                    expect(axis.labelers().at(i).densityfactor()).toEqual(labelsDensityfactor);
                }

                for (j = 0, i = label1Spacings.length; j < label2Spacings.length; i++, j++) {
                    expect(axis.labelers().at(i).formatter().getFormatString()).toEqual((DataFormatter.create(axis.type(), label2Format)).getFormatString());
                    expect(axis.labelers().at(i).start()).toEqual((DataValue.parse(axis.type(), labelsStart)));
                    expect(axis.labelers().at(i).angle()).toEqual(labelsAngle);
                    expect(axis.labelers().at(i).position().x()).toEqual(labelsPosition[0]);
                    expect(axis.labelers().at(i).position().y()).toEqual(labelsPosition[1]);
                    expect(axis.labelers().at(i).anchor().x()).toEqual(labelsAnchor[0]);
                    expect(axis.labelers().at(i).anchor().y()).toEqual(labelsAnchor[1]);
                    expect(axis.labelers().at(i).spacing().getRealValue()).toEqual((DataMeasure.parse(axis.type(), label2Spacings[j])).getRealValue());
                    expect(axis.labelers().at(i).densityfactor()).toEqual(labelsDensityfactor);
                }
            });

        });

    });

    describe("Grid parsing", function () {
        var color = "0x984545",
            visibleBool = false,
            json;

            beforeEach(function () {
                json = {
                    "color"          : "0x000000",
                    "id"             : "y3",
                    "type"           : "number",
                    "pregap"         : 0,
                    "postgap"        : 0,
                    "anchor"         : -1,
                    "minoffset"      : 0,
                    "min"            : "auto",
                    "minposition"    : -1,
                    "max"            : "auto",
                    "maxoffset"      : 0,
                    "maxposition"    : 1,
                    "tickmin"        : -3,
                    "tickmax"        : 3,
                    "highlightstyle" : "axis",
                    "linewidth"      : 1,
                    "length"         : "0.9+0",
                    "position"       : [0,0],
                    "base"           : [-1,1],
                    "grid" : {
                        "color"   : color,
                        "visible" : visibleBool
                    }
                };

                axis = Axis.parseJSON(json, Axis.VERTICAL);
            });

        it("should be able to parse a axis with a Grid child from XML", function () {
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.grid() instanceof Grid).toBe(true);
        });

        it("should properly parse axis models from XML with a grid child tag", function () {
            expect(axis.grid().color().getHexString("0x")).toEqual((RGBColor.parse(color)).getHexString("0x"));
            expect(axis.grid().visible()).toEqual(visibleBool);
        });

    });

    describe("Pan parsing", function () {
        var allowed = "yes",
            allowedBool = true,
            min = "0",
            max = "5",
            json;

        beforeEach(function () {
            json = {
                "color"          : "0x000000",
                "id"             : "y3",
                "type"           : "number",
                "pregap"         : 0,
                "postgap"        : 0,
                "anchor"         : -1,
                "minoffset"      : 0,
                "min"            : "auto",
                "minposition"    : -1,
                "max"            : "auto",
                "maxoffset"      : 0,
                "maxposition"    : 1,
                "tickmin"        : -3,
                "tickmax"        : 3,
                "highlightstyle" : "axis",
                "linewidth"      : 1,
                "length"         : "0.9+0",
                "position"       : [0,0],
                "base"           : [-1,1],
                "pan"            : {
                    "allowed" :  allowed,
                    "min"     :  min,
                    "max"     :  max
                }
            };
            axis = Axis.parseJSON(json, Axis.VERTICAL);
        });

        it("should be able to parse a axis with a Pan child from XML", function () {
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.pan() instanceof Pan).toBe(true);
        });

        it("should properly parse axis models from XML with pan child tags", function () {
            expect(axis.pan().allowed()).toEqual(allowedBool);
            expect(axis.pan().min().getRealValue()).toEqual((DataValue.parse(axis.type(), min)).getRealValue());
            expect(axis.pan().max().getRealValue()).toEqual((DataValue.parse(axis.type(), max)).getRealValue());
        });

    });

    describe("Zoom parsing", function () {
        var allowed = "yes",
            allowedBool = true,
            min = "0",
            max = "5",
            anchor = "70",
            json;

        beforeEach(function () {
            json = {
                "color"          : "0x000000",
                "id"             : "y3",
                "type"           : "number",
                "pregap"         : 0,
                "postgap"        : 0,
                "anchor"         : -1,
                "minoffset"      : 0,
                "min"            : "auto",
                "minposition"    : -1,
                "max"            : "auto",
                "maxoffset"      : 0,
                "maxposition"    : 1,
                "tickmin"        : -3,
                "tickmax"        : 3,
                "highlightstyle" : "axis",
                "linewidth"      : 1,
                "length"         : "0.9+0",
                "position"       : [0,0],
                "base"           : [-1,1],
                "zoom" : {
                    "allowed" : allowed,
                    "min"     : min,
                    "max"     : max,
                    "anchor"  : anchor
                }
            };
            axis = Axis.parseJSON(json, Axis.VERTICAL);
        });

        it("should be able to parse a axis with a Zoom child from XML", function () {
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.zoom() instanceof Zoom).toBe(true);
        });

        it("should properly parse axis models from XML with zoom child tags", function () {
            expect(axis.zoom().allowed()).toEqual(allowedBool);
            expect(axis.zoom().min().getRealValue()).toEqual((DataValue.parse(axis.type(), min)).getRealValue());
            expect(axis.zoom().max().getRealValue()).toEqual((DataValue.parse(axis.type(), max)).getRealValue());
            expect(axis.zoom().anchor().getRealValue()).toEqual((DataValue.parse(axis.type(), anchor)).getRealValue());
        });

    });

    describe("AxisBinding parsing", function () {
        var json;

        beforeEach(function () {
            AxisBinding.forgetAllBindings();
            json = { "id": "y", "type": "number",  "min": 0, "max": 10,
                     "binding" : { "id": "ybinding", "min": 0, "max": 10 } };
        });

        it("should be able to parse an axis with a <binding> tag", function () {
            axis = Axis.parseJSON(json, Axis.VERTICAL);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.binding() instanceof AxisBinding).toBe(true);
            expect(axis.binding().id()).toEqual("ybinding");
        });

        it("axes parsed with the same binding id should be properly bound to each other", function () {
            var json2 = { "id": "y", "type": "number",  "min": 0, "max": 10,
                          "binding" : { "id": "ybinding", "min": 0, "max": 100 } };
            axis = Axis.parseJSON(json, Axis.VERTICAL);
            var axis2 = Axis.parseJSON(json2, Axis.VERTICAL);

            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.binding() instanceof AxisBinding).toBe(true);
            expect(axis.binding().id()).toEqual("ybinding");


            expect(axis2).not.toBeUndefined();
            expect(axis2 instanceof Axis).toBe(true);
            expect(axis2.binding() instanceof AxisBinding).toBe(true);
            expect(axis2.binding().id()).toEqual("ybinding");

            axis.setDataRange(0,5);
            expect(axis2.dataMin().getRealValue()).toEqual(0);
            expect(axis2.dataMax().getRealValue()).toEqual(50);
        });

    });

    describe("with multiple children", function () {
        var titleAngle = 70,
            titleAnchor = [1,1],
            titleBase = 1,
            titlePosition = [-1,1],
            titleContent = "A Title",
            labelsSpacings = [100, 75, 50, 25, 10, 5, 2, 1, 0.5, 0.1],
            labelsStart = 10,
            labelsAngle = 9,
            labelsFormat = "%1d",
            labelsAnchor = [0,0],
            labelsPosition = [1,1],
            labelsDensityfactor = 0.5,
            gridColor = "0x984545",
            gridVisibleBool = false,
            panAllowed = "yes",
            panAllowedBool = true,
            panMin = 0,
            panMax = 5,
            zoomAllowed = "yes",
            zoomAllowedBool = true,
            zoomMin = 0,
            zoomMax = 5,
            zoomAnchor = 70,
            bindingId = "y",
            bindingMin = -10,
            bindingMax = 50,
            i,
            json;


        beforeEach(function () {
            json = {
                "color"          : "0x000000",
                "id"             : "y2",
                "type"           : "number",
                "pregap"         : 0,
                "postgap"        : 0,
                "anchor"         : -1,
                "min"            : "auto",
                "minoffset"      : 0,
                "max"            : "auto",
                "maxoffset"      : 0,
                "tickmin"        : -3,
                "tickmax"        : 3,
                "highlightstyle" : "axis",
                "linewidth"      : 1,
                "length"         : 0.9,
                "position"       : [0,0],
                "base"           : [-1,1],
                "minposition"    : 1,
                "maxposition"    : 1,
                "title" : {
                    "angle"    : titleAngle,
                    "anchor"   : titleAnchor,
                    "base"     : titleBase,
                    "position" : titlePosition,
                    "text"     : titleContent
                },
                "labels" : {
                    "start"         :  labelsStart,
                    "angle"         :  labelsAngle,
                    "format"        :  labelsFormat,
                    "anchor"        :  labelsAnchor,
                    "position"      :  labelsPosition,
                    "spacing"       :  labelsSpacings,
                    "densityfactor" :  labelsDensityfactor
                },
                "grid" : {
                    "color"   :  gridColor,
                    "visible" :  gridVisibleBool
                },
                "pan" : {
                    "allowed" :  panAllowed,
                    "min"     :  panMin,
                    "max"     :  panMax
                },
                "zoom" : {
                    "allowed" :  zoomAllowed,
                    "min"     :  zoomMin,
                    "max"     :  zoomMax,
                    "anchor"  :  zoomAnchor
                },
                "binding" : {
                    "id"  :  bindingId,
                    "min" :  bindingMin,
                    "max" :  bindingMax
                }
            };

            axis = Axis.parseJSON(json, Axis.VERTICAL);
        });

        it("should be able to parse a axis with all child tags from XML", function () {
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.title() instanceof AxisTitle).toBe(true);
            expect(axis.grid() instanceof Grid).toBe(true);
            expect(axis.pan() instanceof Pan).toBe(true);
            expect(axis.zoom() instanceof Zoom).toBe(true);
            expect(axis.binding() instanceof AxisBinding).toBe(true);

            expect(axis.labelers().size()).toEqual(labelsSpacings.length);
            for (i = 0; i < axis.labelers().size(); i++) {
                expect(axis.labelers().at(i) instanceof Labeler).toBe(true);
            }
        });

        it("should properly parse axis models from XML with all child tags", function () {
            // title
            expect(axis.title().axis()).toEqual(axis);
            expect(axis.title().content().string()).toEqual(new Text(titleContent).string());
            expect(axis.title().angle()).toEqual(titleAngle);
            expect(axis.title().anchor().x()).toEqual(titleAnchor[0]);
            expect(axis.title().anchor().y()).toEqual(titleAnchor[1]);
            expect(axis.title().base()).toEqual(titleBase);
            expect(axis.title().position().x()).toEqual(titlePosition[0]);
            expect(axis.title().position().y()).toEqual(titlePosition[1]);

            // grid
            expect(axis.grid().color().getHexString("0x")).toEqual((RGBColor.parse(gridColor)).getHexString("0x"));
            expect(axis.grid().visible()).toEqual(gridVisibleBool);

            // pan
            expect(axis.pan().allowed()).toEqual(panAllowedBool);
            expect(axis.pan().min().getRealValue()).toEqual((DataValue.parse(axis.type(), panMin)).getRealValue());
            expect(axis.pan().max().getRealValue()).toEqual((DataValue.parse(axis.type(), panMax)).getRealValue());

            // zoom
            expect(axis.zoom().allowed()).toEqual(zoomAllowedBool);
            expect(axis.zoom().min().getRealValue()).toEqual((DataValue.parse(axis.type(), zoomMin)).getRealValue());
            expect(axis.zoom().max().getRealValue()).toEqual((DataValue.parse(axis.type(), zoomMax)).getRealValue());
            expect(axis.zoom().anchor().getRealValue()).toEqual((DataValue.parse(axis.type(), zoomAnchor)).getRealValue());

            // binding
            expect(axis.binding().id()).toEqual(bindingId);

            // labelers
            for (i = 0; i < axis.labelers().size(); i++) {
                expect(axis.labelers().at(i).formatter().getFormatString()).toEqual((DataFormatter.create(axis.type(), labelsFormat)).getFormatString());
                expect(axis.labelers().at(i).start()).toEqual((DataValue.parse(axis.type(), labelsStart)));
                expect(axis.labelers().at(i).angle()).toEqual(labelsAngle);
                expect(axis.labelers().at(i).position().x()).toEqual(labelsPosition[0]);
                expect(axis.labelers().at(i).position().y()).toEqual(labelsPosition[1]);
                expect(axis.labelers().at(i).anchor().x()).toEqual(labelsAnchor[0]);
                expect(axis.labelers().at(i).anchor().y()).toEqual(labelsAnchor[1]);
                expect(axis.labelers().at(i).spacing().getRealValue()).toEqual((DataMeasure.parse(axis.type(), labelsSpacings[i])).getRealValue());
                expect(axis.labelers().at(i).densityfactor()).toEqual(labelsDensityfactor);
            }
        });

    });

    describe("dataMin/dataMax handling", function () {

        it("axis with min=\"auto\" should return false for hasDataMin()", function () {
            var axis = Axis.parseJSON({ "min": "auto" }, Axis.VERTICAL);
            expect(axis.hasDataMin()).toBe(false);
        });
        it("axis with min=\"0\" should return true for hasDataMin()", function () {
            var axis = Axis.parseJSON({ "min": 0 }, Axis.VERTICAL);
            expect(axis.hasDataMin()).toBe(true);
        });
        it("axis with max=\"auto\" should return false for hasDataMax()", function () {
            var axis = Axis.parseJSON({ "max": "auto" }, Axis.VERTICAL);
            expect(axis.hasDataMax()).toBe(false);
        });
        it("axis with max=\"1\" should return true for hasDataMax()", function () {
            var axis = Axis.parseJSON({ "max": 1 }, Axis.VERTICAL);
            expect(axis.hasDataMax()).toBe(true);
        });

    });



});
