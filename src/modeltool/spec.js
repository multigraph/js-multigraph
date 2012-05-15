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
        
        this.looksLike = function (p) {
            pattern = p;
        };
        
        this.create = function (name) {
            this[name] = function () {
                for(var i in that) {
                    if (that[i] instanceof ns.Attr) {
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