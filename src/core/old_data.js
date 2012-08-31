window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Data,
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.data);

    Data = new window.jermaine.Model( "Data", function () {

        this.hasA("arraydata"); // which is a temporary hack until we completely merge in ArrayData...

        this.hasA("variables").which.validatesWith(function (variables) {
            return variables instanceof ns.Variables;
        });
        this.hasA("values").which.validatesWith(function (values) {
            return values instanceof ns.Values;
        });
        this.hasA("csv").which.validatesWith(function (csv) {
            return csv instanceof ns.CSV;
        });
        this.hasA("service").which.validatesWith(function (service) {
            return service instanceof ns.Service;
        });

        this.respondsTo("isMissing", function(value, i) {
            // This method should return true if the DataValue "value" meets the "missing" criteria of
            // the i-th column for this data object
            var ad = this.arraydata();
            if (!ad) {
                // this should eventually be removed, because the arraydata attribute is going away when this
                // model is merged with ArrayData (or rather, ArrayData is made to be a subclass of it)
                console.log("Warning: isMissing() called for data object having no arraydata ref");
                return false;
            }
            return ad.isMissing(value,i);
        });


        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.data, attributes);
    });
    ns.OldData = Data;

});
