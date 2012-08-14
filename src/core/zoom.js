window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.horizontalaxis.zoom),
        Zoom = new window.jermaine.Model( "Zoom", function () {

	    //TODO: change "allowed" attribute to be a Boolean value (true/false).
	    //      It should parse/serialize as "yes"/"no", but those strings should
	    //      be translated to Boolean true/false values.
            this.hasA("allowed").which.validatesWith(function (allowed) {
		return allowed === "yes" || allowed === "no";
            });
	    //TODO: change "min" attribute to be a DataMeasure instance.  The
	    //      parse method for the Zoom model will need to be modified
	    //      to take a DataValue.TYPE argument that can be used to
	    //      parse a string value, e.g:
            //        ns.core.Zoom[parse] = function (xml,type) {
            //            var zoom = new ns.core.Zoom();
            //            if (xml) {
            //                ...
	    //                if (xml.attr("min")) {
            //                    zoom.min(DataMeasure.parse(type,xml.attr("min")));
	    //                }
	    //                ...
	    //            }
	    //        }
            this.hasA("min").which.validatesWith(function (min) {
		return typeof(min) === "string";
            });
	    //TODO: change "max" attribute to be a DataMeasure instance; same
	    //      comments as for "min" attribute parsing above apply here too.
            this.hasA("max").which.validatesWith(function (max) {
		return typeof(max) === "string";
            });
	    //TODO: change "anchor" attribute to be a DataValue instance; same
	    //      comments as for "min"/"max" attribute parsing above apply
	    //      here too, except that "anchor" is a DataValue, whereas
	    //      "min" and "max" are both DataMeasures.  (DataValue and DataMeasure
	    //      both have parse methods that take a type as the 1st argument.)
            this.hasA("anchor").which.validatesWith(function (anchor) {
		return typeof(anchor) === "string";
            });

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.zoom, attributes);
	});

    ns.Zoom = Zoom;

});
