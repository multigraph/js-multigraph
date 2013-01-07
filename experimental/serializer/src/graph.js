window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, serialize) {

        ns.core.Graph.prototype[serialize] = function () {
            var xmlstring = '<graph>',
                i;
            if (this.window()) {
                xmlstring += this.window()[serialize]();
            }
            if (this.legend()) {
                xmlstring += this.legend()[serialize]();
            }
            if (this.background()) {
                xmlstring += this.background()[serialize]();
            }
            if (this.plotarea()) {
                xmlstring += this.plotarea()[serialize]();
            }
            if (this.title()) {
                xmlstring += this.title()[serialize]();
            }
            for (i = 0; i < this.axes().size(); ++i) {
                xmlstring += this.axes().at(i)[serialize]();
            }
            for (i = 0; i < this.plots().size(); ++i) {
                xmlstring += this.plots().at(i)[serialize]();
            }
            for (i = 0; i < this.data().size(); ++i) {
                xmlstring += this.data().at(i)[serialize]();
            }

            xmlstring += "</graph>";
            return xmlstring;
        };

    });

});

