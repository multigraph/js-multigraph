window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";
    var DataMeasure = {};
    /*
     * Return true or false depending on whether obj is an instance of a DataMeasure type
     */
    DataMeasure.isInstance = function (obj) {
        return (obj && (typeof(obj.getRealValue) === "function") && (!obj.compareTo));
    };

    /*
     * Create a new DataMeasure subtype of a given type by parsing a string
     */
    DataMeasure.parse = function (type, string) {
        if (type === ns.DataValue.NUMBER) {
            return ns.NumberMeasure.parse(string);
        } else if (type === ns.DataValue.DATETIME) {
            return ns.DatetimeMeasure.parse(string);
        }
        throw new Error("attempt to parse an unknown DataMeasure type");
    };

    ns.DataMeasure = DataMeasure;

});