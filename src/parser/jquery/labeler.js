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
                core  = ns.core,
                math  = ns.math,
                Point = math.Point,
                attr;
            if (xml) {
                labeler = new core.Labeler(axis);
                if (spacing !== null) {
                    if (spacing === undefined) {
                        spacing = xml.attr("spacing");
                    }
                    //NOTE: spacing might still === undefined at this point
                    if (spacing !== undefined) {
                        labeler.spacing(core.DataMeasure.parse(axis.type(), spacing));
                    } else if (defaults !== undefined) {
                        labeler.spacing(defaults.spacing());
                    }
                }
                attr = xml.attr("format");
                if (attr !== undefined) {
                    labeler.formatter(core.DataFormatter.create(axis.type(), attr));
                } else if (defaults !== undefined) {
                    labeler.formatter(defaults.formatter());
                }
                attr = xml.attr("start");
                if (attr !== undefined) {
                    labeler.start(core.DataValue.parse(axis.type(), attr));
                } else if (defaults !== undefined) {
                    labeler.start(defaults.start());
                }
                attr = xml.attr("angle");
                if (attr !== undefined) {
                    labeler.angle(parseFloat(attr));
                } else if (defaults !== undefined) {
                    labeler.angle(defaults.angle());
                }
                attr = xml.attr("position");
                if (attr !== undefined) { 
                    labeler.position(Point.parse(attr));
                } else if (defaults !== undefined) {
                    labeler.position(defaults.position());
                }
                attr = xml.attr("anchor");
                if (attr !== undefined) {
                    labeler.anchor(Point.parse(attr));
                } else if (defaults !== undefined) {
                    labeler.anchor(defaults.anchor());
                }
                attr = xml.attr("densityfactor");
                if (attr !== undefined) {
                    labeler.densityfactor(parseFloat(attr));
                } else if (defaults !== undefined) {
                    labeler.densityfactor(defaults.densityfactor());
                }

                attr = xml.attr("color");
                if (attr !== undefined) {
                    labeler.color(math.RGBColor.parse(attr));
                } else if (defaults !== undefined) {
                    labeler.color(defaults.color());
                }
            }
            return labeler;
        };

    });

});
