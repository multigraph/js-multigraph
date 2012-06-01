if(!window.multigraph) {
    window.multigraph = {};
}

if(!window.multigraph.ModelTool) {
    window.multigraph.ModelTool = {};
}

(function (ns) {
    "use strict";
    function Model(specification) {
        var that = this,
        methods = {},
        attributes = {},
        pattern,
        modified = false,
        requiredConstructorArgs = [],
        optionalConstructorArgs = [],
        Method = window.multigraph.ModelTool.Method,
        property,
        listProperties,
        create,
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

        /* private method that abstracts hasA/hasMany */
        var hasAProperty = function (type, name) {
            var Property = type==="Attr"?ns.Attr:ns.AttrList,
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

        model.hasA = function (attr) {
            return hasAProperty("Attr", attr);
        };
        
        model.hasAn = model.hasA;
        
        model.hasMany = function (attrs) {
            return hasAProperty("AttrList", attrs);
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
        };

        /* private function that creates the constructor */
        create = function (name) {
            var that = this,
            err;

            //validate the model first
            model.validate();

            constructor = function () {
                var i;

                var addProperties = function (obj, type) {
                    var properties = type==="attributes"?attributes:methods,
                    i;
                    for (i in properties) {
                        if (properties.hasOwnProperty(i)) {
                            properties[i].addTo(obj);
                        }
                    }
                };

                //add attributes
                addProperties(this, "attributes");
                addProperties(this, "methods");

                this.toString = pattern;

                //use constructor args to build object
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
                initializer.call(this);
            };

            return constructor;
        };

        modified = false;

        if (specification && typeof(specification) === "function") {
            var s = new Model();
            specification.call(s);
            return s;
        } else if (specification) {
            throw new Error("Model: specification parameter must be a function");
        }
        return model;
    }
    ns.Model = Model;
}(window.multigraph.ModelTool));