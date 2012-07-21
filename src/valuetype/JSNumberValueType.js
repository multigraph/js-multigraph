if (!window.multigraph) {
    window.multigraph = {};
}
if (!window.multigraph.valuetype) {
    window.multigraph.valuetype = {};
}

// This file defines a plain Javascript object called JSNumberValueType that has a single
// number type property called 'value', a getRealValue() method that returns that value,
// and a compareTo() method for comparing two JSNumberValueType instances.

(function (ns) {
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

    ns.valuetype.mixinComparators(JSNumberValueType.prototype);

    ns.valuetype.JSNumberValueType = JSNumberValueType;

}(window.multigraph));
