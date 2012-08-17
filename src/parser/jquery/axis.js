window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse, serialize) {


        var parseLabels = function (xml, axis) {
            var spacingStrings = [],
                labelers = axis.labelers(),
                i,
                j;
            if ($.trim(xml.find("labels").attr("spacing"))!=="") {
                spacingStrings = $.trim(xml.find("labels").attr("spacing")).split(/\s+/);
            }
            if (spacingStrings.length > 0) {
                // If there was a spacing attr on the <labels> tag, create a new labeler for
                // each spacing present in it, using the other values from the <labels> tag
                for (i=0; i<spacingStrings.length; ++i) {
                    //labelers.push(ns.core.Labeler[parse](xml.find("labels"), axis, undefined, spacingStrings[i]));
                    labelers.add(ns.core.Labeler[parse](xml.find("labels"), axis, undefined, spacingStrings[i]));
                }
            } else {
                // Otherwise, parse the <labels> tag to get default values
                var defaults = ns.core.Labeler[parse](xml.find("labels"), axis, undefined, null);
                // And loop over each <label> tag, creating labelers for each, splitting multiple
                // spacings on the same <label> tag into multiple labelers:
                $.each(xml.find("label"), function (j, e) {
                    spacingStrings = [];
                    if ($.trim($(e).attr("spacing"))!=="") {
                        spacingStrings = $.trim($(e).attr("spacing")).split(/\s+/);
                    }
                    for (i=0; i<spacingStrings.length; ++i) {
                        //labelers.push( ns.core.Labeler[parse]($(e), axis, defaults, spacingStrings[i]) );
                        labelers.add( ns.core.Labeler[parse]($(e), axis, defaults, spacingStrings[i]) );
                    }
                });
            }
        };

        
        ns.core.Axis[parse] = function (xml) {

	    var tagName = xml.prop("tagName"),
	        orientation = tagName.toLowerCase().replace("axis", ""),
                axis = new ns.core.Axis(orientation),
                i,
                j;

            if (xml) {

                axis.id(xml.attr("id"));
                if (xml.attr("type")) {
                    axis.type(ns.core.DataValue.parseType(xml.attr("type")));
                }
                axis.length(window.multigraph.math.Displacement.parse(xml.attr("length")));
                if (xml.attr("position")) {
                    axis.position(window.multigraph.math.Point.parse(xml.attr("position")));
                }
                axis.pregap(window.multigraph.utilityFunctions.parseDoubleOrUndefined(xml.attr("pregap")));
                axis.postgap(window.multigraph.utilityFunctions.parseDoubleOrUndefined(xml.attr("postgap")));
                if (xml.attr("anchor")) {
                    axis.anchor(parseFloat(xml.attr("anchor")));
                }
                if (xml.attr("base")) {
                    axis.base(window.multigraph.math.Point.parse(xml.attr("base")));
                }
		if (xml.attr("minposition") !== undefined) {
                    axis.minposition(window.multigraph.math.Displacement.parse(xml.attr("minposition")));
		}
		if (xml.attr("maxposition") !== undefined) {
                    axis.maxposition(window.multigraph.math.Displacement.parse(xml.attr("maxposition")));
		}
                axis.min(xml.attr("min"));
                if (axis.min() !== "auto") {
                    axis.dataMin(ns.core.DataValue.parse(axis.type(), axis.min()));
                }
                axis.minoffset(window.multigraph.utilityFunctions.parseDoubleOrUndefined(xml.attr("minoffset")));
                axis.max(xml.attr("max"));
                if (axis.max() !== "auto") {
                    axis.dataMax(ns.core.DataValue.parse(axis.type(), axis.max()));
                }
                axis.maxoffset(window.multigraph.utilityFunctions.parseDoubleOrUndefined(xml.attr("maxoffset")));
                axis.positionbase(xml.attr("positionbase"));
                axis.color(window.multigraph.math.RGBColor.parse(xml.attr("color")));
                axis.tickmin(window.multigraph.utilityFunctions.parseIntegerOrUndefined(xml.attr("tickmin")));
                axis.tickmax(window.multigraph.utilityFunctions.parseIntegerOrUndefined(xml.attr("tickmax")));
                axis.highlightstyle(xml.attr("highlightstyle"));
                axis.linewidth(window.multigraph.utilityFunctions.parseIntegerOrUndefined(xml.attr("linewidth")));

                if (xml.find("title").length > 0)        { axis.title(ns.core.AxisTitle[parse](xml.find("title")));                  }
                if (xml.find("grid").length > 0)         { axis.grid(ns.core.Grid[parse](xml.find("grid")));                         }
                if (xml.find("pan").length > 0)          { axis.pan(ns.core.Pan[parse](xml.find("pan"), axis.type()));               }
                if (xml.find("zoom").length > 0)         { axis.zoom(ns.core.Zoom[parse](xml.find("zoom"), axis.type()));            }
                if (xml.find("binding").length > 0)      { axis.binding(ns.core.Binding[parse](xml.find("binding")));                }
                if (xml.find("axiscontrols").length > 0) { axis.axiscontrols(ns.core.AxisControls[parse](xml.find("axiscontrols"))); }
                if (xml.find("labels").length > 0)       { parseLabels(xml, axis);                                                   }


            }
            return axis;
        };

        var serializeLabels = function (axis, serialize) {

            var labelers = axis.labelers(),
                nlabelers = axis.labelers().size();

            // if this axis has no labelers, output nothing
            if (nlabelers <= 0) { return ""; }

            // if all the Labelers are equal except for spacing, output a single <labels> tag
            var singleLabels = true;
            var i=1;
            var spacings = [ labelers.at(0).spacing() ];
            while (singleLabels && i<nlabelers) {
                spacings.push(labelers.at(i).spacing());
                singleLabels = labelers.at(0).isEqualExceptForSpacing(labelers.at(i));
                ++i;
            }
            if (singleLabels) {
                return labelers.at(0)[serialize](spacings.join(" "), "labels");
            }
            // otherwise, serialize each individual labeler as a <label> tag,
            // collapsing together consecutive ones that are equal except for
            // spacing:
            var labeltags = [];
            spacings = [];
            for (i=0; i<nlabelers; ++i) {
                // save the current spacing into the spacings array
                spacings.push(labelers.at(i).spacing().toString());
                if ((i>=nlabelers-1) || !labelers.at(i).isEqualExceptForSpacing(labelers.at(i+1))) {
                    // if this labeler's spacing is not the same as the next one in the list,
                    // output this abeler, with the current set of spacings, and reset the
                    // spacings array
                    labeltags.push( labelers.at(i).serialize( spacings.join(" ") ) );
                    spacings = [];
                }
            }
            return "<labels>" + labeltags.join("") + "</labels>";
        };
        
        ns.core.Axis.prototype[serialize] = function () {
            var attributeStrings = [],
                childStrings,
                output = '<' + this.orientation() + 'axis ';

            if (this.color() !== undefined)          { attributeStrings.push('color="'           + this.color().getHexString()     + '"'); }
            if (this.id() !== undefined)             { attributeStrings.push('id="'              + this.id()                       + '"'); }
            if (this.type() !== undefined)           { attributeStrings.push('type="'            + this.type()                     + '"'); }
            if (this.pregap() !== undefined)         { attributeStrings.push('pregap="'          + this.pregap()                   + '"'); }
            if (this.postgap() !== undefined)        { attributeStrings.push('postgap="'         + this.postgap()                  + '"'); }
            if (this.anchor() !== undefined)         { attributeStrings.push('anchor="'          + this.anchor()                   + '"'); }
            if (this.min() !== undefined)            { attributeStrings.push('min="'             + this.min()                      + '"'); }
            if (this.minoffset() !== undefined)      { attributeStrings.push('minoffset="'       + this.minoffset()                + '"'); }
            if (this.max() !== undefined)            { attributeStrings.push('max="'             + this.max()                      + '"'); }
            if (this.maxoffset() !== undefined)      { attributeStrings.push('maxoffset="'       + this.maxoffset()                + '"'); }
            if (this.positionbase() !== undefined)   { attributeStrings.push('positionbase="'    + this.positionbase()             + '"'); }
            if (this.tickmin() !== undefined)        { attributeStrings.push('tickmin="'         + this.tickmin()                  + '"'); }
            if (this.tickmax() !== undefined)        { attributeStrings.push('tickmax="'         + this.tickmax()                  + '"'); }
            if (this.highlightstyle() !== undefined) { attributeStrings.push('highlightstyle="'  + this.highlightstyle()           + '"'); }
            if (this.linewidth() !== undefined)      { attributeStrings.push('linewidth="'       + this.linewidth()                + '"'); }
            if (this.length() !== undefined)         { attributeStrings.push('length="'          + this.length().serialize()       + '"'); }
            if (this.position() !== undefined)       { attributeStrings.push('position="'        + this.position().serialize()     + '"'); }
            if (this.base() !== undefined)           { attributeStrings.push('base="'            + this.base().serialize()         + '"'); }
            if (this.minposition() !== undefined)    { attributeStrings.push('minposition="'     + this.minposition().serialize()  + '"'); }
            if (this.maxposition() !== undefined)    { attributeStrings.push('maxposition="'     + this.maxposition().serialize()  + '"'); }

            output += attributeStrings.join(' ');

            childStrings = [];
            if (this.title())             { childStrings.push(this.title()[serialize]());        }
            if (this.labelers().size()>0) { childStrings.push(serializeLabels(this, serialize)); }
            if (this.grid())              { childStrings.push(this.grid()[serialize]());         }
            if (this.pan())               { childStrings.push(this.pan()[serialize]());          }
            if (this.zoom())              { childStrings.push(this.zoom()[serialize]());         }
            if (this.binding())           { childStrings.push(this.binding()[serialize]());      }
            if (this.axiscontrols())      { childStrings.push(this.axiscontrols()[serialize]()); }


            if (childStrings.length > 0) {
                output += '>' + childStrings.join('') + '</' + this.orientation() + 'axis>';
            } else {
                output += '/>';
            }

            return output;
        };

    });
});
