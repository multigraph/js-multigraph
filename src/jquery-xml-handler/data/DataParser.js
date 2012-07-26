if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var DataVariable = window.multigraph.Data.Variables.DataVariable;

    var children = ["variables", "values", "csv", "service"];

    ns.jQueryXMLMixin.add(function(ns, parse, serialize) {
        
        ns.Data[parse] = function (xml) {
            var data = new ns.Data(),
                childModelNames = ["Variables", "Values", "CSV", "Service"],
                i;

            if (xml) {
                
                var variables = $(xml.find(">variables")[0]);
                if (variables) {
                    var variable_array = variables.find(">variable");
                    for (i=0; i<variable_array.length; ++i) {
                        var variable     = $(variable_array[i]);
                        var id           = variable.attr("id");
                        var column       = parseInt(variable.attr("column"), 10);
                        var type         = variable.attr("type");
                        var missingvalue = variable.attr("missingvalue");
                        var missingop    = variable.attr("missingop");
                        var dataDataVariable = new DataVariable(id, column, type);
                    }
                }




                for (i = 0; i < children.length; i++) {
                    if (xml.find(children[i]).length > 0) {
                        data[children[i]](ns.Data[childModelNames[i]][parse](xml.find(children[i])));
                    }
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
