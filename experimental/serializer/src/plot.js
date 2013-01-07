window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, serialize) {


        ns.core.Plot.prototype[serialize] = function () {
            var output = '<plot>',
                axisHasContent,
                i;

            if (this.horizontalaxis() || (this.variable().size() > 0 && this.variable().at(0) !== null && this.variable().size() !==1)) {
                output += '<horizontalaxis';
                if (this.horizontalaxis() && this.horizontalaxis().id()) {
                    output += ' ref="' + this.horizontalaxis().id() + '"';
                }
                if (this.variable().size() > 0 && this.variable().at(0) !== null) {
                    output += '><variable ref="' + this.variable().at(0).id() + '"/></horizontalaxis>';
                } else {
                    output += '/>';
                }
            }

            if (this.verticalaxis() || this.variable().size() > 1) {
                output += '<verticalaxis';
                if (this.verticalaxis() && this.verticalaxis().id()) {
                    output += ' ref="' + this.verticalaxis().id() + '"';
                }
                axisHasContent = false;
                if (this instanceof ns.core.ConstantPlot) {
                    output += '><constant value="' + this.constantValue().toString() + '"/>';
                    axisHasContent = true;
                } else {
                    if (this.variable().size() > 1) {
                        output += '>';
                        for (i = 1; i < this.variable().size(); i++) {
                            output += '<variable ref="' + this.variable().at(i).id() + '"/>';
                        }
                        axisHasContent = true;
                    }
                }
                if (axisHasContent) {
                    output += '</verticalaxis>';
                } else {
                    output += '/>';
                }
            }

            if (this.legend()) {
                output += this.legend()[serialize]();
            }
            if (this.renderer()) {
                output += this.renderer()[serialize]();
            }
            if (this.filter()) {
                output += this.filter()[serialize]();
            }
            if (this.datatips()) {
                output += this.datatips()[serialize]();
            }

            output += '</plot>';

            return output;
        };

    });
});
