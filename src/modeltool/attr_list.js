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
            
        };

        this.at = function (index) {
            
        };

        //to keep things more java-y
        this.get = this.at;

        this.size = function () {
            return arr.length;
        };

        this.addTo = function () {
            console.log('hello world!');
        };
    }

    AttrList.prototype = new window.multigraph.ModelTool.Attr(name);

    var al = new AttrList();

    ns.AttrList = AttrList;
}(window.multigraph.ModelTool));