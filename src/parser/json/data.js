// This file uses jQuery.  A valid jQuery object must be passed to the
// function returned by requiring this file.
module.exports = function($) {
    var Data = require('../../core/data.js');

    // if parseXML method already has been defined, which would be the case if this
    // function was previously called, just return immediately
    if (typeof(Data.parseJSON)==="function") { return Data; };

    // "data" : {
    //   "adapter"      : STRING,
    //   "missingvalue" : "DATAVALUE",
    //   "missingop"    : "COMPARATOR">,
    //   "variables" : [
    //         { "id" : STRING!, "column" : INTEGER, "type" : DATATYPE(number), "missingvalue" : STRING, "missingop" : COMPARATOR }
    //         { "id" : STRING!, "column" : INTEGER, "type" : DATATYPE(number), "missingvalue" : STRING, "missingop" : COMPARATOR }
    //         ...
    //   ],
    //   "repeat" : { "period" : STRING },
    //   "repeat" : STRING,
    //   "values" : [
    //      [ 3.2, 1.4, ...],
    //      [ 5.1, 7.8, ...],
    //      ...
    //   ],
    //   "csv" : STRING,
    //   "csv" : { "location" : STRING },
    //   "service" : STRING,
    //   "service" : {
    //       "location" : STRING!
    //       "format"   : STRING
    //   }
    // }
    Data.parseJSON = function (json, multigraph, messageHandler) {
        var ArrayData = require('../../core/array_data.js'),
            DataVariable = require('../../core/data_variable.js'),
            DataMeasure = require('../../core/data_measure.js'),
            PeriodicArrayData = require('../../core/periodic_array_data.js'),
            CSVData = require('../../core/csv_data.js')($),
            WebServiceData = require('../../core/web_service_data.js')($),
            Multigraph = require('../../core/multigraph.js')($),
            pF = require('../../util/parsingFunctions.js'),
            vF = require('../../util/validationFunctions.js'),
            defaultMissingvalueString,
            defaultMissingopString,
            dataVariables = [],
            data,
            adap, adapter = ArrayData;

        require('./data_variable.js'); // so that DataVariable.parseJSON method is defined when needed below

        if (json) {

            adap = json.adapter;
            if (adap !== undefined && adap !== "") {
                adapter = Multigraph.getDataAdapter(adap);
                if (adapter === undefined) {
                    throw new Error("Missing data adapater: " + adap);
                }
            }

            defaultMissingvalueString = String(json.missingvalue);
            defaultMissingopString    = json.missingop;

            if (json.variables) {
                json.variables.forEach(function(variable) {
                    dataVariables.push(DataVariable.parseJSON(variable));
                });
            }

            // check to see if we have a <repeat> section, and if so, grab the period from it
            var haveRepeat = false,
                period;
            if ("repeat" in json) {
                var periodProp = (vF.typeOf(json.repeat) === 'object') ? json.repeat.period : json.repeat;
                if (periodProp === undefined || periodProp === "") {
                    messageHandler.warning("repeat requires a period; data treated as non-repeating");
                } else {
                    period = DataMeasure.parse(dataVariables[0].type(), periodProp);
                    haveRepeat = true;
                }
            }

            // if we have a <values> section, parse it and return an ArrayData instance:
            if (json.values) {
                // Note this does not use the data adapter -- not supported for inline json data
                var stringValues = json.values;
                if (haveRepeat) {
                    data = new PeriodicArrayData(dataVariables, stringValues, period);
                } else {
                    data = new ArrayData(dataVariables, stringValues);
                }
            }

            // if we have a <csv> section, parse it and return a CSVData instance:
            if (json.csv) {
                var filename = (vF.typeOf(json.csv) === 'object') ? json.csv.location : json.csv;
                data = new CSVData(dataVariables,
                                   multigraph ? multigraph.rebaseUrl(filename) : filename,
                                   messageHandler,
                                   multigraph ? multigraph.getAjaxThrottle(filename) : undefined);
            }

            // if we have a <service> section, parse it and return a WebServiceData instance:
            if (json.service) {
                var location = (vF.typeOf(json.service) === 'object') ? json.service.location : json.service;
                data = new WebServiceData(dataVariables,
                                          multigraph ? multigraph.rebaseUrl(location) : location,
                                          messageHandler,
                                          multigraph ? multigraph.getAjaxThrottle(location) : undefined);
                if (vF.typeOf(json.service) === 'object' && ("format" in json.service)) {
                    data.format(json.service.format);
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


