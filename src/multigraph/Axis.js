if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Axis = window.multigraph.ModelTool.Model( 'Axis', function() {
        this.hasAn("id").which.validatesWith(function(id) {
            return typeof(id) === 'string';
        });
        this.hasAn("orientation").which.validatesWith(function(orientation) {
            return (orientation === 'horizontal') || (orientation === 'vertical');
        });
        this.hasA("type").which.validatesWith(function(type) {
            return typeof(type) === 'string' && ((type.toLowerCase() === 'number') || (type.toLowerCase() === 'datetime'));
        });
        this.hasA("min").which.validatesWith(function(id) {
            return typeof(id) === 'string';
        });
        this.hasA("max").which.validatesWith(function(id) {
            return typeof(id) === 'string';
        });
        this.hasAn("anchor").which.validatesWith(function(anchor) {
            return typeof(anchor) === 'string';
        });
        this.hasA("base").which.validatesWith(function(base) {
            return typeof(base) === 'string';
        });
        this.hasA("position").which.validatesWith(function(position) {
            return typeof(position) === 'string';
        });

    });

    ns.Axis = Axis;


}(window.multigraph));
