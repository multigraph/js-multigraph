window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var CSVData  = window.multigraph.core.CSVData;

    ns.mixin.add(function (ns, serialize) {
        
        CSVData.prototype[serialize+'Contents'] = function () {
            var output = '<csv location="';
            output += this.filename();
            output += '"/>';
            return output;
        };

    });
});
