if (!window.multigraph) {
    window.multigraph = {};
}
if (!window.multigraph.math) {
    window.multigraph.math = {};
}

window.multigraph.math.util = {
    "interp": function (x, x0, x1, y0, y1) {
        return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    }
};