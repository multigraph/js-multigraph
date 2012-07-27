if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var DataVariable = window.multigraph.Data.Variables.DataVariable;
    var NumberValue  = window.multigraph.NumberValue;
    var ArrayData  = window.multigraph.ArrayData;

    var children = ["variables", "values", "csv", "service"];

    ns.jQueryXMLMixin.add(function(ns, parse, serialize) {
        
        ns.Data[parse] = function (xml) {
            var data = new ns.Data(),
                childModelNames = ["Variables", "Values", "CSV", "Service"],
                i;

            if (xml) {

                for (i = 0; i < children.length; i++) {
                    if (xml.find(children[i]).length > 0) {
                        data[children[i]](ns.Data[childModelNames[i]][parse](xml.find(children[i])));
                    }
                }

                /**
                 ** !!! TEMPORARY HACK !!!
                 **
                 ** Until we completely merge ArrayData, if this <data> section includes a <values> tag,
                 ** and if it includes a <variables> tag, use the temporary "arraydata" attribute to store
                 ** a reference to an ArrayData object.
                 **/

                var values = $(xml.find(">values"));
                if (values.length > 0 && data.variables()) {
                    values = values[0];

                    var dataVariables = [];
                    for (i=0; i<data.variables().variable().size(); ++i) {
                        dataVariables.push(data.variables().variable().at(i));
                    }

                    var dataValues = [];
                    var lines = $(values).text().split("\n");
                    for (i=0; i<lines.length; ++i) {
                        var valuesThisRow = lines[i].split(/\s*,\s*/);
                        var dataValuesThisRow = [];
                        var j;
                        for (j=0; j<valuesThisRow.length; ++j) {
                            dataValuesThisRow.push( NumberValue.parse(valuesThisRow[j]) );
                        }
                        dataValues.push( dataValuesThisRow );
                    }

                    var ad = new ArrayData(dataVariables, dataValues);
                    data.arraydata(ad);

                /**
                 ** END OF TEMPORARY HACK
                 **/

                }


            }
            return data;
        };
        
        ns.Data.prototype[serialize] = function () {
            var childStrings = [],
                output = '<data',
                i;

            childStrings = ns.utilityFunctions.serializeChildModels(this, children, childStrings, serialize);
/*
            for (i = 0; i < children.length; i++) {
                if (this[children[i]]()) {
                    childStrings.push(this[children[i]]()[serialize]());
                }
            }
*/

            if (childStrings.length > 0) {
                output += '>' + childStrings.join('') + '</data>';
            } else {
                output += '/>';
            }

            return output;
        };

    });
}(window.multigraph));
