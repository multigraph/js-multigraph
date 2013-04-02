window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Labeler[parse] = function (xml, axis, defaults, spacing) {
            // This parser takes an optional final argument, spacing, which is a string representing
            // the spacing to be parsed for the labeler.  If that argument is not present, the spacing
            // value is taken from the xml object.  If a spacing argument is present, it is parsed
            // and used to set the spacing attribute of the Labeler object, and in this case, any
            // spacing value present in the xml is ignored.
            //
            // If the spacing argument has the value null, the resulting labeler will have no spacing
            // attribute set at all.
            var labeler,
                math = ns.math,
                utilityFunctions = ns.utilityFunctions,
                parsePoint = math.Point.parse;

            // `parseAttribute` returns true or false depending on whether or not it set the attribute.
            // If it did not and if the `defaults` object exists then the attribute is set to the
            // appropriate default value.
            var parseLabelerAttribute = function (value, attribute, preprocessor, defaultName) {
                if (!utilityFunctions.parseAttribute(value, attribute, preprocessor) && defaults !== undefined) {
                    attribute(defaults[defaultName]());
                }
            };
            var parseDataFormatter = function (type) {
                return function (value) {
                    return window.multigraph.core.DataFormatter.create(type, value);
                };
            };

            if (xml) {
                labeler = new ns.core.Labeler(axis);
                if (spacing !== null) {
                    if (spacing === undefined) {
                        spacing = xml.attr("spacing");
                    }
                    //NOTE: spacing might still === undefined at this point
                    parseLabelerAttribute(spacing, labeler.spacing, utilityFunctions.parseDataMeasure(axis.type()), "spacing");
                }
                parseLabelerAttribute(xml.attr("format"),        labeler.formatter,     parseDataFormatter(axis.type()),              "formatter");
                parseLabelerAttribute(xml.attr("start"),         labeler.start,         utilityFunctions.parseDataValue(axis.type()), "start");
                parseLabelerAttribute(xml.attr("angle"),         labeler.angle,         parseFloat,                                   "angle");
                parseLabelerAttribute(xml.attr("position"),      labeler.position,      parsePoint,                                   "position");
                parseLabelerAttribute(xml.attr("anchor"),        labeler.anchor,        parsePoint,                                   "anchor");
                parseLabelerAttribute(xml.attr("densityfactor"), labeler.densityfactor, parseFloat,                                   "densityfactor");
                parseLabelerAttribute(xml.attr("color"),         labeler.color,         math.RGBColor.parse,                          "color");
            }
            return labeler;
        };

    });

});
