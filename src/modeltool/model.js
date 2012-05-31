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
                //this[attr] = new ns.Attr(attr);
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
                //model[attrs] = new ns.AttrList(attrs);
                attribute = new ns.AttrList(attrs);
                attributes[attrs] = attribute;
                return attribute;
                //return this[attrs];
            } else {
                throw new Error("Model: hasMany parameter must be a string");
            }
        };

        model.attribute = function (attr) {
            var result;

            modified = true;
            if (typeof(attr) !== "string") {
                throw new Error("Model: expected string argument to attribute method, but recieved " + attr);
            }

            result = attributes[attr];

            if (result === undefined) {
                throw new Error("Model: attribute " + attr + " does not exist!");
            }
            return result;
        };

        model.method = function (m) {
            var result;

            modified = true;
            if (typeof(m) !== "string") {
                throw new Error("Model: expected string argument to method method, but recieved " + m);
            }


            result = methods[m];

            if(result === undefined) {
                throw new Error("Model: method " + m + " does not exist!");
            }

            return result;
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
        
        model.create = function (name) {
            var that = this,
            i,
            err;

            //check to make sure that isBuiltWith
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

            constructor = function () {
                var i;
                //add attributes
                //console.log("this: "+this);
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
            //return s.create();
        } else if (specification) {
            throw new Error("Model: specification parameter must be a function");
        }
        return model;
    }
    ns.Model = Model;
}(window.multigraph.ModelTool));