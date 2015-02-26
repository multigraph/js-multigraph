Util = {};

Util.interp = function (x, x0, x1, y0, y1) {
    // return the 'y' coordinate of the point on the line segment
    // connecting the two points (x0,y0) and (x1,y1) whose 'x'
    // coordinate is x
    return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
};

Util.safe_interp = function (x, x0, x1, y0, y1) {
    // same as "interp", but if the line is vertical (x0 === x1), return
    // the average of the two y values, rather than NaN
    if (x0 === x1) { return (y0 + y1) / 2; }
    return ns.util.interp(x, x0, x1, y0, y1);
};

Util.l2dist = function (x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return Math.sqrt(dx*dx + dy*dy);
};

module.exports = Util;
