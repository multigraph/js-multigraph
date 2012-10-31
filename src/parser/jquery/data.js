window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var DataVariable = window.multigraph.core.DataVariable,
        NumberValue  = window.multigraph.core.NumberValue,
        ArrayData  = window.multigraph.core.ArrayData,
        CSVData  = window.multigraph.core.CSVData,
        WebServiceData  = window.multigraph.core.WebServiceData,
        Data = window.multigraph.core.Data;

    ns.mixin.add(function (ns, parse, serialize) {
        
        Data[parse] = function (xml) {

            var variables_xml,
                defaultMissingvalueString,
                defaultMissingopString,
                dataVariables,
                data = {};

            if (xml) {

                // parse the <variables> section
                variables_xml = xml.find("variables");
                defaultMissingvalueString = variables_xml.attr("missingvalue");
                defaultMissingopString = variables_xml.attr("missingop");

                if (variables_xml.find(">variable").length > 0) {
                    dataVariables = [];
                    window.multigraph.jQuery.each(variables_xml.find(">variable"), function (i, e) {
                        dataVariables.push( ns.core.DataVariable[parse](window.multigraph.jQuery(e)) );
                    });
                }

                // if we have a <values> section, parse it and return an ArrayData instance:
                var values_xml = window.multigraph.jQuery(xml.find(">values"));
                if (values_xml.length > 0) {
                    values_xml = values_xml[0];
                    var stringValues = ArrayData.textToStringArray(window.multigraph.jQuery(values_xml).text());
                    var values = new ArrayData(dataVariables, stringValues);
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
                    data = new CSVData(dataVariables, filename);
                }

                // if we have a <service> section, parse it and return a WebServiceData instance:
                var service_xml = window.multigraph.jQuery(xml.find(">service"));
                if (service_xml.length > 0) {
                    service_xml = service_xml[0];
                    var location = window.multigraph.jQuery(service_xml).attr("location");
                    data = new WebServiceData(dataVariables, location);
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
        
        Data.prototype[serialize] = function () {
            var output = '<data>',
                i;

            // serialize the <variables> section
            output += '<variables>';
            for (i=0; i<this.columns().size(); ++i) {
                output += this.columns().at(i).serialize();
            }
            output += '</variables>';

            // serialize the rest...
            output += this[serialize+"Contents"]();

            output += '</data>';
            return output;
        };

    });
});
