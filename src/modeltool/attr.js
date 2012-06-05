if(!window.multigraph) {
    window.multigraph = {};
}

if(!window.multigraph.ModelTool) {
    window.multigraph.ModelTool = {};
}

(function (ns) {
    "use strict";

    var Attr = function (name, err) {
        var validator = function () { return true; },
        errorMessage = err || "invalid setter call for " + name,
        defaultValue,
        isImmutable = false;

        if(name === undefined || typeof(name) !== 'string') {
            throw new Error("Attr: constructor requires a name parameter which must be a string");
        }

        if(err && typeof(err) !== 'string') {
            throw new Error("Attr: second parameter should be a string representing an error message");
        }

        this.validatesWith = function (v) {
            //validator should be a function
            if (typeof(v) === 'function') {
                validator = v;
                return this;
            } else {
                throw new Error("Attr: validator must be a function");
            }
        };

        this.errorsWith = function (error) {
            if (typeof(error) === 'string') {
                errorMessage = error;
                return this;
            } else {
                throw new Error("Attr: errorsWith method requires string parameter");
            }
        };

        this.defaultsTo = function (value) {
            defaultValue = value;
            return this;
        };

        this.errorMessage = function () {
            return errorMessage;
        };

        this.isImmutable = function () {
            isImmutable = true;
            return this;
        };

        //syntactic sugar
        this.and = this;
        this.which = this;

        this.validator = function () {
            return validator;
        };

        this.addTo = function (obj) {
            var attribute;

            if (!obj || typeof(obj) !== 'object') {
                throw new Error("Attr: addAttr method requires an object parameter");
            }

            if (defaultValue !== undefined && validator(defaultValue)) {
                attribute = defaultValue;
            } else if (defaultValue !== undefined && !validator(defaultValue)) {
                throw new Error("Attr: Default value of " + defaultValue + " does not pass validation for " + name);
            }
            
            obj[name] = function (newValue) {
                if (newValue) {
                    //setter
                    if (isImmutable && attribute !== undefined) {
                        throw new Error("cannot set the immutable property " + name + " after it has been set");
                    } else
                    if (!validator(newValue)) {
                        throw new Error(errorMessage);
                    } else {
                        attribute = newValue;
                    }
                    return obj;
                } else {
                    //getter
                    return attribute;
                }
            };
        };
    };
    ns.Attr = Attr;
}(window.multigraph.ModelTool));