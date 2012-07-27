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

        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.data, attributes);
    });
    ns.Data = Data;

});
