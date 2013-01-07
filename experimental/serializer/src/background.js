window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, serialize) {

        ns.core.Background.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<background ';

            if (this.color() !== undefined) {
                attributeStrings.push('color="' + this.color().getHexString() + '"');
            }

            output += attributeStrings.join(' ');
            if (this.img()) {
                output += '>' + this.img()[serialize]() + '</background>';
            } else {
                output += '/>';
            }
            return output;
        };

    });
});
