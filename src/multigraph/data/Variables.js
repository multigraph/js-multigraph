if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Data) {
    window.multigraph.Data = {};
}

(function (ns) {
    "use strict";

    var Variable,
        Variables;

    if (ns.Data.Variables && ns.Data.Variables.Variable) {
        Variable = ns.Data.Variables.Variable;
    }

    Variables = new ns.ModelTool.Model( 'Variables', function () {
        this.hasMany("variable").which.validatesWith(function (variable) {
            return variable instanceof ns.Data.Variables.Variable;
        });
        this.hasA("missingvalue").which.validatesWith(function (missingvalue) {
            return typeof(missingvalue) === 'string';
        });
        this.hasA("missingop").which.validatesWith(function (missingop) {
            return typeof(missingop) === 'string';
        });
    });

    ns.Data.Variables = Variables;

    if (Variable) {
        ns.Data.Variables.Variable = Variable;
    }

}(window.multigraph));
