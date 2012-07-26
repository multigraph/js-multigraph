(function (ns) {
   "use strict";

    var namespace = function (ns, func) {
        var nsRegExp = /^([a-zA-Z]+)(\.[a-zA-Z]*)*$/,
            nsArray,
            currentNS,
            i;

        //check to make sure ns is a properly formatted namespace string
        if (ns.match(nsRegExp) === null || ns === "window") {
            throw new Error("namespace: " + ns + " is a malformed namespace string");
        }

        //parse namespace string
        nsArray = ns.split(".");

        //set the root namespace to window (if it's not explictly stated)
        currentNS = ("window" === nsArray[0])?window:window[nsArray[0]] = {};

        //confirm func is actually a function
        if (typeof(func) !== "function") {
            throw new Error("namespace: second argument must be a function that accepts a namespace parameter");
        }

        //build namespace
        for (i = 1; i < nsArray.length; ++i) {
            if (currentNS[nsArray[i]] === undefined) {
                currentNS[nsArray[i]] = {};
            }
            currentNS = currentNS[nsArray[i]];
        }

        //if the function was defined, run it on the current namespace
        if (func) {
            func(currentNS);
        }

        //return namespace
        return currentNS;
    };

    return namespace(ns, function (exports) {
        exports.namespace = namespace;
    });
}("window.util"));
window.util.namespace("window.jermaine", function (ns) {
    "use strict";
    var that = this,
        Validator,
        validators = {};

    Validator = function (spec) {
        var validatorFunction = function (arg) {
            var result, 
                resultObject = {},
                errorMessage;
            result = spec.call(resultObject, arg);
            if (!result) {
                errorMessage = resultObject.message || "validator failed with parameter " + arg;
                throw new Error(errorMessage);
            }
            return result;
        };
        return validatorFunction;
    };

    Validator.addValidator = function (name, v) {
        if (name === undefined || typeof(name) !== "string") {
            throw new Error("addValidator requires a name to be specified as the first parameter");
        }

        if (v === undefined || typeof(v) !== "function") {
            throw new Error("addValidator requires a function as the second parameter");
        }

        if (validators[name] === undefined) {
            validators[name] = function (expected) {
                return new Validator(function (val) {
                    var resultObject = {"actual":val, "param":val},
                        result = v.call(resultObject, expected);
                    this.message = resultObject.message;
                    return result;
                });
            };
        } else {
            throw new Error("Validator '" + name +"' already defined");
        }
    };

    Validator.getValidator = function (name) {
        var result;

        if (name === undefined) {
            throw new Error("Validator: getValidator method requires a string parameter");
        } else if (typeof (name) !== "string") {
            throw new Error("Validator: parameter to getValidator method must be a string");
        }

        result = validators[name];

        if (result === undefined) {
            throw new Error("Validator: '" + name + "' does not exist");
        }

        return result;
    };


    Validator.validators = function () {
        var prop,
            result = [];
        for (prop in validators) {
            if (validators.hasOwnProperty(prop)) {
                result.push(prop);
            }
        }

        return result;
    };

    Validator.addValidator("isGreaterThan", function (val) {
        this.message = this.param + " should be greater than " + val;
        return this.param > val;
    });

    Validator.addValidator("isLessThan", function (val) {
        this.message = this.param + " should be less than " + val;
        return this.param < val;
    });

    Validator.addValidator("isA", function (val) {
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
            throw new Error("Validator: isA accepts a string which is one of " + types);
        } else {
            throw new Error("Validator: isA only accepts a string for a primitive types for the time being");
        }
    });

    Validator.addValidator("isOneOf", function (val) {
        this.message = this.param + " should be one of the set: " + val;
        return val.indexOf(this.param) > -1;
    });

    ns.Validator = Validator;
});
/*
  + what about isNotGreaterThan()?, isNotLessThan()?  Or, better still: a general 'not' operator, as in jasmine?
  + use of deprecated errorsWith in implementation of clone()?
*/

window.util.namespace("window.jermaine", function (ns) {
    "use strict";

    var staticValidators = {};

    var Attr = function (name) {
        var validators = [],
            that = this,
            errorMessage = "invalid setter call for " + name,
            defaultValueOrFunction,
            getDefaultValue,
            i,
            prop,
            addValidator,
            immutable = false,
            validator,
            AttrList = window.jermaine.AttrList,
            Validator = window.jermaine.Validator;


        /* This is the validator that combines all the specified validators */
        validator = function (thingBeingValidated) {
            for (i = 0; i < validators.length; ++i) {
                validators[i](thingBeingValidated);
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
                validators.push(new Validator(v));
                return this;
            } else {
                throw new Error("Attr: validator must be a function");
            }
        };

        this.defaultsTo = function (value) {
            defaultValueOrFunction = value;
            return this;
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

            for (i = 0; i < validators.length; ++i) {
                result.validatesWith(validators[i]);
            }

            result.defaultsTo(defaultValueOrFunction);
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

        //add a single validator object to the attribute
        addValidator = function (name) {
            that[name] = function (param) {
                validators.push(Validator.getValidator(name)(param));
                return that;
            };
        };

        //add the validators to the attribute
        for (i = 0; i < Validator.validators().length; ++i) {
            addValidator(Validator.validators()[i]);
        }
    };

    ns.Attr = Attr;
});
window.util.namespace("window.jermaine", function (ns) {
    "use strict";

    function AttrList(name) {
        var that = this;

        //this is where the inheritance happens now
        ns.Attr.call(this, name);

        var delegate = function (obj, func) {
            return function () { return obj[func].apply(that, arguments); };
        };

        //syntactic sugar to keep things grammatically correct
        this.validateWith = this.validatesWith;

        //disable defaultsTo and isImmutable until we figure out how to make it make sense
        this.defaultsTo = function () {
            //no op
        };

        this.isImmutable = function () {
            //no op
        };

        this.isMutable = function () {
            //no op
        };

        this.addTo = function (obj) {
            var prop,
            arr = [],
            actualList = {};
            if(!obj || typeof(obj) !== 'object') {
                throw new Error("AttrList: addTo method requires an object parameter");                
            } else {
                actualList.pop = delegate(arr, "pop");
                
                actualList.add = function (obj) {
                    if ((that.validator())(obj)) {
                        arr.push(obj);
                        return this;         
                    } else {
                        throw new Error(that.errorMessage());
                    }
                };

                actualList.at = function (index) {
                    if (index < 0 || index >= this.size()) {
                        throw new Error("AttrList: Index out of bounds");
                    }
                    return arr[index];
                };

                //to keep things more java-y
                actualList.get = actualList.at;

                actualList.size = function () {
                    return arr.length;
                };

                obj[name] = function () {
                    return actualList;
                };
            }
        };
    }

    //this needs to stay if we're going to use instanceof
    //but note we override all of the methods via delegation
    //so it's not doing anything except for making an AttrList
    //an instance of Attr
    AttrList.prototype = new window.jermaine.Attr(name);

    ns.AttrList = AttrList;
});
window.util.namespace("window.jermaine", function (ns) {
    "use strict";

    var Method = function (name, method) {
        if (!name || typeof(name) !== "string") { 
            throw new Error("Method: constructor requires a name parameter which must be a string");
        } else if (!method || typeof(method) !== "function") {
            throw new Error("Method: second parameter must be a function");
        }
        
        this.addTo = function (obj) {
            if (!obj || typeof(obj) !== 'object') {
                throw new Error("Method: addTo method requires an object parameter");
            }
            
            obj[name] = method;
        };
    };
    ns.Method = Method;
});
window.util.namespace("window.jermaine", function (ns) {
    "use strict";
    function Model(specification) {
        var that = this,
            methods = {},
            attributes = {},
            pattern,
            modified = false,
            requiredConstructorArgs = [],
            optionalConstructorArgs = [],
            parents = [],
            Method = ns.Method,
            Attr = ns.Attr,
            AttrList = ns.AttrList,
            property,
            listProperties,
            create,
            isImmutable,
            initializer = function () {},
            constructor = function () {},
            model = function () {
                if (modified) {
                    create();
                }
                return constructor.apply(this, arguments);
            };

        //temporary fix so API stays the same
        if (arguments.length > 1) {
            specification = arguments[arguments.length-1];
        }

        //handle specification function
        if (specification && typeof(specification) === "function") {
            model = new Model();
            specification.call(model);
            return model;
        } else if (specification) {
            throw new Error("Model: specification parameter must be a function");
        }

        /********** BEGIN PRIVATE METHODS ****************/
        /* private method that abstracts hasA/hasMany */
        var hasAProperty = function (type, name) {
            var Property = type==="Attr"?Attr:AttrList,
            methodName = type==="Attr"?"hasA":"hasMany",
            attribute;

            modified = true;
            
            if (typeof(name) === 'string') {
                attribute = new Property(name);
                attributes[name] = attribute;
                return attribute;
            } else {
                throw new Error("Model: " + methodName + " parameter must be a string");
            }
        };

        /* private method that abstracts attribute/method */
        property = function (type, name) {
            var result;

            if (typeof(name) !== "string") {
                throw new Error("Model: expected string argument to " + type + " method, but recieved " + name);
            }

            result = type==="attribute"?attributes[name]:methods[name];

            if (result === undefined) {
                throw new Error("Model: " + type + " " + name  + " does not exist!");
            }

            return result;
        };

        /* private method that abstracts attributes/methods */
        listProperties = function (type) {
            var i,
            list = [],
            properties = type==="attributes"?attributes:methods;

            for (i in properties) {
                if (properties.hasOwnProperty(i)) {
                    list.push(i);
                }
            }

            return list;
        };

        /* private function that creates the constructor */
        create = function (name) {
            var that = this,
                i,
                err;

            //validate the model first
            model.validate();

            constructor = function () {
                var i,
                    addProperties = function (obj, type) {
                        var properties = type==="attributes"?attributes:methods,
                            i;
                        for (i in properties) {
                            if (properties.hasOwnProperty(i)) {
                                //if the object is immutable, all attributes should be immutable
                                if(properties === attributes && isImmutable) {
                                    properties[i].isImmutable();
                                }
                                properties[i].addTo(obj);
                            }
                        }
                    };


                //add attributes
                addProperties(this, "attributes");
                addProperties(this, "methods");

                this.toString = pattern;

                //use constructor args to build object
                if(arguments.length > 0) {
                    if (arguments.length < requiredConstructorArgs.length) {
                        //throw error
                        err = "Constructor requires ";
                        for(i = 0; i < requiredConstructorArgs.length; ++i) {
                            err += requiredConstructorArgs[i];
                            err += i===requiredConstructorArgs.length-1?"":", ";
                        }
                        err += " to be specified";
                        throw new Error(err);
                    } else {
                        for (i = 0; i < arguments.length; ++i) {
                            if (i < requiredConstructorArgs.length) {
                                this[requiredConstructorArgs[i]](arguments[i]);
                            } else {
                                this[optionalConstructorArgs[i-requiredConstructorArgs.length]](arguments[i]);
                            }
                        }
                    }
                }
                initializer.call(this);
            };
            return constructor;
        };
        /*********** END PRIVATE METHODS **************/


        /*********** BEGIN PUBLIC API *****************/
        model.hasA = function (attr) {
            return hasAProperty("Attr", attr);
        };
        
        model.hasAn = model.hasA;
        
        model.hasMany = function (attrs) {
            return hasAProperty("AttrList", attrs);
        };

        model.isA = function (parent) {
            var i,
                parentAttributes,
                parentMethods,
                isAModel;

            modified = true;

            //checks to make sure a potentialModel has all attributes of a model
            isAModel = function (potentialModel) {
                var i,
                    M = new Model();
                for (i in M) {
                    if (M.hasOwnProperty(i) && typeof(potentialModel[i]) !== typeof(M[i])) {
                        return false;
                    }
                }
                return true;
            };

            //confirm parent is a model via duck-typing
            if (typeof (parent) !== "function" || !isAModel(parent)) {
                throw new Error("Model: parameter sent to isA function must be a Model");
            }

            //only allow single inheritance for now
            if (parents.length === 0) {
                parents.push(parent);
            } else {
                throw new Error("Model: Model only supports single inheritance at this time");
            }

            //add attributes and methods to current model
            parentAttributes = parents[0].attributes();
            for (i = 0; i < parentAttributes.length; ++i) {
                if (attributes[parentAttributes[i]] === undefined) {
                    attributes[parentAttributes[i]] = parents[0].attribute(parentAttributes[i]).clone();
                    //subclass attributes are mutable by default
                    attributes[parentAttributes[i]].isMutable();
                }
            }

            parentMethods = parents[0].methods();
            for (i = 0; i < parentMethods.length; ++i) {
                if (methods[parentMethods[i]] === undefined) {
                    methods[parentMethods[i]] = parents[0].method(parentMethods[i]);
                }
            }            

            for (i = 0; i < parents.length; i++) {
                model.prototype = new parents[i]();
            }
        };

        model.isAn = model.isA;

        model.parent = function () {
            return parents[0].apply(this, arguments);
        };

        model.attribute = function (attr) {
            return property("attribute", attr);
        };

        model.attributes = function () {
            return listProperties("attributes");
        };

        model.method = function (m) {
            return property("method", m);
        };
        
        model.methods = function () {
            return listProperties("methods");
        };

        model.isBuiltWith = function () {
            var optionalParamFlag = false,
            i;

            modified = true;
            requiredConstructorArgs = [];
            optionalConstructorArgs = [];

            for (i = 0; i < arguments.length; ++i) {
                if (typeof(arguments[i]) === "string" && arguments[i].charAt(0) !== '%') {
                    //in required parms
                    if (optionalParamFlag) {
                        //throw error
                        throw new Error("Model: isBuiltWith requires parameters preceded with a % to be the final parameters before the optional function");
                    } else {
                        //insert into required array
                        requiredConstructorArgs.push(arguments[i]);
                    }
                } else if(typeof(arguments[i]) === "string" && arguments[i].charAt(0) === '%') {
                    //in optional parms
                    optionalParamFlag = true;
                    //insert into optional array
                    optionalConstructorArgs.push(arguments[i].slice(1));
                } else if(typeof(arguments[i]) === "function" && i === arguments.length - 1) {
                    //init function
                    initializer = arguments[i];
                } else {
                    throw new Error("Model: isBuiltWith parameters must be strings except for a function as the optional final parameter");
                }
            }
        };
        
        model.isImmutable = function () {
            isImmutable = true;
        };

        model.looksLike = function (p) {
            modified = true;
            pattern = p;
        };

        model.respondsTo = function (methodName, methodBody) {
            var m = new Method(methodName, methodBody);
            modified = true;
            methods[methodName] = m;
        };
        
        model.validate = function () {
            var i,
            attributes = this.attributes(),
            methods = this.methods();

            //check to make sure that isBuiltWith has actual attributes
            for (i = 0; i < requiredConstructorArgs.length; ++i) {
                try {
                    this.attribute(requiredConstructorArgs[i]);
                } catch (e) {
                    throw new Error(requiredConstructorArgs[i] + ", specified in the isBuiltWith method, is not an attribute");
                }
            }

            for (i = 0; i < optionalConstructorArgs.length; ++i) {
                try {
                    this.attribute(optionalConstructorArgs[i]);
                } catch (e) {
                    throw new Error(optionalConstructorArgs[i] + ", specified in the isBuiltWith method, is not an attribute");
                }
            }

            //check for method/attribute collisions
            for (i = 0; i < attributes.length; i++) {
                if (methods.indexOf(attributes[i]) > -1) {
                    throw new Error("Model: invalid model specification to " + attributes[i] + " being both an attribute and method");
                }
            }

            //check to make sure that all attributes are requiredConstructorArgs if the object is immutable
            if (isImmutable) {
                for (i = 0; i < attributes.length; i++) {
                    if (requiredConstructorArgs.indexOf(attributes[i]) < 0) {
                        throw new Error("immutable objects must have all attributes required in a call to isBuiltWith");
                    }
                }
            }

            //set modifiedSinceLastValidation to false
            modified = false;
        };
        /************** END PUBLIC API ****************/


        
        //here we are returning our model object
        //which is a function with a bunch of methods that
        //manipulate how the function behaves
        return model;
    }

    ns.Model = Model;
});
