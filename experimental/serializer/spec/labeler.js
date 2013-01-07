/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Label serialization", function () {
    "use strict";

    var Labeler = window.multigraph.core.Labeler,
        Axis = window.multigraph.core.Axis,
        DataFormatter = window.multigraph.core.DataFormatter,
        DataMeasure = window.multigraph.core.DataMeasure,
        DataValue = window.multigraph.core.DataValue,
        Point = window.multigraph.math.Point,
        xmlString,
        labeler;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize axis labeler models", function () {
        xmlString = '<label'
            +    ' start="7"'
            +    ' angle="45"'
            +    ' format="%2d"'
            +    ' anchor="1,1"'
            +    ' position="-1,1"'
            +    ' spacing="200"'
            +    ' densityfactor="0.9"'
            +    '/>';
        labeler = new Labeler(new Axis(Axis.HORIZONTAL));
        labeler.formatter(DataFormatter.create(DataValue.NUMBER, "%2d"));
        labeler.start(DataValue.parse(DataValue.NUMBER, 7));
        labeler.angle(45);
        labeler.position(Point.parse("-1,1"));
        labeler.anchor(Point.parse("1,1"));
        labeler.spacing(DataMeasure.parse("number", "200"));
        labeler.densityfactor(0.9);
        expect(labeler.serialize()).toEqual(xmlString);

        xmlString = '<label start="10" angle="-30" anchor="1,1" spacing="10" densityfactor="1"/>';
        labeler = new Labeler(new Axis(Axis.HORIZONTAL));
        labeler.start(DataValue.parse(DataValue.NUMBER, 10));
        labeler.angle(-30);
        labeler.anchor(Point.parse("1,1"));
        labeler.spacing(DataMeasure.parse("number", "10"));
        expect(labeler.serialize()).toEqual(xmlString);
    });

});
