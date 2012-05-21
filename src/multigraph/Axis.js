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
        this.hasA("min").which.validatesWith(function(id) {
            return typeof(id) === 'string';
        });
        this.hasA("max").which.validatesWith(function(id) {
            return typeof(id) === 'string';
        });

    });

    ns.Axis = Axis;


}(window.multigraph));
