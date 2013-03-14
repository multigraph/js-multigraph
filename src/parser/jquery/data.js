window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        window.multigraph.core.Data[parse] = function (xml, multigraph, messageHandler) {
            var ArrayData = window.multigraph.core.ArrayData,
                variables_xml,
                defaultMissingvalueString,
                defaultMissingopString,
                dataVariables = [],
                data = {},
                adap, adapter = ArrayData;

            if (xml) {

                adap = window.multigraph.jQuery(xml).attr("adapter");
                if (adap !== undefined && adap !== "") {
                    adapter = window.multigraph.adapters[adap];
                    if (adapter === undefined) {
                        throw new Error("Missing data adpater: " + adapter);
                    }
                }

                // parse the <variables> section
                variables_xml = xml.find("variables");
                defaultMissingvalueString = variables_xml.attr("missingvalue");
                defaultMissingopString = variables_xml.attr("missingop");

                if (variables_xml.find(">variable").length > 0) {
                    window.multigraph.jQuery.each(variables_xml.find(">variable"), function (i, e) {
                        dataVariables.push( ns.core.DataVariable[parse](window.multigraph.jQuery(e)) );
                    });
                }

                // check to see if we have a <repeat> section, and if so, grab the period from it
                var haveRepeat = false;
                var period;
                var repeat_xml = window.multigraph.jQuery(xml.find(">repeat"));
                if (repeat_xml.length > 0) {
                    var periodString = window.multigraph.jQuery(repeat_xml).attr("period");
                    if (periodString === undefined || periodString === "") {
                        messageHandler.warning("<repeat> tag requires a 'period' attribute; data treated as non-repeating");
                    } else {
                        period = window.multigraph.core.DataMeasure.parse(dataVariables[0].type(),
                                                                          periodString);
                        haveRepeat = true;
                    }
                }

                // if we have a <values> section, parse it and return an ArrayData instance:
                var values_xml = window.multigraph.jQuery(xml.find(">values"));
                if (values_xml.length > 0) {
                    values_xml = values_xml[0];
                    var stringValues = adapter.textToStringArray(dataVariables, window.multigraph.jQuery(values_xml).text());
                    var values;
                    if (haveRepeat) {
                        values = new window.multigraph.core.PeriodicArrayData(dataVariables, stringValues, period);
                    } else {
                        values = new ArrayData(dataVariables, stringValues);
                    }
                    if (data.defaultMissingvalueString !== undefined) {
                        values.defaultMissingvalue(data.defaultMissingvalueString);
                    }
                    if (data.defaultMissingopString !== undefined) {
                        values.defaultMissingop(xml.attr("missingop"));
                    }
                    return values;
                }

                // if we have a <csv> section, parse it and return a CSVData instance:
                var csv_xml = window.multigraph.jQuery(xml.find(">csv"));
                if (csv_xml.length > 0) {
                    csv_xml = csv_xml[0];
                    var filename = window.multigraph.jQuery(csv_xml).attr("location");
                    data = new window.multigraph.core.CSVData(dataVariables,
                                                              multigraph ? multigraph.rebaseUrl(filename) : filename,
                                                              messageHandler,
                                                              multigraph ? multigraph.getAjaxThrottle(filename) : undefined);
                }

                // if we have a <service> section, parse it and return a WebServiceData instance:
                var service_xml = window.multigraph.jQuery(xml.find(">service"));
                if (service_xml.length > 0) {
                    service_xml = service_xml[0];
                    var location = window.multigraph.jQuery(service_xml).attr("location");
                    data = new window.multigraph.core.WebServiceData(dataVariables,
                                                                     multigraph ? multigraph.rebaseUrl(location) : location,
                                                                     messageHandler,
                                                                     multigraph ? multigraph.getAjaxThrottle(location) : undefined);
                    var format = window.multigraph.jQuery(service_xml).attr("format");
                    if (format) {
                        data.format(format);
                    }
                }
            }

            if (data) {
                if (defaultMissingvalueString !== undefined) {
                    data.defaultMissingvalue(defaultMissingvalueString);
                }
                if (defaultMissingopString !== undefined) {
                    data.defaultMissingop(defaultMissingopString);
                }
            }

            return data;
        };
        
    });

});
