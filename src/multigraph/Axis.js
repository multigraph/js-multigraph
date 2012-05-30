if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Axis = new ns.ModelTool.Model( 'Axis', function () {
        this.hasAn("id").which.validatesWith(function (id) {
            return typeof(id) === 'string';
        });
        this.hasAn("orientation").which.validatesWith(function (orientation) {
            return (orientation === 'horizontal') || (orientation === 'vertical');
        });
        this.hasA("type").which.validatesWith(function (type) {
            return typeof(type) === 'string' && ((type.toLowerCase() === 'number') || (type.toLowerCase() === 'datetime'));
        });
        this.hasA("min").which.validatesWith(function (min) {
            return typeof(min) === 'string';
        });
        this.hasA("max").which.validatesWith(function (max) {
            return typeof(max) === 'string';
        });
        this.hasAn("anchor").which.validatesWith(function (anchor) {
            return ns.utilityFunctions.validateCoordinatePair(anchor);
        });
        this.hasA("base").which.validatesWith(function (base) {
            return ns.utilityFunctions.validateCoordinatePair(base);
        });
        this.hasA("position").which.validatesWith(function (position) {
            return ns.utilityFunctions.validateCoordinatePair(position);
        });

    });

    ns.Axis = Axis;


}(window.multigraph));
