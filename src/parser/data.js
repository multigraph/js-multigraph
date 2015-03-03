// This file uses jQuery.  A valid jQuery object must be passed to the
// function returned by requiring this file.
module.exports = function($) {
    var Data = require('../core/data.js');

    Data.parseXML = function (xml, multigraph, messageHandler) {
        var ArrayData = require('../core/array_data.js'),
            DataVariable = require('../core/data_variable.js'),
            DataMeasure = require('../core/data_measure.js'),
            PeriodicArrayData = require('../core/periodic_array_data.js'),
            CSVData = require('../core/csv_data.js'),
            WebServiceData = require('../core/web_service_data.js'),
            variables_xml,
            defaultMissingvalueString,
            defaultMissingopString,
            dataVariables = [],
            data,
            adap, adapter = ArrayData;

        if (xml) {

            adap = $(xml).attr("adapter");
            if (adap !== undefined && adap !== "") {
                adapter = window.multigraph.adapters[adap]; // Multigraph.adapters()
                if (adapter === undefined) {
                    throw new Error("Missing data adapater: " + adapter);
                }
            }

            // parse the <variables> section
            variables_xml = xml.find("variables");
            defaultMissingvalueString = variables_xml.attr("missingvalue");
            defaultMissingopString    = variables_xml.attr("missingop");

            var variables = variables_xml.find(">variable");
            if (variables.length > 0) {
                $.each(variables, function (i, e) {
                    dataVariables.push( DataVariable.parseXML($(e)) );
                });
            }

            // check to see if we have a <repeat> section, and if so, grab the period from it
            var haveRepeat = false,
                period,
                repeat_xml = $(xml.find(">repeat"));
            if (repeat_xml.length > 0) {
                var periodString = $(repeat_xml).attr("period");
                if (periodString === undefined || periodString === "") {
                    messageHandler.warning("<repeat> tag requires a 'period' attribute; data treated as non-repeating");
                } else {
                    period = DataMeasure.parse(dataVariables[0].type(),
                                               periodString);
                    haveRepeat = true;
                }
            }

            // if we have a <values> section, parse it and return an ArrayData instance:
            var values_xml = $(xml.find(">values"));
            if (values_xml.length > 0) {
                values_xml = values_xml[0];
                var stringValues = adapter.textToStringArray(dataVariables, $(values_xml).text());
                if (haveRepeat) {
                    data = new PeriodicArrayData(dataVariables, stringValues, period);
                } else {
                    data = new ArrayData(dataVariables, stringValues);
                }
            }

            // if we have a <csv> section, parse it and return a CSVData instance:
            var csv_xml = $(xml.find(">csv"));
            if (csv_xml.length > 0) {
                csv_xml = csv_xml[0];
                var filename = $(csv_xml).attr("location");
                data = new CSVData(dataVariables,
                                   multigraph ? multigraph.rebaseUrl(filename) : filename,
                                   messageHandler,
                                   multigraph ? multigraph.getAjaxThrottle(filename) : undefined);
            }

            // if we have a <service> section, parse it and return a WebServiceData instance:
            var service_xml = $(xml.find(">service"));
            if (service_xml.length > 0) {
                service_xml = $(service_xml[0]);
                var location = service_xml.attr("location");
                data = new WebServiceData(dataVariables,
                                          multigraph ? multigraph.rebaseUrl(location) : location,
                                          messageHandler,
                                          multigraph ? multigraph.getAjaxThrottle(location) : undefined);
                var format = service_xml.attr("format");
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
            data.adapter(adapter);
        }

        return data;
    };

    return Data;
};

