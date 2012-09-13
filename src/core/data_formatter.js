window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";
    var DataFormatter = {};
    /*
     * Return true or false depending on whether obj is an instance of a DataFormatter type
     */
    DataFormatter.isInstance = function (obj) {
        return (obj && (typeof(obj.format) === "function") && (typeof(obj.getMaxLength) === "function"));
    };

    /*
     * Create a new DataFormatter subtype of a given type
     */
    DataFormatter.create = function (type, format) {
        if (type === ns.DataValue.NUMBER) {
            return new ns.NumberFormatter(format);
        } else if (type === ns.DataValue.DATETIME) {
            return new ns.DatetimeFormatter(format);
        }
        throw new Error("attempt to create an unknown DataFormatter type");
    };

    ns.DataFormatter = DataFormatter;

});
