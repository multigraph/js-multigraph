if(!window.multigraph) {
    window.multigraph = {};
}

if(!window.multigraph.ModelTool) {
    window.multigraph.ModelTool = {};
}

(function (ns) {
    "use strict";
    function AttrList(name) {
        var that = this,
        arr = [];

        var delegate = function (obj, func) {
            return function() { return obj[func].apply(obj, arguments); };
        };
        
        this.pop = delegate(arr, "pop");

        this.add = function (obj) {
            if ((that.validator())(obj)) {
                arr.push(obj);
                return this;         
            } else {
                throw new Error(this.errorMessage());
            }
            
        };

        this.at = function (index) {
            if (index < 0 || index >= this.size()) {
                throw new Error("AttrList: Index out of bounds");
            }
            return arr[index];
        };

        //to keep things more java-y
        this.get = this.at;

        this.size = function () {
            return arr.length;
        };

        this.addTo = function (obj) {
            if(!obj || typeof(obj) !== 'object') {
                throw new Error("AttrList: addTo method requires an object parameter");                
            } else {
                var actualList = {},
                prop;
                for(prop in that) {
                    if(that.hasOwnProperty(prop)) {
                        actualList[prop] = that[prop];
                    }
                }
                obj[name] = function() {
                    return actualList;
                };
            }
        };
    }

    AttrList.prototype = new window.multigraph.ModelTool.Attr(name);

    var al = new AttrList();

    ns.AttrList = AttrList;
}(window.multigraph.ModelTool));