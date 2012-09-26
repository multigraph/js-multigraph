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
                values_xml,
                default_missingvalue_string,
                default_missingop_string,
                dataVariables = [],
                data = { 'dummy' : 'foo' };

            if (xml) {

                // parse the <variables> section
                variables_xml = xml.find("variables");
                default_missingvalue_string = variables_xml.attr("missingvalue");
                default_missingop_string = variables_xml.attr("missingop");

                if (variables_xml.find(">variable").length > 0) {
                    $.each(variables_xml.find(">variable"), function (i,e) {
                        dataVariables.push( ns.core.DataVariable[parse]($(e)) );
                    });
                }

                // if we have a <values> section, parse it and return an ArrayData instance:
                values_xml = $(xml.find(">values"));
                if (values_xml.length > 0 && dataVariables) {
                    values_xml = values_xml[0];
                    var dataValues = ArrayData.textToDataValuesArray(dataVariables, $(values_xml).text());
                    return new ArrayData(dataVariables, dataValues);
                }

                // if we have a <csv> section, parse it and return a CSVData instance:
                var csv_xml = $(xml.find(">csv"));
                if (csv_xml.length > 0 && dataVariables) {
                    csv_xml = csv_xml[0];
                    var filename = $(csv_xml).attr("location");
                    return new CSVData(dataVariables, filename);
                }

                // if we have a <service> section, parse it and return a WebServiceData instance:
                var service_xml = $(xml.find(">service"));
                if (service_xml.length > 0 && dataVariables) {
                    service_xml = service_xml[0];
                    var location = $(service_xml).attr("location");
                    var wsd = new WebServiceData(dataVariables, location);
                    var format = $(service_xml).attr("format");
                    if (format) {
                        wsd.format(format);
                    }
                    return wsd;
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
