if(!window.multigraph) {
    window.multigraph = {};
}

if(!window.multigraph.ModelTool) {
    window.multigraph.ModelTool = {};
}

(function (ns) {
    "use strict";

    var validators = {};

    var Attr = function (name, err) {
        var validatorFunctions = [],
            that = this,
            errorMessage = err || "invalid setter call for " + name,
            defaultValue,
            i,
            prop,
            addDefaultValidator,
            isImmutable = false,
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

        //add deafult validator
        validatorFunctions.push({ validator: function () { return true; } });

        if(name === undefined || typeof(name) !== 'string') {
            throw new Error("Attr: constructor requires a name parameter which must be a string");
        }

        if(err && typeof(err) !== 'string') {
            throw new Error("Attr: second parameter should be a string representing an error message");
        }

        this.validatesWith = function (v) {
            //validator should be a function
            if (typeof(v) === 'function') {
                validatorFunctions.push({ validator: v });
                //validator = v;
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

        //add validators
        for (prop in validators) {
            if (validators.hasOwnProperty(prop)) {
                addDefaultValidator(prop, validators[prop]);
            }
        }
    };

    Attr.addValidator = function (v) {
        var prop,
            count = 0;

        //v should be an object
        if (typeof(v) !== "object") {
            throw new Error("validator must be an object of the form { name: function }");
        }
        
        //v should have exactly 1 property that is a function
        for (prop in v) {
            if (v.hasOwnProperty(prop)) {
                count++;
                if (typeof(v[prop]) !== 'function' || count > 1) {
                    throw new Error("validator must be an object of the form { name: function }, and should not have any other keys");
                }
            }
        }
        
        //add it to the validators object
        for (prop in v) {
            if (v.hasOwnProperty(prop)) {
                if (validators[prop] === undefined) {
                    validators[prop] = v[prop];
                } else {
                    throw new Error("Validator '" + prop +"' already defined");
                }
            }
        }
    };

    Attr.addValidator({isGreaterThan: function (val) {
        this.message = this.param + " should be greater than " + val;
        return this.param > val;
    }});

    Attr.addValidator({isLessThan: function (val) {
        this.message = this.param + " should be less than " + val;
        return this.param < val;
    }});

    Attr.addValidator({isA: function (val) {
        this.message = this.param + " should be a " + val;
        return typeof(this.param) === val;
    }});

    ns.Attr = Attr;
}(window.multigraph.ModelTool));