if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Data) {
    window.multigraph.Data = {};
}

(function (ns) {
    "use strict";

    var DataValue = ns.DataValue;

    ns.jQueryXMLMixin.add(function (nsObj, parse, serialize) {
        
        nsObj.Data.Variables.Variable[parse] = function (xml) {
            var variable;
            if (xml && xml.attr("id")) {
                variable = new nsObj.Data.Variables.Variable(xml.attr("id"));
                if (xml.attr("column")) {
                    variable.column(parseInt(xml.attr("column"), 10));
                }
                if (xml.attr("type")) {
                    variable.type(DataValue.parseType(xml.attr("type")));
                }
                if (xml.attr("missingvalue")) {
                    var dv = DataValue.parse(variable.type(), xml.attr("missingvalue"));
                    variable.missingvalue(dv);
                }
                if (xml.attr("missingop")) {
                    variable.missingop(DataValue.parseComparator(xml.attr("missingop")));
                }
            }
            return variable;
        };
        
        nsObj.Data.Variables.Variable.prototype[serialize] = function () {
            var output = "<variable";

            output += ' id="' + this.id() + '"';
            output += ' column="' + this.column() + '"';
            output += ' type="' + DataValue.serializeType(this.type()) + '"';
            output += ' missingvalue="' + this.missingvalue().toString() + '"';
            output += ' missingop="' + this.missingop() + '"';
            output += '/>';

            return output;
        };

    });
}(window.multigraph));
