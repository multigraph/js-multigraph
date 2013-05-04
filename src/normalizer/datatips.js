window.multigraph.util.namespace("window.multigraph.normalizer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Datatips.respondsTo("normalize", function (plot) {
            var datatipsVariables = this.variables(),
                plotVariables     = plot.variable(),
                variable,
                type,
                defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD().plot.datatips.variable,
                i;

            // creates missing variables for the datatip
            if (datatipsVariables.size() < plotVariables.size()) {
                for (i = datatipsVariables.size(); i < plotVariables.size(); i++) {
                    datatipsVariables.add(new ns.DatatipsVariable());
                }
            }
                
            // sets up formatters for datatips variables
            for (i = 0; i < datatipsVariables.size(); i++) {
                variable = datatipsVariables.at(i);
                type = plotVariables.at(i).type();
                if (variable.formatString() === undefined) {
                    if (type === ns.DataValue.NUMBER) {
                        variable.formatString(defaultValues["formatString-number"]);
                    } else {
                        variable.formatString(defaultValues["formatString-datetime"]);
                    }
                }
                variable.formatter(ns.DataFormatter.create(type, variable.formatString()));
            }
        });

    });

});
