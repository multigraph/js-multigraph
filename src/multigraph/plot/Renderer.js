if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Plot) {
    window.multigraph.Plot = {};
}

(function (ns) {
    "use strict";

    var Renderer,
        Option;

    if (ns.Plot.Renderer && ns.Plot.Renderer.Option) {
        Option = ns.Plot.Renderer.Option;
    }

    Renderer = new ns.ModelTool.Model( 'Renderer', function () {
        this.hasA("type").which.validatesWith(function (type) {
            return type === 'line' || type === 'bar' ||
                   type === 'fill' || type === 'point' ||
                   type === 'barerror' || type === 'lineerror' ||
                   type === 'pointline';
        });
        this.hasMany("options").which.validatesWith(function (option) {
            return option instanceof ns.Plot.Renderer.Option;
        });
        this.isBuiltWith('type');

    });

    ns.Plot.Renderer = Renderer;

    if (Option) {
        ns.Plot.Renderer.Option = Option;
    }

}(window.multigraph));
