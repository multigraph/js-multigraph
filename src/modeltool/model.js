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

                //call super-model constructor(s)
                for (i = 0; i < parents.length; i++) {
                    parents[i].apply(this, arguments);
                }


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


            /*console.log("prototypes set");
            var p = new constructor();
            console.log("hello:" + (p instanceof parents[0]));*/
            //console.log(p instanceof parents[0]);

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
            var isAModel = function (potentialModel) {
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

            for (var i = 0; i < parents.length; i++) {
                model.prototype = new parents[i]();
            }
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
}(window.multigraph.ModelTool));