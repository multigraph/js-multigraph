window.multigraph.util.namespace("window.multigraph.math", function (ns) {
    "use strict";

    var Enum = function (name) {

        var instances = {};

        var Enum = function (key) {
            if (instances[key] !== undefined) {
                throw new Error("attempt to redefine "+name+" Enum with key '"+key+"'");
            }
            this.enumType = name;
            this.key = key;
            instances[key] = this;
        };

        Enum.parse = function (key) {
            return instances[key];
        };

        Enum.prototype.toString = function () {
            return this.key;
        };

        Enum.isInstance = function (obj) {
            return (obj !== undefined && obj !== null && obj.enumType === name);
        };

        return Enum;
    };

    ns.Enum = Enum;
});
