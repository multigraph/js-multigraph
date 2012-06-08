if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Data,
        Variables,
        Values,
        CSV,
        Service,
        defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.data);

    if (ns.Data) {
        if (ns.Data.Variables) {
            Variables = ns.Data.Variables;
        }
        if (ns.Data.Values) {
            Values = ns.Data.Values;
        }
        if (ns.Data.CSV) {
            CSV = ns.Data.CSV;
        }
        if (ns.Data.Service) {
            Service = ns.Data.Service;
        }
    }

    Data = new ns.ModelTool.Model( 'Data', function () {
        this.hasA("variables").which.validatesWith(function (variables) {
            return variables instanceof ns.Data.Variables;
        });
        this.hasA("values").which.validatesWith(function (values) {
            return values instanceof ns.Data.Values;
        });
        this.hasA("csv").which.validatesWith(function (csv) {
            return csv instanceof ns.Data.CSV;
        });
        this.hasA("service").which.validatesWith(function (service) {
            return service instanceof ns.Data.Service;
        });

        ns.utilityFunctions.insertDefaults(this, defaultValues.data, attributes);
    });

    ns.Data = Data;
    if (Variables) {
        ns.Data.Variables = Variables;
    }
    if (Values) {
        ns.Data.Values = Values;
    }
    if (CSV) {
        ns.Data.CSV = CSV;
    }
    if (Service) {
        ns.Data.Service = Service;
    }

}(window.multigraph));
