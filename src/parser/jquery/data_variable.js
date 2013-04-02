window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.DataVariable[parse] = function (xml, data) {
            var variable,
                utilityFunctions = ns.utilityFunctions,
                parseAttribute   = utilityFunctions.parseAttribute,
                DataValue        = ns.core.DataValue,
                attr;

            if (xml && xml.attr("id")) {
                variable = new ns.core.DataVariable(xml.attr("id"));
                parseAttribute(xml.attr("column"),       variable.column,       utilityFunctions.parseInteger);
                parseAttribute(xml.attr("type"),         variable.type,         DataValue.parseType);
                parseAttribute(xml.attr("missingvalue"), variable.missingvalue, utilityFunctions.parseDataValue(variable.type()));
                parseAttribute(xml.attr("missingop"),    variable.missingop,    DataValue.parseComparator);
            }
            return variable;
        };
        
    });

});
