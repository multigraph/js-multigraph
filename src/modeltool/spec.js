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
        methods = [],
        pattern,
        Method = window.multigraph.ModelTool.Method;
        
        this.hasA = function (attr) {
            if (typeof(attr) === 'string') {
                this[attr] = new ns.Attr(attr);
                return this[attr];
            } else {
                throw new Error("Spec: hasA parameter must be a string");
            }
        };
        
        this.hasAn = this.hasA;
        
        this.hasMany = function (attrs) {
            if(typeof(attrs) === 'string') {
                this[attrs] = new ns.AttrList(attrs);
                return this[attrs];
            } else {
                throw new Error("Spec: hasMany parameter must be a string");
            }
        };

        this.buildsWith = function () {
            if (arguments.length === 0) {
                requiredArgs = new Array();
                optionalArgs = new Array();
                return this;//What should occur when no arguments are passed to the function?
            }
            var optionalParamFlag = false; //set to true when the first optional parameter is found
                                           //checks for proper grouping of optional parameters
            for (var i=0; i<arguments.length-1; i++) {
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
                    for (var i=0; i<arguments.length; i++) {
                        requiredArgs = new Array();
                        optionalArgs = new Array();
                        if (arguments[i].charAt(0) !== '%') {
                            requiredArgs.push(arguments[i]);
                        } else if (arguments[i].charAt(0) === '%') {
                            optionalArgs.push(arguments[i].slice(1));
                        }
                    }
                    return this;
                }
            } else if (typeof(arguments[arguments.length-1]) === 'function') {
                requiredArgs = new Array();
                optionalArgs = new Array();
                for (var i=0; i<arguments.length-1; i++) {
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
            methods.push(m);
        };
        
        this.create = function (name) {
            this[name] = function () {
                var i;
                for (i in that) {
                    if (that[i] instanceof ns.Attr) {
                        that[i].addTo(this);
                    }
                }

                //add methods
                for (i = 0; i < methods.length; ++i) {
                    methods[i].addTo(this);
                }

                this.toString = pattern;
            };
            return this[name];
        };        
    }
    ns.Spec = Spec;
}(window.multigraph.ModelTool));