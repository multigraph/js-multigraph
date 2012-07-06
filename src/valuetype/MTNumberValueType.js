if (!window.multigraph) {
    window.multigraph = {};
}
if (!window.multigraph.valuetype) {
    window.multigraph.valuetype = {};
}

// This file defines a plain Javascript object called MTNumberValueType that has a single
// number type property called 'value', a getRealValue() method that returns that value,
// and a compareTo() method for comparing two MTNumberValueType instances.

(function (ns) {
    "use strict";

    var MTNumberValueType = new ns.ModelTool.Model("MTNumberValueType", function() {

        this.hasA("value").which.isA('number');

        this.isBuiltWith("value");

        this.respondsTo("getRealValue", function(x) {
            return this.value();
        });

        this.respondsTo("compareTo", function(x) {
            if (this.getRealValue() < x.getRealValue()) {
                return -1;
            } else if (this.getRealValue() > x.getRealValue()) {
                return 1;
            }
            return 0;
        });


    });

    ns.valuetype.mixinComparators(MTNumberValueType.prototype);

    ns.valuetype.MTNumberValueType = MTNumberValueType;

}(window.multigraph));
