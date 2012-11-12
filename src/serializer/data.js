window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var Data = window.multigraph.core.Data;

    ns.mixin.add(function (ns, serialize) {

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
