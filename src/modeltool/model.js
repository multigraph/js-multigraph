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
        initializer = function () {},
        constructor = function () {},
        model = function () {
            if (modified) {
                model.create();
            }
            return constructor.apply(this, arguments);
        };

        //temporary fix so API stays the same
        if (arguments.length > 1) {
            specification = arguments[arguments.length-1];
        }
        
        model.hasA = function (attr) {
            var attribute;

            modified = true;
            if (typeof(attr) === 'string') {
                attribute = new ns.Attr(attr);
                attributes[attr] = attribute;
                return attribute;
            } else {
                throw new Error("Model: hasA parameter must be a string");
            }
        };
        
        model.hasAn = model.hasA;
        
        model.hasMany = function (attrs) {
            var attribute;

            modified = true;
            if(typeof(attrs) === 'string') {
                attribute = new ns.AttrList(attrs);
                attributes[attrs] = attribute;
                return attribute;
            } else {
                throw new Error("Model: hasMany parameter must be a string");
            }
        };

        /* private method that abstracts the following two */
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
        }

        listProperties = function (type) {
            var i,
            list = [],
            properties = type==="attributes"?attributes:methods;
            
            for (i in properties) {
                list.push(i);
            }

            return list;
        }



        model.attribute = function (attr) {
            return property("attribute", attr);
        };

        model.attributes = function () {
            return listProperties("attributes");
        }

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
            var i;

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
            //need to implement methods and attributes functions first
        };

        model.create = function (name) {
            var that = this,
            err;

            model.validate();

            constructor = function () {
                var i;

                //add attributes
                for(i in attributes) {
                    if(attributes.hasOwnProperty(i)) {
                        attributes[i].addTo(this);
                    }
                }

                //add methods
                for(i in methods) {
                    if(methods.hasOwnProperty(i)) {
                        methods[i].addTo(this);
                    }
                }

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