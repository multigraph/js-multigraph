window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var DataValue = window.multigraph.core.DataValue;

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.DataVariable[parse] = function (xml, data) {
            var variable;
            if (xml && xml.attr("id")) {
                variable = new ns.core.DataVariable(xml.attr("id"));
                if (xml.attr("column")) {
                    variable.column(parseInt(xml.attr("column"), 10));
                }
                if (xml.attr("type")) {
                    variable.type(DataValue.parseType(xml.attr("type")));
                }
                if (xml.attr("missingvalue")) {
                    variable.missingvalue(DataValue.parse(variable.type(), xml.attr("missingvalue")));
                }
                if (xml.attr("missingop")) {
                    variable.missingop(DataValue.parseComparator(xml.attr("missingop")));
                }
            }
            return variable;
        };
        
        ns.core.DataVariable.prototype[serialize] = function () {
            var output = '<variable';

            output += ' id="' + this.id() + '"';
            output += ' column="' + this.column() + '"';
            output += ' type="' + DataValue.serializeType(this.type()) + '"';
            if (this.missingvalue() !== null && this.missingvalue() !== undefined) {
                output += ' missingvalue="' + this.missingvalue().toString() + '"';
            }
            if (this.missingop() !== null && this.missingop() !== undefined) {
                output += ' missingop="' + this.missingop() + '"';
            }
            output += '/>';

            return output;
        };

    });
});
