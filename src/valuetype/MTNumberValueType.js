// This file defines a plain Javascript object called MTNumberValueType that has a single
// number type property called 'value', a getRealValue() method that returns that value,
// and a compareTo() method for comparing two MTNumberValueType instances.

window.multigraph.util.namespace("window.multigraph.valuetype", function (ns) {
    "use strict";

    var MTNumberValueType = new window.jermaine.Model("MTNumberValueType", function() {

        this.hasA("value").which.isA('number');
        //this.hasA("value");

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

    ns.mixinComparators(MTNumberValueType.prototype);

    ns.MTNumberValueType = MTNumberValueType;

});
