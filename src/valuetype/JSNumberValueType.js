// This file defines a plain Javascript object called JSNumberValueType that has a single
// number type property called 'value', a getRealValue() method that returns that value,
// and a compareTo() method for comparing two JSNumberValueType instances.
window.multigraph.util.namespace("window.multigraph.valuetype", function (ns) {
    "use strict";

    var JSNumberValueType = function(value) {
        this.value = value;
    };
    
    JSNumberValueType.prototype.getRealValue = function() {
        return this.value;
    };

    JSNumberValueType.prototype.compareTo = function(x) {
        if (this.value < x.value) {
            return -1;
        } else if (this.value > x.value) {
            return 1;
        }
        return 0;
    };
    
    ns.mixinComparators(JSNumberValueType.prototype);
    
    ns.JSNumberValueType = JSNumberValueType;

});
