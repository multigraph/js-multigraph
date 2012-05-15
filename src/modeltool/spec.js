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
        pattern;
        
        this.hasA = function (attr) {
            this[attr] = new window.multigraph.ModelTool.Attr(attr);
            return this[attr];
        };
        
        this.hasAn = this.hasA;
        
        this.hasMany = function (attrs) {
            //console.log(attrs);
        };
        
        this.looksLike = function (p) {
            pattern = p;
        };
        
        this.create = function (name) {
            this[name] = function () {
                for(var i in that) {
                    if (that[i] instanceof window.multigraph.ModelTool.Attr) {
                        that[i].addTo(this);
                    }
                }
                
                this.toString = pattern;
            };
            return this[name];
        };        
    }
    ns.Spec = Spec;
}(window.multigraph.ModelTool));