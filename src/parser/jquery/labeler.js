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
            var labeler;
            if (xml) {
                labeler = new ns.core.Labeler(axis);
                if (spacing !== null) {
                    if (spacing === undefined) {
                        spacing = xml.attr("spacing");
                    }
                    //NOTE: spacing might still === undefined at this point
                    if (spacing !== undefined) {
                        labeler.spacing(ns.core.DataMeasure.parse(axis.type(), spacing));
                    } else if (defaults !== undefined) {
                        labeler.spacing(defaults.spacing());
                    }
                }
                if (xml.attr("format") !== undefined) {
                    labeler.formatter(ns.core.DataFormatter.create(axis.type(), xml.attr("format")));
                } else if (defaults !== undefined) {
                    labeler.formatter(defaults.formatter());
                }
                if (xml.attr("start") !== undefined) {
                    labeler.start(ns.core.DataValue.parse(axis.type(), xml.attr("start")));
                } else if (defaults !== undefined) {
                    labeler.start(defaults.start());
                }
                if (xml.attr("angle") !== undefined) {
                    labeler.angle(parseFloat(xml.attr("angle")));
                } else if (defaults !== undefined) {
                    labeler.angle(defaults.angle());
                }
                if (xml.attr("position") !== undefined) { 
                    labeler.position(ns.math.Point.parse(xml.attr("position")));
                } else if (defaults !== undefined) {
                    labeler.position(defaults.position());
                }
                if (xml.attr("anchor") !== undefined) {
                    labeler.anchor(ns.math.Point.parse(xml.attr("anchor")));
                } else if (defaults !== undefined) {
                    labeler.anchor(defaults.anchor());
                }
                if (xml.attr("densityfactor") !== undefined) {
                    labeler.densityfactor(parseFloat(xml.attr("densityfactor")));
                } else if (defaults !== undefined) {
                    labeler.densityfactor(defaults.densityfactor());
                }

                if (xml.attr("color") !== undefined) {
                    labeler.color(window.multigraph.math.RGBColor.parse(xml.attr("color")));
                } else if (defaults !== undefined) {
                    labeler.color(defaults.color());
                }
            }
            return labeler;
        };

    });

});
