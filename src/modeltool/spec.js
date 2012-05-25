if(!window.multigraph) {
    window.multigraph = {};
}

if(!window.multigraph.ModelTool) {
    window.multigraph.ModelTool = {};
}

(function (ns) {
    "use strict";
    function Spec(specification) {
        var that = this,
        methods = {},
        attributes = {},
        pattern,
        requiredConstructorArgs = [],
        optionalConstructorArgs = [],
        Method = window.multigraph.ModelTool.Method,
        initializer = function () {};
        
        this.hasA = function (attr) {
            var attribute;
            if (typeof(attr) === 'string') {
                //this[attr] = new ns.Attr(attr);
                attribute = new ns.Attr(attr);
                attributes[attr] = attribute;
                return attribute;
            } else {
                throw new Error("Spec: hasA parameter must be a string");
            }
        };
        
        this.hasAn = this.hasA;
        
        this.hasMany = function (attrs) {
            var attribute;
            if(typeof(attrs) === 'string') {
                //this[attrs] = new ns.AttrList(attrs);
                attribute = new ns.AttrList(attrs);
                attributes[attrs] = attribute;
                return attribute;
                //return this[attrs];
            } else {
                throw new Error("Spec: hasMany parameter must be a string");
            }
        };

        this.attribute = function (attr) {
            var result;

            if (typeof(attr) !== "string") {
                throw new Error("Spec: expected string argument to attribute method, but recieved " + attr);
            }

            result = attributes[attr];

            if (result === undefined) {
                throw new Error("Spec: attribute " + attr + " does not exist!");
            }
            return result;
        };

        this.method = function (m) {
            var result;

            if (typeof(m) !== "string") {
                throw new Error("Spec: expected string argument to method method, but recieved " + m);
            }


            result = methods[m];

            if(result === undefined) {
                throw new Error("Spec: method " + m + " does not exist!");
            }

            return result;
        };


        this.isBuiltWith = function () {
            var optionalParamFlag = false,
            i;

            requiredConstructorArgs = [];
            optionalConstructorArgs = [];

            for (i = 0; i < arguments.length; ++i) {
                if (typeof(arguments[i]) === "string" && arguments[i].charAt(0) !== '%') {
                    //in required parms
                    if (optionalParamFlag) {
                        //throw error
                        throw new Error("Spec: isBuiltWith requires parameters preceded with a % to be the final parameters before the optional function");
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
                    throw new Error("Spec: isBuiltWith parameters must be strings except for a function as the optional final parameter");
                }
            }
        };
        
        this.looksLike = function (p) {
            pattern = p;
        };

        this.respondsTo = function (methodName, methodBody) {
            var m = new Method(methodName, methodBody);
            methods[methodName] = m;
        };
        
        this.create = function (name) {
            var i,
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

            this[name] = function () {
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
                        if(i < requiredConstructorArgs.length) {
                            this[requiredConstructorArgs[i]](arguments[i]);
                        } else {
                            this[optionalConstructorArgs[i-requiredConstructorArgs.length]](arguments[i]);
                        }
                    }
                }
                initializer.call(this);
            };
            return this[name];
        };
        if (specification && typeof(specification) === "function") {
            var s = new Spec();
            specification.call(s);
            return s.create();
        } else if (specification) {
            throw new Error("Spec: specification parameter must be a function");
            //throw error
        }

    }
    ns.Spec = Spec;
}(window.multigraph.ModelTool));