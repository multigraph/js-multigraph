window.multigraph.util.namespace("window.multigraph.valuetype", function (ns) {
    "use strict";

    ns.mixinComparators = function(obj) {
        obj.lt = function(x) {
            return this.compareTo(x) < 0;
        };
        obj.le = function(x) {
            return this.compareTo(x) <= 0;
        };
        obj.eq = function(x) {
            return this.compareTo(x) === 0;
        };
        obj.ge = function(x) {
            return this.compareTo(x) >= 0;
        };
        obj.gt = function(x) {
            return this.compareTo(x) > 0;
        };
    };
});
