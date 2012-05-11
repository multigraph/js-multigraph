if(!window.multigraph) {
    window.multigraph = {};
}

(function(ns) {
    "use strict";
    var ObjectTool = (function() {
        return {
            attr : function (obj, arg, opts) {
                //console.log(arg);
                if (obj === undefined || arg === undefined) {
                    throw new Error("attr requires at least two parameters");
                }

                var attribute = arg;
                
                obj[arg] = function(newValue) {
                    if(newValue) {
                        //setter
                        if(!(opts && opts.validateWith && opts.validateWith(newValue)) || 
                           !(opts && opts.shouldBeA && typeof(newValue) === opts.shouldBeA)) {
                            throw new Error('invalid set call for ' + arg + ' setter');
                        } else {
                            attribute = newValue;
                        }
                        return obj;
                    } else {
                        //getter
                        return attribute;
                    }
                };
                
            }
        };
    }());

    ns.ObjectTool = ObjectTool;
}(window.multigraph));


var ObjectTool = window.multigraph.ObjectTool;