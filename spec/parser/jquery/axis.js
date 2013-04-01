/*global xdescribe, describe, xit, beforeEach, expect, it, jasmine */
/*jshint laxbreak:true */

describe("Axis parsing", function () {
    "use strict";

    var Axis = window.multigraph.core.Axis,
        AxisBinding = window.multigraph.core.AxisBinding,
        AxisTitle = window.multigraph.core.AxisTitle,
        Labels = window.multigraph.core.Labels,
        Labeler = window.multigraph.core.Labeler,
        Grid = window.multigraph.core.Grid,
        Pan = window.multigraph.core.Pan,
        Zoom = window.multigraph.core.Zoom,
        DataFormatter = window.multigraph.core.DataFormatter,
        DataMeasure = window.multigraph.core.DataMeasure,
        DataValue = window.multigraph.core.DataValue,
        Text = window.multigraph.core.Text,
        Displacement = window.multigraph.math.Displacement,
        Point = window.multigraph.math.Point,
        RGBColor = window.multigraph.math.RGBColor,
        xmlString,
        $xml,
        axis;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML");
    });

    describe("without child tags", function () {
        var colorString = "0x123456",
            idString = "x",
            typeString = "number",
            pregapString = "2",
            postgapString = "4",
            anchorString = "1",
            minString = "0",
            minoffsetString = "19",
            maxString = "10",
            maxoffsetString = "2",
            tickminString = "-3",
            tickmaxString = "3",
            highlightstyleString = "bold",
            linewidthString = "1",
            lengthString = "1",
            positionString = "1,1",
            baseString = "1,-1",
            tickcolorString = "0xf2aa56",
            minpositionString = "-1",
            maxpositionString = "1";

        beforeEach(function () {
            xmlString = '<horizontalaxis'
                +     ' color="' + colorString + '"'
                +     ' id="' + idString + '"'
                +     ' type="' + typeString + '"'
                +     ' pregap="' + pregapString + '"'
                +     ' postgap="' + postgapString + '"'
                +     ' anchor="' + anchorString + '"'
                +     ' min="' + minString + '"'
                +     ' minoffset="' + minoffsetString + '"'
                +     ' max="' + maxString + '"'
                +     ' maxoffset="' + maxoffsetString + '"'
                +     ' tickmin="' + tickminString + '"'
                +     ' tickmax="' + tickmaxString + '"'
                +     ' highlightstyle="' + highlightstyleString + '"'
                +     ' linewidth="' + linewidthString + '"'
                +     ' length="' + lengthString + '"'
                +     ' position="' + positionString + '"'
                +     ' base="' + baseString + '"'
                +     ' tickcolor="' + tickcolorString + '"'
                +     ' minposition="' + minpositionString + '"'
                +     ' maxposition="' + maxpositionString + '"'
                +     '/>';

            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            axis = Axis.parseXML($xml, Axis.HORIZONTAL);
        });

        it("should be able to parse an axis from XML", function () {
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
        });

        it("should be able to parse an axis from XML and read its 'id' attribute", function () {
            expect(axis.id()).toEqual(idString);
        });

        it("should be able to parse an axis from XML and read its 'type' attribute", function () {
            expect(axis.type()).toEqual(DataValue.parseType(typeString));
        });

        it("should be able to parse an axis from XML and read its 'length' attribute", function () {
            expect(axis.length().a()).toEqual((Displacement.parse(lengthString)).a());
            expect(axis.length().b()).toEqual((Displacement.parse(lengthString)).b());
        });

        it("should be able to parse an axis from XML and read its 'position' attribute", function () {
            expect(axis.position().x()).toEqual((Point.parse(positionString)).x());
            expect(axis.position().y()).toEqual((Point.parse(positionString)).y());
        });

        it("should be able to parse an axis from XML and read its 'pregap' attribute", function () {
            expect(axis.pregap()).toEqual(parseFloat(pregapString));
        });

        it("should be able to parse an axis from XML and read its 'postgap' attribute", function () {
            expect(axis.postgap()).toEqual(parseFloat(postgapString));
        });

        it("should be able to parse an axis from XML and read its 'anchor' attribute", function () {
            expect(axis.anchor()).toEqual(parseFloat(anchorString));
        });

        it("should be able to parse an axis from XML and read its 'base' attribute", function () {
            expect(axis.base().x()).toEqual((Point.parse(baseString)).x());
            expect(axis.base().y()).toEqual((Point.parse(baseString)).y());
        });

        it("should be able to parse an axis from XML and read its 'min' attribute", function () {
            expect(axis.min()).toEqual(minString);
        });

        it("should be able to parse an axis from XML and read its 'minoffset' attribute", function () {
            expect(axis.minoffset()).toEqual(parseFloat(minoffsetString));
        });

        it("should be able to parse an axis from XML and read its 'minposition' attribute", function () {
            expect(axis.minposition().a()).toEqual((Displacement.parse(minpositionString)).a());
            expect(axis.minposition().b()).toEqual((Displacement.parse(minpositionString)).b());
        });

        it("should be able to parse an axis from XML and read its 'max' attribute", function () {
            expect(axis.max()).toEqual(maxString);
        });

        it("should be able to parse an axis from XML and read its 'maxoffset' attribute", function () {
            expect(axis.maxoffset()).toEqual(parseFloat(maxoffsetString));
        });

        it("should be able to parse an axis from XML and read its 'maxposition' attribute", function () {
            expect(axis.maxposition().a()).toEqual((Displacement.parse(maxpositionString)).a());
            expect(axis.maxposition().b()).toEqual((Displacement.parse(maxpositionString)).b());
        });

        it("should be able to parse an axis from XML and read its 'color' attribute", function () {
            expect(axis.color().getHexString("0x")).toEqual((RGBColor.parse(colorString)).getHexString("0x"));
        });

        it("should be able to parse an axis from XML and read its 'tickcolor' attribute", function () {
            expect(axis.tickcolor().getHexString("0x")).toEqual((RGBColor.parse(tickcolorString)).getHexString("0x"));
        });

        it("should be able to parse an axis from XML and read its 'tickmin' attribute", function () {
            expect(axis.tickmin()).toEqual(parseInt(tickminString, 10));
        });

        it("should be able to parse an axis from XML and read its 'tickmax' attribute", function () {
            expect(axis.tickmax()).toEqual(parseInt(tickmaxString, 10));
        });

        it("should be able to parse an axis from XML and read its 'highlightstyle' attribute", function () {
            expect(axis.highlightstyle()).toEqual(highlightstyleString);
        });

        it("should be able to parse an axis from XML and read its 'linewidth' attribute", function () {
            expect(axis.linewidth()).toEqual(parseInt(linewidthString, 10));
        });

    });

    describe("AxisTitle parsing", function () {
        var angleString = "70",
            anchorString = "1,1",
            baseString = "0",
            positionString = "-1,1",
            contentString = "A Title";

        beforeEach(function () {
            xmlString = '<verticalaxis'
                +    ' color="0x000000"'
                +    ' id="y2"'
                +    ' type="number"'
                +    ' pregap="0"'
                +    ' postgap="0"'
                +    ' anchor="-1"'
                +    ' min="auto"'
                +    ' minoffset="0"'
                +    ' max="auto"'
                +    ' maxoffset="0"'
                +    ' tickmin="-3"'
                +    ' tickmax="3"'
                +    ' highlightstyle="axis"'
                +    ' linewidth="1"'
                +    ' length="0.9"'
                +    ' position="0,0"'
                +    ' base="-1,1"'
                +    ' minposition="-1"'
                +    ' maxposition="1"'
                +    '>'
                +   '<title'
                +      ' angle="' + angleString + '"'
                +      ' anchor="' + anchorString + '"'
                +      ' base="' + baseString + '"'
                +      ' position="' + positionString + '"'
                +       '>'
                +     contentString
                +   '</title>'
                + '</verticalaxis>';

            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            axis = Axis.parseXML($xml, Axis.VERTICAL);
        });

        it("should be able to parse a axis with a AxisTitle child from XML", function () {
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.title() instanceof AxisTitle).toBe(true);
        });

        it("should properly parse axis models from XML with axistitle child tags", function () {
            expect(axis.title().axis()).toEqual(axis);

            expect(axis.title().content().string()).toEqual(new Text(contentString).string());

            expect(axis.title().angle()).toEqual(parseFloat(angleString));

            expect(axis.title().anchor().x()).toEqual((Point.parse(anchorString)).x());
            expect(axis.title().anchor().y()).toEqual((Point.parse(anchorString)).y());

            expect(axis.title().base()).toEqual(parseFloat(baseString));

            expect(axis.title().position().x()).toEqual((Point.parse(positionString)).x());
            expect(axis.title().position().y()).toEqual((Point.parse(positionString)).y());
        });

    });

    describe("Labeler parsing", function () {

        describe("with a labels tag and no label tags", function () {
            var spacingStrings = ["100", "75", "50", "25", "10", "5", "2", "1", "0.5", "0.1"],
                startString = "10",
                angleString = "9",
                formatString = "%1d",
                anchorString = "0,0",
                positionString = "1,1",
                densityfactorString = "0.5",
                i;

            beforeEach(function () {

                xmlString = '<verticalaxis'
                    +   ' color="0x000000"'
                    +   ' id="y1"'
                    +   ' type="number"'
                    +   ' pregap="0"'
                    +   ' postgap="0"'
                    +   ' anchor="-1"'
                    +   ' min="auto"'
                    +   ' minoffset="0"'
                    +   ' max="auto"'
                    +   ' maxoffset="0"'
                    +   ' tickmin="-3"'
                    +   ' tickmax="3"'
                    +   ' highlightstyle="axis"'
                    +   ' linewidth="1"'
                    +   ' length="0.9"'
                    +   ' position="0,0"'
                    +   ' base="-1,1"'
                    +   ' minposition="-1"'
                    +   ' maxposition="1"'
                    +    '>'
                    +  '<labels'
                    +     ' start="' + startString + '"'
                    +     ' angle="' + angleString +'"'
                    +     ' format="' + formatString +'"'
                    +     ' anchor="' + anchorString +'"'
                    +     ' position="' + positionString +'"'
                    +     ' spacing="' + spacingStrings.join(" ") +'"'
                    +     ' densityfactor="' + densityfactorString +'"'
                    +      '/>'
                    + '</verticalaxis>';

                $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
                axis = Axis.parseXML($xml, Axis.VERTICAL);
            });

            it("should be able to parse a axis with a Labels child from XML", function () {
                $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
                axis = Axis.parseXML($xml, Axis.VERTICAL);
                expect(axis).not.toBeUndefined();
                expect(axis instanceof Axis).toBe(true);
                expect(axis.labelers().size()).toEqual(spacingStrings.length);

                for (i = 0; i < axis.labelers().size(); i++) {
                    expect(axis.labelers().at(i) instanceof Labeler).toBe(true);
                }
            });

            it("should properly parse axis models from XML with a labels child tag and no label child tags", function () {
                for (i = 0; i < axis.labelers().size(); i++) {
                    expect(axis.labelers().at(i).formatter().getFormatString()).toEqual((DataFormatter.create(axis.type(), formatString)).getFormatString());
                    expect(axis.labelers().at(i).start()).toEqual((DataValue.parse(axis.type(), startString)));
                    expect(axis.labelers().at(i).angle()).toEqual(parseFloat(angleString));
                    expect(axis.labelers().at(i).position().x()).toEqual((Point.parse(positionString)).x());
                    expect(axis.labelers().at(i).position().y()).toEqual((Point.parse(positionString)).y());
                    expect(axis.labelers().at(i).anchor().x()).toEqual((Point.parse(anchorString)).x());
                    expect(axis.labelers().at(i).anchor().y()).toEqual((Point.parse(anchorString)).y());
                    expect(axis.labelers().at(i).spacing().getRealValue()).toEqual((DataMeasure.parse(axis.type(), spacingStrings[i])).getRealValue());
                    expect(axis.labelers().at(i).densityfactor()).toEqual(parseFloat(densityfactorString));
                }
            });

            it("should properly parse axis models from XML with a labels child tag, a type of 'number' and no spacing attribute", function () {
                var defaultValues = (window.multigraph.utilityFunctions.getDefaultValuesFromXSD()).horizontalaxis.labels,
                    spacingStrings   = defaultValues.defaultNumberSpacing.split(/\s+/),

                xmlString = '<verticalaxis'
                    +   ' type="number"'
                    +    '>'
                    +  '<labels'
                    +     ' start="' + startString + '"'
                    +     ' angle="' + angleString +'"'
                    +     ' format="' + formatString +'"'
                    +     ' anchor="' + anchorString +'"'
                    +     ' position="' + positionString +'"'
                    +     ' densityfactor="' + densityfactorString +'"'
                    +      '/>'
                    + '</verticalaxis>';

                $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
                axis = Axis.parseXML($xml, Axis.VERTICAL);

                for (i = 0; i < axis.labelers().size(); i++) {
                    expect(axis.labelers().at(i).formatter().getFormatString()).toEqual((DataFormatter.create(axis.type(), formatString)).getFormatString());
                    expect(axis.labelers().at(i).start()).toEqual((DataValue.parse(axis.type(), startString)));
                    expect(axis.labelers().at(i).angle()).toEqual(parseFloat(angleString));
                    expect(axis.labelers().at(i).position().x()).toEqual((Point.parse(positionString)).x());
                    expect(axis.labelers().at(i).position().y()).toEqual((Point.parse(positionString)).y());
                    expect(axis.labelers().at(i).anchor().x()).toEqual((Point.parse(anchorString)).x());
                    expect(axis.labelers().at(i).anchor().y()).toEqual((Point.parse(anchorString)).y());
                    expect(axis.labelers().at(i).densityfactor()).toEqual(parseFloat(densityfactorString));
                    expect(axis.labelers().at(i).spacing().getRealValue()).toEqual((DataMeasure.parse(axis.type(), spacingStrings[i])).getRealValue());
                }
            });

            it("should properly parse axis models from XML with a labels child tag, a type of 'datetime' and no spacing attribute", function () {
                var defaultValues = (window.multigraph.utilityFunctions.getDefaultValuesFromXSD()).horizontalaxis.labels,
                    spacingStrings = defaultValues.defaultDatetimeSpacing.split(/\s+/),
                    datetimeFormatString = "%Y-%M-%D %H:%i",
                    datetimeStartString = "0";

                xmlString = '<verticalaxis'
                    +   ' type="datetime"'
                    +    '>'
                    +  '<labels'
                    +     ' start="' + datetimeStartString + '"'
                    +     ' angle="' + angleString +'"'
                    +     ' format="' + datetimeFormatString +'"'
                    +     ' anchor="' + anchorString +'"'
                    +     ' position="' + positionString +'"'
                    +     ' densityfactor="' + densityfactorString +'"'
                    +      '/>'
                    + '</verticalaxis>';

                $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
                axis = Axis.parseXML($xml, Axis.VERTICAL);

                for (i = 0; i < axis.labelers().size(); i++) {
                    expect(axis.labelers().at(i).formatter().getFormatString()).toEqual((DataFormatter.create(axis.type(), datetimeFormatString)).getFormatString());
                    expect(axis.labelers().at(i).start()).toEqual((DataValue.parse(axis.type(), datetimeStartString)));
                    expect(axis.labelers().at(i).angle()).toEqual(parseFloat(angleString));
                    expect(axis.labelers().at(i).position().x()).toEqual((Point.parse(positionString)).x());
                    expect(axis.labelers().at(i).position().y()).toEqual((Point.parse(positionString)).y());
                    expect(axis.labelers().at(i).anchor().x()).toEqual((Point.parse(anchorString)).x());
                    expect(axis.labelers().at(i).anchor().y()).toEqual((Point.parse(anchorString)).y());
                    expect(axis.labelers().at(i).densityfactor()).toEqual(parseFloat(densityfactorString));
                    expect(axis.labelers().at(i).spacing().getRealValue()).toEqual((DataMeasure.parse(axis.type(), spacingStrings[i])).getRealValue());
                }
            });

        });

        describe("with label tags", function () {
            var labelsStartString = "10",
                labelsAngleString = "9",
                labelsFormatString = "%1d",
                labelsAnchorString = "0,0",
                labelsPositionString = "1,1",
                labelsDensityfactorString = "0.5",
                label1SpacingStrings = ["200", "100", "50", "10"],
                label2FormatString = "%2d",
                label2SpacingStrings = ["5", "2", "1", ".5"],
                i,
                j;

            beforeEach(function () {
                xmlString = '<verticalaxis'
                    +   ' color="0x000000"'
                    +   ' id="y3"'
                    +   ' type="number"'
                    +   ' pregap="0"'
                    +   ' postgap="0"'
                    +   ' anchor="-1"'
                    +   ' minoffset="0"'
                    +   ' min="auto"'
                    +   ' minposition="-1"'
                    +   ' max="auto"'
                    +   ' maxoffset="0"'
                    +   ' maxposition="1"'
                    +   ' tickmin="-3"'
                    +   ' tickmax="3"'
                    +   ' highlightstyle="axis"'
                    +   ' linewidth="1"'
                    +   ' length="0.9+0"'
                    +   ' position="0,0"'
                    +   ' base="-1,1"'
                    +    '>'
                    +  '<labels'
                    +     ' start="' + labelsStartString + '"'
                    +     ' angle="' + labelsAngleString + '"'
                    +     ' format="' + labelsFormatString + '"'
                    +     ' anchor="' + labelsAnchorString + '"'
                    +     ' position="' + labelsPositionString + '"'
                    +     ' densityfactor="' + labelsDensityfactorString + '"'
                    +      '>'
                    +    '<label'
                    +       ' spacing="' + label1SpacingStrings.join(" ") + '"'
                    +        '/>'
                    +    '<label'
                    +       ' format="' + label2FormatString + '"'
                    +       ' spacing="' + label2SpacingStrings.join(" ") + '"'
                    +        '/>'
                    +  '</labels>'
                    + '</verticalaxis>';

                $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
                axis = Axis.parseXML($xml, Axis.VERTICAL);
            });

            it("should be able to parse a axis tag with a labels child tag and label child tags from XML", function () {
                expect(axis).not.toBeUndefined();
                expect(axis instanceof Axis).toBe(true);
                expect(axis.labelers().size()).toEqual(label1SpacingStrings.length + label2SpacingStrings.length);

                for (i = 0; i < axis.labelers().size(); i++) {
                    expect(axis.labelers().at(i) instanceof Labeler).toBe(true);
                }
            });

            it("should properly parse axis models from XML with a labels child tag and label child tags", function () {
                for (i = 0; i < label1SpacingStrings.length; i++) {
                    expect(axis.labelers().at(i).formatter().getFormatString()).toEqual((DataFormatter.create(axis.type(), labelsFormatString)).getFormatString());
                    expect(axis.labelers().at(i).start()).toEqual((DataValue.parse(axis.type(), labelsStartString)));
                    expect(axis.labelers().at(i).angle()).toEqual(parseFloat(labelsAngleString));
                    expect(axis.labelers().at(i).position().x()).toEqual((Point.parse(labelsPositionString)).x());
                    expect(axis.labelers().at(i).position().y()).toEqual((Point.parse(labelsPositionString)).y());
                    expect(axis.labelers().at(i).anchor().x()).toEqual((Point.parse(labelsAnchorString)).x());
                    expect(axis.labelers().at(i).anchor().y()).toEqual((Point.parse(labelsAnchorString)).y());
                    expect(axis.labelers().at(i).spacing().getRealValue()).toEqual((DataMeasure.parse(axis.type(), label1SpacingStrings[i])).getRealValue());
                    expect(axis.labelers().at(i).densityfactor()).toEqual(parseFloat(labelsDensityfactorString));
                }

                for (j = 0, i = label1SpacingStrings.length; j < label2SpacingStrings.length; i++, j++) {
                    expect(axis.labelers().at(i).formatter().getFormatString()).toEqual((DataFormatter.create(axis.type(), label2FormatString)).getFormatString());
                    expect(axis.labelers().at(i).start()).toEqual((DataValue.parse(axis.type(), labelsStartString)));
                    expect(axis.labelers().at(i).angle()).toEqual(parseFloat(labelsAngleString));
                    expect(axis.labelers().at(i).position().x()).toEqual((Point.parse(labelsPositionString)).x());
                    expect(axis.labelers().at(i).position().y()).toEqual((Point.parse(labelsPositionString)).y());
                    expect(axis.labelers().at(i).anchor().x()).toEqual((Point.parse(labelsAnchorString)).x());
                    expect(axis.labelers().at(i).anchor().y()).toEqual((Point.parse(labelsAnchorString)).y());
                    expect(axis.labelers().at(i).spacing().getRealValue()).toEqual((DataMeasure.parse(axis.type(), label2SpacingStrings[j])).getRealValue());
                    expect(axis.labelers().at(i).densityfactor()).toEqual(parseFloat(labelsDensityfactorString));
                }
            });

        });

    });

    describe("Grid parsing", function () {
        var colorString = "0x984545",
            visibleBool = false;

            beforeEach(function () {
                xmlString = '<verticalaxis'
                    +   ' color="0x000000"'
                    +   ' id="y3"'
                    +   ' type="number"'
                    +   ' pregap="0"'
                    +   ' postgap="0"'
                    +   ' anchor="-1"'
                    +   ' minoffset="0"'
                    +   ' min="auto"'
                    +   ' minposition="-1"'
                    +   ' max="auto"'
                    +   ' maxoffset="0"'
                    +   ' maxposition="1"'
                    +   ' tickmin="-3"'
                    +   ' tickmax="3"'
                    +   ' highlightstyle="axis"'
                    +   ' linewidth="1"'
                    +   ' length="0.9+0"'
                    +   ' position="0,0"'
                    +   ' base="-1,1"'
                    +    '>'
                    +  '<grid'
                    +      ' color="' + colorString + '"'
                    +      ' visible="' + visibleBool + '"'
                    +      '/>'
                    + '</verticalaxis>';

                $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
                axis = Axis.parseXML($xml, Axis.VERTICAL);
            });

        it("should be able to parse a axis with a Grid child from XML", function () {
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.grid() instanceof Grid).toBe(true);
        });

        it("should properly parse axis models from XML with a grid child tag", function () {
            expect(axis.grid().color().getHexString("0x")).toEqual((RGBColor.parse(colorString)).getHexString("0x"));
            expect(axis.grid().visible()).toEqual(visibleBool);
        });

    });

    describe("Pan parsing", function () {
        var allowedString = "yes",
            allowedBool = true,
            minString = "0",
            maxString = "5";

        beforeEach(function () {
            xmlString = '<verticalaxis'
                +   ' color="0x000000"'
                +   ' id="y3"'
                +   ' type="number"'
                +   ' pregap="0"'
                +   ' postgap="0"'
                +   ' anchor="-1"'
                +   ' minoffset="0"'
                +   ' min="auto"'
                +   ' minposition="-1"'
                +   ' max="auto"'
                +   ' maxoffset="0"'
                +   ' maxposition="1"'
                +   ' tickmin="-3"'
                +   ' tickmax="3"'
                +   ' highlightstyle="axis"'
                +   ' linewidth="1"'
                +   ' length="0.9+0"'
                +   ' position="0,0"'
                +   ' base="-1,1"'
                +    '>'
                +  '<pan'
                +      ' allowed="' + allowedString + '"'
                +      ' min="' + minString + '"'
                +      ' max="' + maxString + '"'
                +      '/>'
                + '</verticalaxis>';

            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            axis = Axis.parseXML($xml, Axis.VERTICAL);
        });

        it("should be able to parse a axis with a Pan child from XML", function () {
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.pan() instanceof Pan).toBe(true);
        });

        it("should properly parse axis models from XML with pan child tags", function () {
            expect(axis.pan().allowed()).toEqual(allowedBool);
            expect(axis.pan().min().getRealValue()).toEqual((DataValue.parse(axis.type(), minString)).getRealValue());
            expect(axis.pan().max().getRealValue()).toEqual((DataValue.parse(axis.type(), maxString)).getRealValue());
        });

    });

    describe("Zoom parsing", function () {
        var allowedString = "yes",
            allowedBool = true,
            minString = "0",
            maxString = "5",
            anchorString = "70";

        beforeEach(function () {
            xmlString = '<verticalaxis'
                +   ' color="0x000000"'
                +   ' id="y3"'
                +   ' type="number"'
                +   ' pregap="0"'
                +   ' postgap="0"'
                +   ' anchor="-1"'
                +   ' minoffset="0"'
                +   ' min="auto"'
                +   ' minposition="-1"'
                +   ' max="auto"'
                +   ' maxoffset="0"'
                +   ' maxposition="1"'
                +   ' tickmin="-3"'
                +   ' tickmax="3"'
                +   ' highlightstyle="axis"'
                +   ' linewidth="1"'
                +   ' length="0.9+0"'
                +   ' position="0,0"'
                +   ' base="-1,1"'
                +    '>'
                + '<zoom'
                +     ' allowed="' + allowedString + '"'
                +     ' min="' + minString + '"'
                +     ' max="' + maxString + '"'
                +     ' anchor="' + anchorString + '"'
                +     '/>'
                + '</verticalaxis>';
            
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            axis = Axis.parseXML($xml, Axis.VERTICAL);
        });

        it("should be able to parse a axis with a Zoom child from XML", function () {
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.zoom() instanceof Zoom).toBe(true);
        });

        it("should properly parse axis models from XML with zoom child tags", function () {
            expect(axis.zoom().allowed()).toEqual(allowedBool);
            expect(axis.zoom().min().getRealValue()).toEqual((DataValue.parse(axis.type(), minString)).getRealValue());
            expect(axis.zoom().max().getRealValue()).toEqual((DataValue.parse(axis.type(), maxString)).getRealValue());
            expect(axis.zoom().anchor().getRealValue()).toEqual((DataValue.parse(axis.type(), anchorString)).getRealValue());
        });

    });

    describe("AxisBinding parsing", function () {

        beforeEach(function () {
            AxisBinding.forgetAllBindings();
            xmlString = (
                ''
                    + '<verticalaxis id="y" type="number" min="0" max="10">'
                    +   '<binding id="ybinding" min="0" max="10"/>'
                    + '</verticalaxis>'
            );
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse an axis with a <binding> tag", function () {
            axis = Axis.parseXML($xml, Axis.VERTICAL);
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.binding() instanceof AxisBinding).toBe(true);
            expect(axis.binding().id()).toEqual("ybinding");
        });

        it("axes parsed with the same binding id should be properly bound to each other", function () {
            var xmlString2 = (
                ''
                    + '<verticalaxis id="y" type="number" min="0" max="10">'
                    +   '<binding id="ybinding" min="0" max="100"/>'
                    + '</verticalaxis>'
            );
            var $xml2 = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString2);
            axis = Axis.parseXML($xml, Axis.VERTICAL);
            var axis2 = Axis.parseXML($xml2, Axis.VERTICAL);

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
        var titleAngleString = "70",
            titleAnchorString = "1,1",
            titleBaseString = "1",
            titlePositionString = "-1,1",
            titleContentString = "A Title",
            labelsSpacingStrings = ["100", "75", "50", "25", "10", "5", "2", "1", "0.5", "0.1"],
            labelsStartString = "10",
            labelsAngleString = "9",
            labelsFormatString = "%1d",
            labelsAnchorString = "0,0",
            labelsPositionString = "1,1",
            labelsDensityfactorString = "0.5",
            gridColorString = "0x984545",
            gridVisibleBool = false,
            panAllowedString = "yes",
            panAllowedBool = true,
            panMinString = "0",
            panMaxString = "5",
            zoomAllowedString = "yes",
            zoomAllowedBool = true,
            zoomMinString = "0",
            zoomMaxString = "5",
            zoomAnchorString = "70",
            bindingIdString = "y",
            bindingMinString = "-10",
            bindingMaxString = "50",
            i;


        beforeEach(function () {
            xmlString = (''
                         + '<verticalaxis'
                         +    ' color="0x000000"'
                         +    ' id="y2"'
                         +    ' type="number"'
                         +    ' pregap="0"'
                         +    ' postgap="0"'
                         +    ' anchor="-1"'
                         +    ' min="auto"'
                         +    ' minoffset="0"'
                         +    ' max="auto"'
                         +    ' maxoffset="0"'
                         +    ' tickmin="-3"'
                         +    ' tickmax="3"'
                         +    ' highlightstyle="axis"'
                         +    ' linewidth="1"'
                         +    ' length="0.9"'
                         +    ' position="0,0"'
                         +    ' base="-1,1"'
                         +    ' minposition="1"'
                         +    ' maxposition="1"'
                         +    '>'
                         +  '<title'
                         +     ' angle="' + titleAngleString + '"'
                         +     ' anchor="' + titleAnchorString + '"'
                         +     ' base="' + titleBaseString + '"'
                         +     ' position="' + titlePositionString + '"'
                         +      '>'
                         +     titleContentString
                         +  '</title>'
                         +  '<labels'
                         +     ' start="' + labelsStartString + '"'
                         +     ' angle="' + labelsAngleString +'"'
                         +     ' format="' + labelsFormatString +'"'
                         +     ' anchor="' + labelsAnchorString +'"'
                         +     ' position="' + labelsPositionString +'"'
                         +     ' spacing="' + labelsSpacingStrings.join(" ") +'"'
                         +     ' densityfactor="' + labelsDensityfactorString +'"'
                         +      '/>'
                         +  '<grid'
                         +     ' color="' + gridColorString + '"'
                         +     ' visible="' + gridVisibleBool + '"'
                         +      '/>'
                         +  '<pan'
                         +     ' allowed="' + panAllowedString + '"'
                         +     ' min="' + panMinString + '"'
                         +     ' max="' + panMaxString + '"'
                         +      '/>'
                         +  '<zoom'
                         +     ' allowed="' + zoomAllowedString + '"'
                         +     ' min="' + zoomMinString + '"'
                         +     ' max="' + zoomMaxString + '"'
                         +     ' anchor="' + zoomAnchorString + '"'
                         +      '/>'
                         +  '<binding'
                         +     ' id="' + bindingIdString + '"'
                         +     ' min="' + bindingMinString + '"'
                         +     ' max="' + bindingMaxString + '"'
                         +     '/>'
                         + '</verticalaxis>'
                        );

            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            axis = Axis.parseXML($xml, Axis.VERTICAL);
        });

        it("should be able to parse a axis with all child tags from XML", function () {
            expect(axis).not.toBeUndefined();
            expect(axis instanceof Axis).toBe(true);
            expect(axis.title() instanceof AxisTitle).toBe(true);
            expect(axis.grid() instanceof Grid).toBe(true);
            expect(axis.pan() instanceof Pan).toBe(true);
            expect(axis.zoom() instanceof Zoom).toBe(true);
            expect(axis.binding() instanceof AxisBinding).toBe(true);

            expect(axis.labelers().size()).toEqual(labelsSpacingStrings.length);
            for (i = 0; i < axis.labelers().size(); i++) {
                expect(axis.labelers().at(i) instanceof Labeler).toBe(true);
            }
        });

        it("should properly parse axis models from XML with all child tags", function () {
            // title
            expect(axis.title().axis()).toEqual(axis);
            expect(axis.title().content().string()).toEqual(new Text(titleContentString).string());
            expect(axis.title().angle()).toEqual(parseFloat(titleAngleString));
            expect(axis.title().anchor().x()).toEqual((Point.parse(titleAnchorString)).x());
            expect(axis.title().anchor().y()).toEqual((Point.parse(titleAnchorString)).y());
            expect(axis.title().base()).toEqual(parseFloat(titleBaseString));
            expect(axis.title().position().x()).toEqual((Point.parse(titlePositionString)).x());
            expect(axis.title().position().y()).toEqual((Point.parse(titlePositionString)).y());

            // grid
            expect(axis.grid().color().getHexString("0x")).toEqual((RGBColor.parse(gridColorString)).getHexString("0x"));
            expect(axis.grid().visible()).toEqual(gridVisibleBool);

            // pan
            expect(axis.pan().allowed()).toEqual(panAllowedBool);
            expect(axis.pan().min().getRealValue()).toEqual((DataValue.parse(axis.type(), panMinString)).getRealValue());
            expect(axis.pan().max().getRealValue()).toEqual((DataValue.parse(axis.type(), panMaxString)).getRealValue());

            // zoom
            expect(axis.zoom().allowed()).toEqual(zoomAllowedBool);
            expect(axis.zoom().min().getRealValue()).toEqual((DataValue.parse(axis.type(), zoomMinString)).getRealValue());
            expect(axis.zoom().max().getRealValue()).toEqual((DataValue.parse(axis.type(), zoomMaxString)).getRealValue());
            expect(axis.zoom().anchor().getRealValue()).toEqual((DataValue.parse(axis.type(), zoomAnchorString)).getRealValue());

            // binding
            expect(axis.binding().id()).toEqual(bindingIdString);

            // labelers
            for (i = 0; i < axis.labelers().size(); i++) {
                expect(axis.labelers().at(i).formatter().getFormatString()).toEqual((DataFormatter.create(axis.type(), labelsFormatString)).getFormatString());
                expect(axis.labelers().at(i).start()).toEqual((DataValue.parse(axis.type(), labelsStartString)));
                expect(axis.labelers().at(i).angle()).toEqual(parseFloat(labelsAngleString));
                expect(axis.labelers().at(i).position().x()).toEqual((Point.parse(labelsPositionString)).x());
                expect(axis.labelers().at(i).position().y()).toEqual((Point.parse(labelsPositionString)).y());
                expect(axis.labelers().at(i).anchor().x()).toEqual((Point.parse(labelsAnchorString)).x());
                expect(axis.labelers().at(i).anchor().y()).toEqual((Point.parse(labelsAnchorString)).y());
                expect(axis.labelers().at(i).spacing().getRealValue()).toEqual((DataMeasure.parse(axis.type(), labelsSpacingStrings[i])).getRealValue());
                expect(axis.labelers().at(i).densityfactor()).toEqual(parseFloat(labelsDensityfactorString));
            }
        });

    });

    describe("dataMin/dataMax handling", function () {

        it("axis with min=\"auto\" should return false for hasDataMin()", function () {
            var axis = Axis.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj('<verticalaxis min="auto"/>'), Axis.VERTICAL);
            expect(axis.hasDataMin()).toBe(false);
        });
        it("axis with min=\"0\" should return true for hasDataMin()", function () {
            var axis = Axis.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj('<verticalaxis min="0"/>'), Axis.VERTICAL);
            expect(axis.hasDataMin()).toBe(true);
        });
        it("axis with max=\"auto\" should return false for hasDataMax()", function () {
            var axis = Axis.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj('<verticalaxis max="auto"/>'), Axis.VERTICAL);
            expect(axis.hasDataMax()).toBe(false);
        });
        it("axis with max=\"1\" should return true for hasDataMax()", function () {
            var axis = Axis.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj('<verticalaxis max="1"/>'), Axis.VERTICAL);
            expect(axis.hasDataMax()).toBe(true);
        });

    });



});
