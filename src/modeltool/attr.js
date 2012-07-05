/*
  + Why is validatorFunctions an array of objects keyed by the string 'validator', rather than just a list of functions?
    Does it have to do with the comment about keeping the old API working?
  + what about isNotGreaterThan()?, isNotLessThan()?  Or, better still: a general 'not' operator, as in jasmine?
  + use of deprecated errorsWith in implementation of clone()?
*/

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
            defaultValueOrFunction,
            getDefaultValue,
            i,
            prop,
            addDefaultValidator,
            immutable = false,
            validator,
            AttrList = window.multigraph.ModelTool.AttrList;

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

        getDefaultValue = function() {
            return (typeof(defaultValueOrFunction) === 'function') ? defaultValueOrFunction() : defaultValueOrFunction;
        };

        if (name === undefined || typeof(name) !== 'string') {
            throw new Error("Attr: constructor requires a name parameter which must be a string");
        }

        this.validatesWith = function (v) {
            if (typeof(v) === 'function') {
                validatorFunctions.push({ "validator" : v });
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
            defaultValueOrFunction = value;
            return this;
        };

        /* DEPRECATED */
        this.errorMessage = function () {
            return errorMessage;
        };

        this.isImmutable = function () {
            immutable = true;
            return this;
        };

        this.isMutable = function () {
            immutable = false;
            return this;
        };

        this.clone = function () {
            var result = (this instanceof AttrList)?new AttrList(name):new Attr(name),
                i;


            for (i = 0; i < validatorFunctions.length; ++i) {
                result.validatesWith(validatorFunctions[i].validator);
            }

            result.errorsWith(errorMessage).defaultsTo(defaultValueOrFunction);
            if (immutable) {
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
            var attribute,
                defaultValue;

            if (!obj || typeof(obj) !== 'object') {
                throw new Error("Attr: addAttr method requires an object parameter");
            }

            defaultValue = getDefaultValue();

            if (defaultValue !== undefined && validator(defaultValue)) {
                attribute = defaultValue;
            } else if (defaultValue !== undefined && !validator(defaultValue)) {
                throw new Error("Attr: Default value of " + defaultValue + " does not pass validation for " + name);
            }
            
            obj[name] = function (newValue) {
                if (newValue !== undefined) {
                    //setter
                    if (immutable && attribute !== undefined) {
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
        } else if (val === 'integer') {
            // special case for 'integer'; since javascript has no integer type,
            // just check for number type and check that it's numerically an int
            if (this.param.toString !== undefined)  {
                this.message = this.param.toString() + " should be an integer";
            } else {
                this.message = "parameter should be an integer";
            }
            return (typeof(this.param) === 'number') && (parseInt(this.param,10) === this.param);
        } else if (typeof(val) === "string") {
            throw new Error("Attr: isA accepts a string which is one of " + types);
        } else {
            throw new Error("Attr: isA only accepts a string for a primitive types for the time being");

            /*if (this.param.toString !== undefined)  {
                this.message = this.param.toString() + " should be an Object";
            } else {
                this.message = "parameter should be an Object";
            }
            return this.param instanceof val;*/

        }
    });

    Attr.addValidator("isOneOf", function (val) {
        this.message = this.param + " should be one of the set: " + val;
        return val.indexOf(this.param) > -1;
    });

    ns.Attr = Attr;
}(window.multigraph.ModelTool));