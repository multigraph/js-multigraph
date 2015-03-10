var Background = require('../../core/background.js');

// "background" : {
//   "color": "#ffff00",
//   "img" : { "src": "foo.png", "anchor": [-1, 5], "base": [3, 12], "position": [-2, 3], "frame": "padding" }
// }
Background.parseJSON = function (json, multigraph) {
    var background       = new Background(),
        parseAttribute   = require('../../util/parsingFunctions.js').parseAttribute,
        RGBColor         = require('../../math/rgb_color.js'),
        Img              = require('../../core/img.js'),
        child;

    if (json) {
        parseAttribute(json.color, background.color, RGBColor.parse);
        if (json.img) {
            background.img(Img.parseJSON(json.img, multigraph));
        }
    }
    return background;
};

module.exports = Background;
