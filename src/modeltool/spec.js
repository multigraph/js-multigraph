if(!window.multigraph) {
    window.multigraph = {};
}

if(!window.multigraph.ModelTool) {
    window.multigraph.ModelTool = {};
}

(function (ns) {
    "use strict";
    function Spec(n) {
        var that = this,
        name = n,
        methods = {},
        attributes = {},
        pattern,
        Method = window.multigraph.ModelTool.Method;
        
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
        }

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
        }


        this.buildsWith = function () {
            var optionalArgs,
            requiredArgs,
            i;

            if (arguments.length === 0) {
                requiredArgs = [];
                optionalArgs = [];
                return this;//What should occur when no arguments are passed to the function?
            }
            var optionalParamFlag = false; //set to true when the first optional parameter is found
                                           //checks for proper grouping of optional parameters
            for (i=0; i<arguments.length-1; i++) {
                if (typeof(arguments[i]) !== 'string') {
                    throw new Error("Spec: buildsWith parameters must be strings except for a function as the optional final parameter");
                } else if (optionalParamFlag === true && arguments[i].charAt(0) !== '%') {
                    throw new Error("Spec: buildsWith requires parameters preceded with a % to be the final parameters before the optional function");
                } else if (optionalParamFlag === false && arguments[i].charAt(0) === '%') {
                    optionalParamFlag = true;
                }
            }
            if (typeof(arguments[arguments.length-1]) === 'string') {
                if (optionalParamFlag === true && arguments[arguments.length-1].charAt(0) !== '%') {
                    throw new Error("Spec: buildsWith requires parameters preceded with a % to be the final parameters before the optional function");
                } else {
                    for (i=0; i<arguments.length; i++) {
                        requiredArgs = [];
                        optionalArgs = [];
                        if (arguments[i].charAt(0) !== '%') {
                            requiredArgs.push(arguments[i]);
                        } else if (arguments[i].charAt(0) === '%') {
                            optionalArgs.push(arguments[i].slice(1));
                        }
                    }
                    return this;
                }
            } else if (typeof(arguments[arguments.length-1]) === 'function') {
                requiredArgs = [];
                optionalArgs = [];
                for (i=0; i<arguments.length-1; i++) {
                    if (arguments[i].charAt(0) !== '%') {
                        requiredArgs.push(arguments[i]);
                    } else if (arguments[i].charAt(0) === '%') {
                        optionalArgs.push(arguments[i].slice(1));
                    }
                }
                arguments[arguments.length-1]();
                return this;
            } else {
                throw new Error("Spec: buildsWith parameters must be strings except for a function as the optional final parameter");
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
            };
            return this[name];
        };        
    }
    ns.Spec = Spec;
}(window.multigraph.ModelTool));