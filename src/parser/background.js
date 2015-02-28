var Background = require('../core/background.js');

Background.parseXML = function (xml, multigraph) {
    var background       = new Background(),
        parsingFunctions = require('../util/parsingFunctions.js'),
        RGBColor         = require('../math/rgb_color.js'),
        Img              = require('../core/img.js'),
        child;

    if (xml) {
        parsingFunctions.parseAttribute(xml.attr("color"), background.color, RGBColor.parse);
        child = xml.find("img");
        if (child.length > 0) {
            background.img(Img[parse](child, multigraph));
        }
    }
    return background;
};

module.exports = Background;
