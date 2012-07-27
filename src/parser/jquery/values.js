window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.Values[parse] = function (xml) {
            var values = new ns.core.Values();
            if (xml) {
                values.content(xml.text());
            }
            return values;
        };
        
        ns.core.Values.prototype[serialize] = function () {
            var output = '<values';

            if (this.content() !== undefined && this.content() !== '') {
                output += '>' + this.content() + '</values>';
            } else {
                output += '/>';
            }

            return output;
        };

    });
});
