var Img = require('../../core/img.js');

// "img" : { "src": "foo.png", "anchor": [-1, 5], "base": [3, 12], "position": [-2, 3], "frame": "padding" }
Img.parseJSON = function (json, multigraph) {
    var img,
        parseAttribute = require('../../util/parsingFunctions.js').parseAttribute,
        Point          = require('../../math/point.js'),
        parseJSONPoint = function(p) { return new Point(p[0], p[1]); };
    if (json && json.src !== undefined) {
        var src = json.src;
        if (!src) {
            throw new Error('img requires a "src" property');
        }
        if (multigraph) {
            src = multigraph.rebaseUrl(src);
        }
        img = new Img(src);
        parseAttribute(json.anchor,   img.anchor,   parseJSONPoint);
        parseAttribute(json.base,     img.base,     parseJSONPoint);
        parseAttribute(json.position, img.position, parseJSONPoint);
        parseAttribute(json.frame,    img.frame,    function (value) { return value.toLowerCase(); });
    }
    return img;
};

module.exports = Img;
