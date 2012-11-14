window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var ArrayData  = window.multigraph.core.ArrayData;

    ns.mixin.add(function (ns, serialize) {
        
        ArrayData.prototype[serialize+'Contents'] = function () {
            var output = '<values>',
                i, j,
                array = this.array(),
                row;

            for (i=0; i<array.length; ++i) {
                if (i>0) {
                    output += '\n';
                }
                row = array[i];
                for (j=0; j<row.length; ++j) {
                    if (j > 0) {
                        output += ',';
                    }
                    output += row[j].toString();
                }
            }
            output += '</values>';
            return output;
        };

    });
});
