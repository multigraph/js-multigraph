if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.TEMP) {
    window.multigraph.TEMP = {};
}

(function (ns) {
    "use strict";

    var Model = window.jermaine.Model,
        DataValue = window.multigraph.DataValue,
        DataVariable;

    
    DataVariable = new Model(function () {
        this.isImmutable();
        this.hasA("column").which.isA("integer");
        this.hasAn("id").which.isA("string");
        this.hasA("type").which.isA("string").and.isOneOf(DataValue.types());

        this.isBuiltWith("id", "column", "type");

        this.respondsTo("isMissing", function (value) {
            //TODO: fill out this method
        });
    });
        


    ns.DataVariable = DataVariable;

}(window.multigraph.TEMP));