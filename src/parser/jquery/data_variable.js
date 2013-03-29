window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.DataVariable[parse] = function (xml, data) {
            var variable,
                DataValue = window.multigraph.core.DataValue,
                attr;

            if (xml && xml.attr("id")) {
                variable = new ns.core.DataVariable(xml.attr("id"));
                attr = xml.attr("column");
                if (attr !== undefined) {
                    variable.column(parseInt(attr, 10));
                }
                attr = xml.attr("type");
                if (attr !== undefined) {
                    variable.type(DataValue.parseType(attr));
                }
                attr = xml.attr("missingvalue");
                if (attr !== undefined) {
                    variable.missingvalue(DataValue.parse(variable.type(), attr));
                }
                attr = xml.attr("missingop");
                if (attr !== undefined) {
                    variable.missingop(DataValue.parseComparator(attr));
                }
            }
            return variable;
        };
        
    });

});
