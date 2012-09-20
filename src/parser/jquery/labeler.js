window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse, serialize) {

        
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
                if (spacing === null) {
                    // skip spacing attribute completely
                } else {
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
            }
            return labeler;
        };

/*
        ns.core.Labeler[parse] = function (xml, axis, labels) {
            var labeler;
            if (xml && xml.attr("spacing") !== undefined) {
                labeler = new ns.core.Labeler(axis);
                labeler.spacing(xml.attr("spacing"));
                if (xml.attr("format") !== undefined) {
                    labeler.formatter(ns.core.DataFormatter.create(axis.type(), xml.attr("format")));
                } else if (labels !== undefined) {
                    labeler.formatter(labels.formatter());
                }
                if (xml.attr("start") !== undefined) {
                    labeler.start(ns.core.DataValue.parse(axis.type(), xml.attr("start")));
                } else if (labels !== undefined) {
                    labeler.start(labels.start());
                }
                if (xml.attr("angle") !== undefined) {
                    labeler.angle(parseFloat(xml.attr("angle")));
                } else if (labels !== undefined) {
                    labeler.angle(labels.angle());
                }
                if (xml.attr("position") !== undefined) { 
                    labeler.position(ns.math.Point.parse(xml.attr("position")));
                } else if (labels !== undefined) {
                    labeler.position(labels.position());
                }
                if (xml.attr("anchor") !== undefined) {
                    labeler.anchor(ns.math.Point.parse(xml.attr("anchor")));
                } else if (labels !== undefined) {
                    labeler.anchor(labels.anchor());
                }
                if (xml.attr("densityfactor") !== undefined) {
                    labeler.densityfactor(parseFloat(xml.attr("densityfactor")));
                } else if (labels !== undefined) {
                    labeler.densityfactor(labels.densityfactor());
                }
            }
            return labeler;
        };
*/
        
        ns.core.Labeler.prototype[serialize] = function (spacing, tag) {
            // This serializer takes a single optional argument which is a value to output for the "spacing"
            // attribute.  If that argument is missing, the labeler's own spacing value is used.  This seemingly
            // weird API is in support of the ability to collapse multiple <label> tags into a single one,
            // with spacings separated by spaces.  The idea is that whoever calls this serialize method will
            // figure out if it has multiple Labelers are the same except for spacing, and if so, it will
            // serialize only one of them, passing in a space-separated string of the spacings for the "spacing"
            // argument.
            //
            // It also takes a second optional argument which is the tag string to use; the default is "label".
            if (tag === undefined) {
                tag = 'label';
            }

            var attributeStrings = [],
                output = '<'+tag+' ';

            if (spacing === undefined) {
                spacing = this.spacing();
            }

            if (this.start() !== undefined)          { attributeStrings.push('start="'           + this.start()                       + '"'); }
            if (this.angle() !== undefined)          { attributeStrings.push('angle="'           + this.angle()                       + '"'); }
            if (this.formatter() !== undefined)      { attributeStrings.push('format="'          + this.formatter().getFormatString() + '"'); }
            if (this.anchor() !== undefined)         { attributeStrings.push('anchor="'          + this.anchor().serialize()          + '"'); }
            if (this.position() !== undefined)        { attributeStrings.push('position="'        + this.position().serialize()        + '"'); }
            if (spacing !== undefined)               { attributeStrings.push('spacing="'         + spacing                            + '"'); }
            if (this.densityfactor() !== undefined)  { attributeStrings.push('densityfactor="'   + this.densityfactor()               + '"'); }

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
