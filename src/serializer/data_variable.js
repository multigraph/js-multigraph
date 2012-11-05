window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var DataValue = window.multigraph.core.DataValue;

    ns.mixin.add(function (ns, serialize) {
        
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
