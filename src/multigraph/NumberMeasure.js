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
        var f,
            n,
            a = alignment.value,
            v = value.value;

        if (v >= a) {
            f = (v - a) / this.measure;
            n = Math.floor(f);
            if (n === f) {
                return new ns.Numbervalue(v);
            } else {
                return new ns.NumberValue(a + (n + 1) * this.measure);
            }
        } else {
            f = (a - v) / this.measure;
            n = Math.floor(f);
            if (n === f) {
                return new ns.NumberValue(v);
            } else {
                return new ns.NumberValue(a - n * this.measure);
            }
        }
    };

    NumberMeasure.parse = function(s) {
        return new NumberMeasure(parseFloat(s));
    }

    ns.NumberMeasure = NumberMeasure;

}(window.multigraph));
