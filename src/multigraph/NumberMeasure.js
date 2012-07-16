if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var NumberMeasure = function(measure) {
        this.measure = measure;
    };

    NumberMeasure.prototype.getRealValue = function() {
        return this.measure;
    };

    NumberMeasure.prototype.toString = function() {
        return this.measure.toString();
    };

    NumberMeasure.prototype.firstSpacingLocationAtOrAfter = function(value, alignment)  {
        // TODO: Not Yet Implemented
        return 0;
    };

    NumberMeasure.parse = function(s) {
        return new NumberMeasure(parseFloat(s));
    }

    ns.NumberMeasure = NumberMeasure;

}(window.multigraph));
