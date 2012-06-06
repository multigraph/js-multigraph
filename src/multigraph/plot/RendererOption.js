if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Plot) {
    window.multigraph.Plot = {};
}

if (!window.multigraph.Plot.Renderer) {
    window.multigraph.Plot.Renderer = {};
}

(function (ns) {
    "use strict";

    var Option = new ns.ModelTool.Model( 'RendererOption', function () {
        this.hasA("name").which.validatesWith(function (name) {
            return typeof(name) === 'string';
        });
        this.hasA("value").which.validatesWith(function (value) {
            return typeof(value) === 'string';
        });
        this.hasA("min").which.validatesWith(function (min) {
            return ns.utilityFunctions.validateDouble(min);
        });
        this.hasA("max").which.validatesWith(function (max) {
            return ns.utilityFunctions.validateDouble(max);
        });
        this.isBuiltWith('name', 'value');

    });

    ns.Plot.Renderer.Option = Option;


}(window.multigraph));
