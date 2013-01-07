window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, serialize) {

        ns.core.Multigraph.prototype[serialize] = function () {
            var output = '<mugl>',
                i;

            for (i = 0; i < this.graphs().size(); ++i) {
                output += this.graphs().at(i)[serialize]();
            }

            output += '</mugl>';

            if (this.graphs().size() === 1) {
                output = output.replace('<mugl><graph>', '<mugl>');
                output = output.replace('</graph></mugl>', '</mugl>');
            }

            return output;
        };

    });

});

