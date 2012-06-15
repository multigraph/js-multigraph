if(!window.multigraph) {
    window.multigraph = {};
}

if(!window.multigraph.ModelTool) {
    window.multigraph.ModelTool = {};
}

(function (ns) {
    "use strict";

    var validators = {};

    var Attr = function (name) {
        var validatorFunctions = [],
            that = this,
            errorMessage = "invalid setter call for " + name,
            defaultValue,
            i,
            prop,
            addDefaultValidator,
            isImmutable = false,
            validator;

        /* This is the validator that combines all the specified validators */
        validator = function (thingBeingValidated) {
            var obj = {};
            for (i = 0; i < validatorFunctions.length; ++i) {
                //a little magic to keep the old API working
                if (validatorFunctions[i].validator.call(obj, thingBeingValidated) === false) {
                    if (obj.message !== undefined) {
                        errorMessage = obj.message;
                    }
                    return false;
                }
            }
            return true;
        };

        //add default 'true' validator
        validatorFunctions.push({ validator: function () { return true; } });

        if(name === undefined || typeof(name) !== 'string') {
            throw new Error("Attr: constructor requires a name parameter which must be a string");
        }

        this.validatesWith = function (v) {
            if (typeof(v) === 'function') {
                validatorFunctions.push({ validator: v });
                return this;
            } else {
                throw new Error("Attr: validator must be a function");
            }
        };

        /* DEPRECATED */
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

        /* DEPRECATED */
        this.errorMessage = function () {
            return errorMessage;
        };

        this.isImmutable = function () {
            isImmutable = true;
            return this;
        };

        this.isMutable = function () {
            isImmutable = false;
            return this;
        };

        this.clone = function () {
            var result = new Attr(name),
                i;

            for (i = 0; i < validatorFunctions.length; ++i) {
                result.validatesWith(validatorFunctions[i].validator);
            }

            result.errorsWith(errorMessage).defaultsTo(defaultValue);
            if (isImmutable) {
                result.isImmutable();
            }
            return result;
        };

        //syntactic sugar
        this.and = this;
        this.which = this;
        this.eachOfWhich = this;

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

        //add a default validator
        addDefaultValidator = function (name) {
            that[name] = function (val) {
                that.validatesWith(function (param) {
                    var obj = {},
                    result;
                    obj.param = param;
                    result = validators[name].call(obj, val);
                    this.message = obj.message;
                    return result;   
                });
                return that;
            };
        };

        //add default validator set
        for (prop in validators) {
            if (validators.hasOwnProperty(prop)) {
                addDefaultValidator(prop, validators[prop]);
            }
        }
    };

    Attr.addValidator = function (name, v) {
        var prop,
            count = 0;

        if (name === undefined || typeof(name) !== "string") {
            throw new Error("addValidator requires a name to be specified as the first parameter");
        }

        if (v === undefined || typeof(v) !== "function") {
            throw new Error("addValidator requires a function as the second parameter");
        }

        if (validators[name] === undefined) {
            validators[name] = v;
        } else {
            throw new Error("Validator '" + name +"' already defined");
        }
    };

    Attr.addValidator("isGreaterThan", function (val) {
        this.message = this.param + " should be greater than " + val;
        return this.param > val;
    });

    Attr.addValidator("isLessThan", function (val) {
        this.message = this.param + " should be less than " + val;
        return this.param < val;
    });

    Attr.addValidator("isA", function (val) {
        var types = ["string", "number", "boolean", "function", "object"];
        if (typeof(val) === "string" && types.indexOf(val) > -1) {
            this.message = this.param + " should be a " + val;
            return typeof(this.param) === val;
        } else if (typeof(val) === "string") {
            throw new Error("Attr: isA accepts a string which is one of " + types);
        } else {
            this.message = this.param + " should be an Object";
            return this.param instanceof val;
        }
    });

    Attr.addValidator("isOneOf", function (val) {
        this.message = this.param + " should be one of the set: " + val;
        return val.indexOf(this.param) > -1;
    });

    ns.Attr = Attr;
}(window.multigraph.ModelTool));