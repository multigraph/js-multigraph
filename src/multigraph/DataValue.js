if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    /*
     * DataValue is a POJSO (plain old javascript object) that simply
     * serves as an ecapsulation for several generic
     * data-value-related constants and functions.  There is no actual
     * DataValue model that can be instantiated; all data values are
     * instances of either the NumberValue or DatetimeValue model.
     */

    var DataValue = {};

    DataValue.NUMBER = "number";
    DataValue.DATETIME = "datetime";

    /*
     * Return a list of the type constants above
     */
    DataValue.types = function() {
        return [ DataValue.NUMBER, DataValue.DATETIME ];
    };

    /*
     * Create a new DataValue subtype of a given type by parsing a string
     */
    DataValue.parseType = function(string) {
        if (string.toLowerCase() === DataValue.NUMBER) { return DataValue.NUMBER; }
        if (string.toLowerCase() === DataValue.DATETIME) { return DataValue.DATETIME; }
        throw new Error("unknown DataValue type: " + string);
    };

    /*
     * Return true or false depending on whether obj is an instance of a DataValue type
     */
    DataValue.isInstance = function(obj) {
        return ((obj !== undefined) && (typeof(obj.getRealValue) === "function") && (typeof(obj.compareTo) === "function"));
    };

    /*
     * Create a new DataValue subtype of a given type by parsing a string
     */
    DataValue.parse = function(type, string) {
        if (type === DataValue.NUMBER) {
            return ns.NumberValue.parse(string);
        } else if (type === DataValue.DATETIME) {
            //TODO: NYI
            //return ns.DatetimeValue.parse(string);
            return null;
        }
        throw new Error("attempt to parse an unknown DataValue type");
    };

    ns.DataValue = DataValue;

}(window.multigraph));
